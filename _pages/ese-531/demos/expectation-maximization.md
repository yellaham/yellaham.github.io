---
layout: single
title: "Demo: Expectation-Maximization"
permalink: /teaching/ese-531/demos/expectation-maximization/
author_profile: true
toc: false
toc_label: "Demo"
---

<div class="ese-531" markdown="1">

This demo fits a two-component Gaussian mixture with fixed component variance. Points near responsibility 1 are assigned mostly to component 1; points near 0 are assigned mostly to component 2.

<div class="ese-demo" data-demo="expectation-maximization">
  <div class="ese-demo-grid">
    <div class="ese-demo-control">
      <label for="em-sep">True mean separation: <output data-output="sep"></output></label>
      <input id="em-sep" data-param="sep" type="range" min="0.4" max="5" step="0.1" value="2.4">
    </div>
    <div class="ese-demo-control">
      <label for="em-n">Observations: <output data-output="n"></output></label>
      <input id="em-n" data-param="n" type="range" min="20" max="180" value="80">
    </div>
    <div class="ese-demo-control">
      <label for="em-iter">EM iterations: <output data-output="iter"></output></label>
      <input id="em-iter" data-param="iter" type="range" min="0" max="20" value="8">
    </div>
    <div class="ese-demo-control">
      <label for="em-seed">Seed</label>
      <input id="em-seed" data-param="seed" type="number" value="531">
    </div>
  </div>
  <div class="ese-demo-plot"></div>
  <div class="ese-demo-stats"></div>
  <p class="ese-demo-takeaway"></p>
</div>

EM alternates responsibilities $P(Z_i=1\mid X_i,\theta^{(t)})$ with weighted maximum-likelihood updates. The observed-data likelihood should be nondecreasing, up to numerical rounding.

<p class="ese-next"><a href="/teaching/ese-531/expectation-maximization/">Back to topic notes</a></p>

</div>

<script src="/assets/js/ese531-demos.js" defer></script>
