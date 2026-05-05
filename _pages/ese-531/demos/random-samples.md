---
layout: single
title: "Demo: Random Samples and Sample Statistics"
permalink: /teaching/ese-531/demos/random-samples/
author_profile: true
toc: false
toc_label: "Demo"
---

<div class="ese-531" markdown="1">

This demo repeats the same sampling experiment many times. Watch how the sampling distribution of $\bar X_n$ and the average behavior of $S_n^2$ change with sample size.

<div class="ese-demo" data-demo="random-samples">
  <div class="ese-demo-grid">
    <div class="ese-demo-control">
      <label for="rs-dist">Population model</label>
      <select id="rs-dist" data-param="dist">
        <option value="normal">Normal(0, 1)</option>
        <option value="exponential">Exponential(1), centered</option>
        <option value="bernoulli">Bernoulli(0.35)</option>
        <option value="t3">t with 3 df</option>
      </select>
    </div>
    <div class="ese-demo-control">
      <label for="rs-n">Sample size n: <output data-output="n"></output></label>
      <input id="rs-n" data-param="n" type="range" min="2" max="120" value="20">
    </div>
    <div class="ese-demo-control">
      <label for="rs-reps">Repeated samples: <output data-output="reps"></output></label>
      <input id="rs-reps" data-param="reps" type="range" min="100" max="2500" step="100" value="800">
    </div>
    <div class="ese-demo-control">
      <label for="rs-seed">Seed</label>
      <input id="rs-seed" data-param="seed" type="number" value="531">
    </div>
  </div>
  <div class="ese-demo-plot"></div>
  <div class="ese-demo-stats"></div>
  <p class="ese-demo-takeaway"></p>
</div>

Formula to keep in view:

$$
\bar X_n=\frac{1}{n}\sum_{i=1}^n X_i,
\qquad
S_n^2=\frac{1}{n-1}\sum_{i=1}^n(X_i-\bar X_n)^2.
$$

<p class="ese-next"><a href="/teaching/ese-531/random-samples/">Back to topic notes</a></p>

</div>

<script src="/assets/js/ese531-demos.js" defer></script>
