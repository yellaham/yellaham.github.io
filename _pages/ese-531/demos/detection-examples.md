---
layout: single
title: "Demo: Detection Theory Examples"
permalink: /teaching/ese-531/demos/detection-examples/
author_profile: true
toc: false
toc_label: "Demo"
---

<div class="ese-531" markdown="1">

Switch between two common textbook calculations: a signed mean-shift statistic and an energy statistic for a variance change.

<div class="ese-demo" data-demo="detection-examples">
  <div class="ese-demo-grid">
    <div class="ese-demo-control">
      <label for="dex-mode">Example type</label>
      <select id="dex-mode" data-param="mode">
        <option value="mean">Mean shift</option>
        <option value="variance">Variance change</option>
      </select>
    </div>
    <div class="ese-demo-control">
      <label for="dex-n">Sample size n: <output data-output="n"></output></label>
      <input id="dex-n" data-param="n" type="range" min="2" max="100" value="12">
    </div>
    <div class="ese-demo-control">
      <label for="dex-gamma">Threshold gamma: <output data-output="gamma"></output></label>
      <input id="dex-gamma" data-param="gamma" type="range" min="0" max="20" step="0.1" value="1.8">
    </div>
    <div class="ese-demo-control">
      <label for="dex-mu1">Mean shift mu1: <output data-output="mu1"></output></label>
      <input id="dex-mu1" data-param="mu1" type="range" min="0.1" max="3" step="0.05" value="0.8">
    </div>
    <div class="ese-demo-control">
      <label for="dex-sigma1">Variance-change sigma1: <output data-output="sigma1"></output></label>
      <input id="dex-sigma1" data-param="sigma1" type="range" min="1.05" max="3" step="0.05" value="1.8">
    </div>
  </div>
  <div class="ese-demo-plot"></div>
  <div class="ese-demo-stats"></div>
  <p class="ese-demo-takeaway"></p>
</div>

For the variance-change example, the energy statistic uses the scaled chi-squared distribution: under $H_0$, $\sum_i X_i^2\sim\chi_n^2$, and under the larger-variance alternative, $\sum_i X_i^2/\sigma_1^2\sim\chi_n^2$.

<p class="ese-next"><a href="/teaching/ese-531/detection-examples/">Back to topic notes</a></p>

</div>

<script src="/assets/js/ese531-demos.js" defer></script>
