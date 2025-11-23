---
layout: single
title: "Lecture 1: Introduction to Statistical Inference"
permalink: /teaching/ese-531/lectures/lecture-1/
author_profile: true
toc: true
toc_label: "Lecture Outline"
---

# ESE 531: Statistical Inference and Estimation
# Lecture 1: Probability Inequalities and Limit Theorems

**Date:** 01-31-2025  
**Instructor:** Yousef El-Laham  
**Stony Brook University**

---

## Sample Statistics

Given data $Y = (X_1, X_2, X_3, \ldots, X_n)$

- **Sample mean**: $\bar{X} = \frac{1}{n} \sum_{i=1}^{n} X_i$

- **Sample variance**: $S^2 = \frac{1}{n-1} \sum_{i=1}^{n} (X_i - \bar{X})^2$

### Properties of Sample Mean

**What is the mean and variance of $\bar{X}$?**

$$E[\bar{X}] = \mu = E[X]$$

$$V[\bar{X}] = \frac{\sigma^2}{n}$$ 

where $\sigma^2 = E[(X - \mu)^2]$

## Probability Inequalities

### Theorem: Markov's Inequality

Let $Y$ be a non-negative random variable. Then for any $h > 0$:

$$P(Y \geq h) \leq \frac{E[Y]}{h}$$

**Proof**: Assume $Y$ is a continuous RV with pdf $p(y)$

$$E[Y] = \int_0^{\infty} y \cdot p(y) dy$$

$$= \int_0^h y \cdot p(y) dy + \int_h^{\infty} y \cdot p(y) dy$$

$$\geq \int_h^{\infty} y \cdot p(y) dy$$

$$\geq \int_h^{\infty} h \cdot p(y) dy = h \int_h^{\infty} p(y) dy$$

$$= h \cdot P(Y \geq h)$$

Therefore: $E[Y] \geq h \cdot P(Y \geq h)$ ⟹ $P(Y \geq h) \leq \frac{E[Y]}{h}$ □

### Theorem: Chebyshev's Inequality

Let $Y$ be a random variable with finite non-zero variance $\sigma^2$. Then for any $k > 0$:

$$P(|Y - \mu| \geq k\sigma) \leq \frac{1}{k^2}$$

**Proof**:
$$P(|Y - \mu| \geq k\sigma) = P((Y - \mu)^2 \geq k^2\sigma^2)$$

$$\leq \frac{E[(Y - \mu)^2]}{k^2\sigma^2}$$

$$= \frac{\sigma^2}{k^2\sigma^2} = \frac{1}{k^2}$$ □

### Moment Generating Function (MGF)

For a random variable $X$:
$$M_X(t) = E[e^{tX}]$$

$$\frac{dM_X(t)}{dt}\bigg|_{t=0} = E[X]$$

### Theorem: Chernoff Bounds

Let $Y$ be a RV with MGF $M_Y(t)$ where $|t| < h$. Then for any $a$:

$$P(Y \geq a) \leq e^{-at} M_Y(t)$$ for $0 < t < h$

$$P(Y \leq a) \leq e^{-at} M_Y(t)$$ for $-h < t < 0$

**Proof**:
$$P(Y \geq a) = P(e^{tY} \geq e^{ta})$$ for $t > 0$

