---
layout: single
title: "Demo: Bayesian Estimation"
permalink: /teaching/ese-531/demos/bayesian-estimation/
author_profile: true
toc: false
toc_label: "Demo"
---

<div class="ese-531" markdown="1">

For Bernoulli data with a beta prior, posterior updating is parameter updating. The widget shows how prior strength and observed counts combine.

## Mathematical setup

Let $X_i\mid\theta\sim\mathrm{Bernoulli}(\theta)$ and let $\theta\sim\mathrm{Beta}(\alpha,\beta)$. If $s=\sum_i x_i$ successes are observed in $n$ trials, then conjugacy gives

$$
\Theta\mid x\sim\mathrm{Beta}(\alpha+s,\beta+n-s).
$$

The posterior mean and, when the posterior mode is interior, the MAP estimate are

$$
E[\Theta\mid x]=\frac{\alpha+s}{\alpha+\beta+n},
\qquad
\hat\theta_{\mathrm{MAP}}=\frac{\alpha+s-1}{\alpha+\beta+n-2}.
$$

The posterior mean behaves like a weighted average of the prior mean $\alpha/(\alpha+\beta)$ and the sample proportion $s/n$.

## What to try

- Keep $s/n$ fixed and increase $\alpha+\beta$. The posterior moves less because the prior has more effective strength.
- Compare a symmetric prior with a skeptical prior such as $\alpha=2,\beta=8$. The same data can lead to different posterior compromise.
- Try boundary data, such as $s=0$ or $s=n$. The page reports boundary MAP behavior rather than using the interior formula blindly.

<div class="ese-demo" data-demo="bayesian-estimation">
  <div class="ese-demo-grid">
    <div class="ese-demo-control">
      <label for="bayes-alpha">Prior alpha: <output data-output="alpha"></output></label>
      <input id="bayes-alpha" data-param="alpha" type="range" min="0.5" max="20" step="0.5" value="2">
    </div>
    <div class="ese-demo-control">
      <label for="bayes-beta">Prior beta: <output data-output="beta"></output></label>
      <input id="bayes-beta" data-param="beta" type="range" min="0.5" max="20" step="0.5" value="2">
    </div>
    <div class="ese-demo-control">
      <label for="bayes-n">Trials n: <output data-output="n"></output></label>
      <input id="bayes-n" data-param="n" type="range" min="1" max="80" value="20">
    </div>
    <div class="ese-demo-control">
      <label for="bayes-successes">Successes s: <output data-output="successes"></output></label>
      <input id="bayes-successes" data-param="successes" type="range" min="0" max="80" value="9">
    </div>
  </div>
  <div class="ese-demo-plot"></div>
  <div class="ese-demo-stats"></div>
  <p class="ese-demo-takeaway"></p>
</div>

When $s>n$, the script caps the effective number of successes at $n$ so the posterior remains meaningful.
When the beta posterior is not maximized in the interior, the MAP statistic is reported as a boundary value rather than by the interior formula.

## Try it in Python

<p class="ese-code-note">This cell reproduces beta-Bernoulli updating and compares prior, likelihood shape, and posterior density.</p>

```python
import numpy as np
import matplotlib.pyplot as plt
from scipy import stats

alpha = 2.0
beta = 2.0
n = 20
s = 9
s = int(np.clip(s, 0, n))

post_alpha = alpha + s
post_beta = beta + n - s
theta = np.linspace(0.001, 0.999, 500)

prior = stats.beta.pdf(theta, alpha, beta)
posterior = stats.beta.pdf(theta, post_alpha, post_beta)
likelihood_shape = stats.beta.pdf(theta, s + 1, n - s + 1)

post_mean = post_alpha / (post_alpha + post_beta)
if post_alpha > 1 and post_beta > 1:
    post_map = (post_alpha - 1) / (post_alpha + post_beta - 2)
    map_summary = f"{post_map:.3f}"
elif post_alpha == 1 and post_beta == 1:
    map_summary = "any theta in [0, 1]"
elif post_alpha < 1 and post_beta < 1:
    map_summary = "both boundaries, 0 and 1"
elif post_alpha <= 1 and post_beta >= 1:
    map_summary = "0 (boundary)"
else:
    map_summary = "1 (boundary)"

plt.plot(theta, prior, label="prior")
plt.plot(theta, likelihood_shape, label="scaled likelihood")
plt.plot(theta, posterior, label="posterior")
plt.axvline(s / n, color="gray", linestyle=":", label="sample proportion")
plt.axvline(post_mean, color="black", linestyle="--", label="posterior mean")
plt.xlabel("theta")
plt.ylabel("density")
plt.legend()
plt.show()

print(f"posterior Beta({post_alpha:.1f}, {post_beta:.1f})")
print(f"posterior mean = {post_mean:.3f}")
print(f"posterior MAP = {map_summary}")
```

<p class="ese-next"><a href="/teaching/ese-531/bayesian-estimation/">Back to topic notes</a></p>

</div>

<script src="/assets/js/ese531-demos.js" defer></script>
