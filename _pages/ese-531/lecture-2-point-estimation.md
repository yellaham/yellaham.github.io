---
layout: single
title: "Point Estimation"
permalink: /teaching/ese-531/point-estimation/
redirect_from:
  - /teaching/ese-531/lectures/lecture-2-point-estimation/
author_profile: true
toc: true
toc_label: "Topic Outline"
---

<div class="ese-531" markdown="1">

Point estimation turns data into a single numerical guess for an unknown quantity. This topic introduces the estimation problem, the method of moments, and maximum likelihood estimation.

## Formulating an Estimation Problem

An estimation problem begins with observed data

$$
X_1,\ldots,X_n,
$$

a probabilistic model $p(x\mid \theta)$, and an unknown parameter $\theta$.

> **Definition (Estimator):** An estimator is a statistic
>
> $$
> \hat{\theta}_n = T_n(X_1,\ldots,X_n)
> $$
>
> used to estimate an unknown parameter $\theta$.
{: .ese-box .ese-definition}

A clean formulation should identify:

- What is observed.
- What is unknown.
- What constraints define the feasible parameter set.
- Whether the model is frequentist, Bayesian, or something more structured.

It is also important to distinguish the **parameter** from the **estimator** and the **estimate**:

$$
\theta \quad \text{is the fixed unknown quantity,}
$$

$$
\hat{\theta}_n=T_n(X_1,\ldots,X_n) \quad \text{is a random variable before data are observed,}
$$

and

$$
\hat{\theta}_n(x_1,\ldots,x_n)
$$

is the numerical estimate after observing a particular data set. Many mistakes in point estimation come from mixing these three objects. For example, when we compute $E_\theta[\hat{\theta}_n]$, the expectation is over new random samples generated under the fixed parameter value $\theta$.

### Identifiability

Before computing any estimator, ask whether the parameter is identifiable.

> **Definition (Identifiability):** A parameter $\theta$ is identifiable if
>
> $$
> p(x\mid \theta_1)=p(x\mid \theta_2)
> \text{ for all }x
> \quad \Longrightarrow \quad
> \theta_1=\theta_2.
> $$
{: .ese-box .ese-definition}

If identifiability fails, no estimator can reliably recover the parameter from the data distribution, even with infinitely many samples. For instance, if $X\sim N(\theta^2,1)$ and the parameter space is $\Theta=\mathbb{R}$, then $\theta$ and $-\theta$ produce the same distribution. The quantity $\theta^2$ is identifiable, but the signed parameter $\theta$ is not.

## Joint Models and Conditional Independence

For an iid random sample,

$$
p(x_1,\ldots,x_n\mid \theta)=\prod_{i=1}^n p(x_i\mid \theta).
$$

Not every model is iid. For example, an autoregressive model may have

$$
X_i = \alpha X_{i-1}+\epsilon_i,
\qquad
\epsilon_i \sim N(0,\sigma^2).
$$

In such models, the joint distribution is built from conditional distributions rather than a simple iid product.

For the AR(1) example, if an initial density $p(x_0)$ is specified, the joint density factors as

$$
p(x_0,x_1,\ldots,x_n\mid \alpha,\sigma^2)
=
p(x_0)\prod_{i=1}^n
p(x_i\mid x_{i-1},\alpha,\sigma^2).
$$

The conditional density is Gaussian:

$$
X_i\mid X_{i-1}=x_{i-1}
\sim
N(\alpha x_{i-1},\sigma^2).
$$

This factorization is often the difference between a tractable likelihood and an impossible-looking joint model.

## Sufficient Statistics

A statistic is sufficient when it retains all the sample information about the parameter that is present in the full data.

> **Definition (Sufficient Statistic):** A statistic $T(X_1,\ldots,X_n)$ is sufficient for $\theta$ if the conditional distribution of the full sample given $T$ does not depend on $\theta$.
{: .ese-box .ese-definition}

The main practical test is the factorization theorem.

