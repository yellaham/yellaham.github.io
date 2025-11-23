---
layout: single
title: "Lecture 1: Introduction to Statistical Inference"
permalink: /teaching/ese-531/lectures/lecture-1/
author_profile: true
toc: true
toc_label: "Lecture Outline"
---

# ESE 531: Statistical Inference and Estimation
# Lecture 1: Random Samples, Probability Inequalities, Limit Theorems

**Date:** 01-31-2025  
**Instructor:** Yousef El-Laham  
**Stony Brook University**

---

## Population and Random Sample

**Definition (Population):** A **population** is the complete collection of all elements (observations, individuals, measurements) that we want to study. The population is characterized by some probability distribution with unknown parameters.

**Definition (Random Sample):** A **random sample** of size $n$ from a population is a collection of $n$ random variables $X_1, X_2, \ldots, X_n$ such that:
1. Each $X_i$ has the same distribution as the population (identical distribution)
2. The random variables $X_1, X_2, \ldots, X_n$ are mutually independent

We denote this as $X_1, X_2, \ldots, X_n \stackrel{\text{iid}}{\sim} F$, where $F$ is the population distribution.

**Example:** If we want to study the heights of all college students in the US (population), we might randomly select 100 students and measure their heights. The measurements $X_1, X_2, \ldots, X_{100}$ would form a random sample.

## Sample Statistics

In statistical inference, we begin by observing data from a random sample. Let's define some fundamental quantities that we'll use throughout the course.

Given data $Y = (X_1, X_2, X_3, \ldots, X_n)$ where each $X_i$ is an independent observation from the same distribution, we can define:

- **Sample mean**: $\bar{X} = \frac{1}{n} \sum_{i=1}^{n} X_i$

- **Sample variance**: $S^2 = \frac{1}{n-1} \sum_{i=1}^{n} (X_i - \bar{X})^2$

These are our most basic **statistics** - functions of the observed data that help us understand the underlying population.

### Properties of Sample Mean

A natural question arises: what can we say about the behavior of $\bar{X}$? Since $\bar{X}$ is itself a random variable (being a function of random variables), it has its own distribution.

**What is the mean and variance of $\bar{X}$?**

$$E[\bar{X}] = \mu = E[X]$$

$$V[\bar{X}] = \frac{\sigma^2}{n}$$ 

where $\sigma^2 = E[(X - \mu)^2]$

Notice something important: as $n$ increases, $V[\bar{X}]$ decreases! This tells us that larger samples give us more precise estimates of $\mu$.

## Probability Inequalities

Before we can establish the fundamental limit theorems of statistics, we need some tools to bound the probability that random variables deviate from their expected values. Probability inequalities provide these bounds and are essential for proving convergence results.

### Theorem: Markov's Inequality

Let $Y$ be a non-negative random variable. Then for any $h > 0$:

$$P(Y \geq h) \leq \frac{E[Y]}{h}$$

**Proof**: Assume $Y$ is a continuous RV with pdf $p(y)$

$$\begin{aligned}
E[Y] &= \int_0^{\infty} y \cdot p(y) \, dy \\
&= \int_0^h y \cdot p(y) \, dy + \int_h^{\infty} y \cdot p(y) \, dy \\
&\geq \int_h^{\infty} y \cdot p(y) \, dy \\
&\geq \int_h^{\infty} h \cdot p(y) \, dy \\
&= h \int_h^{\infty} p(y) \, dy \\
&= h \cdot P(Y \geq h)
\end{aligned}$$

Therefore: $E[Y] \geq h \cdot P(Y \geq h)$ ⟹ $P(Y \geq h) \leq \frac{E[Y]}{h}$ □

Markov's inequality gives us our first probabilistic bound, but it's quite loose. We can do better if we know something about the variance of our random variable.

### Theorem: Chebyshev's Inequality

Let $Y$ be a random variable with finite non-zero variance $\sigma^2$. Then for any $k > 0$:

$$P(\lvert Y - \mu \rvert \geq k\sigma) \leq \frac{1}{k^2}$$

