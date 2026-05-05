---
layout: single
title: "Demo: Efficient Estimators and Vector Cramer-Rao Bounds"
permalink: /teaching/ese-531/demos/efficient-estimators-vector-crlb/
author_profile: true
toc: false
toc_label: "Demo"
---

<div class="ese-531" markdown="1">

In a two-parameter Gaussian location model, the sample mean has covariance $\Sigma/n$. Since the information matrix is $n\Sigma^{-1}$, the vector CRLB says any unbiased covariance matrix must dominate $\Sigma/n$.

<div class="ese-demo" data-demo="efficient-estimators-vector-crlb">
  <div class="ese-demo-grid">
    <div class="ese-demo-control">
      <label for="vec-s1">Sigma 1: <output data-output="sigma1"></output></label>
      <input id="vec-s1" data-param="sigma1" type="range" min="0.4" max="3" step="0.1" value="1.4">
    </div>
    <div class="ese-demo-control">
      <label for="vec-s2">Sigma 2: <output data-output="sigma2"></output></label>
      <input id="vec-s2" data-param="sigma2" type="range" min="0.4" max="3" step="0.1" value="0.8">
    </div>
    <div class="ese-demo-control">
      <label for="vec-rho">Correlation rho: <output data-output="rho"></output></label>
      <input id="vec-rho" data-param="rho" type="range" min="-0.9" max="0.9" step="0.05" value="0.4">
    </div>
    <div class="ese-demo-control">
      <label for="vec-n">Sample size n: <output data-output="n"></output></label>
      <input id="vec-n" data-param="n" type="range" min="1" max="100" value="20">
    </div>
  </div>
  <div class="ese-demo-plot"></div>
  <div class="ese-demo-stats"></div>
  <p class="ese-demo-takeaway"></p>
</div>

The ellipse shows a two-standard-deviation contour for the inverse-information covariance $\Sigma/n$.

<p class="ese-next"><a href="/teaching/ese-531/efficient-estimators-vector-crlb/">Back to topic notes</a></p>

</div>

<script src="/assets/js/ese531-demos.js" defer></script>
