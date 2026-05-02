---
layout: single
title: "Lecture 7: Priors, Jeffreys Prior, and Posterior Predictive Checks"
permalink: /teaching/ese-531/lectures/priors-and-predictive-checks/
author_profile: true
toc: true
toc_label: "Lecture Outline"
---

This lecture focuses on prior choice, prior calibration, and the first steps toward checking whether a Bayesian model is compatible with observed data.

## Types of Priors

Prior distributions can be placed on a spectrum:

- **Noninformative priors:** attempt to add little information.
- **Weakly informative priors:** rule out implausible values while remaining broad.
- **Informative priors:** encode substantial domain knowledge.

The posterior is proportional to likelihood times prior:

$$
p(\theta\mid x_1,\ldots,x_n)
\propto
p(x_1,\ldots,x_n\mid \theta)p(\theta).
$$

Therefore, prior choice can matter, especially with small data sets.

## Improper Priors

An improper prior does not integrate to one. For example,

$$
p(\mu)\propto 1
$$

over the real line is not a probability distribution.

Improper priors can sometimes lead to proper posteriors, but they must be used carefully. The posterior, not the prior alone, must be normalizable for inference to be valid.

## Flat Priors and Reparameterization

A prior that is flat in one parameterization need not be flat after transformation.

If $\phi=g(\theta)$, then densities transform according to

$$
p_\Phi(\phi)
=
p_\Theta(g^{-1}(\phi))
\left|
\frac{d}{d\phi}g^{-1}(\phi)
\right|.
$$

This is why "uniform" is not automatically noninformative.

## Jeffreys Prior

> **Definition (Jeffreys Prior):** For a scalar parameter $\theta$, Jeffreys prior is
>
> $$
> p(\theta)\propto \sqrt{I(\theta)},
> $$
>
> where $I(\theta)$ is Fisher information.

Jeffreys prior is designed to respect smooth reparameterizations. It uses the local information geometry of the model rather than a coordinate-specific notion of flatness.

### Example: Bernoulli Parameter

For $X\sim \mathrm{Bernoulli}(\theta)$,

$$
\log p(X\mid\theta)
=
X\log\theta+(1-X)\log(1-\theta).
$$

The Fisher information is

$$
I(\theta)
=
\frac{1}{\theta(1-\theta)}.
$$

Therefore Jeffreys prior is

$$
p(\theta)\propto \frac{1}{\sqrt{\theta(1-\theta)}},
$$

which is the $\mathrm{Beta}(1/2,1/2)$ prior. It is not uniform, because the Bernoulli model is more sensitive to changes in $\theta$ near 0 and 1.

### Example: Normal Mean with Known Variance

For $X\sim N(\mu,\sigma^2)$ with known $\sigma^2$,

$$
\frac{\partial}{\partial\mu}\log p(X\mid\mu)
=
\frac{X-\mu}{\sigma^2}.
$$

Thus

$$
I(\mu)
=
E\left[\frac{(X-\mu)^2}{\sigma^4}\right]
=
\frac{1}{\sigma^2}.
$$

Since this does not depend on $\mu$, Jeffreys prior is flat:

$$
p(\mu)\propto 1.
$$

## Moment Matching for Prior Calibration

Suppose a domain expert provides a prior mean and variance for a parameter. We can choose a parametric prior family and solve for hyperparameters that match these moments.

For a beta prior,

$$
\Theta\sim \mathrm{Beta}(\alpha,\beta),
$$

the mean and variance are

$$
E[\Theta]=\frac{\alpha}{\alpha+\beta},
$$

and

$$
\mathrm{Var}(\Theta)
=
\frac{\alpha\beta}
{(\alpha+\beta)^2(\alpha+\beta+1)}.
$$

Setting these equal to expert-provided moments gives two equations for $\alpha$ and $\beta$.

If the expert gives mean $m$ and variance $v$, then for a beta prior:

$$
\alpha
=
m\left(\frac{m(1-m)}{v}-1\right),
\qquad
\beta
=
(1-m)\left(\frac{m(1-m)}{v}-1\right).
$$

These formulas are valid when $0<v<m(1-m)$. If the requested variance is too large, no beta distribution can match those moments.

## Asymptotic Bayesian Behavior

As the sample size grows, the likelihood usually dominates the prior:

$$
p(\theta\mid x_1,\ldots,x_n)
\propto
\exp\{\ell_n(\theta)\}p(\theta).
$$

A Taylor expansion around the MAP estimator shows why many posteriors become approximately Gaussian for large $n$.

This is the intuition behind the Bernstein-von Mises theorem: under regularity conditions, the posterior behaves asymptotically like a normal distribution centered near an efficient estimator.

## Posterior Predictive Checks

After fitting a Bayesian model, we can simulate replicated data from the posterior predictive distribution:

$$
p(\tilde{x}\mid x_1,\ldots,x_n)
=
\int p(\tilde{x}\mid \theta)p(\theta\mid x_1,\ldots,x_n)\,d\theta.
$$

If simulated data look systematically unlike the observed data, the model may be poorly calibrated.

A common workflow is:

1. Draw $\theta^{(m)}\sim p(\theta\mid x)$.
2. Draw replicated data $\tilde{x}^{(m)}\sim p(\tilde{x}\mid \theta^{(m)})$.
3. Compare summaries $T(\tilde{x}^{(m)})$ to $T(x)$.

The summary $T$ should be chosen to target a scientifically meaningful failure mode: means for location mismatch, variances for spread mismatch, tail counts for outlier mismatch, and so on.

## Student Takeaways

- Priors encode assumptions and domain knowledge.
- Flat priors are not invariant to reparameterization.
- Jeffreys prior uses Fisher information to reduce coordinate dependence.
- Posterior predictive checks help diagnose model fit.
