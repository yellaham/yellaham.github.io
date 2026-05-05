---
layout: single
title: "Demo: MLE Properties and Numerical Optimization"
permalink: /teaching/ese-531/demos/mle-properties-optimization/
author_profile: true
toc: false
toc_label: "Demo"
---

<div class="ese-531" markdown="1">

For $X_i\sim N(\theta,\sigma^2)$ with known $\sigma$, the log likelihood is quadratic in $\theta$ and the MLE is $\bar X$.

<div class="ese-demo" data-demo="mle-properties-optimization">
  <div class="ese-demo-grid">
    <div class="ese-demo-control">
      <label for="mle-n">Sample size n: <output data-output="n"></output></label>
      <input id="mle-n" data-param="n" type="range" min="2" max="150" value="25">
    </div>
    <div class="ese-demo-control">
      <label for="mle-sigma">Known sigma: <output data-output="sigma"></output></label>
      <input id="mle-sigma" data-param="sigma" type="range" min="0.4" max="3" step="0.1" value="1">
    </div>
    <div class="ese-demo-control">
      <label for="mle-xbar">Observed sample mean: <output data-output="xbar"></output></label>
      <input id="mle-xbar" data-param="xbar" type="range" min="-2" max="2" step="0.05" value="0.4">
    </div>
  </div>
  <div class="ese-demo-plot"></div>
  <div class="ese-demo-stats"></div>
  <p class="ese-demo-takeaway"></p>
</div>

Here $I_n(\theta)=n/\sigma^2$, so $1/\sqrt{I_n(\theta)}=\sigma/\sqrt n$. In this normal mean model that is the exact standard error of $\bar X$, not only an asymptotic approximation.

<p class="ese-next"><a href="/teaching/ese-531/mle-properties-optimization/">Back to topic notes</a></p>

</div>

<script src="/assets/js/ese531-demos.js" defer></script>