> **Theorem (Factorization Theorem):** A statistic $T(X)$ is sufficient for $\theta$ if the joint density or mass function can be written as
>
> $$
> p(x\mid\theta)=g(T(x),\theta)h(x),
> $$
>
> where $h(x)$ does not depend on $\theta$.
{: .ese-box .ese-theorem}

Sufficiency matters because estimation can often be reduced from the full data vector to a lower-dimensional summary without losing information about $\theta$. For example, if $X_i\sim\mathrm{Bernoulli}(p)$ iid, then

$$
p(x_1,\ldots,x_n\mid p)
=
p^{\sum_i x_i}(1-p)^{n-\sum_i x_i},
$$

so $T(X)=\sum_i X_i$ is sufficient for $p$. The likelihood depends on the data only through the number of successes.

## Method of Moments

The method of moments matches theoretical moments to sample moments.

Let

$$
m_j(\theta)=E_\theta[X^j],
\qquad
\hat{m}_j=\frac{1}{n}\sum_{i=1}^n X_i^j.
$$

The method of moments estimator solves

$$
m_j(\hat{\theta})=\hat{m}_j,
\qquad j=1,\ldots,k.
$$

> **Definition (Method of Moments Estimator):** The method of moments estimator is obtained by equating enough theoretical moments to their empirical counterparts to solve for the unknown parameters.
{: .ese-box .ese-definition}

If the equations cannot be solved exactly, we may instead minimize a moment-matching loss.

> **Moment Identifiability:** Moment matching is meaningful only when the selected theoretical moments determine the parameter. If two different parameter values produce the same matched moments, the resulting estimator cannot distinguish them.
{: .ese-box .ese-note}

Moment methods are closely related to the uniqueness of moment generating functions: when the MGF exists around zero, the full sequence of moments determines the distribution. In practice, we usually match only enough low-order moments to identify the unknown parameters.

<details class="ese-proof">
<summary><strong>Why Moment Generating Functions Make Moments Useful</strong></summary>

The moment generating function is

$$
M_X(t)=E[e^{tX}].
$$

If $M_X(t)$ exists in an open interval around $0$, then its derivatives at $0$ are the raw moments:

$$
M_X^{(j)}(0)=E[X^j].
$$

Therefore, if two distributions have the same MGF near $0$, they have the same moments and, more importantly, the same distribution. This theorem does not say that one or two moments determine every model. It says that moments can characterize a distribution when enough of them are known and the MGF exists. Method of moments uses a finite-dimensional version of this idea: choose as many informative moments as there are unknown parameters.

</details>

## Example: Binomial Random Sample

Suppose

$$
X_i \sim \mathrm{Binomial}(N,p),
$$

where $N$ is known and $p$ is unknown. Since

$$
E[X_i]=Np,
$$

the first moment equation gives

$$
\bar{X}=N\hat{p},
\qquad
\hat{p}_{\mathrm{MOM}}=\frac{\bar{X}}{N}.
$$

## Example: Gamma Random Sample

Suppose $X_i \sim \mathrm{Gamma}(\alpha,\beta)$ with unknown shape and rate. A common parameterization has

$$
E[X]=\frac{\alpha}{\beta},
\qquad
\mathrm{Var}(X)=\frac{\alpha}{\beta^2}.
$$

The method of moments matches $\bar{X}$ and the sample variance to these two expressions, then solves for $\alpha$ and $\beta$.

Let

$$
\hat{v}
=
\frac{1}{n}\sum_{i=1}^n (X_i-\bar{X})^2.
$$

The moment equations are

$$
\bar{X}=\frac{\alpha}{\beta},
\qquad
\hat{v}=\frac{\alpha}{\beta^2}.
$$

Solving gives

$$
\hat{\alpha}_{\mathrm{MOM}}=\frac{\bar{X}^2}{\hat{v}},
\qquad
\hat{\beta}_{\mathrm{MOM}}=\frac{\bar{X}}{\hat{v}}.
$$

