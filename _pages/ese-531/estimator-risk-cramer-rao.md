---
layout: single
title: "Estimator Risk and Scalar Cramer-Rao Bounds"
permalink: /teaching/ese-531/estimator-risk-cramer-rao/
author_profile: true
toc: true
toc_label: "Topic Outline"
---

<div class="ese-531" markdown="1">

After constructing estimators, we need criteria for comparing them. This topic develops mean squared error, risk, minimum-variance unbiased estimation, and the scalar Cramer-Rao lower bound.

<p class="ese-demo-callout"><span>Companion demo</span><a href="/teaching/ese-531/demos/estimator-risk-cramer-rao/">Explore risk, bias-variance tradeoffs, and the CRLB.</a></p>

## Mean Squared Error

The mean squared error of an estimator $\hat{\theta}$ is

$$
\mathrm{MSE}(\hat{\theta})=E[(\hat{\theta}-\theta)^2].
$$

It decomposes as

$$
\mathrm{MSE}(\hat{\theta})
=
\mathrm{Var}(\hat{\theta})
+\mathrm{Bias}(\hat{\theta})^2,
$$

where

$$
\mathrm{Bias}(\hat{\theta})=E[\hat{\theta}]-\theta.
$$

This decomposition explains the bias-variance tradeoff.

## Frequentist Risk

The same idea is often expressed through a risk function. If the loss for estimating $\theta$ by $a$ is squared error,

$$
L(\theta,a)=(a-\theta)^2,
$$

then the frequentist risk of an estimator $\hat{\theta}$ is

$$
R(\theta,\hat{\theta})
=
E_\theta[(\hat{\theta}-\theta)^2].
$$

This expectation is over repeated samples drawn under the fixed value $\theta$. An estimator may have small risk for one parameter value and larger risk for another, so comparing estimators can require deciding whether we care about pointwise risk, worst-case risk, average risk, or unbiasedness.

## Minimum Variance Unbiased Estimators

> **Definition (MVUE):** An estimator $\hat{\theta}$ is a minimum variance unbiased estimator if it is unbiased and has variance no larger than any other unbiased estimator.
{: .ese-box .ese-definition}

If $\hat{\theta}$ is unbiased, then minimizing MSE is the same as minimizing variance.

An MVUE does not always exist. But for iid samples and regular problems, the search for an MVUE is often meaningful and connected to lower bounds such as the Cramer-Rao bound.

### Example: Two Unbiased Estimators

Suppose $X_1,X_2\sim N(\mu,\sigma^2)$ iid with known $\sigma^2$. Both

$$
\hat{\mu}_1=X_1
\qquad\text{and}\qquad
\hat{\mu}_2=\frac{X_1+X_2}{2}
$$

are unbiased for $\mu$. Their variances are

$$
\mathrm{Var}(\hat{\mu}_1)=\sigma^2,
\qquad
\mathrm{Var}(\hat{\mu}_2)=\frac{\sigma^2}{2}.
$$

Among these two, $\hat{\mu}_2$ is better under squared error because both are unbiased and it has smaller variance. The MVUE problem asks for the best unbiased estimator among all unbiased estimators, not just among two candidates.

## Cramer-Rao Lower Bound

> **Theorem (Cramer-Rao Lower Bound):** Under regularity conditions, for any unbiased estimator $\hat{\theta}$ of a scalar parameter $\theta$,
>
> $$
> \mathrm{Var}(\hat{\theta})
> \geq \frac{1}{nI(\theta)},
> $$
>
> where $I(\theta)$ is the Fisher information in one observation.
{: .ese-box .ese-theorem}

If an unbiased estimator attains this bound, it is called efficient.

The regularity conditions usually include:

- The support of $p(x\mid\theta)$ does not depend on $\theta$.
- Differentiation with respect to $\theta$ can be interchanged with integration over $x$.
- The score has finite second moment.
- The estimator has finite variance.

When these assumptions fail, the CRLB may need modification or may not apply. For example, in a uniform model with unknown endpoint, the support depends on the parameter, and boundary information carries essential information.

<details class="ese-proof">
<summary>Why the Bound Has This Form</summary>

Let the score be

$$
S_n(\theta)
=
\frac{\partial}{\partial\theta}
\log p(X_1,\ldots,X_n\mid\theta),
$$

Under regularity conditions,

$$
E_\theta[S_n(\theta)]=0,
\qquad
E_\theta[S_n(\theta)^2]=I_n(\theta).
$$

If $\hat{\theta}$ is unbiased, differentiating $E_\theta[\hat{\theta}]=\theta$ gives

$$
\mathrm{Cov}_\theta(\hat{\theta},S_n(\theta))=1.
$$

Cauchy-Schwarz gives

$$
1\leq \mathrm{Var}(\hat{\theta})I_n(\theta),
$$

which rearranges to the scalar CRLB. For $n$ iid observations, information adds, giving $I_n(\theta)=nI(\theta)$ when $I(\theta)$ is the information in one observation.

</details>

### Example: Gaussian Mean

Let $X_1,\ldots,X_n\sim N(\mu,\sigma^2)$ iid with known $\sigma^2$. The score for one observation is

$$
\frac{\partial}{\partial\mu}\log p(X\mid\mu)
=
\frac{X-\mu}{\sigma^2}.
$$

The Fisher information in one observation is

$$
I(\mu)
=
E_\mu\left[\frac{(X-\mu)^2}{\sigma^4}\right]
=
\frac{1}{\sigma^2}.
$$

Therefore the CRLB for any unbiased estimator of $\mu$ is

$$
\mathrm{Var}(\hat{\mu})
\geq
\frac{\sigma^2}{n}.
$$

The sample mean satisfies

$$
E[\bar{X}]=\mu,
\qquad
\mathrm{Var}(\bar{X})=\frac{\sigma^2}{n}.
$$

Thus $\bar{X}$ attains the CRLB. In this model it is efficient and therefore an MVUE.

## Student Takeaways

- MSE splits into variance plus squared bias.
- Risk is evaluated under repeated sampling at a fixed parameter value.
- Among unbiased estimators, smaller variance is better.
- The Cramer-Rao bound gives a benchmark for the best possible unbiased estimator variance.
- Efficiency means attaining the CRLB, which is a strong finite-sample condition.

<p class="ese-next"><a href="/teaching/ese-531/efficient-estimators-vector-crlb/">Next: Efficient Estimators and Vector Cramer-Rao Bounds</a></p>

</div>
