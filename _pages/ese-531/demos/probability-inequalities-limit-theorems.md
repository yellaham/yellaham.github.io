---
layout: single
title: "Demo: Probability Inequalities and Limit Theorems"
permalink: /teaching/ese-531/demos/probability-inequalities-limit-theorems/
author_profile: true
toc: false
toc_label: "Demo"
---

<div class="ese-531" markdown="1">

For Bernoulli samples, compare the exact binomial tail with several lecture bounds and one normal approximation.

## Mathematical setup

Let $X_i\sim\mathrm{Bernoulli}(p)$ iid and $\bar X_n=n^{-1}\sum_i X_i$. The demo studies the two-sided deviation event

$$
\lvert \bar X_n-p\rvert \geq \epsilon.
$$

The exact probability is computed from $K=\sum_i X_i\sim\mathrm{Binomial}(n,p)$. Chebyshev gives

$$
\Pr(\lvert \bar X_n-p\rvert\geq \epsilon)\leq \frac{p(1-p)}{n\epsilon^2}.
$$

The Markov bar uses the two one-sided bounds

$$
\Pr(\bar X_n\geq p+\epsilon)\leq \frac{p}{p+\epsilon},
\qquad
\Pr(\bar X_n\leq p-\epsilon)\leq \frac{1-p}{1-p+\epsilon},
$$

summed as a union bound when the corresponding events are possible. The Chernoff/KL form uses

$$
\Pr(\bar X_n\geq p+\epsilon)\leq e^{-nD(p+\epsilon\,\Vert\,p)},
\qquad
\Pr(\bar X_n\leq p-\epsilon)\leq e^{-nD(p-\epsilon\,\Vert\,p)},
$$

where

$$
D(q\,\Vert\,p)=q\log\frac{q}{p}+(1-q)\log\frac{1-q}{1-p}.
$$

These KL terms are used when the shifted probabilities stay in $[0,1]$ and are then summed as a union bound for the two-sided event. Hoeffding uses $2e^{-2n\epsilon^2}$. The CLT bar is a continuity-corrected normal approximation, not an upper bound.

## What to try

- Start with a moderate deviation, then raise $\epsilon$. The exact tail should fall quickly, and the exponential bounds usually react faster than Chebyshev.
- Move $p$ near 0.05 or 0.95. Notice where symmetric normal approximations become less reliable for small or moderate $n$.
- Increase $n$ and watch the finite-sample upper bounds tighten. Markov remains intentionally crude because it uses very little structure.

<div class="ese-demo" data-demo="probability-inequalities-limit-theorems">
  <div class="ese-demo-grid">
    <div class="ese-demo-control">
      <label for="ineq-p">Success probability p: <output data-output="p"></output></label>
      <input id="ineq-p" data-param="p" type="range" min="0.05" max="0.95" step="0.01" value="0.35">
    </div>
    <div class="ese-demo-control">
      <label for="ineq-n">Sample size n: <output data-output="n"></output></label>
      <input id="ineq-n" data-param="n" type="range" min="5" max="200" value="40">
    </div>
    <div class="ese-demo-control">
      <label for="ineq-eps">Deviation epsilon: <output data-output="eps"></output></label>
      <input id="ineq-eps" data-param="eps" type="range" min="0.03" max="0.4" step="0.01" value="0.12">
    </div>
  </div>
  <div class="ese-demo-plot"></div>
  <div class="ese-demo-stats"></div>
  <p class="ese-demo-takeaway"></p>
</div>

Markov is shown as a two-sided union bound. Chebyshev, Chernoff, and Hoeffding are upper bounds; the CLT bar is a continuity-corrected approximation.

## Try it in Python

<p class="ese-code-note">This cell computes the exact binomial deviation probability and the same comparison bars used in the browser demo.</p>

```python
import numpy as np
import matplotlib.pyplot as plt
from scipy import stats

p = 0.35
n = 40
eps = 0.12

lower = int(np.floor(n * (p - eps)))
upper = int(np.ceil(n * (p + eps)))
exact = stats.binom.cdf(lower, n, p) + stats.binom.sf(upper - 1, n, p)

chebyshev = min(1.0, p * (1 - p) / (n * eps**2))

markov = 0.0
if p + eps <= 1:
    markov += p / (p + eps)
if p - eps >= 0:
    markov += (1 - p) / (1 - p + eps)
markov = min(1.0, markov)

def bernoulli_kl(q, p):
    if q <= 0:
        return np.log(1 / (1 - p))
    if q >= 1:
        return np.log(1 / p)
    return q * np.log(q / p) + (1 - q) * np.log((1 - q) / (1 - p))

chernoff = 0.0
if p + eps <= 1:
    chernoff += np.exp(-n * bernoulli_kl(p + eps, p))
if p - eps >= 0:
    chernoff += np.exp(-n * bernoulli_kl(p - eps, p))
chernoff = min(1.0, chernoff)

hoeffding = min(1.0, 2 * np.exp(-2 * n * eps**2))

sd_count = np.sqrt(n * p * (1 - p))
clt = 0.0
if lower >= 0:
    clt += stats.norm.cdf((lower + 0.5 - n * p) / sd_count)
if upper <= n:
    clt += stats.norm.sf((upper - 0.5 - n * p) / sd_count)
clt = min(1.0, clt)

labels = ["exact", "Markov", "Chebyshev", "Chernoff", "Hoeffding", "CLT"]
values = [exact, markov, chebyshev, chernoff, hoeffding, clt]

plt.bar(labels, values)
plt.ylim(0, min(1.05, max(values) * 1.2))
plt.ylabel("probability or bound")
plt.xticks(rotation=30)
plt.show()

for label, value in zip(labels, values):
    print(f"{label:10s} {value:.5f}")
```

<p class="ese-next"><a href="/teaching/ese-531/probability-inequalities-limit-theorems/">Back to topic notes</a></p>

</div>

<script src="/assets/js/ese531-demos.js" defer></script>
