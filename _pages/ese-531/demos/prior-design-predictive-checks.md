---
layout: single
title: "Demo: Prior Design and Predictive Checks"
permalink: /teaching/ese-531/demos/prior-design-predictive-checks/
author_profile: true
toc: false
toc_label: "Demo"
---

<div class="ese-531" markdown="1">

Before seeing data, a beta prior implies a beta-binomial prior predictive distribution for future successes.

<div class="ese-demo" data-demo="prior-design-predictive-checks">
  <div class="ese-demo-grid">
    <div class="ese-demo-control">
      <label for="prior-alpha">Prior alpha: <output data-output="alpha"></output></label>
      <input id="prior-alpha" data-param="alpha" type="range" min="0.5" max="30" step="0.5" value="2">
    </div>
    <div class="ese-demo-control">
      <label for="prior-beta">Prior beta: <output data-output="beta"></output></label>
      <input id="prior-beta" data-param="beta" type="range" min="0.5" max="30" step="0.5" value="8">
    </div>
    <div class="ese-demo-control">
      <label for="prior-m">Future trials m: <output data-output="m"></output></label>
      <input id="prior-m" data-param="m" type="range" min="1" max="60" value="20">
    </div>
  </div>
  <div class="ese-demo-plot"></div>
  <div class="ese-demo-stats"></div>
  <p class="ese-demo-takeaway"></p>
</div>

Use this as a quick calibration check: do the exact beta-binomial future-count probabilities match what would be plausible before data are collected?

<p class="ese-next"><a href="/teaching/ese-531/prior-design-predictive-checks/">Back to topic notes</a></p>

</div>

<script src="/assets/js/ese531-demos.js" defer></script>
