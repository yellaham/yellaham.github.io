---
layout: single
title: "Demo: Random Samples and Sample Statistics"
permalink: /teaching/ese-531/demos/random-samples/
author_profile: true
toc: false
toc_label: "Demo"
---

<div class="ese-531" markdown="1">

This demo repeats the same sampling experiment many times. Use it to connect iid sampling assumptions with the random behavior of familiar sample statistics.

## Mathematical setup

Let $X_1,\ldots,X_n$ be iid observations from a population with mean $\mu$ and variance $\sigma^2<\infty$. The main statistics are

$$
\bar X_n=\frac{1}{n}\sum_{i=1}^n X_i,
\qquad
S_n^2=\frac{1}{n-1}\sum_{i=1}^n(X_i-\bar X_n)^2.
$$

Then $E[\bar X_n]=\mu$, $\operatorname{Var}(\bar X_n)=\sigma^2/n$, and $E[S_n^2]=\sigma^2$ under iid sampling. The central limit theorem says that, for many population models,

$$
\frac{\sqrt n(\bar X_n-\mu)}{\sigma}\Rightarrow N(0,1).
$$

For the heavy-tailed $t_3$ option, the variance is finite but large, so the normal approximation may need more samples to look convincing.

## What to try

- Compare Normal, centered Exponential, Bernoulli, and $t_3$ populations at the same $n$. The sample mean centers correctly in all four cases, but the histogram shape changes.
- Increase $n$ while keeping the number of repeated samples fixed. The width of the sampling distribution should shrink at roughly the $1/\sqrt n$ rate.
- Increase the repeated samples slider when the histogram looks noisy. More repetitions improve the Monte Carlo picture, not the theoretical variance of one sample mean.

<div class="ese-demo" data-demo="random-samples">
  <div class="ese-demo-grid">
    <div class="ese-demo-control">
      <label for="rs-dist">Population model</label>
      <select id="rs-dist" data-param="dist">
        <option value="normal">Normal(0, 1)</option>
        <option value="exponential">Exponential(1), centered</option>
        <option value="bernoulli">Bernoulli(0.35)</option>
        <option value="t3">t with 3 df</option>
      </select>
    </div>
    <div class="ese-demo-control">
      <label for="rs-n">Sample size n: <output data-output="n"></output></label>
      <input id="rs-n" data-param="n" type="range" min="2" max="120" value="20">
    </div>
    <div class="ese-demo-control">
      <label for="rs-reps">Repeated samples: <output data-output="reps"></output></label>
      <input id="rs-reps" data-param="reps" type="range" min="100" max="2500" step="100" value="800">
    </div>
    <div class="ese-demo-control">
      <label for="rs-seed">Seed</label>
      <input id="rs-seed" data-param="seed" type="number" value="531">
    </div>
  </div>
  <div class="ese-demo-plot"></div>
  <div class="ese-demo-stats"></div>
  <p class="ese-demo-takeaway"></p>
</div>

The plot is simulation-based. Changing the seed gives a new set of repeated samples with the same population model and sample size.

## Try it in Python

<p class="ese-code-note">This notebook cell reproduces the repeated-sampling histogram and overlays the CLT approximation for the selected population.</p>

```python
import numpy as np
import matplotlib.pyplot as plt
from scipy import stats

dist = "t3"       # "normal", "exponential", "bernoulli", or "t3"
n = 20
reps = 800
rng = np.random.default_rng(531)

if dist == "normal":
    x = rng.normal(0, 1, size=(reps, n))
    mu, sigma = 0.0, 1.0
elif dist == "exponential":
    x = rng.exponential(1, size=(reps, n)) - 1
    mu, sigma = 0.0, 1.0
elif dist == "bernoulli":
    p = 0.35
    x = rng.binomial(1, p, size=(reps, n))
    mu, sigma = p, np.sqrt(p * (1 - p))
elif dist == "t3":
    x = rng.standard_t(df=3, size=(reps, n))
    mu, sigma = 0.0, np.sqrt(3.0)

xbar = x.mean(axis=1)
s2 = x.var(axis=1, ddof=1)

grid = np.linspace(xbar.min(), xbar.max(), 300)
plt.hist(xbar, bins=35, density=True, alpha=0.45, label="simulated means")
plt.plot(grid, stats.norm.pdf(grid, mu, sigma / np.sqrt(n)), label="CLT normal")
plt.axvline(mu, color="black", linestyle="--", label="population mean")
plt.xlabel("sample mean")
plt.ylabel("density")
plt.legend()
plt.show()

print(f"mean of xbar: {xbar.mean():.3f}")
print(f"Monte Carlo Var(xbar): {xbar.var(ddof=1):.3f}")
print(f"theory Var(xbar): {sigma**2 / n:.3f}")
print(f"mean sample variance: {s2.mean():.3f}")
```

<p class="ese-next"><a href="/teaching/ese-531/random-samples/">Back to topic notes</a></p>

</div>

<script src="/assets/js/ese531-demos.js" defer></script>