**Proof**:
$$\begin{aligned}
P(\lvert Y - \mu \rvert \geq k\sigma) &= P((Y - \mu)^2 \geq k^2\sigma^2) \\
&\leq \frac{E[(Y - \mu)^2]}{k^2\sigma^2} \quad \text{(by Markov's inequality)} \\
&= \frac{\sigma^2}{k^2\sigma^2} \\
&= \frac{1}{k^2}
\end{aligned}$$ □

Chebyshev's inequality is much more useful than Markov's because it depends on $k^2$ rather than $k$. For instance, the probability that a random variable deviates from its mean by more than 2 standard deviations is at most $1/4 = 0.25$.

### Moment Generating Function (MGF)

To get even tighter bounds, we can use moment generating functions. The MGF is a powerful tool that, when it exists, uniquely characterizes a distribution.

For a random variable $X$:
$$M_X(t) = E[e^{tX}]$$

$$\frac{dM_X(t)}{dt}\bigg|_{t=0} = E[X]$$

### Theorem: Chernoff Bounds

Let $Y$ be a RV with MGF $M_Y(t)$ where $\lvert t \rvert < h$. Then for any $a$:

$$P(Y \geq a) \leq e^{-at} M_Y(t)$$ for $0 < t < h$

$$P(Y \leq a) \leq e^{-at} M_Y(t)$$ for $-h < t < 0$

**Proof**:
$$\begin{aligned}
P(Y \geq a) &= P(e^{tY} \geq e^{ta}) \quad \text{for } t > 0 \\
&\leq \frac{E[e^{tY}]}{e^{ta}} \quad \text{(by Markov's inequality)} \\
&= e^{-ta} M_Y(t)
\end{aligned}$$ □

Chernoff bounds can be much tighter than Chebyshev's inequality, especially for distributions with well-behaved MGFs. The key is to optimize over the choice of $t$.

## Laws of Large Numbers and Central Limit Theorem

Now we're ready to establish the fundamental limit theorems that justify statistical inference. These theorems tell us what happens to sample statistics as the sample size grows large.

### The Hierarchy: WLLN → SLLN → CLT

We'll study three increasingly strong results:
1. **Weak Law of Large Numbers (WLLN)**: Sample mean converges in probability to population mean
2. **Strong Law of Large Numbers (SLLN)**: Sample mean converges almost surely to population mean  
3. **Central Limit Theorem (CLT)**: Sample mean is approximately normally distributed for large $n$

## Weak Law of Large Numbers (WLLN)

The WLLN formalizes our intuition that averages of independent observations should converge to the true population mean. But first, we need to be precise about what "converge" means.

### Definition: Convergence in Probability

A sequence of random variables $X_1, X_2, \ldots$ converges in probability to a random variable $X$ if for every $\epsilon > 0$:

$$\lim_{n \to \infty} P(\lvert X_n - X \rvert < \epsilon) = 0$$

or equivalently:

$$\lim_{n \to \infty} P(\lvert X_n - X \rvert \leq \epsilon) = 1$$

Notation: $X_n \xrightarrow{P} X$

### Theorem: Weak Law of Large Numbers

Let $X_1, X_2, \ldots$ be i.i.d. random variables such that $E[X_i] = \mu$ and $V[X_i] = \sigma^2 < \infty$. Define $\bar{X}_n = \frac{1}{n} \sum_{i=1}^{n} X_i$. Then $\bar{X}_n \xrightarrow{P} \mu$.

**Proof**: 

$$\begin{aligned}
P(\lvert\bar{X}_n - \mu\rvert \geq \epsilon) &= P((\bar{X}_n - \mu)^2 \geq \epsilon^2) \\
&\leq \frac{E[(\bar{X}_n - \mu)^2]}{\epsilon^2} \quad \text{(by Markov's inequality)} \\
&= \frac{V[\bar{X}_n]}{\epsilon^2} \\
&= \frac{\sigma^2/n}{\epsilon^2} \\
&= \frac{\sigma^2}{n\epsilon^2}
\end{aligned}$$

Taking the limit:
$$\lim_{n \to \infty} P(\lvert\bar{X}_n - \mu\rvert \geq \epsilon) \leq \lim_{n \to \infty} \frac{\sigma^2}{n\epsilon^2} = 0$$

Therefore: $\lim_{n \to \infty} P(\lvert\bar{X}_n - \mu\rvert \geq \epsilon) = 0$ □

This is a beautiful result! It says that no matter how small $\epsilon > 0$ we choose, we can make the probability that $\bar{X}_n$ is more than $\epsilon$ away from $\mu$ arbitrarily small by taking $n$ large enough.

### Definition: Consistent Estimator

Let $\hat{\theta}$ be an estimator of $\theta$ s.t. $\hat{\theta}_n \xrightarrow{P} \theta$. Then $\hat{\theta}$ is said to be a consistent estimator of $\theta$.

**Example**: Consistency of Sample Variance

$$S_n^2 = \frac{1}{n-1} \sum_{i=1}^{n} (X_i - \bar{X})^2$$

$$E[S_n^2] = \sigma^2$$

If $V[S_n^2] \to 0$ as $n \to \infty$, then $S_n^2 \xrightarrow{P} \sigma^2$

Consistency is a fundamental property we want our estimators to have - it means they get better as we collect more data.

### Theorem: Continuous Mapping Theorem

Suppose $X_1, X_2, \ldots$ converge in probability to $X$. Let $h$ be a continuous function. Then:
$$h(X_n) \xrightarrow{P} h(X)$$

## Strong Law of Large Numbers (SLLN)

While the WLLN tells us about convergence in probability, the SLLN gives us a stronger form of convergence. The difference is subtle but important.

### Definition: Almost Sure Convergence

A sequence of RVs $X_1, X_2, \ldots$ converges almost surely to a random variable $X$ if for every $\epsilon > 0$:

$$P\left(\lim_{n \to \infty} \lvert X_n - X \rvert < \epsilon\right) = 1$$

Notation: $X_n \xrightarrow{a.s.} X$

### Theorem: Strong Law of Large Numbers

Let $X_1, X_2, \ldots$ be i.i.d. random variables such that $E[X_i] = \mu$ and $V[X_i] = \sigma^2 < \infty$. Define $\bar{X}_n = \frac{1}{n}\sum_{i=1}^{n} X_i$. Then for every $\epsilon > 0$:

$$P\left(\lim_{n \to \infty} \lvert\bar{X}_n - \mu\rvert < \epsilon\right) = 1$$

or $\bar{X}_n \xrightarrow{a.s.} \mu$

The SLLN tells us that the sample mean doesn't just get close to $\mu$ in probability, but that it actually converges to $\mu$ with probability 1. This is a stronger statement than the WLLN.

## Central Limit Theorem (CLT)

The Laws of Large Numbers tell us that $\bar{X}_n \to \mu$, but they don't tell us about the **rate** of convergence or the **distribution** of the error $\bar{X}_n - \mu$. The Central Limit Theorem answers both questions.

### Definition: Convergence in Distribution

A sequence of random variables $X_1, X_2, \ldots$ is said to converge in distribution to $X$ if:

$$\lim_{n \to \infty} F_{X_n}(x) = F_X(x)$$

at all points where $F_X$ is continuous.

Notation: $X_n \xrightarrow{d} X$

### Theorem: Central Limit Theorem

Let $X_1, X_2, \ldots$ be a sequence of i.i.d. RVs whose MGFs exist. Let $E[X_i] = \mu$ and $V[X_i] = \sigma^2$. Define $\bar{X}_n = \frac{1}{n}\sum_{i=1}^{n} X_i$. Let $G_n(x)$ denote the CDF of the RV:

$$Z_n = \frac{\sqrt{n}(\bar{X}_n - \mu)}{\sigma}$$

Then for any $x \in \mathbb{R}$:

$$\lim_{n \to \infty} G_n(x) = \int_{-\infty}^{x} \frac{1}{\sqrt{2\pi}} e^{-y^2/2} dy$$

That is: $\sqrt{n}(\bar{X}_n - \mu) \xrightarrow{d} N(0, \sigma^2)$

This is remarkable! Regardless of the original distribution of $X_i$, the standardized sample mean converges to a standard normal distribution. This universality is what makes the CLT so powerful in statistics.

### Theorem: Slutsky's Theorem

Sometimes we need to combine convergence results. Slutsky's theorem helps us do this.

If $X_n \xrightarrow{d} X$ and $Y_n \xrightarrow{P} a$, then:
- $X_n + Y_n \xrightarrow{d} X + a$
- $X_n Y_n \xrightarrow{d} aX$

### Theorem: Delta Method

Let $Y_n$ be a sequence of RVs that satisfies:
$$\sqrt{n}(Y_n - \theta) \xrightarrow{d} N(0, \sigma^2)$$

For a given function $h$ whose derivative exists and we denote it by $h'$. Then:
$$\sqrt{n}(h(Y_n) - h(\theta)) \xrightarrow{d} N(0, \sigma^2[h'(\theta)]^2)$$

The Delta Method is incredibly useful when we want to find the asymptotic distribution of transformations of our estimators. For example, if we have a CLT for $\bar{X}_n$, the Delta Method gives us a CLT for $\log(\bar{X}_n)$ or $\bar{X}_n^2$.

## Additional Notes

- **Point mass/Delta function/Dirac measure**: Random variable s.t. $P(X = \mu) = 1$, otherwise $P(X \neq \mu) = 0$

- **Sifting property**: $\int f(x)\delta_\mu(x)dx = f(\mu)$

- **Discussion**: In practice, $\sigma$ is usually unknown, so we replace it with a consistent estimator $\hat{\sigma} = \sqrt{S_n^2}$. By Slutsky's theorem, this doesn't affect the limiting distribution.

## Looking Ahead

In our next lecture, we'll use these foundational results to study **sufficiency** - the idea that some statistics contain all the relevant information about unknown parameters. This will lead us toward optimal estimation procedures.

---

[← Back to Course](/teaching/ese-531/)