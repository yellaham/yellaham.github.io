---
layout: single
title: "Lecture 5: Efficient Estimators and Vector Cramer-Rao Bounds"
permalink: /teaching/ese-531/lectures/efficient-estimators-vector-crlb/
author_profile: true
toc: true
toc_label: "Lecture Outline"
---

This lecture finishes the discussion of estimator evaluation, with special attention to efficient estimators, transformed parameters, and the vector form of the Cramer-Rao lower bound.

## MVUE Review

For an unbiased estimator,

$$
\mathrm{MSE}(\hat{\theta})=\mathrm{Var}(\hat{\theta}).
$$

Therefore, among unbiased estimators, the best estimator in the MSE sense is the one with the smallest variance.

> **Definition (Efficient Estimator):** An unbiased estimator is efficient if it attains the Cramer-Rao lower bound.

An efficient estimator, when it exists, is an MVUE.

## Equality in the Cramer-Rao Bound

The CRLB proof uses the Cauchy-Schwarz inequality. Equality occurs only under a special linear relationship between the estimator and the score.

For scalar $\theta$, equality requires an exact linear relationship with the full-sample score. Let

$$
S_n(\theta)=\frac{\partial}{\partial\theta}\log p(X_1,\ldots,X_n\mid\theta),
\qquad
I_n(\theta)=\mathrm{Var}_\theta(S_n(\theta)).
$$

Then the efficient equality form is

$$
\hat{\theta}-\theta
=
\frac{1}{I_n(\theta)}S_n(\theta).
$$

This condition is useful because it can help determine whether an efficient estimator exists.

## White Gaussian Noise Model

Consider

$$
X_i = s_i(\theta)+\epsilon_i,
\qquad
\epsilon_i \sim N(0,\sigma^2),
$$

where $s_i(\theta)$ is known up to $\theta$.

For independent observations, the Fisher information is

$$
I(\theta)
= \frac{1}{\sigma^2}
\sum_{i=1}^n
\left(\frac{\partial s_i(\theta)}{\partial \theta}\right)^2.
$$

Thus every unbiased estimator satisfies

$$
\mathrm{Var}(\hat{\theta})
\geq
\frac{\sigma^2}
{\sum_{i=1}^n [s_i'(\theta)]^2}.
$$

## Sinusoidal Frequency Estimation

For a signal model

$$
X_i = A\cos(2\pi f_0 iT)+\epsilon_i,
$$

with Gaussian noise, the derivative with respect to $f_0$ is

$$
\frac{\partial s_i(f_0)}{\partial f_0}
= -A(2\pi iT)\sin(2\pi f_0 iT).
$$

Substituting this derivative into the Gaussian CRLB gives a lower bound on the variance of any unbiased frequency estimator.

## Transformed Parameters

Suppose $\alpha=g(\theta)$. If $\hat{\theta}$ is efficient for $\theta$, it does not automatically follow that $g(\hat{\theta})$ is efficient for $\alpha$ in finite samples.

For scalar transformations, the CRLB transforms through the derivative:

$$
\mathrm{Var}(\hat{\alpha})
\geq
\frac{[g'(\theta)]^2}{nI(\theta)}.
$$

This is the same derivative term that appears in the delta method.

### MLE Invariance vs. Efficiency

The MLE has an invariance property: if $\hat{\theta}_{\mathrm{MLE}}$ estimates $\theta$, then $g(\hat{\theta}_{\mathrm{MLE}})$ is the MLE of $g(\theta)$. Efficiency is more delicate. A nonlinear transformation can introduce finite-sample bias, so an efficient estimator of $\theta$ does not automatically produce an efficient unbiased estimator of $g(\theta)$.

## Example: Unknown Constant in Noise

Let

$$
X_i = \mu+\epsilon_i,
\qquad
\epsilon_i \sim N(0,\sigma^2).
$$

The MLE is

$$
\hat{\mu}=\bar{X}.
$$

Since

$$
\mathrm{Var}(\bar{X})=\frac{\sigma^2}{n},
$$

and the Fisher information in $n$ samples is $n/\sigma^2$, $\bar{X}$ attains the CRLB and is efficient.

## Vector Cramer-Rao Bound

When $\theta\in \mathbb{R}^d$, the covariance matrix of an unbiased estimator satisfies

$$
\mathrm{Cov}(\hat{\theta}) \succeq I(\theta)^{-1},
$$

where $I(\theta)$ is the Fisher information matrix with entries

$$
I_{ij}(\theta)
= E_\theta\left[
\frac{\partial}{\partial \theta_i}\log p(X\mid \theta)
\frac{\partial}{\partial \theta_j}\log p(X\mid \theta)
\right].
$$

The notation $A\succeq B$ means $A-B$ is positive semidefinite.

## Unknown Mean and Variance in a Gaussian Model

For

$$
X_i \sim N(\mu,\sigma^2),
$$

both $\mu$ and $\sigma^2$ may be unknown. The estimator vector includes both quantities, and the CRLB must be computed using the Fisher information matrix rather than a single scalar information value.

Using the parameter vector $\theta=(\mu,\sigma^2)$, the Fisher information in $n$ iid samples is

$$
I(\theta)
=
\begin{bmatrix}
\frac{n}{\sigma^2} & 0 \\
0 & \frac{n}{2\sigma^4}
\end{bmatrix}.
$$

Therefore,

$$
I(\theta)^{-1}
=
\begin{bmatrix}
\frac{\sigma^2}{n} & 0 \\
0 & \frac{2\sigma^4}{n}
\end{bmatrix}.
$$

The sample mean attains the bound for $\mu$. The usual unbiased sample variance has

$$
\mathrm{Var}(S^2)=\frac{2\sigma^4}{n-1},
$$

so it does not attain the $\sigma^2$ component of the vector CRLB when $\mu$ is also unknown. The gap reminds us that nuisance parameters can affect finite-sample efficiency.

## Student Takeaways

- Efficiency means attaining the CRLB.
- Transformed parameters require transformed bounds.
- For multiple parameters, the CRLB is a matrix inequality.
- Estimators that are excellent for one criterion may not be optimal for another transformed quantity.
