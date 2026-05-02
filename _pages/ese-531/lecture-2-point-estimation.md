---
layout: single
title: "Lecture 2: Point Estimation"
permalink: /teaching/ese-531/lectures/lecture-2-point-estimation/
author_profile: true
toc: true
toc_label: "Lecture Outline"
---

Point estimation turns data into a single numerical guess for an unknown quantity. This lecture introduces the estimation problem, the method of moments, and maximum likelihood estimation.

## Formulating an Estimation Problem

An estimation problem begins with observed data

$$
X_1,\ldots,X_n,
$$

a probabilistic model $p(x\mid \theta)$, and an unknown parameter $\theta$.

> **Definition (Estimator):** An estimator is a statistic
>
> $$
> \hat{\theta}_n = T_n(X_1,\ldots,X_n)
> $$
>
> used to estimate an unknown parameter $\theta$.

A clean formulation should identify:

- What is observed.
- What is unknown.
- What constraints define the feasible parameter set.
- Whether the model is frequentist, Bayesian, or something more structured.

## Joint Models and Conditional Independence

For an iid random sample,

$$
p(x_1,\ldots,x_n\mid \theta)=\prod_{i=1}^n p(x_i\mid \theta).
$$

Not every model is iid. For example, an autoregressive model may have

$$
X_i = \alpha X_{i-1}+\epsilon_i,
\qquad
\epsilon_i \sim N(0,\sigma^2).
$$

In such models, the joint distribution is built from conditional distributions rather than a simple iid product.

For the AR(1) example, if an initial density $p(x_0)$ is specified, the joint density factors as

$$
p(x_0,x_1,\ldots,x_n\mid \alpha,\sigma^2)
=
p(x_0)\prod_{i=1}^n
p(x_i\mid x_{i-1},\alpha,\sigma^2).
$$

The conditional density is Gaussian:

$$
X_i\mid X_{i-1}=x_{i-1}
\sim
N(\alpha x_{i-1},\sigma^2).
$$

This factorization is often the difference between a tractable likelihood and an impossible-looking joint model.

## Method of Moments

The method of moments matches theoretical moments to sample moments.

Let

$$
m_j(\theta)=E_\theta[X^j],
\qquad
\hat{m}_j=\frac{1}{n}\sum_{i=1}^n X_i^j.
$$

The method of moments estimator solves

$$
m_j(\hat{\theta})=\hat{m}_j,
\qquad j=1,\ldots,k.
$$

> **Definition (Method of Moments Estimator):** The method of moments estimator is obtained by equating enough theoretical moments to their empirical counterparts to solve for the unknown parameters.

If the equations cannot be solved exactly, we may instead minimize a moment-matching loss.

> **Moment Identifiability:** Moment matching is meaningful only when the selected theoretical moments determine the parameter. If two different parameter values produce the same matched moments, the resulting estimator cannot distinguish them.

Moment methods are closely related to the uniqueness of moment generating functions: when the MGF exists around zero, the full sequence of moments determines the distribution. In practice, we usually match only enough low-order moments to identify the unknown parameters.

## Example: Binomial Random Sample

Suppose

$$
X_i \sim \mathrm{Binomial}(N,p),
$$

where $N$ is known and $p$ is unknown. Since

$$
E[X_i]=Np,
$$

the first moment equation gives

$$
\bar{X}=N\hat{p},
\qquad
\hat{p}_{\mathrm{MOM}}=\frac{\bar{X}}{N}.
$$

## Example: Gamma Random Sample

Suppose $X_i \sim \mathrm{Gamma}(\alpha,\beta)$ with unknown shape and rate. A common parameterization has

$$
E[X]=\frac{\alpha}{\beta},
\qquad
\mathrm{Var}(X)=\frac{\alpha}{\beta^2}.
$$

The method of moments matches $\bar{X}$ and the sample variance to these two expressions, then solves for $\alpha$ and $\beta$.

Let

$$
\hat{v}
=
\frac{1}{n}\sum_{i=1}^n (X_i-\bar{X})^2.
$$

The moment equations are

$$
\bar{X}=\frac{\alpha}{\beta},
\qquad
\hat{v}=\frac{\alpha}{\beta^2}.
$$

Solving gives

$$
\hat{\alpha}_{\mathrm{MOM}}=\frac{\bar{X}^2}{\hat{v}},
\qquad
\hat{\beta}_{\mathrm{MOM}}=\frac{\bar{X}}{\hat{v}}.
$$

## Properties of Method of Moments

Method of moments estimators are often consistent under mild conditions. The intuition is:

$$
\hat{m}_j \xrightarrow{P} m_j(\theta),
$$

by the law of large numbers. If the mapping from moments to parameters is continuous and identifiable, the continuous mapping theorem carries convergence from moments to parameters.

However, method of moments estimators can be biased and may fall outside the feasible parameter set.

### Uniform Example and Feasibility

If $X_i\sim \mathrm{Uniform}(a,b)$, then

$$
E[X]=\frac{a+b}{2},
\qquad
\mathrm{Var}(X)=\frac{(b-a)^2}{12}.
$$

Matching the sample mean and variance gives

$$
\hat{a}=\bar{X}-\sqrt{3\hat{v}},
\qquad
\hat{b}=\bar{X}+\sqrt{3\hat{v}}.
$$

These estimates can be mathematically valid but practically awkward: the fitted interval may fail to contain the observed minimum or maximum. This illustrates why feasibility and model constraints still matter after solving the moment equations.

## Maximum Likelihood Estimation

> **Definition (Likelihood Function):** For observed data $x_1,\ldots,x_n$, the likelihood is
>
> $$
> L(\theta;x_1,\ldots,x_n)=p(x_1,\ldots,x_n\mid \theta),
> $$
>
> interpreted as a function of $\theta$.

The maximum likelihood estimator is

$$
\hat{\theta}_{\mathrm{MLE}}
= \arg\max_{\theta} L(\theta;x_1,\ldots,x_n).
$$

Equivalently, because the logarithm is monotone,

$$
\hat{\theta}_{\mathrm{MLE}}
= \arg\max_{\theta} \ell(\theta),
\qquad
\ell(\theta)=\log L(\theta).
$$

## Practical Steps for MLE

1. Write the likelihood.
2. Take the log likelihood.
3. Remove constants that do not depend on $\theta$.
4. Differentiate with respect to $\theta$.
5. Solve the first-order condition.
6. Check constraints and boundary cases.
7. If no closed form exists, use numerical optimization.

## Example: Binomial MLE

For $X_i\sim \mathrm{Binomial}(N,p)$ with $N$ known,

$$
L(p)
=
\prod_{i=1}^n {N\choose x_i}p^{x_i}(1-p)^{N-x_i}.
$$

Ignoring constants that do not depend on $p$,

$$
\ell(p)
=
\left(\sum_{i=1}^n x_i\right)\log p
+\left(nN-\sum_{i=1}^n x_i\right)\log(1-p).
$$

The score equation is

$$
\frac{\partial \ell}{\partial p}
=
\frac{\sum_i x_i}{p}
-
\frac{nN-\sum_i x_i}{1-p}
=0.
$$

Solving yields

$$
\hat{p}_{\mathrm{MLE}}
=
\frac{1}{nN}\sum_{i=1}^n X_i
=
\frac{\bar{X}}{N}.
$$

In this example the MLE and method of moments estimator agree.

## Student Takeaways

- An estimator is a statistic designed to approximate an unknown parameter.
- Method of moments estimates parameters by matching moments.
- MLE chooses the parameter value that makes the observed data most likely.
- Closed forms are convenient, but many MLEs require constrained or numerical optimization.
