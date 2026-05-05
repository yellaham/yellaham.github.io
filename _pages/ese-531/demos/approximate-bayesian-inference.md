---
layout: single
title: "Demo: Approximate Bayesian Inference"
permalink: /teaching/ese-531/demos/approximate-bayesian-inference/
author_profile: true
toc: false
toc_label: "Demo"
---

<div class="ese-531" markdown="1">

Compare a grid-evaluated beta posterior with an interior Laplace approximation when the posterior mode is away from the boundary.

<div class="ese-demo" data-demo="approximate-bayesian-inference">
  <div class="ese-demo-grid">
    <div class="ese-demo-control">
      <label for="approx-alpha">Prior alpha: <output data-output="alpha"></output></label>
      <input id="approx-alpha" data-param="alpha" type="range" min="0.5" max="12" step="0.5" value="1.5">
    </div>
    <div class="ese-demo-control">
      <label for="approx-beta">Prior beta: <output data-output="beta"></output></label>
      <input id="approx-beta" data-param="beta" type="range" min="0.5" max="12" step="0.5" value="1.5">
    </div>
    <div class="ese-demo-control">
      <label for="approx-n">Trials n: <output data-output="n"></output></label>
      <input id="approx-n" data-param="n" type="range" min="2" max="80" value="12">
    </div>
    <div class="ese-demo-control">
      <label for="approx-successes">Successes s: <output data-output="successes"></output></label>
      <input id="approx-successes" data-param="successes" type="range" min="0" max="80" value="2">
    </div>
  </div>
  <div class="ese-demo-plot"></div>
  <div class="ese-demo-stats"></div>
  <p class="ese-demo-takeaway"></p>
</div>

The Laplace curve uses local second-order information at an interior mode. If the posterior mode moves to 0 or 1, the demo labels the red curve as a moment-matched normal fallback rather than a valid interior Laplace approximation.

<p class="ese-next"><a href="/teaching/ese-531/approximate-bayesian-inference/">Back to topic notes</a></p>

</div>

<script src="/assets/js/ese531-demos.js" defer></script>
