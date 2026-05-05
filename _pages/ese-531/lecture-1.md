---
layout: single
title: "Random Samples and Sample Statistics"
permalink: /teaching/ese-531/random-samples/
redirect_from:
  - /teaching/ese-531/lectures/lecture-1/
author_profile: true
toc: true
toc_label: "Topic Outline"
---

<div class="ese-531" markdown="1">

Statistical inference begins by treating the observed data as one realized random sample from an underlying population model. This page sets up the core objects that later estimation, testing, and Bayesian methods all reuse.

<p class="ese-demo-callout"><span>Companion demo</span><a href="/teaching/ese-531/demos/random-samples/">Explore sampling variability of means and variances.</a></p>

## Population and Random Sample

> **Definition (Population):** A population is the complete collection of observations, individuals, measurements, or outcomes that we want to study. In this course, the population is represented by a probability distribution, often with unknown parameters.
{: .ese-box .ese-definition}

> **Definition (Random Sample):** A random sample of size $n$ from a population is a collection of random variables $X_1, X_2,\ldots,X_n$ such that each $X_i$ has the same distribution as the population and the random variables are mutually independent.
>
> We write this as
>
> $$
> X_1,X_2,\ldots,X_n \stackrel{\mathrm{iid}}{\sim} F,
> $$
>
> where $F$ is the population distribution.
{: .ese-box .ese-definition}

If we want to study heights of college students, the population is the full group of interest and the random sample is the collection of measured heights from selected students. The model says what distribution might have generated those measurements.

## Sample Statistics

In statistical inference, we usually do not observe the full population. We observe data

$$
Y=(X_1,X_2,\ldots,X_n)
$$

and compute summaries of the sample.

> **Definition (Statistic):** A statistic is a function of the observed data. It may not depend on an unknown parameter.
{: .ese-box .ese-definition}

The two basic statistics used throughout the course are the sample mean and sample variance:

$$
\bar{X}_n=\frac{1}{n}\sum_{i=1}^n X_i,
$$

and

$$
S_n^2=\frac{1}{n-1}\sum_{i=1}^n (X_i-\bar{X}_n)^2.
$$

Both are random variables before the data are observed. Once data are plugged in, they become numerical summaries.

## Sampling Distribution of the Sample Mean

Suppose the population has mean

$$
E[X_i]=\mu
$$

and variance

$$
\mathrm{Var}(X_i)=\sigma^2<\infty.
$$

Then

$$
E[\bar{X}_n]=\mu
$$

and, using independence,

$$
\mathrm{Var}(\bar{X}_n)=\frac{\sigma^2}{n}.
$$

> **Note:** Averaging reduces variance. The sample mean is centered at the population mean, and its spread shrinks like $1/n$.
{: .ese-box .ese-note}

This simple variance calculation explains why collecting more independent data improves precision. It does not yet say that $\bar{X}_n$ converges to $\mu$ or becomes approximately normal; those are limit-theory results developed in the next topic.

## Sample Variance

The sample variance

$$
S_n^2=\frac{1}{n-1}\sum_{i=1}^n (X_i-\bar{X}_n)^2
$$

uses $n-1$ rather than $n$ because the sample mean has already been estimated from the same data. This is Bessel's correction. It makes $S_n^2$ unbiased for $\sigma^2$ under iid sampling:

$$
E[S_n^2]=\sigma^2.
$$

If the population mean $\mu$ were known, the estimator

$$
\frac{1}{n}\sum_{i=1}^n (X_i-\mu)^2
$$

would be unbiased. When $\mu$ is unknown and replaced by $\bar{X}_n$, one degree of freedom is spent estimating the center.

## Estimators, Estimates, and Parameters

A parameter is the unknown quantity that indexes the population model. An estimator is a statistic designed to estimate that parameter, and an estimate is the numerical value after observing data.

> **Definition (Estimator):** An estimator of a parameter $\theta$ is a statistic
>
> $$
> \hat{\theta}_n=T_n(X_1,\ldots,X_n).
> $$
{: .ese-box .ese-definition}

For example, $\bar{X}_n$ is an estimator of $\mu$. Before sampling it is random; after observing $x_1,\ldots,x_n$, the estimate is

$$
\bar{x}_n=\frac{1}{n}\sum_{i=1}^n x_i.
$$

Keeping these roles separate prevents many mistakes. When we write $E_\theta[\hat{\theta}_n]$, the expectation is over repeated random samples generated under a fixed parameter value $\theta$.

## Looking Ahead

The next topic studies probability inequalities and limit theorems. Those results explain when sample statistics concentrate, when estimators are consistent, and why normal approximations appear so often.

<p class="ese-next"><a href="/teaching/ese-531/probability-inequalities-limit-theorems/">Next: Probability Inequalities and Limit Theorems</a></p>

</div>
