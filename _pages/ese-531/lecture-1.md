---
layout: single
title: "Lecture 1: Introduction to Statistical Inference"
permalink: /teaching/ese-531/lectures/lecture-1/
author_profile: true
toc: true
toc_label: "Lecture Outline"
---

# ESE 531: Statistical Inference and Estimation
## Lecture 1: Introduction to Statistical Inference

**Date:** [Insert Date]  
**Instructor:** Yousef El-Laham  
**Stony Brook University**

---

## Learning Objectives

By the end of this lecture, students will be able to:
- Define statistical inference and its key components
- Distinguish between descriptive and inferential statistics
- Understand the role of probability in statistical inference
- Identify different types of statistical problems

---

## 1. Course Overview

### What is Statistical Inference?

Statistical inference is the process of drawing conclusions about a **population** based on information obtained from a **sample**.

**Key Components:**
- **Population**: The entire group we want to study
- **Sample**: A subset of the population that we actually observe
- **Parameter**: A numerical characteristic of the population (usually unknown)
- **Statistic**: A numerical characteristic of the sample (calculated from observed data)

### Example
Suppose we want to estimate the average height of all students at Stony Brook University.
- **Population**: All students at Stony Brook University
- **Sample**: 100 randomly selected students
- **Parameter**: True average height of all students (unknown)
- **Statistic**: Average height of the 100 sampled students

---

## 2. Types of Statistical Problems

### 2.1 Estimation
**Goal**: Estimate unknown population parameters

**Types:**
- **Point Estimation**: Provide a single "best guess" for the parameter
- **Interval Estimation**: Provide a range of plausible values (confidence intervals)

**Example**: Estimate the mean $\mu$ of a normal distribution

### 2.2 Hypothesis Testing
**Goal**: Make decisions about population parameters based on sample evidence

**Process**: 
1. State null and alternative hypotheses
2. Collect sample data
3. Calculate test statistic
4. Make decision (reject or fail to reject null hypothesis)

**Example**: Test whether $H_0: \mu = \mu_0$ vs $H_1: \mu \neq \mu_0$

---

## 3. Mathematical Foundations

### 3.1 Random Variables and Distributions

Let $X_1, X_2, \ldots, X_n$ be a random sample from a population with:
- Probability density function (pdf): $f(x; \theta)$
- Unknown parameter: $\theta \in \Theta$

### 3.2 Likelihood Function

The **likelihood function** is:

$$L(\theta) = \prod_{i=1}^n f(x_i; \theta)$$

This function measures how likely the observed data is for different values of $\theta$.

### 3.3 Key Concepts for Next Lectures

1. **Sufficiency**: When does a statistic contain all relevant information about $\theta$?
2. **Unbiasedness**: When is an estimator "on target" on average?
3. **Consistency**: Does our estimator get better with more data?
4. **Efficiency**: Which estimator has the smallest variance?

---

## 4. Preview: Maximum Likelihood Estimation

One of the most important estimation methods we'll study:

**Idea**: Choose the parameter value $\hat{\theta}$ that maximizes the likelihood function.

$$\hat{\theta}_{MLE} = \arg\max_{\theta} L(\theta) = \arg\max_{\theta} \prod_{i=1}^n f(x_i; \theta)$$

Often easier to work with the **log-likelihood**:
$$\ell(\theta) = \log L(\theta) = \sum_{i=1}^n \log f(x_i; \theta)$$

---

## 5. Example: Normal Distribution

Suppose $X_1, \ldots, X_n \sim N(\mu, \sigma^2)$ where $\mu$ is unknown and $\sigma^2$ is known.

**Likelihood function:**
$$L(\mu) = \prod_{i=1}^n \frac{1}{\sqrt{2\pi\sigma^2}} \exp\left(-\frac{(x_i-\mu)^2}{2\sigma^2}\right)$$

**Log-likelihood:**
$$\ell(\mu) = -\frac{n}{2}\log(2\pi\sigma^2) - \frac{1}{2\sigma^2}\sum_{i=1}^n(x_i-\mu)^2$$

**MLE:** $\hat{\mu} = \bar{X} = \frac{1}{n}\sum_{i=1}^n X_i$

---

## Next Lecture

**Topic**: Sufficiency and the Factorization Theorem
- Definition of sufficient statistics
- Factorization theorem
- Minimal sufficient statistics

---

## Reading Assignment

- Review probability theory fundamentals
- Read Chapter 1 of course textbook
- Practice problems: [To be assigned]

---

[← Back to Lectures](/teaching/ese-531/lectures/) | [← Back to Course](/teaching/ese-531/)