## Properties of Method of Moments

Method of moments estimators are often consistent under mild conditions. The intuition is:

$$
\hat{m}_j \xrightarrow{P} m_j(\theta),
$$

by the law of large numbers. If the mapping from moments to parameters is continuous and identifiable, the continuous mapping theorem carries convergence from moments to parameters.

However, method of moments estimators can be biased and may fall outside the feasible parameter set.

More formally, suppose the parameter is $d$-dimensional and we match $d$ moments. Let

$$
g(\theta)=
\begin{bmatrix}
E_\theta[X] \\
E_\theta[X^2] \\
\vdots \\
E_\theta[X^d]
\end{bmatrix},
\qquad
\hat{g}_n=
\begin{bmatrix}
\hat{m}_1\\
\hat{m}_2\\
\vdots\\
\hat{m}_d
\end{bmatrix}.
$$

If $g$ has a continuous inverse near the true parameter $\theta_0$, then

$$
\hat{\theta}_{\mathrm{MOM}}
=g^{-1}(\hat{g}_n)
\xrightarrow{P}
g^{-1}(g(\theta_0))
=\theta_0.
$$

If $g$ is differentiable and the matched sample moments satisfy a multivariate central limit theorem, then the delta method gives the limiting distribution:

$$
\sqrt{n}(\hat{\theta}_{\mathrm{MOM}}-\theta_0)
\xrightarrow{d}
N\left(0,
[Dg(\theta_0)]^{-1}\Sigma [Dg(\theta_0)]^{-T}
\right),
$$

where $\Sigma$ is the covariance matrix of the vector $(X,X^2,\ldots,X^d)^T$ under $\theta_0$. This is the theoretical reason method-of-moments estimators often behave normally in large samples, even when their finite-sample bias is not zero.

### Uniform Example and Feasibility

If $X_i\sim \mathrm{Uniform}(a,b)$, then

$$
E[X]=\frac{a+b}{2},
\qquad
\mathrm{Var}(X)=\frac{(b-a)^2}{12}.
$$

Matching the sample mean and variance gives

$$
\hat{a}=\bar{X}-\sqrt{3\hat{v}},
\qquad
\hat{b}=\bar{X}+\sqrt{3\hat{v}}.
$$

These estimates can be mathematically valid but practically awkward: the fitted interval may fail to contain the observed minimum or maximum. This illustrates why feasibility and model constraints still matter after solving the moment equations.

This example also shows the difference between moment matching and likelihood-based fitting. The likelihood for a uniform model is zero unless every observation lies inside the fitted interval. An MLE for $(a,b)$ must respect the sample minimum and maximum, while the moment estimator is driven only by $\bar{X}$ and $\hat{v}$.

## Maximum Likelihood Estimation

> **Definition (Likelihood Function):** For observed data $x_1,\ldots,x_n$, the likelihood is
>
> $$
> L(\theta;x_1,\ldots,x_n)=p(x_1,\ldots,x_n\mid \theta),
> $$
>
> interpreted as a function of $\theta$.
{: .ese-box .ese-definition}

The maximum likelihood estimator is

$$
\hat{\theta}_{\mathrm{MLE}}
= \arg\max_{\theta} L(\theta;x_1,\ldots,x_n).
$$

Equivalently, because the logarithm is monotone,

$$
\hat{\theta}_{\mathrm{MLE}}
= \arg\max_{\theta} \ell(\theta),
\qquad
\ell(\theta)=\log L(\theta).
$$

## Practical Steps for MLE

1. Write the likelihood.
2. Take the log likelihood.
3. Remove constants that do not depend on $\theta$.
4. Differentiate with respect to $\theta$.
5. Solve the first-order condition.
6. Check constraints and boundary cases.
7. If no closed form exists, use numerical optimization.

## Example: Binomial MLE

For $X_i\sim \mathrm{Binomial}(N,p)$ with $N$ known,

