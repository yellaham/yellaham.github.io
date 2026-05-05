(function () {
  "use strict";

  var TAU = Math.PI * 2;
  var COLORS = {
    blue: "#245f82",
    red: "#b42318",
    green: "#2f7d64",
    amber: "#9a6700",
    purple: "#6d4f7d",
    gray: "#64748b",
    ink: "#0f172a"
  };

  function qs(root, selector) {
    return root.querySelector(selector);
  }

  function qsa(root, selector) {
    return Array.prototype.slice.call(root.querySelectorAll(selector));
  }

  function param(root, name, fallback) {
    var el = qs(root, '[data-param="' + name + '"]');
    if (!el) return fallback;
    if (el.type === "checkbox") return el.checked;
    if (el.tagName === "SELECT") return el.value;
    var value = Number(el.value);
    return Number.isFinite(value) ? value : fallback;
  }

  function fmt(x, digits) {
    if (!Number.isFinite(x)) return "n/a";
    if (Math.abs(x) >= 1000 || (Math.abs(x) > 0 && Math.abs(x) < 0.001)) {
      return x.toExponential(digits == null ? 2 : digits);
    }
    return x.toFixed(digits == null ? 3 : digits).replace(/\.?0+$/, "");
  }

  function syncOutputs(root) {
    qsa(root, "[data-param]").forEach(function (el) {
      var out = qs(root, '[data-output="' + el.getAttribute("data-param") + '"]');
      if (out) out.textContent = el.value;
    });
  }

  function setStats(root, stats) {
    var box = qs(root, ".ese-demo-stats");
    if (!box) return;
    box.innerHTML = stats.map(function (item) {
      return '<div><strong>' + item[0] + '</strong><span>' + item[1] + '</span></div>';
    }).join("");
  }

  function setTakeaway(root, text) {
    var box = qs(root, ".ese-demo-takeaway");
    if (box) box.textContent = text;
  }

  function onControls(root, render) {
    var run = function () {
      syncOutputs(root);
      render();
    };
    qsa(root, "input, select").forEach(function (el) {
      el.addEventListener("input", run);
      el.addEventListener("change", run);
    });
    qsa(root, '[data-action="rerun"]').forEach(function (el) {
      el.addEventListener("click", function () {
        var seed = qs(root, '[data-param="seed"]');
        if (seed) seed.value = String(Number(seed.value || 1) + 1);
        run();
      });
    });
    run();
  }

  function mulberry32(seed) {
    var a = seed >>> 0;
    return function () {
      a += 0x6D2B79F5;
      var t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function randn(rng) {
    var u = 0;
    var v = 0;
    while (u === 0) u = rng();
    while (v === 0) v = rng();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(TAU * v);
  }

  function sampleDist(rng, dist) {
    if (dist === "exponential") return -Math.log(1 - rng()) - 1;
    if (dist === "bernoulli") return rng() < 0.35 ? 1 : 0;
    if (dist === "t3") {
      var z = randn(rng);
      var c = randn(rng) * randn(rng) + randn(rng) * randn(rng) + randn(rng) * randn(rng);
      return z / Math.sqrt(c / 3);
    }
    return randn(rng);
  }

  function mean(values) {
    return values.reduce(function (a, b) { return a + b; }, 0) / values.length;
  }

  function variance(values, sample) {
    var m = mean(values);
    var ss = values.reduce(function (a, b) { return a + (b - m) * (b - m); }, 0);
    return ss / Math.max(1, values.length - (sample ? 1 : 0));
  }

  function erf(x) {
    var sign = x < 0 ? -1 : 1;
    x = Math.abs(x);
    var a1 = 0.254829592;
    var a2 = -0.284496736;
    var a3 = 1.421413741;
    var a4 = -1.453152027;
    var a5 = 1.061405429;
    var p = 0.3275911;
    var t = 1 / (1 + p * x);
    var y = 1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
    return sign * y;
  }

  function Phi(x) {
    return 0.5 * (1 + erf(x / Math.SQRT2));
  }

  function normalPdf(x, mu, sd) {
    var z = (x - mu) / sd;
    return Math.exp(-0.5 * z * z) / (sd * Math.sqrt(TAU));
  }

  function logGamma(z) {
    var c = [
      676.5203681218851, -1259.1392167224028, 771.3234287776531,
      -176.6150291621406, 12.507343278686905, -0.13857109526572012,
      9.984369578019572e-6, 1.5056327351493116e-7
    ];
    if (z < 0.5) return Math.log(Math.PI) - Math.log(Math.sin(Math.PI * z)) - logGamma(1 - z);
    z -= 1;
    var x = 0.9999999999998099;
    for (var i = 0; i < c.length; i += 1) x += c[i] / (z + i + 1);
    var t = z + c.length - 0.5;
    return 0.5 * Math.log(TAU) + (z + 0.5) * Math.log(t) - t + Math.log(x);
  }

  function betaPdf(x, a, b) {
    if (x <= 0 || x >= 1) return 0;
    return Math.exp((a - 1) * Math.log(x) + (b - 1) * Math.log(1 - x) - logGamma(a) - logGamma(b) + logGamma(a + b));
  }

  function betaBinomPmf(k, m, a, b) {
    return Math.exp(
      logGamma(m + 1) - logGamma(k + 1) - logGamma(m - k + 1) +
      logGamma(k + a) + logGamma(m - k + b) - logGamma(m + a + b) -
      logGamma(a) - logGamma(b) + logGamma(a + b)
    );
  }

  function bernoulliKl(x, p) {
    if (x <= 0) return Math.log(1 / (1 - p));
    if (x >= 1) return Math.log(1 / p);
    return x * Math.log(x / p) + (1 - x) * Math.log((1 - x) / (1 - p));
  }

  function lowerRegularizedGamma(a, x) {
    if (x <= 0) return 0;
    if (x < a + 1) {
      var ap = a;
      var del = 1 / a;
      var sum = del;
      for (var n = 1; n <= 100; n += 1) {
        ap += 1;
        del *= x / ap;
        sum += del;
        if (Math.abs(del) < Math.abs(sum) * 1e-12) break;
      }
      return Math.min(1, sum * Math.exp(-x + a * Math.log(x) - logGamma(a)));
    }
    return 1 - upperRegularizedGamma(a, x);
  }

  function upperRegularizedGamma(a, x) {
    if (x <= 0) return 1;
    if (x < a + 1) return 1 - lowerRegularizedGamma(a, x);
    var b = x + 1 - a;
    var c = 1 / 1e-30;
    var d = 1 / b;
    var h = d;
    for (var i = 1; i <= 100; i += 1) {
      var an = -i * (i - a);
      b += 2;
      d = an * d + b;
      if (Math.abs(d) < 1e-30) d = 1e-30;
      c = b + an / c;
      if (Math.abs(c) < 1e-30) c = 1e-30;
      d = 1 / d;
      var del = d * c;
      h *= del;
      if (Math.abs(del - 1) < 1e-12) break;
    }
    return Math.max(0, Math.min(1, Math.exp(-x + a * Math.log(x) - logGamma(a)) * h));
  }

  function chiSquareSurvival(x, df) {
    return upperRegularizedGamma(df / 2, x / 2);
  }

  function chiSquarePdf(x, df, scale) {
    if (x <= 0) return 0;
    var z = x / scale;
    return Math.exp((df / 2 - 1) * Math.log(z) - z / 2 - (df / 2) * Math.log(2) - logGamma(df / 2)) / scale;
  }

  function betaMapSummary(a, b) {
    if (a > 1 && b > 1) return fmt((a - 1) / (a + b - 2), 3);
    if (a === 1 && b === 1) return "any theta";
    if (a < 1 && b < 1) return "0 and 1";
    if (a <= 1 && b >= 1) return "0 (boundary)";
    if (a >= 1 && b <= 1) return "1 (boundary)";
    return "0 and 1";
  }

  function clear(el) {
    if (el) el.innerHTML = "";
  }

  function svgEl(name, attrs) {
    var el = document.createElementNS("http://www.w3.org/2000/svg", name);
    Object.keys(attrs || {}).forEach(function (key) {
      el.setAttribute(key, attrs[key]);
    });
    return el;
  }

  function makeSvg(container, height) {
    clear(container);
    var svg = svgEl("svg", {
      viewBox: "0 0 720 " + (height || 360),
      role: "img",
      "aria-label": "Interactive statistical plot"
    });
    container.appendChild(svg);
    return svg;
  }

  function domain(values, pad) {
    var lo = Math.min.apply(null, values);
    var hi = Math.max.apply(null, values);
    if (lo === hi) {
      lo -= 1;
      hi += 1;
    }
    var extra = (hi - lo) * (pad == null ? 0.08 : pad);
    return [lo - extra, hi + extra];
  }

  function drawAxes(svg, xDomain, yDomain, labels) {
    var w = 720;
    var h = Number(svg.getAttribute("viewBox").split(" ")[3]);
    var m = { l: 58, r: 18, t: 18, b: 54 };
    var sx = function (x) { return m.l + (x - xDomain[0]) / (xDomain[1] - xDomain[0]) * (w - m.l - m.r); };
    var sy = function (y) { return h - m.b - (y - yDomain[0]) / (yDomain[1] - yDomain[0]) * (h - m.t - m.b); };
    svg.appendChild(svgEl("rect", { x: m.l, y: m.t, width: w - m.l - m.r, height: h - m.t - m.b, fill: "#ffffff", stroke: "#d8e0ea" }));
    for (var i = 0; i <= 4; i += 1) {
      var y = yDomain[0] + (yDomain[1] - yDomain[0]) * i / 4;
      var yy = sy(y);
      svg.appendChild(svgEl("line", { x1: m.l, x2: w - m.r, y1: yy, y2: yy, stroke: "#eef2f7" }));
      var yt = svgEl("text", { x: m.l - 8, y: yy + 4, "text-anchor": "end", class: "ese-demo-axis-text" });
      yt.textContent = fmt(y, 2);
      svg.appendChild(yt);
    }
    for (var j = 0; j <= 4; j += 1) {
      var x = xDomain[0] + (xDomain[1] - xDomain[0]) * j / 4;
      var xx = sx(x);
      svg.appendChild(svgEl("line", { x1: xx, x2: xx, y1: m.t, y2: h - m.b, stroke: "#f6f8fb" }));
      var xt = svgEl("text", { x: xx, y: h - 22, "text-anchor": "middle", class: "ese-demo-axis-text" });
      xt.textContent = fmt(x, 2);
      svg.appendChild(xt);
    }
    var xl = svgEl("text", { x: (m.l + w - m.r) / 2, y: h - 4, "text-anchor": "middle", class: "ese-demo-axis-label" });
    xl.textContent = labels.x || "";
    svg.appendChild(xl);
    var yl = svgEl("text", { x: 14, y: (m.t + h - m.b) / 2, transform: "rotate(-90 14 " + ((m.t + h - m.b) / 2) + ")", "text-anchor": "middle", class: "ese-demo-axis-label" });
    yl.textContent = labels.y || "";
    svg.appendChild(yl);
    return { sx: sx, sy: sy, m: m, w: w, h: h };
  }

  function drawPanelAxes(svg, box, xDomain, yDomain, labels) {
    var sx = function (x) { return box.x + (x - xDomain[0]) / (xDomain[1] - xDomain[0]) * box.w; };
    var sy = function (y) { return box.y + box.h - (y - yDomain[0]) / (yDomain[1] - yDomain[0]) * box.h; };
    svg.appendChild(svgEl("rect", { x: box.x, y: box.y, width: box.w, height: box.h, fill: "#ffffff", stroke: "#d8e0ea" }));
    for (var i = 0; i <= 4; i += 1) {
      var yy = box.y + i * box.h / 4;
      svg.appendChild(svgEl("line", { x1: box.x, x2: box.x + box.w, y1: yy, y2: yy, stroke: "#eef2f7" }));
    }
    var xl = svgEl("text", { x: box.x + box.w / 2, y: box.y + box.h + 36, "text-anchor": "middle", class: "ese-demo-axis-label" });
    xl.textContent = labels.x || "";
    svg.appendChild(xl);
    var yl = svgEl("text", { x: box.x - 38, y: box.y + box.h / 2, transform: "rotate(-90 " + (box.x - 38) + " " + (box.y + box.h / 2) + ")", "text-anchor": "middle", class: "ese-demo-axis-label" });
    yl.textContent = labels.y || "";
    svg.appendChild(yl);
    return { sx: sx, sy: sy };
  }

  function plotLines(container, series, labels, xDomain, yDomain) {
    var svg = makeSvg(container, 360);
    var xs = [];
    var ys = [];
    series.forEach(function (s) {
      s.points.forEach(function (p) {
        xs.push(p[0]);
        ys.push(p[1]);
      });
    });
    xDomain = xDomain || domain(xs);
    yDomain = yDomain || [Math.min(0, Math.min.apply(null, ys)), Math.max.apply(null, ys) * 1.12 || 1];
    var scale = drawAxes(svg, xDomain, yDomain, labels || {});
    series.forEach(function (s) {
      var d = s.points.map(function (p, i) {
        return (i ? "L" : "M") + scale.sx(p[0]).toFixed(2) + " " + scale.sy(p[1]).toFixed(2);
      }).join(" ");
      svg.appendChild(svgEl("path", { d: d, fill: "none", stroke: s.color || COLORS.blue, "stroke-width": s.width || 2.5 }));
    });
    drawLegend(svg, series);
  }

  function drawLegend(svg, series) {
    var x = 500;
    var y = 28;
    series.filter(function (s) { return s.name; }).forEach(function (s, i) {
      var yy = y + i * 20;
      svg.appendChild(svgEl("line", { x1: x, x2: x + 22, y1: yy, y2: yy, stroke: s.color || COLORS.blue, "stroke-width": 3 }));
      var text = svgEl("text", { x: x + 28, y: yy + 4, class: "ese-demo-axis-text" });
      text.textContent = s.name;
      svg.appendChild(text);
    });
  }

  function plotBars(container, bars, labels, yMax) {
    var svg = makeSvg(container, 340);
    var maxY = yMax || Math.max.apply(null, bars.map(function (b) { return b.value; })) * 1.15 || 1;
    var scale = drawAxes(svg, [-0.5, bars.length - 0.5], [0, maxY], labels || {});
    var bw = (scale.w - scale.m.l - scale.m.r) / bars.length * 0.68;
    bars.forEach(function (bar, i) {
      var x = scale.sx(i) - bw / 2;
      var y = scale.sy(bar.value);
      svg.appendChild(svgEl("rect", { x: x, y: y, width: bw, height: scale.sy(0) - y, fill: bar.color || COLORS.blue, opacity: 0.86 }));
      var t = svgEl("text", { x: scale.sx(i), y: scale.h - 24, "text-anchor": "middle", class: "ese-demo-axis-text" });
      t.textContent = bar.label;
      svg.appendChild(t);
    });
  }

  function plotHistogram(container, values, labels, color) {
    var d = domain(values, 0.02);
    var bins = 28;
    var counts = Array.from({ length: bins }, function () { return 0; });
    values.forEach(function (v) {
      var k = Math.floor((v - d[0]) / (d[1] - d[0]) * bins);
      counts[Math.max(0, Math.min(bins - 1, k))] += 1;
    });
    var bars = counts.map(function (c, i) {
      return { label: i % 7 === 0 ? fmt(d[0] + (i + 0.5) * (d[1] - d[0]) / bins, 2) : "", value: c / values.length, color: color || COLORS.blue };
    });
    plotBars(container, bars, labels, Math.max.apply(null, bars.map(function (b) { return b.value; })) * 1.18);
  }

  function exactBinomialTail(n, p, lo, hi) {
    var probs = [];
    var q = 1 - p;
    var first = Math.exp(n * Math.log(q));
    probs[0] = first;
    for (var k = 1; k <= n; k += 1) {
      probs[k] = probs[k - 1] * (n - k + 1) / k * p / q;
    }
    var total = 0;
    probs.forEach(function (pk, k) {
      if (k <= lo || k >= hi) total += pk;
    });
    return Math.min(1, total);
  }

  function demoRandomSamples(root) {
    onControls(root, function () {
      var n = param(root, "n", 20);
      var reps = param(root, "reps", 800);
      var dist = param(root, "dist", "normal");
      var rng = mulberry32(param(root, "seed", 531));
      var means = [];
      var vars = [];
      for (var r = 0; r < reps; r += 1) {
        var xs = [];
        for (var i = 0; i < n; i += 1) xs.push(sampleDist(rng, dist));
        means.push(mean(xs));
        vars.push(variance(xs, true));
      }
      plotHistogram(qs(root, ".ese-demo-plot"), means, { x: "sample mean", y: "relative frequency" }, COLORS.blue);
      setStats(root, [
        ["E(sample mean)", fmt(mean(means), 3)],
        ["SD(sample mean)", fmt(Math.sqrt(variance(means, false)), 3)],
        ["E(sample variance)", fmt(mean(vars), 3)],
        ["replications", reps]
      ]);
      setTakeaway(root, "As n grows, the sample mean concentrates. The sample variance is noisier, but with Bessel's correction it targets the population variance under iid sampling.");
    });
  }

  function demoInequalities(root) {
    onControls(root, function () {
      var n = param(root, "n", 40);
      var p = param(root, "p", 0.35);
      var eps = param(root, "eps", 0.12);
      var lo = Math.floor(n * (p - eps));
      var hi = Math.ceil(n * (p + eps));
      var exact = exactBinomialTail(n, p, lo, hi);
      var markovUpper = p + eps <= 1 ? p / (p + eps) : 0;
      var markovLower = p - eps >= 0 ? (1 - p) / (1 - p + eps) : 0;
      var markov = Math.min(1, markovUpper + markovLower);
      var cheb = Math.min(1, p * (1 - p) / (n * eps * eps));
      var chernoffUpper = p + eps <= 1 ? Math.exp(-n * bernoulliKl(p + eps, p)) : 0;
      var chernoffLower = p - eps >= 0 ? Math.exp(-n * bernoulliKl(p - eps, p)) : 0;
      var chernoff = Math.min(1, chernoffUpper + chernoffLower);
      var hoeffding = Math.min(1, 2 * Math.exp(-2 * n * eps * eps));
      var sdK = Math.sqrt(n * p * (1 - p));
      var cltLower = lo >= 0 ? Phi((lo + 0.5 - n * p) / sdK) : 0;
      var cltUpper = hi <= n ? 1 - Phi((hi - 0.5 - n * p) / sdK) : 0;
      var clt = Math.min(1, cltLower + cltUpper);
      plotBars(qs(root, ".ese-demo-plot"), [
        { label: "exact", value: exact, color: COLORS.ink },
        { label: "Markov", value: markov, color: COLORS.amber },
        { label: "Cheb.", value: cheb, color: COLORS.purple },
        { label: "Chernoff", value: chernoff, color: COLORS.green },
        { label: "Hoeff.", value: hoeffding, color: COLORS.gray },
        { label: "CLT", value: clt, color: COLORS.blue }
      ], { x: "method", y: "probability or upper bound" }, 1);
      setStats(root, [
        ["event", "abs(Xbar - p) >= " + fmt(eps, 2)],
        ["exact binomial tail", fmt(exact, 4)],
        ["best finite bound here", fmt(Math.min(markov, cheb, chernoff, hoeffding), 4)],
        ["CLT approximation", fmt(clt, 4)]
      ]);
      setTakeaway(root, "Markov is shown as a two-sided union bound on Xbar and 1-Xbar. Chebyshev, Chernoff, and Hoeffding are finite-sample upper bounds; the CLT bar is a continuity-corrected normal approximation.");
    });
  }

  function demoPointEstimation(root) {
    onControls(root, function () {
      var theta = param(root, "theta", 2);
      var n = param(root, "n", 12);
      var reps = param(root, "reps", 1000);
      var rng = mulberry32(param(root, "seed", 531));
      var mom = [];
      var mle = [];
      for (var r = 0; r < reps; r += 1) {
        var xs = [];
        for (var i = 0; i < n; i += 1) xs.push(theta * rng());
        mom.push(2 * mean(xs));
        mle.push(Math.max.apply(null, xs));
      }
      plotLines(qs(root, ".ese-demo-plot"), densityCurves([mom, mle], ["MOM", "MLE"], [COLORS.blue, COLORS.green]), { x: "estimate of theta", y: "smoothed frequency" });
      setStats(root, [
        ["MOM bias", fmt(mean(mom) - theta, 3)],
        ["MLE bias", fmt(mean(mle) - theta, 3)],
        ["MOM RMSE", fmt(rmse(mom, theta), 3)],
        ["MLE RMSE", fmt(rmse(mle, theta), 3)]
      ]);
      setTakeaway(root, "For Uniform(0, theta), MOM is unbiased but variable. The MLE is the sample maximum: biased downward, yet often closer for moderate n.");
    });
  }

  function densityCurves(groups, names, colors) {
    var all = [];
    groups.forEach(function (g) { all = all.concat(g); });
    var d = domain(all, 0.05);
    var bw = (d[1] - d[0]) / 24;
    var xs = Array.from({ length: 120 }, function (_, i) { return d[0] + i * (d[1] - d[0]) / 119; });
    return groups.map(function (g, gi) {
      return {
        name: names[gi],
        color: colors[gi],
        points: xs.map(function (x) {
          var y = g.reduce(function (a, v) {
            var z = (x - v) / bw;
            return a + Math.exp(-0.5 * z * z);
          }, 0) / (g.length * bw * Math.sqrt(TAU));
          return [x, y];
        })
      };
    });
  }

  function rmse(values, target) {
    return Math.sqrt(values.reduce(function (a, v) { return a + (v - target) * (v - target); }, 0) / values.length);
  }

  function demoMleProperties(root) {
    onControls(root, function () {
      var n = param(root, "n", 25);
      var sigma = param(root, "sigma", 1);
      var xbar = param(root, "xbar", 0.4);
      var info = n / (sigma * sigma);
      var sd = 1 / Math.sqrt(info);
      var xs = Array.from({ length: 150 }, function (_, i) { return xbar - 4 * sd + i * 8 * sd / 149; });
      var maxLogLik = -n * Math.log(sigma * Math.sqrt(TAU));
      var ll = xs.map(function (t) { return [t, maxLogLik - n * (xbar - t) * (xbar - t) / (2 * sigma * sigma)]; });
      var approx = xs.map(function (t) { return [t, normalPdf(t, xbar, sd)]; });
      plotLines(qs(root, ".ese-demo-plot"), [
        { name: "relative log likelihood", color: COLORS.blue, points: ll.map(function (p) { return [p[0], p[1] - maxLogLik]; }) },
        { name: "MLE normal shape", color: COLORS.green, points: approx.map(function (p) { return [p[0], p[1] / Math.max.apply(null, approx.map(function (q) { return q[1]; })) * 0.15]; }) }
      ], { x: "candidate mean theta", y: "relative curvature" });
      setStats(root, [
        ["MLE", fmt(xbar, 3)],
        ["sample information", fmt(info, 3)],
        ["SE of MLE", fmt(sd, 3)],
        ["second derivative", "-" + fmt(info, 3)]
      ]);
      setTakeaway(root, "For a normal mean with known sigma, the full-sample Fisher information is n/sigma^2 and the exact standard error of Xbar is sigma/sqrt(n).");
    });
  }

  function demoEM(root) {
    onControls(root, function () {
      var sep = param(root, "sep", 2.4);
      var n = param(root, "n", 80);
      var iter = param(root, "iter", 8);
      var rng = mulberry32(param(root, "seed", 531));
      var xs = [];
      for (var i = 0; i < n; i += 1) xs.push((rng() < 0.45 ? -sep / 2 : sep / 2) + randn(rng));
      var pi = 0.5;
      var m1 = -0.5;
      var m2 = 0.5;
      var logs = [];
      var resp = [];
      for (var t = 0; t <= iter; t += 1) {
        resp = xs.map(function (x) {
          var a = pi * normalPdf(x, m1, 1);
          var b = (1 - pi) * normalPdf(x, m2, 1);
          return a / (a + b);
        });
        logs.push([t, xs.reduce(function (s, x) { return s + Math.log(pi * normalPdf(x, m1, 1) + (1 - pi) * normalPdf(x, m2, 1)); }, 0)]);
        var sw = resp.reduce(function (a, b) { return a + b; }, 0);
        if (t < iter) {
          pi = sw / n;
          m1 = xs.reduce(function (a, x, j) { return a + resp[j] * x; }, 0) / sw;
          m2 = xs.reduce(function (a, x, j) { return a + (1 - resp[j]) * x; }, 0) / (n - sw);
        }
      }
      plotEM(qs(root, ".ese-demo-plot"), xs, resp, m1, m2, logs);
      setStats(root, [
        ["mixing weight", fmt(pi, 3)],
        ["mean 1", fmt(m1, 3)],
        ["mean 2", fmt(m2, 3)],
        ["log likelihood gain", fmt(logs[logs.length - 1][1] - logs[0][1], 2)]
      ]);
      setTakeaway(root, "The E-step soft-assigns observations through responsibilities. The M-step refits weighted component parameters, and the observed-data log likelihood is nondecreasing up to numerical rounding.");
    });
  }

  function plotEM(container, xs, resp, m1, m2, logs) {
    var svg = makeSvg(container, 360);
    var xD = domain(xs.concat([m1, m2]));
    var yD = [0, 1];
    var scale = drawAxes(svg, xD, yD, { x: "observation x", y: "responsibility for component 1" });
    xs.forEach(function (x, i) {
      svg.appendChild(svgEl("circle", { cx: scale.sx(x), cy: scale.sy(resp[i]), r: 4, fill: resp[i] > 0.5 ? COLORS.blue : COLORS.green, opacity: 0.72 }));
    });
    [m1, m2].forEach(function (m, i) {
      svg.appendChild(svgEl("line", { x1: scale.sx(m), x2: scale.sx(m), y1: scale.m.t, y2: scale.h - scale.m.b, stroke: i ? COLORS.green : COLORS.blue, "stroke-width": 2, "stroke-dasharray": "5 4" }));
    });
    var l0 = logs[0][1];
    var l1 = logs[logs.length - 1][1];
    var text = svgEl("text", { x: 78, y: 34, class: "ese-demo-axis-text" });
    text.textContent = "log likelihood: " + fmt(l0, 1) + " to " + fmt(l1, 1);
    svg.appendChild(text);
  }

  function demoRisk(root) {
    onControls(root, function () {
      var a = param(root, "a", 0.75);
      var mu = param(root, "mu", 0.4);
      var m0 = param(root, "m0", 0);
      var n = param(root, "n", 10);
      var sigma = 1;
      var crlb = sigma * sigma / n;
      var maxA = 1.4;
      var pts = Array.from({ length: 141 }, function (_, i) {
        var aa = maxA * i / 140;
        return [aa, (aa - 1) * (aa - 1) * (mu - m0) * (mu - m0) + aa * aa * sigma * sigma / n];
      });
      var selected = (a - 1) * (a - 1) * (mu - m0) * (mu - m0) + a * a * sigma * sigma / n;
      plotLines(qs(root, ".ese-demo-plot"), [
        { name: "MSE risk", color: COLORS.blue, points: pts },
        { name: "unbiased variance CRLB", color: COLORS.red, points: [[0, crlb], [maxA, crlb]] }
      ], { x: "shrinkage a in m0 + a(Xbar - m0)", y: "MSE at true mu" }, [0, maxA], [0, Math.max(crlb, selected, Math.max.apply(null, pts.map(function (p) { return p[1]; }))) * 1.1]);
      setStats(root, [
        ["bias", fmt((a - 1) * (mu - m0), 3)],
        ["variance", fmt(a * a / n, 3)],
        ["MSE", fmt(selected, 3)],
        ["unbiased variance CRLB", fmt(crlb, 3)]
      ]);
      setTakeaway(root, "The scalar CRLB lower-bounds variance for unbiased estimators. A biased shrinkage rule is judged by MSE, so its pointwise MSE can fall below that variance benchmark.");
    });
  }

  function demoVector(root) {
    onControls(root, function () {
      var s1 = param(root, "sigma1", 1.4);
      var s2 = param(root, "sigma2", 0.8);
      var rho = param(root, "rho", 0.4);
      var n = param(root, "n", 20);
      var cov = [[s1 * s1 / n, rho * s1 * s2 / n], [rho * s1 * s2 / n, s2 * s2 / n]];
      plotEllipse(qs(root, ".ese-demo-plot"), cov);
      var det = cov[0][0] * cov[1][1] - cov[0][1] * cov[0][1];
      setStats(root, [
        ["Var(theta1 hat)", fmt(cov[0][0], 4)],
        ["Var(theta2 hat)", fmt(cov[1][1], 4)],
        ["Covariance", fmt(cov[0][1], 4)],
        ["det(CRLB covariance)", fmt(det, 5)]
      ]);
      setTakeaway(root, "For this Gaussian location model the information matrix is n Sigma^{-1}, so Sigma/n is the inverse-information covariance attained by the sample mean. Correlation tilts the error ellipse.");
    });
  }

  function plotEllipse(container, cov) {
    var svg = makeSvg(container, 360);
    var tr = cov[0][0] + cov[1][1];
    var det = cov[0][0] * cov[1][1] - cov[0][1] * cov[0][1];
    var disc = Math.sqrt(Math.max(0, tr * tr - 4 * det));
    var l1 = (tr + disc) / 2;
    var l2 = (tr - disc) / 2;
    var angle = 0.5 * Math.atan2(2 * cov[0][1], cov[0][0] - cov[1][1]) * 180 / Math.PI;
    var lim = 3 * Math.sqrt(Math.max(l1, l2));
    var scale = drawAxes(svg, [-lim, lim], [-lim, lim], { x: "theta1 error", y: "theta2 error" });
    var rx = scale.sx(2 * Math.sqrt(l1)) - scale.sx(0);
    var ry = scale.sy(0) - scale.sy(2 * Math.sqrt(l2));
    svg.appendChild(svgEl("ellipse", { cx: scale.sx(0), cy: scale.sy(0), rx: Math.abs(rx), ry: Math.abs(ry), transform: "rotate(" + angle + " " + scale.sx(0) + " " + scale.sy(0) + ")", fill: "#dbeafe", stroke: COLORS.blue, "stroke-width": 2 }));
    svg.appendChild(svgEl("circle", { cx: scale.sx(0), cy: scale.sy(0), r: 3, fill: COLORS.ink }));
  }

  function demoBayes(root) {
    onControls(root, function () {
      var a = param(root, "alpha", 2);
      var b = param(root, "beta", 2);
      var n = param(root, "n", 20);
      var s = Math.min(n, param(root, "successes", 9));
      var ap = a + s;
      var bp = b + n - s;
      var xs = Array.from({ length: 160 }, function (_, i) { return 0.001 + i * 0.998 / 159; });
      plotLines(qs(root, ".ese-demo-plot"), [
        { name: "prior", color: COLORS.gray, points: xs.map(function (x) { return [x, betaPdf(x, a, b)]; }) },
        { name: "posterior", color: COLORS.blue, points: xs.map(function (x) { return [x, betaPdf(x, ap, bp)]; }) }
      ], { x: "Bernoulli probability theta", y: "density" }, [0, 1]);
      setStats(root, [
        ["posterior alpha", fmt(ap, 1)],
        ["posterior beta", fmt(bp, 1)],
        ["posterior mean", fmt(ap / (ap + bp), 3)],
        ["MAP", betaMapSummary(ap, bp)]
      ]);
      setTakeaway(root, "Beta-Bernoulli updating adds observed successes and failures to the prior parameters. The posterior mean balances prior information and data.");
    });
  }

  function demoPriorPredictive(root) {
    onControls(root, function () {
      var a = param(root, "alpha", 2);
      var b = param(root, "beta", 8);
      var m = param(root, "m", 20);
      var bars = [];
      for (var k = 0; k <= m; k += 1) bars.push({ label: k % Math.ceil(m / 8) === 0 ? String(k) : "", value: betaBinomPmf(k, m, a, b), color: COLORS.green });
      plotBars(qs(root, ".ese-demo-plot"), bars, { x: "future successes in m trials", y: "prior predictive probability" });
      var meanPred = m * a / (a + b);
      setStats(root, [
        ["prior mean", fmt(a / (a + b), 3)],
        ["prior strength", fmt(a + b, 1)],
        ["predictive mean", fmt(meanPred, 2)],
        ["P(no successes)", fmt(betaBinomPmf(0, m, a, b), 3)]
      ]);
      setTakeaway(root, "The beta-binomial prior predictive distribution checks the implications of the prior before data arrive. At a fixed prior mean, larger alpha + beta makes future counts less overdispersed.");
    });
  }

  function demoApproxBayes(root) {
    onControls(root, function () {
      var a = param(root, "alpha", 1.5);
      var b = param(root, "beta", 1.5);
      var n = param(root, "n", 12);
      var s = Math.min(n, param(root, "successes", 2));
      var ap = a + s;
      var bp = b + n - s;
      var interior = ap > 1 && bp > 1;
      var center = interior ? (ap - 1) / (ap + bp - 2) : ap / (ap + bp);
      var approxVar = interior ? center * (1 - center) / (ap + bp - 2) : ap * bp / ((ap + bp) * (ap + bp) * (ap + bp + 1));
      var sd = Math.sqrt(approxVar);
      var approxName = interior ? "Laplace" : "moment normal";
      var xs = Array.from({ length: 180 }, function (_, i) { return 0.001 + i * 0.998 / 179; });
      plotLines(qs(root, ".ese-demo-plot"), [
        { name: "grid posterior", color: COLORS.blue, points: xs.map(function (x) { return [x, betaPdf(x, ap, bp)]; }) },
        { name: approxName, color: COLORS.red, points: xs.map(function (x) { return [x, normalPdf(x, center, sd)]; }) }
      ], { x: "theta", y: "posterior density" }, [0, 1]);
      setStats(root, [
        ["posterior mean", fmt(ap / (ap + bp), 3)],
        [interior ? "Laplace mode" : "fallback mean", fmt(center, 3)],
        [interior ? "Laplace SD" : "posterior SD", fmt(sd, 3)],
        ["data rate", fmt(s / n, 3)]
      ]);
      setTakeaway(root, interior ? "Laplace uses local quadratic curvature at an interior posterior mode. Grid evaluation is the reference curve here." : "The posterior mode is on or near a boundary, so an ordinary interior Laplace approximation is not valid; the red curve is only a moment-matched normal fallback.");
    });
  }

  function demoMonteCarlo(root) {
    onControls(root, function () {
      var m = param(root, "m", 1000);
      var gamma = param(root, "gamma", 2.5);
      var shift = param(root, "shift", 2);
      var rng = mulberry32(param(root, "seed", 531));
      var crude = [];
      var imp = [];
      var s1 = 0;
      var sw = 0;
      var sw2 = 0;
      var siw = 0;
      for (var i = 1; i <= m; i += 1) {
        var z = randn(rng);
        s1 += z > gamma ? 1 : 0;
        if (i % Math.max(1, Math.floor(m / 120)) === 0) crude.push([i, s1 / i]);
        var y = shift + randn(rng);
        var w = Math.exp(-0.5 * y * y + 0.5 * (y - shift) * (y - shift));
        sw += w;
        sw2 += w * w;
        siw += (y > gamma ? 1 : 0) * w;
        if (i % Math.max(1, Math.floor(m / 120)) === 0) imp.push([i, siw / i]);
      }
      var truth = 1 - Phi(gamma);
      plotLines(qs(root, ".ese-demo-plot"), [
        { name: "crude MC", color: COLORS.blue, points: crude },
        { name: "importance", color: COLORS.green, points: imp },
        { name: "truth", color: COLORS.red, points: [[1, truth], [m, truth]] }
      ], { x: "simulation draws", y: "estimate of P(Z > gamma)" }, [1, m]);
      setStats(root, [
        ["truth", fmt(truth, 5)],
        ["crude estimate", fmt(s1 / m, 5)],
        ["importance estimate", fmt(siw / m, 5)],
        ["ESS", fmt(sw * sw / sw2, 1)]
      ]);
      setTakeaway(root, "The importance estimate averages indicator times f/q weights, so it is unbiased when the standard-normal target and shifted-normal proposal are both known. ESS is a weight-degeneracy diagnostic, not a new sample count.");
    });
  }

  function demoLinear(root) {
    onControls(root, function () {
      var y1 = param(root, "y1", 2);
      var y2 = param(root, "y2", 1);
      var slope = param(root, "slope", 0.6);
      var w2 = param(root, "w2", 1);
      var h = [1, slope];
      var y = [y1, y2];
      var thetaOls = (h[0] * y[0] + h[1] * y[1]) / (h[0] * h[0] + h[1] * h[1]);
      var thetaWls = (h[0] * y[0] + w2 * h[1] * y[1]) / (h[0] * h[0] + w2 * h[1] * h[1]);
      var fitOls = [thetaOls * h[0], thetaOls * h[1]];
      var fitWls = [thetaWls * h[0], thetaWls * h[1]];
      var resOls = [y[0] - fitOls[0], y[1] - fitOls[1]];
      var resWls = [y[0] - fitWls[0], y[1] - fitWls[1]];
      plotProjection(qs(root, ".ese-demo-plot"), y, fitOls, fitWls, h);
      setStats(root, [
        ["OLS theta", fmt(thetaOls, 3)],
        ["WLS/GLS theta", fmt(thetaWls, 3)],
        ["OLS h^T r", fmt(resOls[0] * h[0] + resOls[1] * h[1], 3)],
        ["WLS h^T W r", fmt(resWls[0] * h[0] + w2 * resWls[1] * h[1], 3)],
        ["WLS h^T r", fmt(resWls[0] * h[0] + resWls[1] * h[1], 3)],
        ["weight on second row", fmt(w2, 2)]
      ]);
      setTakeaway(root, "OLS makes h^T r equal zero in the Euclidean geometry. Weighted least squares instead solves h^T W r = 0, so its unweighted residual need not be orthogonal to h.");
    });
  }

  function plotProjection(container, y, fitOls, fitWls, hvec) {
    var svg = makeSvg(container, 360);
    var lim = Math.max(3, Math.abs(y[0]), Math.abs(y[1]), Math.abs(fitOls[0]), Math.abs(fitOls[1]), Math.abs(fitWls[0]), Math.abs(fitWls[1])) * 1.25;
    var scale = drawAxes(svg, [-lim, lim], [-lim, lim], { x: "coordinate 1", y: "coordinate 2" });
    var a = -lim / Math.max(0.1, Math.abs(hvec[0]));
    var b = lim / Math.max(0.1, Math.abs(hvec[0]));
    svg.appendChild(svgEl("line", { x1: scale.sx(a * hvec[0]), y1: scale.sy(a * hvec[1]), x2: scale.sx(b * hvec[0]), y2: scale.sy(b * hvec[1]), stroke: "#94a3b8", "stroke-width": 2 }));
    drawArrow(svg, scale, [0, 0], y, COLORS.blue, "observed y");
    drawArrow(svg, scale, [0, 0], fitOls, COLORS.gray, "OLS fit");
    drawArrow(svg, scale, [0, 0], fitWls, COLORS.green, "WLS fit");
    drawArrow(svg, scale, fitWls, y, COLORS.red, "WLS residual");
  }

  function drawArrow(svg, scale, from, to, color, label) {
    svg.appendChild(svgEl("line", { x1: scale.sx(from[0]), y1: scale.sy(from[1]), x2: scale.sx(to[0]), y2: scale.sy(to[1]), stroke: color, "stroke-width": 3 }));
    svg.appendChild(svgEl("circle", { cx: scale.sx(to[0]), cy: scale.sy(to[1]), r: 4, fill: color }));
    var t = svgEl("text", { x: scale.sx(to[0]) + 8, y: scale.sy(to[1]) - 8, class: "ese-demo-axis-text" });
    t.textContent = label;
    svg.appendChild(t);
  }

  function demoDetection(root) {
    onControls(root, function () {
      var n = param(root, "n", 10);
      var mu = param(root, "mu1", 1);
      var sigma = param(root, "sigma", 1);
      var gamma = param(root, "gamma", 0.45);
      var sd = sigma / Math.sqrt(n);
      var pfa = 1 - Phi(gamma / sd);
      var pd = 1 - Phi((gamma - mu) / sd);
      plotDetectionPanels(qs(root, ".ese-demo-plot"), sd, mu, gamma, pfa, pd);
      setStats(root, [
        ["P false alarm", fmt(pfa, 4)],
        ["P detection", fmt(pd, 4)],
        ["miss probability", fmt(1 - pd, 4)],
        ["statistic SD", fmt(sd, 3)]
      ]);
      setTakeaway(root, "Moving the threshold right lowers false alarms but also lowers detection probability. More samples shrink the statistic variance and improve separation.");
    });
  }

  function plotDetectionPanels(container, sd, mu, gamma, pfa, pd) {
    var svg = makeSvg(container, 360);
    var left = { x: 58, y: 22, w: 378, h: 260 };
    var right = { x: 505, y: 58, w: 165, h: 165 };
    var lo = Math.min(-3 * sd, gamma - sd);
    var hi = Math.max(mu + 3 * sd, gamma + sd);
    var xs = Array.from({ length: 160 }, function (_, i) { return lo + i * (hi - lo) / 159; });
    var maxY = Math.max.apply(null, xs.map(function (x) { return Math.max(normalPdf(x, 0, sd), normalPdf(x, mu, sd)); }));
    var a = drawPanelAxes(svg, left, [lo, hi], [0, maxY * 1.12], { x: "sample mean statistic", y: "density" });
    [
      { color: COLORS.blue, points: xs.map(function (x) { return [x, normalPdf(x, 0, sd)]; }) },
      { color: COLORS.green, points: xs.map(function (x) { return [x, normalPdf(x, mu, sd)]; }) }
    ].forEach(function (s) {
      svg.appendChild(svgEl("path", {
        d: s.points.map(function (p, i) { return (i ? "L" : "M") + a.sx(p[0]).toFixed(2) + " " + a.sy(p[1]).toFixed(2); }).join(" "),
        fill: "none",
        stroke: s.color,
        "stroke-width": 2.5
      }));
    });
    svg.appendChild(svgEl("line", { x1: a.sx(gamma), x2: a.sx(gamma), y1: a.sy(0), y2: a.sy(maxY), stroke: COLORS.red, "stroke-width": 2.5, "stroke-dasharray": "5 4" }));
    var b = drawPanelAxes(svg, right, [0, 1], [0, 1], { x: "P false alarm", y: "P detection" });
    var roc = Array.from({ length: 120 }, function (_, i) {
      var t = lo + i * (hi - lo) / 119;
      return [1 - Phi(t / sd), 1 - Phi((t - mu) / sd)];
    }).sort(function (u, v) { return u[0] - v[0]; });
    svg.appendChild(svgEl("path", {
      d: roc.map(function (p, i) { return (i ? "L" : "M") + b.sx(p[0]).toFixed(2) + " " + b.sy(p[1]).toFixed(2); }).join(" "),
      fill: "none",
      stroke: COLORS.purple,
      "stroke-width": 2.5
    }));
    svg.appendChild(svgEl("circle", { cx: b.sx(pfa), cy: b.sy(pd), r: 5, fill: COLORS.red }));
    var title = svgEl("text", { x: right.x + right.w / 2, y: 34, "text-anchor": "middle", class: "ese-demo-axis-label" });
    title.textContent = "ROC operating point";
    svg.appendChild(title);
  }

  function demoDetectionExamples(root) {
    onControls(root, function () {
      var mode = param(root, "mode", "mean");
      var n = param(root, "n", 12);
      var gamma = param(root, "gamma", 1.8);
      if (mode === "variance") {
        var sigma1 = param(root, "sigma1", 1.8);
        var scale1 = sigma1 * sigma1;
        var pfaV = chiSquareSurvival(gamma, n);
        var pdV = chiSquareSurvival(gamma / scale1, n);
        var xsV = Array.from({ length: 180 }, function (_, i) { return 0.001 + i * Math.max(n * scale1 + 4 * Math.sqrt(2 * n) * scale1, n + 4 * Math.sqrt(2 * n), gamma) / 179; });
        plotLines(qs(root, ".ese-demo-plot"), [
          { name: "H0 chi-square", color: COLORS.blue, points: xsV.map(function (x) { return [x, chiSquarePdf(x, n, 1)]; }) },
          { name: "H1 scaled chi-square", color: COLORS.green, points: xsV.map(function (x) { return [x, chiSquarePdf(x, n, scale1)]; }) },
          { name: "threshold", color: COLORS.red, points: [[gamma, 0], [gamma, Math.max(chiSquarePdf(gamma, n, 1), chiSquarePdf(gamma, n, scale1))]] }
        ], { x: "energy statistic sum Xi^2", y: "density" });
        setStats(root, [["example", "variance change"], ["P false alarm", fmt(pfaV, 4)], ["P detection", fmt(pdV, 4)], ["energy threshold", fmt(gamma, 3)], ["H1 variance", fmt(scale1, 2)]]);
      } else {
        var mu = param(root, "mu1", 0.8);
        var sd = 1 / Math.sqrt(n);
        var pfa = 1 - Phi(gamma / sd);
        var pd = 1 - Phi((gamma - mu) / sd);
        var xs = Array.from({ length: 180 }, function (_, i) { return -3 * sd + i * (mu + 6 * sd) / 179; });
        plotLines(qs(root, ".ese-demo-plot"), [
          { name: "H0", color: COLORS.blue, points: xs.map(function (x) { return [x, normalPdf(x, 0, sd)]; }) },
          { name: "H1", color: COLORS.green, points: xs.map(function (x) { return [x, normalPdf(x, mu, sd)]; }) },
          { name: "threshold", color: COLORS.red, points: [[gamma, 0], [gamma, Math.max(normalPdf(gamma, 0, sd), normalPdf(gamma, mu, sd))]] }
        ], { x: "sample mean statistic", y: "density" });
        setStats(root, [["example", "mean shift"], ["P false alarm", fmt(pfa, 4)], ["P detection", fmt(pd, 4)], ["threshold", fmt(gamma, 3)]]);
      }
      setTakeaway(root, "Mean-shift examples use a signed statistic. Variance-change examples use energy, so thresholds and tail probabilities live on a different scale.");
    });
  }

  var registry = {
    "random-samples": demoRandomSamples,
    "probability-inequalities-limit-theorems": demoInequalities,
    "point-estimation": demoPointEstimation,
    "mle-properties-optimization": demoMleProperties,
    "expectation-maximization": demoEM,
    "estimator-risk-cramer-rao": demoRisk,
    "efficient-estimators-vector-crlb": demoVector,
    "bayesian-estimation": demoBayes,
    "prior-design-predictive-checks": demoPriorPredictive,
    "approximate-bayesian-inference": demoApproxBayes,
    "monte-carlo-methods": demoMonteCarlo,
    "linear-models-least-squares": demoLinear,
    "detection-theory": demoDetection,
    "detection-examples": demoDetectionExamples
  };

  document.addEventListener("DOMContentLoaded", function () {
    qsa(document, "[data-demo]").forEach(function (root) {
      var name = root.getAttribute("data-demo");
      if (registry[name]) registry[name](root);
    });
  });
}());
