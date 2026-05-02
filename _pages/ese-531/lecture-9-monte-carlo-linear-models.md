---
layout: single
title: "Lecture 9: Monte Carlo Methods and Linear Models"
permalink: /teaching/ese-531/lectures/monte-carlo-linear-models/
author_profile: true
toc: true
toc_label: "Lecture Outline"
---

This lecture continues approximate Bayesian inference with sampling methods, then introduces linear models and least squares estimation.

## Standard Monte Carlo

If we can sample

$$
\theta^{(1)},\ldots,\theta^{(M)}\sim \pi(\theta),
$$

then expectations can be approximated by

$$
E_\pi[h(\Theta)]
\approx
\frac{1}{M}\sum_{m=1}^M h(\theta^{(m)}).
$$

The strong law of large numbers provides the foundation for this approximation.

The difficulty is that in Bayesian inference we often cannot sample directly from the posterior.

## Rejection Sampling

Rejection sampling uses an easier proposal density $q(\theta)$ and a constant $M$ such that

$$
\pi(\theta)\leq Mq(\theta).
$$

Candidate samples from $q$ are accepted with probability

$$
\frac{\pi(\theta)}{Mq(\theta)}.
$$

If $q$ is not close to $\pi$, the required $M$ becomes large and the acceptance rate becomes small.

## Importance Sampling

Importance sampling rewrites the expectation as

$$
E_\pi[h(\Theta)]
=
\int h(\theta)\pi(\theta)\,d\theta
=
\int h(\theta)\frac{\pi(\theta)}{q(\theta)}q(\theta)\,d\theta.
$$

With samples from $q$, use weights

$$
w(\theta)=\frac{\pi(\theta)}{q(\theta)}.
$$

When the target is known only up to a normalizing constant, normalized importance sampling uses

$$
\frac{\sum_{m=1}^M w_m h(\theta^{(m)})}
{\sum_{m=1}^M w_m}.
$$

The variance can be large if the proposal does not cover the important regions of the target.

### Effective Sample Size

Importance weights reveal whether the proposal is working. A common diagnostic is the normalized-weight effective sample size:

$$
\mathrm{ESS}
=
\frac{1}{\sum_{m=1}^M \tilde{w}_m^2},
\qquad
\tilde{w}_m=\frac{w_m}{\sum_{\ell=1}^M w_\ell}.
$$

If one weight dominates, ESS is close to one even when $M$ is large. Good proposals produce more balanced weights and larger ESS.

## Markov Chain Monte Carlo

MCMC constructs a Markov chain whose stationary distribution is the target posterior $\pi$.

> **Definition (Markov Property):** A stochastic process satisfies the Markov property if the next state depends on the past only through the current state.

In Metropolis-Hastings:

1. Start at $\theta^{(0)}$.
2. Propose $\theta^\star\sim q(\theta^\star\mid \theta^{(t)})$.
3. Accept with probability

$$
\alpha
=
\min\left\{
1,
\frac{\pi(\theta^\star)q(\theta^{(t)}\mid \theta^\star)}
{\pi(\theta^{(t)})q(\theta^\star\mid \theta^{(t)})}
\right\}.
$$

4. If accepted, set $\theta^{(t+1)}=\theta^\star$; otherwise keep $\theta^{(t+1)}=\theta^{(t)}$.

Chains need time to reach stationarity, and samples may be autocorrelated.

In practice, analysts often discard an initial burn-in period and inspect trace plots. Thinning can reduce storage and visible autocorrelation, but it does not fix a poorly mixing chain. Better proposals and reparameterizations are usually more valuable.

## Linear Model

A linear model has the form

$$
X = H\theta + W,
$$

where:

- $X\in\mathbb{R}^n$ is the observation vector.
- $H\in\mathbb{R}^{n\times d}$ is a known design matrix.
- $\theta\in\mathbb{R}^d$ is unknown.
- $W$ is zero-mean noise.

## Least Squares Estimator

The least squares estimator minimizes squared prediction error:

$$
\hat{\theta}
=
\arg\min_\theta \|X-H\theta\|_2^2.
$$

Differentiating and setting the gradient equal to zero gives the normal equations:

$$
H^TH\hat{\theta}=H^TX.
$$

If $H^TH$ is invertible,

$$
\hat{\theta}
=
(H^TH)^{-1}H^TX.
$$

If $H^TH$ is singular, the parameters are not identifiable from the design matrix without additional assumptions. Regularization or a prior can then be used to make the problem well posed.

## Mean and Covariance

If $E[W]=0$, then

$$
E[\hat{\theta}]=\theta,
$$

so the estimator is unbiased.

If

$$
\mathrm{Cov}(W)=\sigma^2 I,
$$

then

$$
\mathrm{Cov}(\hat{\theta})
=
\sigma^2(H^TH)^{-1}.
$$

When the noise is Gaussian, least squares is also the maximum likelihood estimator and attains the relevant Cramer-Rao bound under standard conditions.

## Colored Noise and Generalized Least Squares

If the noise covariance is not $\sigma^2 I$ but instead

$$
\mathrm{Cov}(W)=C,
$$

then the squared-error criterion should weight directions according to the inverse covariance:

$$
\hat{\theta}_{\mathrm{GLS}}
=
\arg\min_\theta (X-H\theta)^TC^{-1}(X-H\theta).
$$

When $H^TC^{-1}H$ is invertible,

$$
\hat{\theta}_{\mathrm{GLS}}
=
(H^TC^{-1}H)^{-1}H^TC^{-1}X.
$$

This is the natural extension of least squares when the noise is correlated or has unequal variance.

The covariance is

$$
\mathrm{Cov}(\hat{\theta}_{\mathrm{GLS}})
=
(H^TC^{-1}H)^{-1}.
$$

One way to understand GLS is whitening. If $C=LL^T$, multiply the model by $L^{-1}$:

$$
L^{-1}X = L^{-1}H\theta + L^{-1}W.
$$

The transformed noise has identity covariance, so ordinary least squares on the whitened problem gives the GLS estimator.

For Gaussian noise $W\sim N(0,C)$, the Fisher information matrix is

$$
I(\theta)=H^TC^{-1}H.
$$

Thus GLS attains the vector Cramer-Rao bound under the standard full-rank conditions.

## Student Takeaways

- Monte Carlo approximates posterior expectations using samples.
- Rejection sampling and importance sampling depend heavily on proposal quality.
- MCMC trades independent sampling for a Markov chain with the right stationary distribution.
- Least squares is the natural estimator for linear models with white Gaussian noise.
