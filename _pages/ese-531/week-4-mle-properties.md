---
layout: single
title: "MLE Properties and Numerical Optimization"
permalink: /teaching/ese-531/mle-properties-optimization/
redirect_from:
  - /teaching/ese-531/lectures/mle-properties-and-optimization/
author_profile: true
toc: true
toc_label: "Topic Outline"
---

<div class="ese-531" markdown="1">

This topic studies why maximum likelihood estimators are useful and what to do when the likelihood cannot be optimized by hand.

<p class="ese-demo-callout"><span>Companion demo</span><a href="/teaching/ese-531/demos/mle-properties-optimization/">Connect likelihood curvature with Fisher information.</a></p>

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

The argument above is a population argument. To turn it into a theorem about the sample MLE, we also need the sample average log likelihood to converge uniformly enough that the maximizer of the random curve approaches the maximizer of the population curve. A typical regularity checklist is:

- The true parameter $\theta_0$ is in the parameter space, usually in its interior.
- The model is identifiable.
- The log likelihood has finite expectation near $\theta_0$.
- The parameter space is compact, or the likelihood can be controlled away from compact sets.
- A law of large numbers applies uniformly over the relevant parameter values.

These assumptions are not decorative. If the parameter is not identifiable, the population objective may have multiple maximizers. If the support of the density changes with $\theta$, derivatives of the log likelihood may miss boundary information. If the maximum occurs on the boundary, the limiting distribution may be nonnormal.

## Fisher Information

> **Definition (Fisher Information):** For a scalar parameter $\theta$, the Fisher information in one observation is
>
> $$
> I(\theta)
> = E_\theta\left[
> \left(\frac{\partial}{\partial \theta}\log p(X\mid \theta)\right)^2
> \right].
> $$
{: .ese-box .ese-definition}

When regularity conditions hold, this can also be written as

$$
I(\theta)
= -E_\theta\left[
\frac{\partial^2}{\partial \theta^2}\log p(X\mid \theta)
\right].
$$

Fisher information measures local curvature of the log likelihood. High information means the likelihood is sharply peaked and the parameter is easier to estimate.

The equivalence between the two formulas follows from differentiating the identity

$$
\int p(x\mid\theta)\,dx=1.
$$

First,

$$
0
=
\frac{\partial}{\partial\theta}\int p(x\mid\theta)\,dx
=
\int \frac{\partial}{\partial\theta}p(x\mid\theta)\,dx
=
\int
\frac{\partial}{\partial\theta}\log p(x\mid\theta)
p(x\mid\theta)\,dx.
$$

Thus the score has mean zero. Differentiating once more and rearranging gives

$$
E_\theta\left[
\frac{\partial^2}{\partial\theta^2}\log p(X\mid\theta)
\right]
+
E_\theta\left[
\left(
\frac{\partial}{\partial\theta}\log p(X\mid\theta)
\right)^2
\right]
=0.
$$

This is why expected curvature and score variance agree under regularity conditions.

## Asymptotic Distribution of the MLE

> **Theorem (Asymptotic Normality of the MLE):** Under regularity conditions,
>
> $$
> \sqrt{n}(\hat{\theta}_n-\theta_0)
> \xrightarrow{d}
> N\left(0, I(\theta_0)^{-1}\right).
> $$
{: .ese-box .ese-theorem}

This result gives an approximate standard error:

$$
\mathrm{se}(\hat{\theta}_n)
\approx \sqrt{\frac{1}{nI(\hat{\theta}_n)}}.
$$

<details class="ese-proof">
<summary><strong>Proof Sketch by Taylor Expanding the Score</strong></summary>

Let

$$
S_n(\theta)=\ell_n'(\theta)
$$

be the full-sample score. For an interior MLE, $S_n(\hat{\theta}_n)=0$. Taylor expand around the true value $\theta_0$:

$$
0
=
S_n(\hat{\theta}_n)
\approx
S_n(\theta_0)
+(\hat{\theta}_n-\theta_0)\ell_n''(\theta_0).
$$

Solving gives

$$
\sqrt{n}(\hat{\theta}_n-\theta_0)
\approx
\frac{n^{-1/2}S_n(\theta_0)}
-n^{-1}\ell_n''(\theta_0)}.
$$

