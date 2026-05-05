---
layout: single
title: "Demo: Linear Models and Least Squares"
permalink: /teaching/ese-531/demos/linear-models-least-squares/
author_profile: true
toc: false
toc_label: "Demo"
---

<div class="ese-531" markdown="1">

View ordinary least squares as Euclidean projection onto the one-dimensional column space spanned by $h=(1,\text{slope})^T$, then compare it with the weighted least-squares fit.

<div class="ese-demo" data-demo="linear-models-least-squares">
  <div class="ese-demo-grid">
    <div class="ese-demo-control">
      <label for="lm-y1">Observed coordinate y1: <output data-output="y1"></output></label>
      <input id="lm-y1" data-param="y1" type="range" min="-3" max="3" step="0.1" value="2">
    </div>
    <div class="ese-demo-control">
      <label for="lm-y2">Observed coordinate y2: <output data-output="y2"></output></label>
      <input id="lm-y2" data-param="y2" type="range" min="-3" max="3" step="0.1" value="1">
    </div>
    <div class="ese-demo-control">
      <label for="lm-slope">Design slope: <output data-output="slope"></output></label>
      <input id="lm-slope" data-param="slope" type="range" min="-2" max="2" step="0.05" value="0.6">
    </div>
    <div class="ese-demo-control">
      <label for="lm-w2">GLS weight on row 2: <output data-output="w2"></output></label>
      <input id="lm-w2" data-param="w2" type="range" min="0.2" max="5" step="0.1" value="1">
    </div>
  </div>
  <div class="ese-demo-plot"></div>
  <div class="ese-demo-stats"></div>
  <p class="ese-demo-takeaway"></p>
</div>

For weighted least squares or GLS after whitening, the normal equation becomes $H^T W(y-H\hat\theta)=0$. The unweighted residual dot product need not be zero for the weighted fit.

<p class="ese-next"><a href="/teaching/ese-531/linear-models-least-squares/">Back to topic notes</a></p>

</div>

<script src="/assets/js/ese531-demos.js" defer></script>
