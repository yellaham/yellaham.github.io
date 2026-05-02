---
layout: single
title: "Lecture 4: EM, Risk, MVUE, and the Cramer-Rao Bound"
permalink: /teaching/ese-531/lectures/em-mvue-crlb/
author_profile: true
toc: true
toc_label: "Lecture Outline"
---

This lecture bridges computation and evaluation. It reviews numerical optimization, introduces expectation-maximization, and then turns to the question: what makes one estimator better than another?

## Newton's Method

Gradient descent uses first-order information. Newton's method uses second-order information through the Hessian.

For a scalar objective $f$, the update is

$$
\theta^{(t+1)}
= \theta^{(t)} - \frac{f'(\theta^{(t)})}{f''(\theta^{(t)})}.
$$

For vector parameters,

$$
\theta^{(t+1)}
= \theta^{(t)}
- [\nabla^2 f(\theta^{(t)})]^{-1}\nabla f(\theta^{(t)}).
$$

Newton's method can converge quickly near the optimum, but each iteration is more expensive because it requires the Hessian.

## Expectation-Maximization

Expectation-maximization is useful when the model has latent variables.

Suppose each observation has an unobserved component $Z_i$ and an observed component $X_i$. If the complete-data likelihood $p(x_i,z_i\mid \theta)$ is easier to optimize than the observed-data likelihood $p(x_i\mid \theta)$, EM gives an iterative strategy.

> **EM Algorithm:**
>
> 1. Start with an initial guess $\theta^{(0)}$.
> 2. E-step: compute
>
> $$
> Q(\theta\mid \theta^{(t)})
> =
> E_{Z\mid X,\theta^{(t)}}[\log p(X,Z\mid \theta)].
> $$
>
> 3. M-step: update
>
> $$
> \theta^{(t+1)}
> =
> \arg\max_\theta Q(\theta\mid \theta^{(t)}).
> $$

EM is guaranteed to increase the observed-data likelihood at each iteration, but it may converge to a local rather than global optimum.

## Gaussian Mixture Models

For a $K$-component Gaussian mixture,

$$
p(x_i\mid \theta)
= \sum_{k=1}^K \pi_k N(x_i\mid \mu_k,\Sigma_k),
$$

where $\pi_k\geq 0$ and $\sum_k \pi_k=1$.

The latent variable $Z_i$ indicates which component generated $X_i$.

The E-step computes responsibilities:

$$
\gamma_{ik}
= P(Z_i=k\mid X_i=x_i,\theta^{(t)})
=
\frac{\pi_k^{(t)}N(x_i\mid \mu_k^{(t)},\Sigma_k^{(t)})}
{\sum_{\ell=1}^K \pi_\ell^{(t)}N(x_i\mid \mu_\ell^{(t)},\Sigma_\ell^{(t)})}.
$$

The M-step uses these responsibilities as soft cluster assignments.

For the common Gaussian-mixture case, the M-step updates are:

$$
N_k^{(t)}=\sum_{i=1}^n \gamma_{ik},
$$

$$
\pi_k^{(t+1)}=\frac{N_k^{(t)}}{n},
$$

$$
\mu_k^{(t+1)}
=
\frac{1}{N_k^{(t)}}\sum_{i=1}^n \gamma_{ik}x_i,
$$

and

$$
\Sigma_k^{(t+1)}
=
\frac{1}{N_k^{(t)}}\sum_{i=1}^n
\gamma_{ik}(x_i-\mu_k^{(t+1)})(x_i-\mu_k^{(t+1)})^T.
$$

The responsibilities make the update look like the usual sample mean and covariance formulas, except that each point contributes fractionally to each component.

## Mean Squared Error

The mean squared error of an estimator $\hat{\theta}$ is

$$
\mathrm{MSE}(\hat{\theta})
= E[(\hat{\theta}-\theta)^2].
$$

It decomposes as

$$
\mathrm{MSE}(\hat{\theta})
= \mathrm{Var}(\hat{\theta})
+ \mathrm{Bias}(\hat{\theta})^2,
$$

where

$$
\mathrm{Bias}(\hat{\theta})=E[\hat{\theta}]-\theta.
$$

This decomposition explains the bias-variance tradeoff.

## Minimum Variance Unbiased Estimators

> **Definition (MVUE):** An estimator $\hat{\theta}$ is a minimum variance unbiased estimator if it is unbiased and has variance no larger than any other unbiased estimator.

If $\hat{\theta}$ is unbiased, then minimizing MSE is the same as minimizing variance.

An MVUE does not always exist. But for iid samples and regular problems, the search for an MVUE is often meaningful and connected to lower bounds such as the Cramer-Rao bound.

## Cramer-Rao Lower Bound

> **Theorem (Cramer-Rao Lower Bound):** Under regularity conditions, for any unbiased estimator $\hat{\theta}$ of a scalar parameter $\theta$,
>
> $$
> \mathrm{Var}(\hat{\theta})
> \geq \frac{1}{nI(\theta)},
> $$
>
> where $I(\theta)$ is the Fisher information in one observation.

If an unbiased estimator attains this bound, it is called efficient.

<details>
<summary><strong>Why the Bound Has This Form</strong></summary>

Let the score be

$$
S_\theta(X)=\frac{\partial}{\partial\theta}\log p(X\mid\theta).
$$

Under regularity conditions,

$$
E_\theta[S_\theta(X)] = 0,
\qquad
E_\theta[S_\theta(X)^2] = I(\theta).
$$

If $\hat{\theta}$ is unbiased, differentiating $E_\theta[\hat{\theta}]=\theta$ gives

$$
\mathrm{Cov}_\theta(\hat{\theta},S_\theta)=1.
$$

Cauchy-Schwarz gives

$$
1
\leq
\mathrm{Var}(\hat{\theta})I(\theta),
$$

which rearranges to the scalar CRLB. For $n$ iid observations, information adds, giving $nI(\theta)$.

</details>

## Student Takeaways

- EM handles latent-variable likelihoods through alternating conditional expectation and maximization.
- MSE splits into variance plus squared bias.
- Among unbiased estimators, smaller variance is better.
- The Cramer-Rao bound gives a benchmark for the best possible unbiased estimator variance.
