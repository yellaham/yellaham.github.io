---
layout: single
title: "Demo: Prior Design and Predictive Checks"
permalink: /teaching/ese-531/demos/prior-design-predictive-checks/
author_profile: true
toc: false
toc_label: "Demo"
---

<div class="ese-531" markdown="1">

Before seeing data, a beta prior implies a beta-binomial distribution for future counts. Use this page as a prior calibration check before committing to an analysis.

## Mathematical setup

Let $\Theta\sim\mathrm{Beta}(\alpha,\beta)$ and, conditional on $\Theta$, let $Y\mid\Theta\sim\mathrm{Binomial}(m,\Theta)$ for $m$ future trials. Integrating over the prior gives the beta-binomial prior predictive distribution:

$$
\Pr(Y=k)=
\binom{m}{k}
\frac{B(k+\alpha,m-k+\beta)}{B(\alpha,\beta)},
\qquad k=0,\ldots,m.
$$

Its mean is $m\alpha/(\alpha+\beta)$. At a fixed prior mean, increasing $\alpha+\beta$ makes the prior for $\Theta$ more concentrated, which usually makes the predictive count distribution less overdispersed.

## What to try

- Hold the prior mean near 0.2 and compare $\mathrm{Beta}(2,8)$ with a stronger prior such as $\mathrm{Beta}(8,32)$.
- Increase $m$. The predictive distribution spreads over more possible counts, but its center stays tied to the prior mean.
- Check whether extreme counts, such as no successes, look plausible before data are collected.

<div class="ese-demo" data-demo="prior-design-predictive-checks">
  <div class="ese-demo-grid">
    <div class="ese-demo-control">
      <label for="prior-alpha">Prior alpha: <output data-output="alpha"></output></label>
      <input id="prior-alpha" data-param="alpha" type="range" min="0.5" max="30" step="0.5" value="2">
    </div>
    <div class="ese-demo-control">
      <label for="prior-beta">Prior beta: <output data-output="beta"></output></label>
      <input id="prior-beta" data-param="beta" type="range" min="0.5" max="30" step="0.5" value="8">
    </div>
    <div class="ese-demo-control">
      <label for="prior-m">Future trials m: <output data-output="m"></output></label>
      <input id="prior-m" data-param="m" type="range" min="1" max="60" value="20">
    </div>
  </div>
  <div class="ese-demo-plot"></div>
  <div class="ese-demo-stats"></div>
  <p class="ese-demo-takeaway"></p>
</div>

Use this as a quick calibration check: do the exact beta-binomial future-count probabilities match what would be plausible before data are collected?

## Try it in Python

<p class="ese-code-note">This cell computes the exact beta-binomial prior predictive distribution for future success counts.</p>

```python
import numpy as np
import matplotlib.pyplot as plt
from scipy import stats

alpha = 2.0
beta = 8.0
m = 20

k = np.arange(m + 1)
pmf = stats.betabinom.pmf(k, m, alpha, beta)
prior_mean = alpha / (alpha + beta)
predictive_mean = m * prior_mean

plt.bar(k, pmf)
plt.axvline(predictive_mean, color="black", linestyle="--", label="predictive mean")
plt.xlabel("future successes")
plt.ylabel("prior predictive probability")
plt.legend()
plt.show()

print(f"prior mean for theta = {prior_mean:.3f}")
print(f"predictive mean count = {predictive_mean:.2f}")
print(f"P(Y = 0) = {pmf[0]:.3f}")
print(f"P(Y >= 8) = {stats.betabinom.sf(7, m, alpha, beta):.3f}")
```

<p class="ese-next"><a href="/teaching/ese-531/prior-design-predictive-checks/">Back to topic notes</a></p>

</div>

<script src="/assets/js/ese531-demos.js" defer></script>