$$
L(p)
=
\prod_{i=1}^n {N\choose x_i}p^{x_i}(1-p)^{N-x_i}.
$$

Ignoring constants that do not depend on $p$,

$$
\ell(p)
=
\left(\sum_{i=1}^n x_i\right)\log p
+\left(nN-\sum_{i=1}^n x_i\right)\log(1-p).
$$

The score equation is

$$
\frac{\partial \ell}{\partial p}
=
\frac{\sum_i x_i}{p}
-
\frac{nN-\sum_i x_i}{1-p}
=0.
$$

Solving yields

$$
\hat{p}_{\mathrm{MLE}}
=
\frac{1}{nN}\sum_{i=1}^n X_i
=
\frac{\bar{X}}{N}.
$$

In this example the MLE and method of moments estimator agree.

### Boundary Cases

The derivative calculation assumes $0<p<1$. If all observed counts are zero, the likelihood is maximized at $p=0$. If every trial in every observation is a success, the likelihood is maximized at $p=1$. Boundary cases are not exceptions to MLE theory; they are a reminder that the full optimization problem is

$$
\max_{0\leq p\leq 1} L(p),
$$

not just the score equation inside the interval.

## Example: Gaussian MLE for Variance

Suppose

$$
X_1,\ldots,X_n\stackrel{\mathrm{iid}}{\sim}N(0,\sigma^2),
$$

and $\sigma^2>0$ is unknown. The likelihood is

$$
L(\sigma^2)
=
\prod_{i=1}^n
\frac{1}{\sqrt{2\pi\sigma^2}}
\exp\left(-\frac{x_i^2}{2\sigma^2}\right).
$$

The log likelihood, after dropping constants that do not depend on $\sigma^2$, is

$$
\ell(\sigma^2)
=
-\frac{n}{2}\log\sigma^2
-\frac{1}{2\sigma^2}\sum_{i=1}^n x_i^2.
$$

Let $v=\sigma^2$. Then

$$
\frac{d\ell}{dv}
=
-\frac{n}{2v}
+\frac{1}{2v^2}\sum_{i=1}^n x_i^2.
$$

Setting this equal to zero gives

$$
\hat{\sigma}^2_{\mathrm{MLE}}
=
\frac{1}{n}\sum_{i=1}^n X_i^2.
$$

The second derivative is negative at this solution:

$$
\frac{d^2\ell}{dv^2}
=
\frac{n}{2v^2}
-\frac{1}{v^3}\sum_{i=1}^n x_i^2,
$$

and substituting $v=\hat{\sigma}^2_{\mathrm{MLE}}$ gives

$$
\frac{d^2\ell}{dv^2}
=
-\frac{n}{2v^2}<0.
$$

Thus the stationary point is a local maximum. Since $\ell(v)\to -\infty$ as $v\to 0^+$ and as $v\to\infty$, it is also the global maximum.

## Comparing MOM and MLE

Method of moments and maximum likelihood often agree in simple one-parameter exponential-family models, such as Bernoulli or binomial models. They need not agree in general.

The method of moments is built from equations of the form

$$
\text{theoretical feature}=\text{empirical feature}.
$$

Maximum likelihood is built from the full probability assigned to the observed data. MOM can be easier and more robust to compute, while MLE tends to have stronger large-sample optimality properties under correct model specification. In finite samples, both methods must still be checked for bias, variance, feasibility, and sensitivity to modeling assumptions.

## Student Takeaways

- An estimator is a statistic designed to approximate an unknown parameter.
- Method of moments estimates parameters by matching moments.
- Consistency of MOM follows from the law of large numbers plus identifiability and continuity of the moment map.
- MLE chooses the parameter value that makes the observed data most likely.
- Closed forms are convenient, but many MLEs require constrained or numerical optimization.

<p class="ese-next"><a href="/teaching/ese-531/mle-properties-optimization/">Next: MLE Properties and Numerical Optimization</a></p>

</div>