The numerator converges in distribution to $N(0,I(\theta_0))$ by the central limit theorem for the iid score terms. The denominator converges in probability to $I(\theta_0)$ by the law of large numbers and the identity between expected negative curvature and Fisher information. Slutsky's theorem gives

$$
\sqrt{n}(\hat{\theta}_n-\theta_0)
\xrightarrow{d}
N(0,I(\theta_0)^{-1}).
$$

</details>

In practice, we may estimate uncertainty using either the expected information $nI(\hat{\theta}_n)$ or the observed information

$$
J_n(\hat{\theta}_n)
=
-\ell_n''(\hat{\theta}_n).
$$

The observed-information standard error is

$$
\mathrm{se}(\hat{\theta}_n)
\approx
\sqrt{J_n(\hat{\theta}_n)^{-1}}.
$$

For vector parameters, the same idea uses the inverse Hessian matrix.

## Invariance Property of the MLE

> **Theorem (MLE Invariance):** If $\hat{\theta}$ is the MLE of $\theta$ and $\alpha=g(\theta)$, then $g(\hat{\theta})$ is the MLE of $\alpha$.
{: .ese-box .ese-theorem}

This property is especially useful when the parameter of interest is a transformation of a parameter we can estimate more easily.

<details class="ese-proof">
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
{: .ese-box .ese-definition}

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

### Newton, Fisher Scoring, and Constraints

For maximum likelihood, Newton's method is often written directly on the log likelihood:

$$
\theta^{(t+1)}
=
\theta^{(t)}
+
\left[-\nabla^2\ell(\theta^{(t)})\right]^{-1}
\nabla\ell(\theta^{(t)}).
$$

Fisher scoring replaces the observed negative Hessian by the expected Fisher information:

$$
\theta^{(t+1)}
=
\theta^{(t)}
+
I_n(\theta^{(t)})^{-1}\nabla\ell(\theta^{(t)}),
$$

where $I_n(\theta)=nI(\theta)$ for iid data when $I(\theta)$ denotes one-observation information. This can be more stable when the observed Hessian is noisy or indefinite. If the parameter is constrained, such as $p\in[0,1]$ or $\sigma^2>0$, there are two common strategies: optimize over a transformed unconstrained parameter, or take a step and project back into the feasible set.

## Exponential Families

Many familiar distributions can be written as

$$
p(x\mid \theta)
= h(x)\exp\{\eta(\theta)^T T(x)-A(\theta)\}.
$$

This form is useful because canonical exponential families often lead to concave log likelihoods, which makes optimization more reliable.

In a canonical exponential family, the natural parameter is $\eta$ and

$$
p(x\mid \eta)=h(x)\exp\{\eta^T T(x)-A(\eta)\}.
$$

The log likelihood for iid data is

$$
\ell(\eta)
=
\eta^T\sum_{i=1}^n T(x_i)-nA(\eta)+\sum_{i=1}^n \log h(x_i).
$$

The gradient is

$$
\nabla \ell(\eta)
=
\sum_{i=1}^n T(x_i)-n\nabla A(\eta),
$$

and exponential-family theory gives

$$
\nabla A(\eta)=E_\eta[T(X)],
\qquad
\nabla^2 A(\eta)=\mathrm{Cov}_\eta(T(X)).
$$

Therefore

$$
\nabla^2 \ell(\eta)
=
-n\nabla^2 A(\eta)
=
-n\mathrm{Cov}_\eta(T(X))
\preceq 0.
$$

So the log likelihood is concave in the natural parameter. The likelihood equation says that the fitted model should match the observed sufficient statistic:

$$
E_{\hat{\eta}}[T(X)]
=
\frac{1}{n}\sum_{i=1}^n T(x_i).
$$

## Student Takeaways

- MLEs are often consistent and asymptotically normal.
- Fisher information controls the asymptotic variance.
- MLEs behave well under transformations.
- Numerical optimization is a central tool when closed forms are unavailable.
- Canonical exponential-family likelihoods are concave in the natural parameter, which explains why many textbook MLEs are well behaved.

<p class="ese-next"><a href="/teaching/ese-531/expectation-maximization/">Next: Expectation-Maximization</a></p>

</div>
