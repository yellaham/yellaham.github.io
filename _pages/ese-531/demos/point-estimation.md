---
layout: single
title: "Demo: Point Estimation"
permalink: /teaching/ese-531/demos/point-estimation/
author_profile: true
toc: false
toc_label: "Demo"
---

<div class="ese-531" markdown="1">

For samples from $\mathrm{Uniform}(0,\theta)$, compare a method-of-moments estimator $\hat\theta_{\mathrm{MOM}}=2\bar X$ with the MLE $\hat\theta_{\mathrm{MLE}}=\max_i X_i$.

<div class="ese-demo" data-demo="point-estimation">
  <div class="ese-demo-grid">
    <div class="ese-demo-control">
      <label for="pe-theta">True theta: <output data-output="theta"></output></label>
      <input id="pe-theta" data-param="theta" type="range" min="0.5" max="5" step="0.1" value="2">
    </div>
    <div class="ese-demo-control">
      <label for="pe-n">Sample size n: <output data-output="n"></output></label>
      <input id="pe-n" data-param="n" type="range" min="2" max="80" value="12">
    </div>
    <div class="ese-demo-control">
      <label for="pe-reps">Repeated samples: <output data-output="reps"></output></label>
      <input id="pe-reps" data-param="reps" type="range" min="200" max="3000" step="100" value="1000">
    </div>
    <div class="ese-demo-control">
      <label for="pe-seed">Seed</label>
      <input id="pe-seed" data-param="seed" type="number" value="531">
    </div>
  </div>
  <div class="ese-demo-plot"></div>
  <div class="ese-demo-stats"></div>
  <p class="ese-demo-takeaway"></p>
</div>

The MLE uses the support constraint: values of $\theta$ below the sample maximum have likelihood zero.

<p class="ese-next"><a href="/teaching/ese-531/point-estimation/">Back to topic notes</a></p>

</div>

<script src="/assets/js/ese531-demos.js" defer></script>
