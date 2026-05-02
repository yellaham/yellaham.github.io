---
layout: single
title: "Lecture: MLE Properties and Numerical Optimization"
permalink: /teaching/ese-531/lectures/mle-properties-and-optimization/
author_profile: true
toc: true
toc_label: "Lecture Outline"
---

This lecture studies why maximum likelihood estimators are useful and what to do when the likelihood cannot be optimized by hand.

## Consistency of the MLE

Under regularity and identifiability conditions, the MLE is consistent:

$$
\hat{\theta}_n \xrightarrow{P} \theta_0.
$$

The main idea is that the average log likelihood converges to its expectation:

$$
\frac{1}{n}\ell_n(\theta)
= \frac{1}{n}\sum_{i=1}^n \log p(X_i\mid \theta)
\xrightarrow{P}
E_{\theta_0}[\log p(X\mid \theta)].
$$

The expected log likelihood is maximized at the true parameter $\theta_0$ when the model is correctly specified and identifiable.

The reason is the Kullback-Leibler divergence. Compare the expected log likelihoods at $\theta_0$ and $\theta$:

$$
E_{\theta_0}[\log p(X\mid\theta_0)]
-
E_{\theta_0}[\log p(X\mid\theta)]
=
E_{\theta_0}\left[
\log\frac{p(X\mid\theta_0)}{p(X\mid\theta)}
\right]
=
D_{\mathrm{KL}}(p_{\theta_0}\|p_\theta)
\geq 0.
$$

Equality holds only when the two distributions are the same. With identifiability, that means $\theta=\theta_0$.

## Fisher Information

> **Definition (Fisher Information):** For a scalar parameter $\theta$, the Fisher information in one observation is
>
> $$
> I(\theta)
> = E_\theta\left[
> \left(\frac{\partial}{\partial \theta}\log p(X\mid \theta)\right)^2
> \right].
> $$

When regularity conditions hold, this can also be written as

$$
I(\theta)
= -E_\theta\left[
\frac{\partial^2}{\partial \theta^2}\log p(X\mid \theta)
\right].
$$

Fisher information measures local curvature of the log likelihood. High information means the likelihood is sharply peaked and the parameter is easier to estimate.

## Asymptotic Distribution of the MLE

> **Theorem (Asymptotic Normality of the MLE):** Under regularity conditions,
>
> $$
> \sqrt{n}(\hat{\theta}_n-\theta_0)
> \xrightarrow{d}
> N\left(0, I(\theta_0)^{-1}\right).
> $$

This result gives an approximate standard error:

$$
\mathrm{se}(\hat{\theta}_n)
\approx \sqrt{\frac{1}{nI(\hat{\theta}_n)}}.
$$

## Invariance Property of the MLE

> **Theorem (MLE Invariance):** If $\hat{\theta}$ is the MLE of $\theta$ and $\alpha=g(\theta)$, then $g(\hat{\theta})$ is the MLE of $\alpha$.

This property is especially useful when the parameter of interest is a transformation of a parameter we can estimate more easily.

<details>
<summary><strong>Proof Sketch</strong></summary>

If $\alpha=g(\theta)$, then the induced likelihood for $\alpha$ is obtained by maximizing over all parameter values that map to $\alpha$:

$$
L_\alpha(\alpha)
=
\sup_{\theta:g(\theta)=\alpha} L(\theta).
$$

Since $\hat{\theta}$ maximizes $L(\theta)$ over the whole parameter space, the induced likelihood is maximized at $\hat{\alpha}=g(\hat{\theta})$.

</details>

### Example: Signal Power in dB

If $X_i \sim N(0,\sigma^2)$, then the MLE of $\sigma^2$ is

$$
\hat{\sigma}^2_{\mathrm{MLE}}
= \frac{1}{n}\sum_{i=1}^n X_i^2.
$$

The power in dB is

$$
P = 10\log_{10}(\sigma^2).
$$

By invariance,

$$
\hat{P}_{\mathrm{MLE}}
= 10\log_{10}\left(\hat{\sigma}^2_{\mathrm{MLE}}\right).
$$

## Convex Optimization

Often, the MLE solves

$$
\hat{\theta}
= \arg\min_{\theta} f(\theta),
$$

where $f(\theta)=-\ell(\theta)$ is the negative log likelihood.

> **Definition (Convex Function):** A function $f$ is convex if, for all $x,y$ and $t\in[0,1]$,
>
> $$
> f(tx+(1-t)y)\leq tf(x)+(1-t)f(y).
> $$

For twice differentiable scalar functions, convexity is equivalent to

$$
f''(\theta)\geq 0
$$

for all $\theta$.

For vector parameters, convexity is checked through the Hessian:

$$
\nabla^2 f(\theta) \succeq 0.
$$

## Gradient Descent

Gradient descent updates a parameter estimate by moving against the gradient:

$$
\theta^{(t+1)}
= \theta^{(t)}-\eta_t \nabla f(\theta^{(t)}),
$$

where $\eta_t$ is the step size.

For constrained problems, a projection can be added:

$$
\theta^{(t+1)}
= \Pi_{\Theta}\left(\theta^{(t)}-\eta_t\nabla f(\theta^{(t)})\right).
$$

Newton's method uses curvature:

$$
\theta^{(t+1)}
=
\theta^{(t)}
-[\nabla^2 f(\theta^{(t)})]^{-1}\nabla f(\theta^{(t)}).
$$

Quasi-Newton methods approximate the Hessian or its inverse. They often provide a useful compromise: faster convergence than simple gradient descent without forming the exact Hessian at every step.

## Exponential Families

Many familiar distributions can be written as

$$
p(x\mid \theta)
= h(x)\exp\{\eta(\theta)^T T(x)-A(\theta)\}.
$$

This form is useful because canonical exponential families often lead to concave log likelihoods, which makes optimization more reliable.

## Student Takeaways

- MLEs are often consistent and asymptotically normal.
- Fisher information controls the asymptotic variance.
- MLEs behave well under transformations.
- Numerical optimization is a central tool when closed forms are unavailable.
