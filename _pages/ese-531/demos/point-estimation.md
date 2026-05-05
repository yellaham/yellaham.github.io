---
layout: single
title: "Demo: Point Estimation"
permalink: /teaching/ese-531/demos/point-estimation/
author_profile: true
toc: false
toc_label: "Demo"
---

<div class="ese-531" markdown="1">

For samples from $\mathrm{Uniform}(0,\theta)$, compare a moment estimator with a likelihood estimator that is driven by the support constraint.

## Mathematical setup

Let $X_1,\ldots,X_n\sim\mathrm{Uniform}(0,\theta)$ iid. Since $E[X_i]=\theta/2$, the method-of-moments estimator is

$$
\hat\theta_{\mathrm{MOM}}=2\bar X.
$$

The likelihood is

$$
L(\theta;x)=\theta^{-n}\mathbf 1\{\theta\geq x_{(n)}\},
\qquad x_{(n)}=\max_i x_i,
$$

so the maximum likelihood estimator is $\hat\theta_{\mathrm{MLE}}=X_{(n)}$. It is biased downward with $E[X_{(n)}]=n\theta/(n+1)$, while the MOM estimator is unbiased.

## What to try

- Use small $n$ to see the MLE's downward bias clearly. It often has lower spread but tends to sit below the true endpoint.
- Increase $n$ and compare RMSE. Both estimators improve, but they do so for different reasons: averaging versus the maximum moving toward the boundary.
- Change $\theta$ after fixing $n$. The relative behavior is scale-stable, while the absolute RMSE scales with the endpoint.

<div class="ese-demo" data-demo="point-estimation">
  <div class="ese-demo-grid">
    <div class="ese-demo-control">
      <label for="pe-theta">True theta: <output data-output="theta"></output></label>
      <input id="pe-theta" data-param="theta" type="range" min="0.5" max="5" step="0.1" value="2">
    </div>
    <div class="ese-demo-control">
      <label for="pe-n">Sample size n: <output data-output="n"></output></label>
      <input id="pe-n" data-param="n" type="range" min="2" max="80" value="12">
    </div>
    <div class="ese-demo-control">
      <label for="pe-reps">Repeated samples: <output data-output="reps"></output></label>
      <input id="pe-reps" data-param="reps" type="range" min="200" max="3000" step="100" value="1000">
    </div>
    <div class="ese-demo-control">
      <label for="pe-seed">Seed</label>
      <input id="pe-seed" data-param="seed" type="number" value="531">
    </div>
  </div>
  <div class="ese-demo-plot"></div>
  <div class="ese-demo-stats"></div>
  <p class="ese-demo-takeaway"></p>
</div>

The MLE uses the support constraint: values of $\theta$ below the sample maximum have likelihood zero.

## Try it in Python

<p class="ese-code-note">This simulation compares the method-of-moments estimator and the support-constrained MLE across many samples.</p>

```python
import numpy as np
import matplotlib.pyplot as plt

theta = 2.0
n = 12
reps = 1000
rng = np.random.default_rng(531)

x = rng.uniform(0, theta, size=(reps, n))
theta_mom = 2 * x.mean(axis=1)
theta_mle = x.max(axis=1)

def summarize(name, estimates):
    bias = estimates.mean() - theta
    rmse = np.sqrt(np.mean((estimates - theta)**2))
    print(f"{name:4s} mean={estimates.mean():.3f}, bias={bias:.3f}, RMSE={rmse:.3f}")

summarize("MOM", theta_mom)
summarize("MLE", theta_mle)
print(f"Theory E[MLE] = {n * theta / (n + 1):.3f}")

plt.hist(theta_mom, bins=35, alpha=0.45, density=True, label="MOM: 2 xbar")
plt.hist(theta_mle, bins=35, alpha=0.45, density=True, label="MLE: max")
plt.axvline(theta, color="black", linestyle="--", label="true theta")
plt.xlabel("estimate")
plt.ylabel("density")
plt.legend()
plt.show()
```

<p class="ese-next"><a href="/teaching/ese-531/point-estimation/">Back to topic notes</a></p>

</div>

<script src="/assets/js/ese531-demos.js" defer></script>
