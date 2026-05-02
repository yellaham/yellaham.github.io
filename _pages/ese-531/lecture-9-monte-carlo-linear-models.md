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

If the samples are independent and $\mathrm{Var}_\pi(h(\Theta))<\infty$, the Monte Carlo central limit theorem gives

$$
\sqrt{M}
\left[
\frac{1}{M}\sum_{m=1}^M h(\theta^{(m)})
-E_\pi[h(\Theta)]
\right]
\xrightarrow{d}
N(0,\mathrm{Var}_\pi(h(\Theta))).
$$

Thus Monte Carlo error usually decreases like $1/\sqrt{M}$, independent of the parameter dimension. The dimension still matters because it affects how hard it is to obtain good samples.

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

For normalized $\pi$, the average acceptance probability is $1/M$. The best proposals have the same general shape and heavier tails than the target. If the proposal has lighter tails, the ratio $\pi/q$ may be unbounded and no finite envelope constant exists.

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

The support condition is essential:

$$
\pi(\theta)>0 \quad \Longrightarrow \quad q(\theta)>0.
$$

Importance sampling can technically run when this condition fails, but it silently ignores target mass. A good proposal should put substantial probability in regions where both $\pi(\theta)$ and $|h(\theta)|$ are large.

The unnormalized estimator is unbiased when the normalized target density is known exactly. The self-normalized estimator is usually biased for finite $M$, but it is consistent and is often the practical choice in Bayesian inference because posteriors are known only up to a normalizing constant.

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

### Why Metropolis-Hastings Has the Right Target

The acceptance probability is chosen to satisfy detailed balance:

$$
\pi(\theta)P(\theta,\theta^\star)
=
\pi(\theta^\star)P(\theta^\star,\theta),
$$

where $P$ is the Markov transition kernel. Detailed balance implies that $\pi$ is stationary. Under additional ergodicity conditions, long-run averages along the chain converge to posterior expectations:

$$
\frac{1}{M}\sum_{m=1}^M h(\theta^{(m)})
\to
E_\pi[h(\Theta)].
$$

The samples are dependent, so the effective sample size is usually smaller than the number of iterations. Slowly mixing chains can give precise-looking but misleading estimates.

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

Geometrically, $H\hat{\theta}$ is the orthogonal projection of $X$ onto the column space of $H$. The residual

$$
r=X-H\hat{\theta}
$$

is orthogonal to every column of $H$:

$$
H^T r=0.
$$

This orthogonality condition is exactly the normal equation. Full column rank of $H$ means no column is a linear combination of the others, so each component of $\theta$ leaves a distinguishable imprint on the mean vector $H\theta$.

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

Even without Gaussian noise, ordinary least squares is the best linear unbiased estimator when the noise has mean zero, common variance, and uncorrelated components. This is the Gauss-Markov theorem. Gaussianity is needed for the exact MLE and finite-sample normal distribution, but not for unbiasedness or the covariance calculation above.

If $W\sim N(0,\sigma^2I)$, then

$$
X\sim N(H\theta,\sigma^2I),
$$

and the negative log likelihood is, up to constants,

$$
\frac{1}{2\sigma^2}\|X-H\theta\|_2^2.
$$

Thus maximizing the likelihood is equivalent to minimizing least squares.

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

The covariance formula follows directly:

$$
\hat{\theta}_{\mathrm{GLS}}-\theta
=
(H^TC^{-1}H)^{-1}H^TC^{-1}W.
$$

Therefore

$$
\mathrm{Cov}(\hat{\theta}_{\mathrm{GLS}})
=
(H^TC^{-1}H)^{-1}H^TC^{-1}
C
C^{-1}H(H^TC^{-1}H)^{-1}
=
(H^TC^{-1}H)^{-1}.
$$

The matrix $C^{-1}$ gives less weight to noisy directions and more weight to precise directions. This is the linear-model analogue of Fisher information weighting.

## Student Takeaways

- Monte Carlo approximates posterior expectations using samples.
- Rejection sampling and importance sampling depend heavily on proposal quality.
- MCMC trades independent sampling for a Markov chain with the right stationary distribution.
- Least squares is the natural estimator for linear models with white Gaussian noise.
- Generalized least squares is ordinary least squares after whitening correlated or unequal-variance noise.
