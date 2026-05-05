---
layout: single
title: "Demo: Expectation-Maximization"
permalink: /teaching/ese-531/demos/expectation-maximization/
author_profile: true
toc: false
toc_label: "Demo"
---

<div class="ese-531" markdown="1">

This demo fits a two-component Gaussian mixture with fixed component variance. It is meant to make the hidden-label calculation visible rather than to be a full clustering package.

## Mathematical setup

Let $Z_i\in\{1,2\}$ be an unobserved component label and

$$
X_i\mid Z_i=1\sim N(\mu_1,1),
\qquad
X_i\mid Z_i=2\sim N(\mu_2,1),
\qquad
\Pr(Z_i=1)=\pi.
$$

For current parameters $\theta^{(t)}=(\pi^{(t)},\mu_1^{(t)},\mu_2^{(t)})$, the E-step computes responsibilities

$$
r_i^{(t)}
=
\Pr(Z_i=1\mid X_i,\theta^{(t)})
=
\frac{\pi^{(t)}\phi(X_i;\mu_1^{(t)},1)}
{\pi^{(t)}\phi(X_i;\mu_1^{(t)},1)+(1-\pi^{(t)})\phi(X_i;\mu_2^{(t)},1)}.
$$

The M-step updates $\pi$, $\mu_1$, and $\mu_2$ by weighted averages. The observed-data log likelihood should not decrease, apart from numerical rounding.

## What to try

- Start with well-separated components. Responsibilities should be close to 0 or 1 for most observations after a few iterations.
- Reduce the true separation. The soft assignments become less certain, and the fitted means can move more slowly.
- Change the seed. EM depends on the sample and can also be sensitive to initialization in more general mixture problems.

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
