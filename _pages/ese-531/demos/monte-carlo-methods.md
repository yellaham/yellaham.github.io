---
layout: single
title: "Demo: Monte Carlo Methods"
permalink: /teaching/ese-531/demos/monte-carlo-methods/
author_profile: true
toc: false
toc_label: "Demo"
---

<div class="ese-531" markdown="1">

Estimate the rare-event probability $P(Z>\gamma)$ for $Z\sim N(0,1)$ by crude Monte Carlo and by importance sampling from $N(\text{shift},1)$.

<div class="ese-demo" data-demo="monte-carlo-methods">
  <div class="ese-demo-grid">
    <div class="ese-demo-control">
      <label for="mc-m">Simulation draws M: <output data-output="m"></output></label>
      <input id="mc-m" data-param="m" type="range" min="100" max="8000" step="100" value="1000">
    </div>
    <div class="ese-demo-control">
      <label for="mc-gamma">Tail threshold gamma: <output data-output="gamma"></output></label>
      <input id="mc-gamma" data-param="gamma" type="range" min="0.5" max="4" step="0.1" value="2.5">
    </div>
    <div class="ese-demo-control">
      <label for="mc-shift">Proposal shift: <output data-output="shift"></output></label>
      <input id="mc-shift" data-param="shift" type="range" min="0" max="4" step="0.1" value="2">
    </div>
    <div class="ese-demo-control">
      <label for="mc-seed">Seed</label>
      <input id="mc-seed" data-param="seed" type="number" value="531">
    </div>
  </div>
  <div class="ese-demo-plot"></div>
  <div class="ese-demo-stats"></div>
  <p class="ese-demo-takeaway"></p>
</div>

The importance estimate uses unnormalized $f/q$ weights and is unbiased here because both the target and proposal densities are known. The effective sample size summarizes weight degeneracy: large weights from a few draws reduce useful information.

<p class="ese-next"><a href="/teaching/ese-531/monte-carlo-methods/">Back to topic notes</a></p>

</div>

<script src="/assets/js/ese531-demos.js" defer></script>
