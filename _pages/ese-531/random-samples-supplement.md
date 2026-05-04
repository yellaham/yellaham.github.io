---
layout: single
title: "Probability Inequalities and Limit Theorems"
permalink: /teaching/ese-531/probability-inequalities-limit-theorems/
redirect_from:
  - /teaching/ese-531/lectures/random-samples-supplement/
author_profile: true
toc: true
toc_label: "Topic Outline"
---

<div class="ese-531" markdown="1">

This topic explains why sample summaries become reliable as the sample size grows. Probability inequalities give finite-sample bounds; limit theorems describe the eventual behavior of averages and smooth transformations.

## Probability Inequalities

Before proving convergence, we need tools that bound the probability that a random variable deviates from a reference value.

### Markov's Inequality

> **Theorem (Markov's Inequality):** Let $Y$ be a nonnegative random variable. For any $a>0$,
>
> $$
> P(Y\geq a)\leq \frac{E[Y]}{a}.
> $$
{: .ese-box .ese-theorem}

Markov's inequality is often loose, but it is powerful because it assumes only nonnegativity and a finite expectation.

<details class="ese-proof">
<summary>Proof</summary>

For a continuous nonnegative random variable with density $p(y)$,

$$
\begin{aligned}
E[Y]
&= \int_0^\infty y p(y)\,dy\\
&\geq \int_a^\infty y p(y)\,dy\\
&\geq \int_a^\infty a p(y)\,dy\\
&= aP(Y\geq a).
\end{aligned}
$$

Dividing by $a$ gives the result.

</details>

### Chebyshev's Inequality

> **Theorem (Chebyshev's Inequality):** If $Y$ has mean $\mu$ and finite nonzero variance $\sigma^2$, then for any $k>0$,
>
> $$
> P(|Y-\mu|\geq k\sigma)\leq \frac{1}{k^2}.
> $$
{: .ese-box .ese-theorem}

Chebyshev's inequality applies Markov's inequality to the nonnegative random variable $(Y-\mu)^2$. For instance, the probability that a random variable deviates from its mean by at least two standard deviations is at most $1/4$.

<details class="ese-proof">
<summary>Proof</summary>

$$
\begin{aligned}
P(|Y-\mu|\geq k\sigma)
&=P((Y-\mu)^2\geq k^2\sigma^2)\\
&\leq \frac{E[(Y-\mu)^2]}{k^2\sigma^2}\\
&=\frac{1}{k^2}.
\end{aligned}
$$

</details>

### Moment Generating Functions and Chernoff Bounds

The moment generating function of a random variable $X$ is

$$
M_X(t)=E[e^{tX}],
$$

when the expectation exists in a neighborhood of $0$. Its derivatives at zero recover raw moments:

$$
\frac{dM_X(t)}{dt}\bigg|_{t=0}=E[X].
$$

> **Theorem (Chernoff Bound):** Let $Y$ have MGF $M_Y(t)$ where $|t|<h$. Then
>
> $$
> P(Y\geq a)\leq e^{-at}M_Y(t),\qquad 0<t<h,
> $$
>
> and
>
> $$
> P(Y\leq a)\leq e^{-at}M_Y(t),\qquad -h<t<0.
> $$
{: .ese-box .ese-theorem}

The useful part of the Chernoff bound is that we may optimize over $t$ to get the tightest available upper bound.

<details class="ese-proof">
<summary>Proof</summary>

For $t>0$,

$$
\begin{aligned}
P(Y\geq a)
&=P(e^{tY}\geq e^{ta})\\
&\leq \frac{E[e^{tY}]}{e^{ta}}\\
&=e^{-ta}M_Y(t),
\end{aligned}
$$

where the inequality is Markov's inequality applied to $e^{tY}$. The lower-tail version uses $t<0$.

</details>

## Modes of Convergence

Limit theorems require precise language for convergence.

> **Definition (Convergence in Probability):** A sequence of random variables $X_1,X_2,\ldots$ converges in probability to $X$ if, for every $\epsilon>0$,
>
> $$
> \lim_{n\to\infty}P(|X_n-X|>\epsilon)=0.
> $$
>
> We write $X_n\xrightarrow{P}X$.
{: .ese-box .ese-definition}

> **Definition (Almost Sure Convergence):** A sequence of random variables $X_1,X_2,\ldots$ converges almost surely to $X$ if
>
> $$
> P\left(\lim_{n\to\infty}X_n=X\right)=1.
> $$
>
> We write $X_n\xrightarrow{a.s.}X$.
{: .ese-box .ese-definition}

> **Definition (Convergence in Distribution):** A sequence of random variables $X_1,X_2,\ldots$ converges in distribution to $X$ if
>
> $$
> \lim_{n\to\infty}F_{X_n}(x)=F_X(x)
> $$
>
> at every continuity point of $F_X$. We write $X_n\xrightarrow{d}X$.
{: .ese-box .ese-definition}

Convergence in probability is the language of consistency. Convergence in distribution is the language of limiting approximations.

## Laws of Large Numbers

The weak law of large numbers formalizes the idea that iid averages stabilize.

> **Theorem (Weak Law of Large Numbers):** Let $X_1,X_2,\ldots$ be iid random variables with $E[X_i]=\mu$ and $\mathrm{Var}(X_i)=\sigma^2<\infty$. Define
>
> $$
> \bar{X}_n=\frac{1}{n}\sum_{i=1}^n X_i.
> $$
>
> Then $\bar{X}_n\xrightarrow{P}\mu$.
{: .ese-box .ese-theorem}

<details class="ese-proof">
<summary>Proof Using Chebyshev</summary>

For any $\epsilon>0$,

$$
\begin{aligned}
P(|\bar{X}_n-\mu|\geq \epsilon)
&\leq \frac{\mathrm{Var}(\bar{X}_n)}{\epsilon^2}\\
&=\frac{\sigma^2}{n\epsilon^2}.
\end{aligned}
$$

The right-hand side goes to zero as $n\to\infty$, so $\bar{X}_n\xrightarrow{P}\mu$.

</details>

> **Theorem (Strong Law of Large Numbers):** Let $X_1,X_2,\ldots$ be iid random variables with $E[X_i]=\mu$. Then
>
> $$
> P\left(\lim_{n\to\infty}\bar{X}_n=\mu\right)=1,
> $$
>
> or $\bar{X}_n\xrightarrow{a.s.}\mu$.
{: .ese-box .ese-theorem}

The strong law gives a stronger form of convergence than the weak law. It says that, with probability one, the realized sequence of sample averages settles at the population mean.

## Consistency and Mapping

> **Definition (Consistent Estimator):** An estimator $\hat{\theta}_n$ is consistent for $\theta$ if
>
> $$
> \hat{\theta}_n\xrightarrow{P}\theta.
> $$
{: .ese-box .ese-definition}

For example,

$$
S_n^2=\frac{1}{n-1}\sum_{i=1}^n(X_i-\bar{X}_n)^2
$$

is unbiased for $\sigma^2$. If $\mathrm{Var}(S_n^2)\to 0$, then $S_n^2\xrightarrow{P}\sigma^2$.

> **Theorem (Continuous Mapping Theorem):** If $X_n\xrightarrow{P}X$ and $h$ is continuous, then
>
> $$
> h(X_n)\xrightarrow{P}h(X).
> $$
{: .ese-box .ese-theorem}

The continuous mapping theorem lets us carry consistency through smooth transformations.

## Central Limit Theorem

The laws of large numbers say that $\bar{X}_n$ approaches $\mu$. The central limit theorem describes the remaining error.

> **Theorem (Central Limit Theorem):** Let $X_1,X_2,\ldots$ be iid random variables with $E[X_i]=\mu$ and $0<\mathrm{Var}(X_i)=\sigma^2<\infty$. Then
>
> $$
> \frac{\sqrt{n}(\bar{X}_n-\mu)}{\sigma}
> \xrightarrow{d}N(0,1),
> $$
>
> or equivalently,
>
> $$
> \sqrt{n}(\bar{X}_n-\mu)\xrightarrow{d}N(0,\sigma^2).
> $$
{: .ese-box .ese-theorem}

This theorem explains why Gaussian approximations appear throughout statistical inference even when the original population is not Gaussian. MGF-based proofs are elegant when the MGF exists, but finite variance is the central assumption in the classical iid CLT.

For large $n$,

$$
\bar{X}_n\approx N\left(\mu,\frac{\sigma^2}{n}\right).
$$

If $\sigma$ is known, an approximate 95 percent interval for $\mu$ is

$$
\bar{X}_n\pm 1.96\frac{\sigma}{\sqrt{n}}.
$$

If $\sigma$ is unknown, we often plug in $S_n$:

$$
\bar{X}_n\pm 1.96\frac{S_n}{\sqrt{n}},
$$

with the approximation justified by Slutsky's theorem when $S_n\xrightarrow{P}\sigma$.

## Slutsky's Theorem and the Delta Method

> **Theorem (Slutsky's Theorem):** If $X_n\xrightarrow{d}X$ and $Y_n\xrightarrow{P}a$, then
>
> $$
> X_n+Y_n\xrightarrow{d}X+a
> $$
>
> and
>
> $$
> X_nY_n\xrightarrow{d}aX.
> $$
{: .ese-box .ese-theorem}

> **Theorem (Delta Method):** If
>
> $$
> \sqrt{n}(\hat{\theta}_n-\theta)\xrightarrow{d}N(0,\sigma^2)
> $$
>
> and $g$ is differentiable at $\theta$, then
>
> $$
> \sqrt{n}(g(\hat{\theta}_n)-g(\theta))
> \xrightarrow{d}
> N(0,[g'(\theta)]^2\sigma^2).
> $$
{: .ese-box .ese-theorem}

### Example: Delta Method for the Log Mean

Suppose $\bar{X}_n$ estimates a positive mean $\mu>0$ and

$$
\sqrt{n}(\bar{X}_n-\mu)\xrightarrow{d}N(0,\sigma^2).
$$

For $g(x)=\log x$, $g'(\mu)=1/\mu$. Therefore,

$$
\sqrt{n}(\log\bar{X}_n-\log\mu)
\xrightarrow{d}
N\left(0,\frac{\sigma^2}{\mu^2}\right).
$$

The derivative controls how uncertainty changes under the transformation.

## Additional Notes

- **Point mass, delta function, or Dirac measure:** A degenerate random variable concentrated at $\mu$ satisfies $P(X=\mu)=1$ and $P(X\neq\mu)=0$.
- **Sifting property:** In the informal delta-function notation used in engineering,

$$
\int f(x)\delta_\mu(x)\,dx=f(\mu).
$$

These ideas are useful when thinking about convergence toward a constant: the limiting distribution can collapse to a point mass even though each finite-$n$ statistic is still random.

## Student Takeaways

- Probability inequalities give finite-sample probability bounds.
- Laws of large numbers justify consistency.
- The central limit theorem gives the approximate distribution of estimation error.
- Slutsky's theorem and the delta method move asymptotic results through plug-in estimates and smooth transformations.

<p class="ese-next"><a href="/teaching/ese-531/point-estimation/">Next: Point Estimation</a></p>

</div>
