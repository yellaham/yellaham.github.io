---
layout: single
title: "Supplement: Probability Inequalities and Limit Theorems"
permalink: /teaching/ese-531/lectures/random-samples-supplement/
author_profile: true
toc: true
toc_label: "Lecture Outline"
---

This supplement reinforces the first part of the course: how sample summaries behave as random variables and why probability inequalities lead naturally to convergence theorems.

## Sample Mean and Sample Variance

Let $X_1,\ldots,X_n$ be a random sample from a population with mean $\mu$ and variance $\sigma^2 < \infty$.

The sample mean is

$$
\bar{X}_n = \frac{1}{n}\sum_{i=1}^n X_i.
$$

It is itself a random variable. Its mean and variance are

$$
E[\bar{X}_n] = \mu,
\qquad
\mathrm{Var}(\bar{X}_n) = \frac{\sigma^2}{n}.
$$

The sample variance is

$$
S_n^2 = \frac{1}{n-1}\sum_{i=1}^n (X_i-\bar{X}_n)^2.
$$

The main lesson is that averaging reduces variance. The sample mean is centered at the population mean, and its spread shrinks like $1/n$.

## Markov's Inequality

> **Theorem (Markov's Inequality):** Let $Y$ be a nonnegative random variable. For any $a > 0$,
>
> $$
> P(Y \geq a) \leq \frac{E[Y]}{a}.
> $$

Markov's inequality converts information about an average into an upper bound on a tail probability. It is often loose, but it is a powerful first tool because it makes very few assumptions.

<details>
<summary><strong>Proof Sketch</strong></summary>

For a continuous nonnegative random variable with density $p(y)$,

$$
E[Y] = \int_0^\infty y p(y)\,dy
\geq \int_a^\infty y p(y)\,dy
\geq \int_a^\infty a p(y)\,dy
= aP(Y \geq a).
$$

Dividing by $a$ gives the result.

</details>

## Chebyshev's Inequality

> **Theorem (Chebyshev's Inequality):** If $Y$ has mean $\mu$ and finite variance $\sigma^2$, then for any $k > 0$,
>
> $$
> P(|Y-\mu| \geq k\sigma) \leq \frac{1}{k^2}.
> $$

Chebyshev's inequality applies Markov's inequality to the nonnegative random variable $(Y-\mu)^2$.

<details>
<summary><strong>Proof</strong></summary>

By Markov's inequality,

$$
P(|Y-\mu| \geq k\sigma)
= P((Y-\mu)^2 \geq k^2\sigma^2)
\leq \frac{E[(Y-\mu)^2]}{k^2\sigma^2}
= \frac{1}{k^2}.
$$

</details>

## Moment Generating Functions and Chernoff Bounds

The moment generating function of $X$ is

$$
M_X(t) = E[e^{tX}],
$$

when the expectation exists in a neighborhood of $0$.

> **Chernoff Bound:** If $M_Y(t)$ exists, then for $t>0$,
>
> $$
> P(Y \geq a) \leq e^{-ta}M_Y(t).
> $$

The useful part of the Chernoff bound is that we may optimize over $t$ to get the tightest available upper bound.

## Laws of Large Numbers

The weak law of large numbers says that sample averages converge to the population mean in probability:

$$
\bar{X}_n \xrightarrow{P} \mu.
$$

The strong law gives a stronger conclusion:

$$
\bar{X}_n \xrightarrow{a.s.} \mu.
$$

In words, averages stabilize. The more independent observations we collect, the harder it becomes for the sample mean to remain far from the population mean.

### Deriving the Weak Law from Chebyshev

For iid $X_i$ with finite variance, Chebyshev gives the whole proof:

$$
P(|\bar{X}_n-\mu|\geq \epsilon)
\leq
\frac{\mathrm{Var}(\bar{X}_n)}{\epsilon^2}
=
\frac{\sigma^2}{n\epsilon^2}.
$$

The right-hand side goes to zero as $n\to\infty$, so

$$
\bar{X}_n \xrightarrow{P}\mu.
$$

This is a useful template: first control a probability with an inequality, then show the bound vanishes.

## Central Limit Theorem

The central limit theorem describes the distribution of the remaining estimation error:

$$
\frac{\sqrt{n}(\bar{X}_n-\mu)}{\sigma}
\xrightarrow{d} N(0,1).
$$

This theorem explains why Gaussian approximations appear throughout statistical inference, even when the original population is not Gaussian.

### Approximate Confidence Calculations

For large $n$,

$$
\bar{X}_n \approx N\left(\mu,\frac{\sigma^2}{n}\right).
$$

If $\sigma$ is known, then an approximate 95 percent interval for $\mu$ is

$$
\bar{X}_n \pm 1.96\frac{\sigma}{\sqrt{n}}.
$$

If $\sigma$ is unknown, it is common to plug in $S_n$:

$$
\bar{X}_n \pm 1.96\frac{S_n}{\sqrt{n}},
$$

with the approximation justified by Slutsky's theorem when $S_n\xrightarrow{P}\sigma$.

## Delta Method

If

$$
\sqrt{n}(\hat{\theta}_n-\theta) \xrightarrow{d} N(0,\sigma^2),
$$

and $g$ is differentiable at $\theta$, then

$$
\sqrt{n}(g(\hat{\theta}_n)-g(\theta))
\xrightarrow{d}
N(0, [g'(\theta)]^2\sigma^2).
$$

The delta method lets us transfer asymptotic normality through smooth transformations.

### Example: Delta Method for the Log Mean

Suppose $\bar{X}_n$ estimates a positive mean $\mu>0$ and

$$
\sqrt{n}(\bar{X}_n-\mu)\xrightarrow{d}N(0,\sigma^2).
$$

For $g(x)=\log x$, $g'(\mu)=1/\mu$. Therefore,

$$
\sqrt{n}(\log \bar{X}_n-\log \mu)
\xrightarrow{d}
N\left(0,\frac{\sigma^2}{\mu^2}\right).
$$

The derivative controls how uncertainty changes under the transformation.

## Student Takeaways

- Sample statistics are random variables with their own distributions.
- Probability inequalities give finite-sample probability bounds.
- Laws of large numbers justify consistency.
- The central limit theorem and delta method justify approximate uncertainty calculations.
