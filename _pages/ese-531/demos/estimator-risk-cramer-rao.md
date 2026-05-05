---
layout: single
title: "Demo: Estimator Risk and Scalar Cramer-Rao Bounds"
permalink: /teaching/ese-531/demos/estimator-risk-cramer-rao/
author_profile: true
toc: false
toc_label: "Demo"
---

<div class="ese-531" markdown="1">

Consider estimating a normal mean with known variance. The shrinkage rule $\hat\mu=m_0+a(\bar X-m_0)$ trades bias against variance.

<div class="ese-demo" data-demo="estimator-risk-cramer-rao">
  <div class="ese-demo-grid">
    <div class="ese-demo-control">
      <label for="risk-a">Shrinkage a: <output data-output="a"></output></label>
      <input id="risk-a" data-param="a" type="range" min="0" max="1.4" step="0.01" value="0.75">
    </div>
    <div class="ese-demo-control">
      <label for="risk-mu">True mu: <output data-output="mu"></output></label>
      <input id="risk-mu" data-param="mu" type="range" min="-2" max="2" step="0.05" value="0.4">
    </div>
    <div class="ese-demo-control">
      <label for="risk-m0">Shrinkage target m0: <output data-output="m0"></output></label>
      <input id="risk-m0" data-param="m0" type="range" min="-2" max="2" step="0.05" value="0">
    </div>
    <div class="ese-demo-control">
      <label for="risk-n">Sample size n: <output data-output="n"></output></label>
      <input id="risk-n" data-param="n" type="range" min="2" max="100" value="10">
    </div>
  </div>
  <div class="ese-demo-plot"></div>
  <div class="ese-demo-stats"></div>
  <p class="ese-demo-takeaway"></p>
</div>

For unbiased estimators of $\mu$, $\operatorname{Var}(\hat\mu)\geq \sigma^2/n$. Biased estimators are judged by full MSE.

<p class="ese-next"><a href="/teaching/ese-531/estimator-risk-cramer-rao/">Back to topic notes</a></p>

</div>

<script src="/assets/js/ese531-demos.js" defer></script>
