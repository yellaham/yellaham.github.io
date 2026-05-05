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

The importance estimate averages $\mathbf 1\{Y>\gamma\}f(Y)/q(Y)$ over the proposal draws, dividing by $M$ rather than by the sum of weights. That non-self-normalized form is unbiased here because both the target and proposal densities are known. The effective sample size summarizes weight degeneracy: large weights from a few draws reduce useful information.

## Try it in Python

<p class="ese-code-note">This cell estimates the same normal tail probability with crude Monte Carlo and shifted-normal importance sampling.</p>

```python
import numpy as np
from scipy import stats

M = 1000
gamma = 2.5
shift = 2.0
rng = np.random.default_rng(531)

z = rng.normal(0, 1, size=M)
crude = np.mean(z > gamma)

y = rng.normal(shift, 1, size=M)
log_weights = stats.norm.logpdf(y, 0, 1) - stats.norm.logpdf(y, shift, 1)
weights = np.exp(log_weights)
importance = np.mean((y > gamma) * weights)
ess = weights.sum()**2 / np.sum(weights**2)

truth = stats.norm.sf(gamma)
crude_se = np.sqrt(crude * (1 - crude) / M)
is_se = np.std((y > gamma) * weights, ddof=1) / np.sqrt(M)

print(f"true probability:       {truth:.6f}")
print(f"crude estimate:        {crude:.6f}  SE about {crude_se:.6f}")
print(f"importance estimate:   {importance:.6f}  SE about {is_se:.6f}")
print(f"effective sample size: {ess:.1f} out of {M}")
```

<p class="ese-next"><a href="/teaching/ese-531/monte-carlo-methods/">Back to topic notes</a></p>

</div>

<script src="/assets/js/ese531-demos.js" defer></script>
