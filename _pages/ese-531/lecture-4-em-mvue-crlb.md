---
layout: single
title: "Expectation-Maximization"
permalink: /teaching/ese-531/expectation-maximization/
redirect_from:
  - /teaching/ese-531/lectures/em-mvue-crlb/
author_profile: true
toc: true
toc_label: "Topic Outline"
---

<div class="ese-531" markdown="1">

Expectation-maximization is an optimization strategy for likelihood problems with latent variables. It is especially useful when the complete-data likelihood is simple but the observed-data likelihood is hard to optimize directly.

<p class="ese-demo-callout"><span>Companion demo</span><a href="/teaching/ese-531/demos/expectation-maximization/">Watch Gaussian-mixture responsibilities and EM updates.</a></p>

## Newton's Method as Background

Gradient descent uses first-order information. Newton's method uses second-order information through the Hessian.

For a scalar objective $f$, the update is

$$
\theta^{(t+1)}
= \theta^{(t)}-\frac{f'(\theta^{(t)})}{f''(\theta^{(t)})}.
$$

For vector parameters,

$$
\theta^{(t+1)}
=\theta^{(t)}
-[\nabla^2 f(\theta^{(t)})]^{-1}\nabla f(\theta^{(t)}).
$$

The update comes from a local quadratic approximation:

$$
f(\theta)
\approx
f(\theta^{(t)})
+\nabla f(\theta^{(t)})^T(\theta-\theta^{(t)})
+\frac{1}{2}(\theta-\theta^{(t)})^T
\nabla^2f(\theta^{(t)})(\theta-\theta^{(t)}).
$$

Newton's method can converge quickly near the optimum, but it can fail or move uphill when started far from the optimum. Practical implementations often add line search, damping, or trust regions.

## Latent-Variable Likelihoods

Suppose each observation has an unobserved component $Z_i$ and an observed component $X_i$. The observed-data likelihood is

$$
p(x_i\mid\theta)=\sum_{z_i}p(x_i,z_i\mid\theta)
$$

in a discrete latent-variable model, or the analogous integral in a continuous latent-variable model. The summation or integration can make the likelihood difficult to optimize.

The complete-data likelihood $p(x_i,z_i\mid\theta)$ is often easier. EM turns this observation into an iterative algorithm.

## EM Algorithm

> **Algorithm (Expectation-Maximization):**
>
> 1. Start with an initial guess $\theta^{(0)}$.
> 2. E-step: compute
>
> $$
> Q(\theta\mid\theta^{(t)})
> =
> E_{Z\mid X,\theta^{(t)}}[\log p(X,Z\mid\theta)].
> $$
>
> 3. M-step: update
>
> $$
> \theta^{(t+1)}
> =
> \arg\max_\theta Q(\theta\mid\theta^{(t)}).
> $$
{: .ese-box .ese-theorem}

EM is guaranteed to increase the observed-data likelihood at each iteration, though it may converge to a local rather than global optimum.

<details class="ese-proof">
<summary>Why EM Increases the Observed Likelihood</summary>

For any reference parameter value $\theta^{(t)}$, write

$$
\log p(x\mid\theta)
=
\log \sum_z p(x,z\mid\theta).
$$

Insert the conditional distribution $p(z\mid x,\theta^{(t)})$:

$$
\log p(x\mid\theta)
=
\log \sum_z
p(z\mid x,\theta^{(t)})
\frac{p(x,z\mid\theta)}{p(z\mid x,\theta^{(t)})}.
$$

Jensen's inequality gives a lower bound:

$$
\log p(x\mid\theta)
\geq
\sum_z p(z\mid x,\theta^{(t)})
\log
\frac{p(x,z\mid\theta)}{p(z\mid x,\theta^{(t)})}.
$$

The part involving $\log p(x,z\mid\theta)$ is the $Q$ function up to terms that do not depend on $\theta$. The E-step builds this lower bound so it is tight at $\theta^{(t)}$; the M-step maximizes it. Therefore the observed log likelihood cannot decrease.

</details>

## Gaussian Mixture Models

For a $K$-component Gaussian mixture,

$$
p(x_i\mid\theta)
=
\sum_{k=1}^K \pi_k N(x_i\mid\mu_k,\Sigma_k),
$$

where $\pi_k\geq 0$ and $\sum_k\pi_k=1$. The latent variable $Z_i$ indicates which component generated $X_i$.

The E-step computes responsibilities:

$$
\gamma_{ik}
=
P(Z_i=k\mid X_i=x_i,\theta^{(t)})
=
\frac{\pi_k^{(t)}N(x_i\mid\mu_k^{(t)},\Sigma_k^{(t)})}
{\sum_{\ell=1}^K\pi_\ell^{(t)}N(x_i\mid\mu_\ell^{(t)},\Sigma_\ell^{(t)})}.
$$

The M-step uses responsibilities as soft cluster assignments:

$$
N_k^{(t)}=\sum_{i=1}^n\gamma_{ik},
$$

$$
\pi_k^{(t+1)}=\frac{N_k^{(t)}}{n},
$$

$$
\mu_k^{(t+1)}
=
\frac{1}{N_k^{(t)}}\sum_{i=1}^n\gamma_{ik}x_i,
$$

and

$$
\Sigma_k^{(t+1)}
=
\frac{1}{N_k^{(t)}}\sum_{i=1}^n
\gamma_{ik}(x_i-\mu_k^{(t+1)})(x_i-\mu_k^{(t+1)})^T.
$$

The responsibilities make the update look like the usual sample mean and covariance formulas, except that each point contributes fractionally to each component.

To see where these updates come from, introduce indicator variables

$$
Z_{ik}=\mathbf{1}\{Z_i=k\}.
$$

The complete-data log likelihood is

$$
\log p(x,z\mid\theta)
=
\sum_{i=1}^n\sum_{k=1}^K
Z_{ik}
\left[
\log\pi_k+\log N(x_i\mid\mu_k,\Sigma_k)
\right].
$$

The E-step replaces the unobserved indicators by their conditional expectations,

$$
E[Z_{ik}\mid x_i,\theta^{(t)}]=\gamma_{ik}.
$$

The M-step then maximizes

$$
Q(\theta\mid\theta^{(t)})
=
\sum_{i=1}^n\sum_{k=1}^K
\gamma_{ik}
\left[
\log\pi_k+\log N(x_i\mid\mu_k,\Sigma_k)
\right].
$$

Maximizing over $\pi_k$ subject to $\sum_k\pi_k=1$ uses a Lagrange multiplier and gives $\pi_k=N_k/n$. Maximizing over $\mu_k$ and $\Sigma_k$ gives weighted Gaussian MLEs. This is why EM for Gaussian mixtures looks like a soft version of clustering.

## Student Takeaways

- EM handles latent-variable likelihoods through alternating conditional expectation and maximization.
- The E-step builds a likelihood lower bound that is tight at the current parameter value.
- The M-step maximizes that bound, so the observed-data likelihood cannot decrease.
- Gaussian mixture EM replaces unobserved cluster memberships by responsibilities.
- EM may converge to a local optimum, so initialization and diagnostics matter.

<p class="ese-next"><a href="/teaching/ese-531/estimator-risk-cramer-rao/">Next: Estimator Risk and Scalar Cramer-Rao Bounds</a></p>

</div>
