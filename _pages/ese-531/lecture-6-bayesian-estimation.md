---
layout: single
title: "Lecture 6: Bayesian Estimation"
permalink: /teaching/ese-531/lectures/bayesian-estimation/
author_profile: true
toc: true
toc_label: "Lecture Outline"
---

Bayesian estimation treats unknown parameters as random variables. The output is a posterior distribution, from which point estimators and uncertainty summaries can be derived.

## Frequentist and Bayesian Views

In frequentist point estimation, $\theta$ is fixed but unknown. An estimator is a function of the random sample:

$$
\hat{\theta}=g(X_1,\ldots,X_n).
$$

In Bayesian estimation, $\Theta$ is modeled as a random variable with prior distribution $p(\theta)$. After observing data, we update this prior to a posterior.

## Bayes' Theorem

For data $X_1,\ldots,X_n$,

$$
p(\theta\mid x_1,\ldots,x_n)
=
\frac{p(x_1,\ldots,x_n\mid \theta)p(\theta)}
{p(x_1,\ldots,x_n)}.
$$

The denominator is the marginal likelihood:

$$
p(x_1,\ldots,x_n)
= \int p(x_1,\ldots,x_n\mid \theta)p(\theta)\,d\theta.
$$

Posterior inference combines likelihood information from the data with prior information encoded before seeing the data.

## Conjugate Priors

> **Definition (Conjugacy):** A prior family is conjugate for a likelihood if the posterior distribution belongs to the same family as the prior.

Conjugacy matters because it turns Bayesian updating into parameter updating. Two canonical examples in this course are:

- Bernoulli likelihood with beta prior, which gives a beta posterior.
- Gaussian likelihood with Gaussian prior on the mean, which gives a Gaussian posterior.

Conjugate models are not always realistic, but they are excellent reference models because every part of the update is visible.

## Maximum A Posteriori Estimation

The maximum likelihood estimator solves

$$
\hat{\theta}_{\mathrm{MLE}}
= \arg\max_\theta p(x_1,\ldots,x_n\mid \theta).
$$

The maximum a posteriori estimator solves

$$
\hat{\theta}_{\mathrm{MAP}}
= \arg\max_\theta p(\theta\mid x_1,\ldots,x_n).
$$

Equivalently,

$$
\hat{\theta}_{\mathrm{MAP}}
= \arg\max_\theta
\left[
\log p(x_1,\ldots,x_n\mid \theta)+\log p(\theta)
\right].
$$

The prior acts like an additional regularizing term. As $n$ grows, the likelihood often dominates the prior.

## Minimum Mean Squared Error Estimation

The MMSE estimator is the posterior mean:

$$
\hat{\theta}_{\mathrm{MMSE}}
= E[\Theta\mid X_1=x_1,\ldots,X_n=x_n].
$$

It minimizes posterior expected squared error:

$$
\hat{\theta}_{\mathrm{MMSE}}
= \arg\min_a E[(\Theta-a)^2\mid X_1,\ldots,X_n].
$$

If the posterior is symmetric and unimodal, MAP and MMSE may coincide. In skewed posteriors, the posterior mode and posterior mean can differ substantially.

## Beta-Bernoulli Example

Suppose

$$
X_i\mid \theta \sim \mathrm{Bernoulli}(\theta),
$$

and

$$
\Theta \sim \mathrm{Beta}(\alpha,\beta).
$$

Let $s=\sum_{i=1}^n x_i$. The likelihood is proportional to

$$
\theta^s(1-\theta)^{n-s}.
$$

The posterior is

$$
\Theta\mid x_1,\ldots,x_n
\sim
\mathrm{Beta}(\alpha+s,\beta+n-s).
$$

The posterior mean is

$$
E[\Theta\mid x]
=
\frac{\alpha+s}{\alpha+\beta+n}.
$$

This is a weighted combination of the prior mean and the sample proportion.

The MAP estimate is the posterior mode. When $\alpha+s>1$ and $\beta+n-s>1$,

$$
\hat{\theta}_{\mathrm{MAP}}
=
\frac{\alpha+s-1}{\alpha+\beta+n-2}.
$$

The MLE is $s/n$. The posterior mean can be written as

$$
E[\Theta\mid x]
=
\left(\frac{\alpha+\beta}{\alpha+\beta+n}\right)
\left(\frac{\alpha}{\alpha+\beta}\right)
+
\left(\frac{n}{\alpha+\beta+n}\right)
\left(\frac{s}{n}\right).
$$

The first term is the prior mean weighted by prior strength $\alpha+\beta$, and the second is the data estimate weighted by sample size $n$.

## Gaussian Likelihood with Gaussian Prior

Suppose

$$
X_i\mid \mu \sim N(\mu,\sigma^2),
$$

where $\sigma^2$ is known, and

$$
\mu \sim N(\mu_0,\tau_0^2).
$$

The posterior is Gaussian. Its mean is a precision-weighted average of the prior mean and the sample mean:

$$
E[\mu\mid x]
=
\frac{\frac{n}{\sigma^2}\bar{x}+\frac{1}{\tau_0^2}\mu_0}
{\frac{n}{\sigma^2}+\frac{1}{\tau_0^2}}.
$$

When $\tau_0^2$ is large, the prior is weak and the posterior mean is close to $\bar{x}$. When $\tau_0^2$ is small, the prior has more influence.

The posterior variance is

$$
\left(\frac{n}{\sigma^2}+\frac{1}{\tau_0^2}\right)^{-1}.
$$

This variance is smaller than both the prior variance and the sampling variance of $\bar{X}$ when both sources of information are finite. Bayesian updating combines precisions, where precision means inverse variance.

## Student Takeaways

- Bayesian inference returns a posterior distribution, not only a point estimate.
- MAP maximizes the posterior density.
- MMSE is the posterior mean.
- Conjugate priors make posterior updates analytically tractable.
