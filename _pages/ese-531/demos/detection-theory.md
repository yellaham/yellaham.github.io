---
layout: single
title: "Demo: Detection Theory"
permalink: /teaching/ese-531/demos/detection-theory/
author_profile: true
toc: false
toc_label: "Demo"
---

<div class="ese-531" markdown="1">

For a Gaussian mean-shift test, decide $H_1$ when the sample mean exceeds threshold $\gamma$. The left panel shows the threshold on the statistic distributions; the right panel shows the ROC operating point.

<div class="ese-demo" data-demo="detection-theory">
  <div class="ese-demo-grid">
    <div class="ese-demo-control">
      <label for="dt-n">Sample size n: <output data-output="n"></output></label>
      <input id="dt-n" data-param="n" type="range" min="1" max="100" value="10">
    </div>
    <div class="ese-demo-control">
      <label for="dt-mu1">Mean under H1: <output data-output="mu1"></output></label>
      <input id="dt-mu1" data-param="mu1" type="range" min="0.1" max="3" step="0.05" value="1">
    </div>
    <div class="ese-demo-control">
      <label for="dt-sigma">Noise sigma: <output data-output="sigma"></output></label>
      <input id="dt-sigma" data-param="sigma" type="range" min="0.3" max="3" step="0.1" value="1">
    </div>
    <div class="ese-demo-control">
      <label for="dt-gamma">Threshold gamma: <output data-output="gamma"></output></label>
      <input id="dt-gamma" data-param="gamma" type="range" min="-1" max="3" step="0.05" value="0.45">
    </div>
  </div>
  <div class="ese-demo-plot"></div>
  <div class="ese-demo-stats"></div>
  <p class="ese-demo-takeaway"></p>
</div>

The operating probabilities are $P_{\mathrm{FA}}=P_0(\bar X>\gamma)$ and $P_D=P_1(\bar X>\gamma)$.

<p class="ese-next"><a href="/teaching/ese-531/detection-theory/">Back to topic notes</a></p>

</div>

<script src="/assets/js/ese531-demos.js" defer></script>
