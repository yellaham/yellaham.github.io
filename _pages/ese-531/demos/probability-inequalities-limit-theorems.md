---
layout: single
title: "Demo: Probability Inequalities and Limit Theorems"
permalink: /teaching/ese-531/demos/probability-inequalities-limit-theorems/
author_profile: true
toc: false
toc_label: "Demo"
---

<div class="ese-531" markdown="1">

For Bernoulli samples, compare the exact binomial tail with several lecture bounds and one normal approximation.

## Mathematical setup

Let $X_i\sim\mathrm{Bernoulli}(p)$ iid and $\bar X_n=n^{-1}\sum_i X_i$. The demo studies the two-sided deviation event

$$
\lvert \bar X_n-p\rvert \geq \epsilon.
$$

The exact probability is computed from $K=\sum_i X_i\sim\mathrm{Binomial}(n,p)$. Chebyshev gives

$$
\Pr(\lvert \bar X_n-p\rvert\geq \epsilon)\leq \frac{p(1-p)}{n\epsilon^2}.
$$

The Markov bar uses the two one-sided bounds

$$
\Pr(\bar X_n\geq p+\epsilon)\leq \frac{p}{p+\epsilon},
\qquad
\Pr(\bar X_n\leq p-\epsilon)\leq \frac{1-p}{1-p+\epsilon},
$$

summed as a union bound when the corresponding events are possible. The Chernoff/KL form uses

$$
\Pr(\bar X_n\geq p+\epsilon)\leq e^{-nD(p+\epsilon\,\Vert\,p)},
\qquad
\Pr(\bar X_n\leq p-\epsilon)\leq e^{-nD(p-\epsilon\,\Vert\,p)},
$$

where

$$
D(q\,\Vert\,p)=q\log\frac{q}{p}+(1-q)\log\frac{1-q}{1-p}.
$$

These KL terms are used when the shifted probabilities stay in $[0,1]$ and are then summed as a union bound for the two-sided event. Hoeffding uses $2e^{-2n\epsilon^2}$. The CLT bar is a continuity-corrected normal approximation, not an upper bound.

## What to try

- Start with a moderate deviation, then raise $\epsilon$. The exact tail should fall quickly, and the exponential bounds usually react faster than Chebyshev.
- Move $p$ near 0.05 or 0.95. Notice where symmetric normal approximations become less reliable for small or moderate $n$.
- Increase $n$ and watch the finite-sample upper bounds tighten. Markov remains intentionally crude because it uses very little structure.

<div class="ese-demo" data-demo="probability-inequalities-limit-theorems">
  <div class="ese-demo-grid">
    <div class="ese-demo-control">
      <label for="ineq-p">Success probability p: <output data-output="p"></output></label>
      <input id="ineq-p" data-param="p" type="range" min="0.05" max="0.95" step="0.01" value="0.35">
    </div>
    <div class="ese-demo-control">
      <label for="ineq-n">Sample size n: <output data-output="n"></output></label>
      <input id="ineq-n" data-param="n" type="range" min="5" max="200" value="40">
    </div>
    <div class="ese-demo-control">
      <label for="ineq-eps">Deviation epsilon: <output data-output="eps"></output></label>
      <input id="ineq-eps" data-param="eps" type="range" min="0.03" max="0.4" step="0.01" value="0.12">
    </div>
  </div>
  <div class="ese-demo-plot"></div>
  <div class="ese-demo-stats"></div>
  <p class="ese-demo-takeaway"></p>
</div>

Markov is shown as a two-sided union bound. Chebyshev, Chernoff, and Hoeffding are upper bounds; the CLT bar is a continuity-corrected approximation.

<p class="ese-next"><a href="/teaching/ese-531/probability-inequalities-limit-theorems/">Back to topic notes</a></p>

</div>

<script src="/assets/js/ese531-demos.js" defer></script>
