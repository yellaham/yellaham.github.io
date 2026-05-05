---
layout: single
title: "Linear Models and Least Squares"
permalink: /teaching/ese-531/linear-models-least-squares/
author_profile: true
toc: true
toc_label: "Topic Outline"
---

<div class="ese-531" markdown="1">

Linear models connect estimation theory to signal processing and regression. They also give a concrete setting where least squares, maximum likelihood, Fisher information, and the vector Cramer-Rao bound all agree.

<p class="ese-demo-callout"><span>Companion demo</span><a href="/teaching/ese-531/demos/linear-models-least-squares/">Visualize OLS projection and GLS weighting.</a></p>

## Linear Model

A linear model has the form

$$
X=H\theta+W,
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

## Projection Geometry

Geometrically, $H\hat{\theta}$ is the orthogonal projection of $X$ onto the column space of $H$. The residual

$$
r=X-H\hat{\theta}
$$

is orthogonal to every column of $H$:

$$
H^Tr=0.
$$

This orthogonality condition is exactly the normal equation. Full column rank of $H$ means no column is a linear combination of the others, so each component of $\theta$ leaves a distinguishable imprint on the mean vector $H\theta$.

## Mean and Covariance

Assume $H$ has full column rank, so $H^TH$ is invertible and the ordinary least squares formula is well defined.

If $E[W]=0$, then

$$
E[\hat{\theta}]=\theta,
$$

so the estimator is unbiased.

If

$$
\mathrm{Cov}(W)=\sigma^2I,
$$

then

$$
\mathrm{Cov}(\hat{\theta})
=
\sigma^2(H^TH)^{-1}.
$$

When the noise is Gaussian, least squares is also the maximum likelihood estimator and attains the relevant Cramer-Rao bound under standard conditions.

Even without Gaussian noise, ordinary least squares is the best linear unbiased estimator when the noise has mean zero, common variance, and uncorrelated components. This is the Gauss-Markov theorem. Gaussianity is needed for the exact MLE and finite-sample normal distribution, but not for unbiasedness or the covariance calculation above.

## Gaussian Noise and Maximum Likelihood

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

If the noise covariance is not $\sigma^2I$ but instead

$$
\mathrm{Cov}(W)=C,
$$

where $C$ is positive definite, then the squared-error criterion should weight directions according to the inverse covariance:

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
L^{-1}X=L^{-1}H\theta+L^{-1}W.
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

- Least squares is the natural estimator for linear models with white Gaussian noise.
- The normal equations express residual orthogonality.
- Ordinary least squares is unbiased under zero-mean noise and has covariance $\sigma^2(H^TH)^{-1}$ under white noise.
- Generalized least squares is ordinary least squares after whitening correlated or unequal-variance noise.
- In Gaussian linear models, GLS connects directly to Fisher information and the vector CRLB.

<p class="ese-next"><a href="/teaching/ese-531/detection-theory/">Next: Detection Theory</a></p>

</div>
