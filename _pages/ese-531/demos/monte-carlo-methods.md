---
layout: single
title: "Demo: Monte Carlo Methods"
permalink: /teaching/ese-531/demos/monte-carlo-methods/
author_profile: true
toc: false
toc_label: "Demo"
---

<div class="ese-531" markdown="1">

Estimate a normal tail probability by crude Monte Carlo and by importance sampling. This is a compact way to see why proposal choice matters for rare events.

## Mathematical setup

The target probability is

$$
p_\gamma=\Pr(Z>\gamma)=E_f[\mathbf 1\{Z>\gamma\}],
\qquad Z\sim N(0,1).
$$

Crude Monte Carlo uses

$$
\hat p_{\mathrm{crude}}=\frac{1}{M}\sum_{m=1}^M \mathbf 1\{Z_m>\gamma\},
\qquad Z_m\sim f.
$$

Importance sampling draws $Y_m\sim q=N(\delta,1)$ and weights by $w(Y_m)=f(Y_m)/q(Y_m)$:

$$
\hat p_{\mathrm{IS}}=\frac{1}{M}\sum_{m=1}^M \mathbf 1\{Y_m>\gamma\}w(Y_m).
$$

This estimate is unbiased for the displayed setup because both $f$ and $q$ are normalized and known exactly. The effective sample size displayed by the widget is

$$
\mathrm{ESS}=\frac{\left(\sum_m w_m\right)^2}{\sum_m w_m^2},
$$

a diagnostic for weight concentration, not a proof of accuracy.

## What to try

- Set $\gamma$ near 1.5. Crude Monte Carlo usually works because the event is not too rare.
- Move $\gamma$ toward 3 or 4. Crude estimates can become unstable unless $M$ is large.
- Set the proposal shift near the threshold. If the shift is too small, few proposal samples hit the tail; if too large, weights can become unstable.

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
