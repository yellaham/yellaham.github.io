---
layout: single
title: "Demo: Probability Inequalities and Limit Theorems"
permalink: /teaching/ese-531/demos/probability-inequalities-limit-theorems/
author_profile: true
toc: false
toc_label: "Demo"
---

<div class="ese-531" markdown="1">

For $X_i\sim\mathrm{Bernoulli}(p)$, compare the exact binomial tail with Markov, Chebyshev, Chernoff, Hoeffding, and CLT calculations.

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

The two-sided event is $|\bar X_n-p|\geq \epsilon$. Markov is shown as a two-sided union bound, Chebyshev/Chernoff/Hoeffding are upper bounds, and the CLT bar is a continuity-corrected normal approximation.

<p class="ese-next"><a href="/teaching/ese-531/probability-inequalities-limit-theorems/">Back to topic notes</a></p>

</div>

<script src="/assets/js/ese531-demos.js" defer></script>
