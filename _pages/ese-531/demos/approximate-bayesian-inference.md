---
layout: single
title: "Demo: Approximate Bayesian Inference"
permalink: /teaching/ese-531/demos/approximate-bayesian-inference/
author_profile: true
toc: false
toc_label: "Demo"
---

<div class="ese-531" markdown="1">

Compare an exact grid-evaluated beta posterior with a local normal approximation. The goal is to see both when Laplace is useful and when its assumptions are fragile.

## Mathematical setup

For beta-Bernoulli updating, the posterior density is proportional to

$$
p(\theta\mid x)\propto
\theta^{\alpha+s-1}(1-\theta)^{\beta+n-s-1},
\qquad 0<\theta<1.
$$

Laplace approximation expands the log posterior around an interior mode $\hat\theta$ where the negative second derivative is positive:

$$
\log p(\theta\mid x)
\approx
\log p(\hat\theta\mid x)
-\frac{1}{2}J(\hat\theta)(\theta-\hat\theta)^2,
$$

where $J(\hat\theta)=-\ell''(\hat\theta)>0$. The resulting approximation is the normal density $N(\hat\theta,J(\hat\theta)^{-1})$. For this beta posterior with $\alpha+s>1$ and $\beta+n-s>1$,

$$
\hat\theta=\frac{\alpha+s-1}{\alpha+\beta+n-2}.
$$

The red curve is a Laplace approximation only when this mode is interior. Otherwise the page labels it as a moment-matched normal fallback, which is a separate approximation and not an ordinary boundary-corrected Laplace approximation.

## What to try

- Use moderate counts away from 0 and $n$. The Laplace curve should track the grid posterior well near the mode.
- Try $s=0$ or $s=n$ with weak priors. The boundary behavior makes the ordinary interior Laplace approximation invalid.
- Increase $n$. The posterior becomes more concentrated, and the local quadratic approximation usually improves when the mode remains interior.

<div class="ese-demo" data-demo="approximate-bayesian-inference">
  <div class="ese-demo-grid">
    <div class="ese-demo-control">
      <label for="approx-alpha">Prior alpha: <output data-output="alpha"></output></label>
      <input id="approx-alpha" data-param="alpha" type="range" min="0.5" max="12" step="0.5" value="1.5">
    </div>
    <div class="ese-demo-control">
      <label for="approx-beta">Prior beta: <output data-output="beta"></output></label>
      <input id="approx-beta" data-param="beta" type="range" min="0.5" max="12" step="0.5" value="1.5">
    </div>
    <div class="ese-demo-control">
      <label for="approx-n">Trials n: <output data-output="n"></output></label>
      <input id="approx-n" data-param="n" type="range" min="2" max="80" value="12">
    </div>
    <div class="ese-demo-control">
      <label for="approx-successes">Successes s: <output data-output="successes"></output></label>
      <input id="approx-successes" data-param="successes" type="range" min="0" max="80" value="2">
    </div>
  </div>
  <div class="ese-demo-plot"></div>
  <div class="ese-demo-stats"></div>
  <p class="ese-demo-takeaway"></p>
</div>

The Laplace curve uses local second-order information at an interior mode. If the posterior mode moves to 0 or 1, the demo labels the red curve as a moment-matched normal fallback rather than a valid interior Laplace approximation.

## Try it in Python

<p class="ese-code-note">This cell compares the exact beta posterior density with an interior Laplace normal approximation when the mode is away from the boundary.</p>

```python
import numpy as np
import matplotlib.pyplot as plt
from scipy import stats

alpha = 1.5
beta = 1.5
n = 12
s = 2
s = int(np.clip(s, 0, n))

a_post = alpha + s
b_post = beta + n - s
theta = np.linspace(0.001, 0.999, 600)
exact = stats.beta.pdf(theta, a_post, b_post)

if a_post > 1 and b_post > 1:
    mode = (a_post - 1) / (a_post + b_post - 2)
    curvature = (a_post - 1) / mode**2 + (b_post - 1) / (1 - mode)**2
    laplace_sd = 1 / np.sqrt(curvature)
    approx = stats.norm.pdf(theta, mode, laplace_sd)
    label = "Laplace normal"
else:
    mode = np.nan
    laplace_sd = np.sqrt(a_post * b_post / ((a_post + b_post)**2 * (a_post + b_post + 1)))
    approx = stats.norm.pdf(theta, a_post / (a_post + b_post), laplace_sd)
    label = "moment-matched fallback"

plt.plot(theta, exact, label=f"exact Beta({a_post:.1f}, {b_post:.1f})")
plt.plot(theta, approx, "--", label=label)
if np.isfinite(mode):
    plt.axvline(mode, color="black", linestyle=":", label="posterior mode")
plt.xlabel("theta")
plt.ylabel("density")
plt.legend()
plt.show()

print(f"posterior mean = {a_post / (a_post + b_post):.3f}")
print(f"mode used for Laplace = {mode}")
print(f"normal approximation sd = {laplace_sd:.3f}")
```

<p class="ese-next"><a href="/teaching/ese-531/approximate-bayesian-inference/">Back to topic notes</a></p>

</div>

<script src="/assets/js/ese531-demos.js" defer></script>
