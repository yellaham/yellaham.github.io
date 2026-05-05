---
layout: single
title: "Demo: Detection Theory"
permalink: /teaching/ese-531/demos/detection-theory/
author_profile: true
toc: false
toc_label: "Demo"
---

<div class="ese-531" markdown="1">

For a Gaussian mean-shift test, decide $H_1$ when the sample mean exceeds a threshold. The plot connects the likelihood-ratio idea with false-alarm and detection probabilities.

## Mathematical setup

Consider

$$
H_0:X_i\sim N(0,\sigma^2),
\qquad
H_1:X_i\sim N(\mu_1,\sigma^2),
\qquad \mu_1>0.
$$

For iid observations, the sample mean is sufficient for this one-sided mean-shift test:

$$
\bar X\mid H_0\sim N\left(0,\frac{\sigma^2}{n}\right),
\qquad
\bar X\mid H_1\sim N\left(\mu_1,\frac{\sigma^2}{n}\right).
$$

The threshold rule is decide $H_1$ when $\bar X>\gamma$, so

$$
P_{\mathrm{FA}}=\Pr_0(\bar X>\gamma),
\qquad
P_D=\Pr_1(\bar X>\gamma).
$$

Equivalently,

$$
P_{\mathrm{FA}}=1-\Phi\left(\frac{\gamma\sqrt n}{\sigma}\right),
\qquad
P_D=1-\Phi\left(\frac{(\gamma-\mu_1)\sqrt n}{\sigma}\right).
$$

Sweeping $\gamma$ traces out the ROC curve.

## What to try

- Move $\gamma$ right. False alarms decrease, but missed detections increase.
- Increase $\mu_1$ or $n$. The two statistic distributions separate more, improving the ROC.
- Increase $\sigma$. The distributions overlap more, so the same threshold becomes less decisive.

<div class="ese-demo" data-demo="detection-theory">
  <div class="ese-demo-grid">
    <div class="ese-demo-control">
      <label for="dt-n">Sample size n: <output data-output="n"></output></label>
      <input id="dt-n" data-param="n" type="range" min="1" max="100" value="10">
    </div>
    <div class="ese-demo-control">
      <label for="dt-mu1">Mean under H1: <output data-output="mu1"></output></label>
      <input id="dt-mu1" data-param="mu1" type="range" min="0.1" max="3" step="0.05" value="1">
    </div>
    <div class="ese-demo-control">
      <label for="dt-sigma">Noise sigma: <output data-output="sigma"></output></label>
      <input id="dt-sigma" data-param="sigma" type="range" min="0.3" max="3" step="0.1" value="1">
    </div>
    <div class="ese-demo-control">
      <label for="dt-gamma">Threshold gamma: <output data-output="gamma"></output></label>
      <input id="dt-gamma" data-param="gamma" type="range" min="-1" max="3" step="0.05" value="0.45">
    </div>
  </div>
  <div class="ese-demo-plot"></div>
  <div class="ese-demo-stats"></div>
  <p class="ese-demo-takeaway"></p>
</div>

The operating probabilities are $P_{\mathrm{FA}}=P_0(\bar X>\gamma)$ and $P_D=P_1(\bar X>\gamma)$.

<p class="ese-next"><a href="/teaching/ese-531/detection-theory/">Back to topic notes</a></p>

</div>

<script src="/assets/js/ese531-demos.js" defer></script>
