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

The update comes from a local quadratic approximation. Around the current value $\theta^{(t)}$,

$$
f(\theta)
\approx
f(\theta^{(t)})
+\nabla f(\theta^{(t)})^T(\theta-\theta^{(t)})
+\frac{1}{2}
(\theta-\theta^{(t)})^T
\nabla^2 f(\theta^{(t)})
(\theta-\theta^{(t)}).
$$

Minimizing this quadratic approximation gives the Newton step. The method is powerful when the quadratic approximation is accurate and the Hessian is positive definite. It can fail or move uphill when started far from the optimum, so implementations often add line search, damping, or trust regions.

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

<details>
<summary><strong>Why EM Increases the Observed Likelihood</strong></summary>

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

The part involving $\log p(x,z\mid\theta)$ is exactly the $Q$ function, up to terms that do not depend on $\theta$. The E-step builds this lower bound so it is tight at $\theta^{(t)}$; the M-step maximizes it. Therefore the observed log likelihood cannot decrease.

</details>

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

To see where these updates come from, introduce indicator variables

$$
Z_{ik}
=
\mathbf{1}\{Z_i=k\}.
$$

The complete-data log likelihood is

$$
\log p(x,z\mid\theta)
=
\sum_{i=1}^n\sum_{k=1}^K
Z_{ik}
\left[
\log \pi_k+\log N(x_i\mid\mu_k,\Sigma_k)
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
\log \pi_k+\log N(x_i\mid\mu_k,\Sigma_k)
\right].
$$

Maximizing over $\pi_k$ subject to $\sum_k\pi_k=1$ uses a Lagrange multiplier and gives $\pi_k=N_k/n$. Maximizing over $\mu_k$ and $\Sigma_k$ gives weighted Gaussian MLEs. This is why the EM algorithm for Gaussian mixtures looks like a soft version of clustering.

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

The same idea is often expressed through a risk function. If the loss for estimating $\theta$ by $a$ is squared error,

$$
L(\theta,a)=(a-\theta)^2,
$$

then the frequentist risk of an estimator $\hat{\theta}$ is

$$
R(\theta,\hat{\theta})
=
E_\theta[(\hat{\theta}-\theta)^2].
$$

This expectation is over repeated samples drawn under the fixed value $\theta$. An estimator may have small risk for one parameter value and larger risk for another, so comparing estimators can require deciding whether we care about pointwise risk, worst-case risk, average risk, or unbiasedness.

## Minimum Variance Unbiased Estimators

> **Definition (MVUE):** An estimator $\hat{\theta}$ is a minimum variance unbiased estimator if it is unbiased and has variance no larger than any other unbiased estimator.

If $\hat{\theta}$ is unbiased, then minimizing MSE is the same as minimizing variance.

An MVUE does not always exist. But for iid samples and regular problems, the search for an MVUE is often meaningful and connected to lower bounds such as the Cramer-Rao bound.

### Example: Two Unbiased Estimators

Suppose $X_1,X_2\sim N(\mu,\sigma^2)$ iid with known $\sigma^2$. Both

$$
\hat{\mu}_1=X_1
\qquad\text{and}\qquad
\hat{\mu}_2=\frac{X_1+X_2}{2}
$$

are unbiased for $\mu$. Their variances are

$$
\mathrm{Var}(\hat{\mu}_1)=\sigma^2,
\qquad
\mathrm{Var}(\hat{\mu}_2)=\frac{\sigma^2}{2}.
$$

Among these two, $\hat{\mu}_2$ is better under squared error because both are unbiased and it has smaller variance. The MVUE problem asks for the best unbiased estimator among all unbiased estimators, not just among two candidates.

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

The regularity conditions usually include:

- The support of $p(x\mid\theta)$ does not depend on $\theta$.
- Differentiation with respect to $\theta$ can be interchanged with integration over $x$.
- The score has finite second moment.
- The estimator has finite variance.

When these assumptions fail, the CRLB may need modification or may not apply. For example, in a uniform model with unknown endpoint, the support depends on the parameter, and boundary information carries essential information.

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

### Example: Gaussian Mean

Let $X_1,\ldots,X_n\sim N(\mu,\sigma^2)$ iid with known $\sigma^2$. The score for one observation is

$$
\frac{\partial}{\partial\mu}\log p(X\mid\mu)
=
\frac{X-\mu}{\sigma^2}.
$$

The Fisher information in one observation is

$$
I(\mu)
=
E_\mu\left[\frac{(X-\mu)^2}{\sigma^4}\right]
=
\frac{1}{\sigma^2}.
$$

Therefore the CRLB for any unbiased estimator of $\mu$ is

$$
\mathrm{Var}(\hat{\mu})
\geq
\frac{\sigma^2}{n}.
$$

The sample mean satisfies

$$
E[\bar{X}]=\mu,
\qquad
\mathrm{Var}(\bar{X})=\frac{\sigma^2}{n}.
$$

Thus $\bar{X}$ attains the CRLB. In this model it is efficient and therefore an MVUE.

## Student Takeaways

- EM handles latent-variable likelihoods through alternating conditional expectation and maximization.
- MSE splits into variance plus squared bias.
- Among unbiased estimators, smaller variance is better.
- The Cramer-Rao bound gives a benchmark for the best possible unbiased estimator variance.
