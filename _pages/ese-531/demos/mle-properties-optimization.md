---
layout: single
title: "Demo: MLE Properties and Numerical Optimization"
permalink: /teaching/ese-531/demos/mle-properties-optimization/
author_profile: true
toc: false
toc_label: "Demo"
---

<div class="ese-531" markdown="1">

For a normal mean with known variance, inspect the likelihood curvature that connects optimization, Fisher information, and standard error.

## Mathematical setup

Let $X_i\sim N(\theta,\sigma^2)$ iid with known $\sigma$. Up to constants that do not depend on $\theta$,

$$
\ell(\theta)=-\frac{1}{2\sigma^2}\sum_{i=1}^n(X_i-\theta)^2.
$$

The score equation gives $\hat\theta_{\mathrm{MLE}}=\bar X$. The observed curvature is exact:

$$
-\ell''(\theta)=\frac{n}{\sigma^2}=I_n(\theta),
\qquad
\operatorname{SE}(\hat\theta)=\frac{1}{\sqrt{I_n(\theta)}}=\frac{\sigma}{\sqrt n}.
$$

In this model the asymptotic normal approximation is also the exact sampling distribution of $\bar X$.

## What to try

- Increase $n$ while holding $\sigma$ fixed. The likelihood curve becomes sharper because information grows linearly in $n$.
- Increase $\sigma$. The same observed mean becomes less precisely estimated because the curvature decreases.
- Move $\bar x$. The maximum shifts location, but the curvature stays controlled by $n/\sigma^2$.

<div class="ese-demo" data-demo="mle-properties-optimization">
  <div class="ese-demo-grid">
    <div class="ese-demo-control">
      <label for="mle-n">Sample size n: <output data-output="n"></output></label>
      <input id="mle-n" data-param="n" type="range" min="2" max="150" value="25">
    </div>
    <div class="ese-demo-control">
      <label for="mle-sigma">Known sigma: <output data-output="sigma"></output></label>
      <input id="mle-sigma" data-param="sigma" type="range" min="0.4" max="3" step="0.1" value="1">
    </div>
    <div class="ese-demo-control">
      <label for="mle-xbar">Observed sample mean: <output data-output="xbar"></output></label>
      <input id="mle-xbar" data-param="xbar" type="range" min="-2" max="2" step="0.05" value="0.4">
    </div>
  </div>
  <div class="ese-demo-plot"></div>
  <div class="ese-demo-stats"></div>
  <p class="ese-demo-takeaway"></p>
</div>

Here $I_n(\theta)=n/\sigma^2$, so $1/\sqrt{I_n(\theta)}=\sigma/\sqrt n$. In this normal mean model that is the exact standard error of $\bar X$, not only an asymptotic approximation.

## Try it in Python

<p class="ese-code-note">This cell draws the normalized log likelihood curve and prints the Fisher-information standard error.</p>

```python
import numpy as np
import matplotlib.pyplot as plt

n = 25
sigma = 1.0
xbar = 0.4

theta = np.linspace(xbar - 1.5, xbar + 1.5, 400)
loglik = -0.5 * n * (theta - xbar)**2 / sigma**2
loglik -= loglik.max()

information = n / sigma**2
se = 1 / np.sqrt(information)

plt.plot(theta, loglik, label="log likelihood minus max")
plt.axvline(xbar, color="black", linestyle="--", label="MLE")
plt.axvspan(xbar - 1.96 * se, xbar + 1.96 * se, alpha=0.15, label="approx 95% interval")
plt.xlabel("theta")
plt.ylabel("relative log likelihood")
plt.legend()
plt.show()

print(f"MLE = xbar = {xbar:.3f}")
print(f"observed Fisher information = {information:.3f}")
print(f"standard error = {se:.3f}")
```

<p class="ese-next"><a href="/teaching/ese-531/mle-properties-optimization/">Back to topic notes</a></p>

</div>

<script src="/assets/js/ese531-demos.js" defer></script>
