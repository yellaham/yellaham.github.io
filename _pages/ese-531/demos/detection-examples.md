---
layout: single
title: "Demo: Detection Theory Examples"
permalink: /teaching/ese-531/demos/detection-examples/
author_profile: true
toc: false
toc_label: "Demo"
---

<div class="ese-531" markdown="1">

Switch between two common textbook calculations: a signed mean-shift statistic and an energy statistic for a variance change. The point is to notice that different alternatives call for different sufficient statistics.

## Mathematical setup

Mean-shift example:

$$
H_0:X_i\sim N(0,1),
\qquad
H_1:X_i\sim N(\mu_1,1),
\qquad
T=\bar X.
$$

For the threshold rule $T>\gamma$,

$$
P_{\mathrm{FA}}=1-\Phi(\gamma\sqrt n),
\qquad
P_D=1-\Phi((\gamma-\mu_1)\sqrt n).
$$

Variance-change example:

$$
H_0:X_i\sim N(0,1),
\qquad
H_1:X_i\sim N(0,\sigma_1^2),
\qquad
T=\sum_{i=1}^n X_i^2.
$$

Under $H_0$, $T\sim\chi_n^2$; under $H_1$, $T/\sigma_1^2\sim\chi_n^2$, or equivalently $T\sim\sigma_1^2\chi_n^2$. For the rule $T>\gamma$,

$$
P_{\mathrm{FA}}=\Pr(\chi_n^2>\gamma),
\qquad
P_D=\Pr\left(\chi_n^2>\frac{\gamma}{\sigma_1^2}\right).
$$

The displayed variance-change probabilities use these chi-squared survival functions.

## What to try

- In mean-shift mode, raise $\mu_1$ and see detection improve without changing the false-alarm calculation for a fixed threshold.
- In variance-change mode, raise $\sigma_1$. The energy distribution under $H_1$ shifts right, so large-energy tests become more powerful.
- Compare threshold scales across the two modes. A reasonable threshold for $\bar X$ is not a reasonable threshold for $\sum_i X_i^2$.

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