$$\leq \frac{E[e^{tY}]}{e^{ta}}$$ (by Markov's inequality)

$$= e^{-ta} M_Y(t)$$ □

## Laws of Large Numbers and Central Limit Theorem

### WLLN → SLLN → CLT

## Weak Law of Large Numbers (WLLN)

### Definition: Convergence in Probability

A sequence of random variables $X_1, X_2, \ldots$ converges in probability to a random variable $X$ if for every $\epsilon > 0$:

$$\lim_{n \to \infty} P(|X_n - X| < \epsilon) = 0$$

or equivalently:

$$\lim_{n \to \infty} P(|X_n - X| \leq \epsilon) = 1$$

Notation: $X_n \xrightarrow{P} X$

### Theorem: Weak Law of Large Numbers

Let $X_1, X_2, \ldots$ be i.i.d. random variables such that $E[X_i] = \mu$ and $V[X_i] = \sigma^2 < \infty$. Define $\bar{X}_n = \frac{1}{n}\sum_{i=1}^{n} X_i$. Then $\bar{X}_n \xrightarrow{P} \mu$.

**Proof**: 

$$P(|\bar{X}_n - \mu| \geq \epsilon) = P((\bar{X}_n - \mu)^2 \geq \epsilon^2)$$

$$\leq \frac{E[(\bar{X}_n - \mu)^2]}{\epsilon^2} = \frac{V[\bar{X}_n]}{\epsilon^2} = \frac{\sigma^2/n}{\epsilon^2} = \frac{\sigma^2}{n\epsilon^2}$$

$$\lim_{n \to \infty} P(|\bar{X}_n - \mu| \geq \epsilon) \leq \lim_{n \to \infty} \frac{\sigma^2}{n\epsilon^2} = 0$$

Therefore: $\lim_{n \to \infty} P(|\bar{X}_n - \mu| \geq \epsilon) = 0$ □

### Definition: Consistent Estimator

Let $\hat{\theta}$ be an estimator of $\theta$ s.t. $\hat{\theta}_n \xrightarrow{P} \theta$. Then $\hat{\theta}$ is said to be a consistent estimator of $\theta$.

**Example**: Consistency of Sample Variance

$$S_n^2 = \frac{1}{n-1} \sum_{i=1}^{n} (X_i - \bar{X})^2$$

$$E[S_n^2] = \sigma^2$$

If $V[S_n^2] \to 0$ as $n \to \infty$, then $S_n^2 \xrightarrow{P} \sigma^2$

### Theorem: Continuous Mapping Theorem

Suppose $X_1, X_2, \ldots$ converge in probability to $X$. Let $h$ be a continuous function. Then:
$$h(X_n) \xrightarrow{P} h(X)$$

## Strong Law of Large Numbers (SLLN)

### Definition: Almost Sure Convergence

A sequence of RVs $X_1, X_2, \ldots$ converges almost surely to a random variable $X$ if for every $\epsilon > 0$:

$$P\left(\lim_{n \to \infty} |X_n - X| < \epsilon\right) = 1$$

Notation: $X_n \xrightarrow{a.s.} X$

### Theorem: Strong Law of Large Numbers

Let $X_1, X_2, \ldots$ be i.i.d. random variables such that $E[X_i] = \mu$ and $V[X_i] = \sigma^2 < \infty$. Define $\bar{X}_n = \frac{1}{n}\sum_{i=1}^{n} X_i$. Then for every $\epsilon > 0$:

$$P\left(\lim_{n \to \infty} |\bar{X}_n - \mu| < \epsilon\right) = 1$$

or $\bar{X}_n \xrightarrow{a.s.} \mu$

## Central Limit Theorem (CLT)

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

### Theorem: Slutsky's Theorem

If $X_n \xrightarrow{d} X$ and $Y_n \xrightarrow{P} a$, then:
- $X_n + Y_n \xrightarrow{d} X + a$
- $X_n Y_n \xrightarrow{d} aX$

### Theorem: Delta Method

Let $Y_n$ be a sequence of RVs that satisfies:
$$\sqrt{n}(Y_n - \theta) \xrightarrow{d} N(0, \sigma^2)$$

For a given function $h$ whose derivative exists and we denote it by $h'$. Then:
$$\sqrt{n}(h(Y_n) - h(\theta)) \xrightarrow{d} N(0, \sigma^2[h'(\theta)]^2)$$

## Additional Notes

- **Point mass/Delta function/Dirac measure**: Random variable s.t. $P(X = \mu) = 1$, otherwise $P(X \neq \mu) = 0$

- **Sifting property**: $\int f(x)\delta_\mu(x)dx = f(\mu)$

- **Discussion**: If $\sigma$ is unknown, we can replace $\sigma$ in the CLT equation with a consistent estimator $\hat{\sigma} = \sqrt{S_n^2}$
[← Back to Lectures](/teaching/ese-531/lectures/) | [← Back to Course](/teaching/ese-531/)