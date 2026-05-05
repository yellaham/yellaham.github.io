---
layout: single
title: "Prior Design and Predictive Checks"
permalink: /teaching/ese-531/prior-design-predictive-checks/
redirect_from:
  - /teaching/ese-531/lectures/priors-and-predictive-checks/
author_profile: true
toc: true
toc_label: "Topic Outline"
---

<div class="ese-531" markdown="1">

This topic focuses on prior choice, prior calibration, and the first steps toward checking whether a Bayesian model is compatible with observed data.

<p class="ese-demo-callout"><span>Companion demo</span><a href="/teaching/ese-531/demos/prior-design-predictive-checks/">Check prior strength through predictive counts.</a></p>

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

A practical way to describe prior strength is through **effective sample size**. In the beta-Bernoulli model,

$$
\Theta\sim \mathrm{Beta}(\alpha,\beta),
$$

the posterior after $s$ successes in $n$ trials is

$$
\Theta\mid x\sim \mathrm{Beta}(\alpha+s,\beta+n-s).
$$

The prior behaves as if it contributed $\alpha-1$ prior successes and $\beta-1$ prior failures when thinking in terms of the posterior mode, or roughly $\alpha+\beta$ prior observations when thinking in terms of the posterior mean. This interpretation is not exact for every purpose, but it is useful for checking whether a prior is weak or strong relative to the available data.

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

For example, if $\phi=\log\theta$ and a prior is flat in $\phi$, then

$$
p_\Phi(\phi)\propto 1.
$$

Because $\theta=e^\phi$, the induced prior on $\theta$ is

$$
p_\Theta(\theta)
=
p_\Phi(\log\theta)\left|\frac{d}{d\theta}\log\theta\right|
\propto
\frac{1}{\theta}.
$$

Thus a flat prior on a log-scale parameter corresponds to a scale prior $p(\theta)\propto 1/\theta$, not to a flat prior in $\theta$.

## Jeffreys Prior

> **Definition (Jeffreys Prior):** For a scalar parameter $\theta$, Jeffreys prior is
>
> $$
> p(\theta)\propto \sqrt{I(\theta)},
> $$
>
> where $I(\theta)$ is Fisher information.
{: .ese-box .ese-definition}

Jeffreys prior is designed to respect smooth reparameterizations. It uses the local information geometry of the model rather than a coordinate-specific notion of flatness.

<details class="ese-proof">
<summary><strong>Invariance Calculation</strong></summary>

Let $\phi=g(\theta)$ be a one-to-one differentiable transformation. Scores transform by the chain rule:

$$
\frac{\partial}{\partial \phi}\log p(X\mid \phi)
=
\frac{\partial \theta}{\partial \phi}
\frac{\partial}{\partial \theta}\log p(X\mid\theta).
$$

Therefore

$$
I_\phi(\phi)
=
I_\theta(\theta)
\left(\frac{\partial\theta}{\partial\phi}\right)^2.
$$

Jeffreys prior in the $\phi$ coordinate is

$$
p(\phi)\propto \sqrt{I_\phi(\phi)}
=
\sqrt{I_\theta(\theta)}
\left|\frac{\partial\theta}{\partial\phi}\right|.
$$

This is exactly the change-of-variables formula applied to $p(\theta)\propto\sqrt{I_\theta(\theta)}$. Hence Jeffreys prior has the same form under smooth reparameterization.

</details>

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

### Worked Calibration Example

Suppose an expert says a probability is centered around $m=0.6$ with variance $v=0.01$. Then

$$
\frac{m(1-m)}{v}-1
=
\frac{0.6(0.4)}{0.01}-1
=
23.
$$

Thus

$$
\alpha=0.6(23)=13.8,
\qquad
\beta=0.4(23)=9.2.
$$

The prior mean is $13.8/(13.8+9.2)=0.6$, and the concentration $\alpha+\beta=23$ indicates a fairly informative prior. If the same mean were paired with a much larger variance, the resulting $\alpha+\beta$ would be smaller.

## Asymptotic Bayesian Behavior

As the sample size grows, the likelihood usually dominates the prior:

$$
p(\theta\mid x_1,\ldots,x_n)
\propto
\exp\{\ell_n(\theta)\}p(\theta).
$$

A Taylor expansion around the MAP estimator shows why many posteriors become approximately Gaussian for large $n$.

This is the intuition behind the Bernstein-von Mises theorem: under regularity conditions, the posterior behaves asymptotically like a normal distribution centered near an efficient estimator.

More explicitly, let

$$
h_n(\theta)=\log p(\theta\mid x)
=
\ell_n(\theta)+\log p(\theta)+\text{constant}.
$$

A Taylor expansion around the MAP estimator $\hat{\theta}_{\mathrm{MAP}}$ gives

$$
h_n(\theta)
\approx
h_n(\hat{\theta}_{\mathrm{MAP}})
-\frac{1}{2}
(\theta-\hat{\theta}_{\mathrm{MAP}})^T
H_n
(\theta-\hat{\theta}_{\mathrm{MAP}}),
$$

where

$$
H_n
=
-\nabla^2 h_n(\hat{\theta}_{\mathrm{MAP}}).
$$

For regular iid models, the likelihood curvature grows like $n$, while the prior curvature typically stays order $1$. This is the mathematical reason the likelihood dominates in large samples. The prior still matters for small samples, weakly identified models, boundary problems, and hierarchical models.

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

A posterior predictive tail probability has the form

$$
P\left(T(\tilde{X})\geq T(x)\mid x\right)
\approx
\frac{1}{M}\sum_{m=1}^M
\mathbf{1}\{T(\tilde{x}^{(m)})\geq T(x)\}.
$$

Values very close to $0$ or $1$ suggest that the observed statistic is unusual under replicated data from the fitted model. These checks are diagnostic rather than automatic hypothesis tests: a poor check tells us where the model struggles, but it does not by itself say which replacement model is best.

## Student Takeaways

- Priors encode assumptions and domain knowledge.
- Flat priors are not invariant to reparameterization.
- Jeffreys prior uses Fisher information to reduce coordinate dependence.
- Posterior predictive checks help diagnose model fit.
- Prior calibration should be checked on the data scale, not only through hyperparameter formulas.

<p class="ese-next"><a href="/teaching/ese-531/approximate-bayesian-inference/">Next: Approximate Bayesian Inference</a></p>

</div>
