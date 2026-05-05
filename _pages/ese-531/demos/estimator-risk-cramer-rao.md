---
layout: single
title: "Demo: Estimator Risk and Scalar Cramer-Rao Bounds"
permalink: /teaching/ese-531/demos/estimator-risk-cramer-rao/
author_profile: true
toc: false
toc_label: "Demo"
---

<div class="ese-531" markdown="1">

Consider estimating a normal mean with known variance. The shrinkage rule lets you see why a biased estimator can have attractive MSE while still not contradicting the scalar CRLB.

## Mathematical setup

Let $X_i\sim N(\mu,\sigma^2)$ iid with known $\sigma=1$ in the widget. The shrinkage estimator is

$$
\hat\mu_a=m_0+a(\bar X-m_0).
$$

At a fixed true value $\mu$,

$$
\operatorname{Bias}_\mu(\hat\mu_a)=(a-1)(\mu-m_0),
\qquad
\operatorname{Var}_\mu(\hat\mu_a)=\frac{a^2\sigma^2}{n},
$$

so the pointwise risk under squared error is

$$
R(\mu,\hat\mu_a)=E_\mu[(\hat\mu_a-\mu)^2]
=(a-1)^2(\mu-m_0)^2+\frac{a^2\sigma^2}{n}.
$$

For unbiased estimators of $\mu$, the scalar Cramer-Rao bound gives $\operatorname{Var}(\hat\mu)\geq\sigma^2/n$. The biased shrinkage curve is compared by full MSE, not variance alone.

## What to try

- Set $m_0$ close to the true $\mu$. Strong shrinkage can reduce MSE because the bias penalty is small.
- Move $\mu$ far from $m_0$. The same shrinkage can become worse than the sample mean because squared bias dominates.
- Increase $n$. The CRLB drops, and the variance benefit of shrinkage becomes less dramatic.

<div class="ese-demo" data-demo="estimator-risk-cramer-rao">
  <div class="ese-demo-grid">
    <div class="ese-demo-control">
      <label for="risk-a">Shrinkage a: <output data-output="a"></output></label>
      <input id="risk-a" data-param="a" type="range" min="0" max="1.4" step="0.01" value="0.75">
    </div>
    <div class="ese-demo-control">
      <label for="risk-mu">True mu: <output data-output="mu"></output></label>
      <input id="risk-mu" data-param="mu" type="range" min="-2" max="2" step="0.05" value="0.4">
    </div>
    <div class="ese-demo-control">
      <label for="risk-m0">Shrinkage target m0: <output data-output="m0"></output></label>
      <input id="risk-m0" data-param="m0" type="range" min="-2" max="2" step="0.05" value="0">
    </div>
    <div class="ese-demo-control">
      <label for="risk-n">Sample size n: <output data-output="n"></output></label>
      <input id="risk-n" data-param="n" type="range" min="2" max="100" value="10">
    </div>
  </div>
  <div class="ese-demo-plot"></div>
  <div class="ese-demo-stats"></div>
  <p class="ese-demo-takeaway"></p>
</div>

For unbiased estimators of $\mu$, $\operatorname{Var}(\hat\mu)\geq \sigma^2/n$. Biased estimators are judged by full MSE.

## Try it in Python

<p class="ese-code-note">This code plots the pointwise MSE as the shrinkage factor varies and marks the current widget setting.</p>

```python
import numpy as np
import matplotlib.pyplot as plt

a = 0.75
mu = 0.4
m0 = 0.0
n = 10
sigma = 1.0

a_grid = np.linspace(0, 1.4, 300)
risk_shrink = (a_grid - 1)**2 * (mu - m0)**2 + a_grid**2 * sigma**2 / n
risk_xbar = sigma**2 / n * np.ones_like(a_grid)
crlb_unbiased = sigma**2 / n

current_risk = (a - 1)**2 * (mu - m0)**2 + a**2 * sigma**2 / n
current_bias = (a - 1) * (mu - m0)
current_variance = a**2 * sigma**2 / n

plt.plot(a_grid, risk_shrink, label="shrinkage MSE")
plt.plot(a_grid, risk_xbar, "--", label="sample mean MSE")
plt.axvline(a, color="black", linestyle=":", label="current a")
plt.axhline(crlb_unbiased, color="gray", linestyle="--", label="unbiased CRLB")
plt.xlabel("shrinkage factor a")
plt.ylabel("MSE")
plt.legend()
plt.show()

print(f"bias at current mu: {current_bias:.3f}")
print(f"variance at current a: {current_variance:.3f}")
print(f"shrinkage MSE at current mu: {current_risk:.3f}")
print(f"sample mean MSE and unbiased CRLB: {crlb_unbiased:.3f}")
```

<p class="ese-next"><a href="/teaching/ese-531/estimator-risk-cramer-rao/">Back to topic notes</a></p>

</div>

<script src="/assets/js/ese531-demos.js" defer></script>
