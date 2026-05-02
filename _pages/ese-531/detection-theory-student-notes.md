---
layout: single
title: "Student Notes: Detection Theory Examples"
permalink: /teaching/ese-531/lectures/detection-theory-student-notes/
author_profile: true
toc: true
toc_label: "Notes Outline"
---

These notes rewrite the April 17 student notes into a clean reference for the main detection-theory examples.

## Hypotheses

A detection problem starts with two competing descriptions of the world:

$$
H_0: \text{regular or null state},
\qquad
H_1: \text{alternative state}.
$$

Given data $X_1,\ldots,X_n$, the goal is to decide which hypothesis better explains the observations.

## Aircraft Detection Example

A simple radar model can be written as:

$$
H_0: \text{no aircraft},
\qquad
H_1: \text{aircraft present}.
$$

If aircraft presence changes the mean amplitude of the received signal, a mean-based detector is natural.

## Mean Change Example

Suppose the observed signal is

$$
X_i = \epsilon_i,
\qquad
\epsilon_i\sim N(0,\sigma^2)
$$

under $H_0$, and

$$
X_i = \mu+\epsilon_i
$$

under $H_1$.

The sample mean

$$
\bar{X}=\frac{1}{n}\sum_{i=1}^n X_i
$$

is informative because it shifts under $H_1$.

## Likelihood Ratio

The likelihood ratio is

$$
\Lambda(x)
=
\frac{p(x\mid H_1)}{p(x\mid H_0)}.
$$

If $\Lambda(x)$ is large, the data are more likely under $H_1$ than under $H_0$.

The Neyman-Pearson test compares this ratio to a threshold:

$$
\Lambda(x)>\eta.
$$

Taking logarithms is usually easier:

$$
\log\Lambda(x)>\log\eta.
$$

Because the logarithm is monotone, this does not change the decision rule. It only turns products of densities into sums of log densities.

## Threshold Selection

The threshold should be chosen to control false alarms:

$$
P_{\mathrm{FA}}
=P(\text{decide }H_1\mid H_0).
$$

For Gaussian mean-shift problems, this threshold can be translated into a threshold on $\bar{X}$ using the normal CDF.

For the one-sample example

$$
H_0:X\sim N(0,1),
\qquad
H_1:X\sim N(1,1),
$$

the likelihood ratio is

$$
\Lambda(x)
=
\frac{\exp[-(x-1)^2/2]}{\exp[-x^2/2]}
=
\exp\left(x-\frac{1}{2}\right).
$$

Thus $\Lambda(x)>\eta$ is equivalent to

$$
x>\log\eta+\frac{1}{2}.
$$

The threshold on $x$ is then chosen to make the false alarm probability equal to the desired value.

## Variance Change Example

If the hypotheses differ in variance rather than mean, a natural statistic is the energy:

$$
Y=\sum_{i=1}^n X_i^2.
$$

Under a Gaussian null model,

$$
\frac{Y}{\sigma_0^2}\sim \chi_n^2.
$$

This makes chi-squared quantiles useful for setting thresholds.

For $n$ samples, the false alarm equation has the form

$$
P\left(\chi_n^2>\frac{\gamma}{\sigma_0^2}\right)=\alpha
$$

when the rejection region is $Y>\gamma$. Solving this equation gives the detector threshold.

## Change-Point Interpretation

Detection theory can also be used for change-point problems. Here the question is whether the data continue to follow a baseline distribution or whether the distribution has changed.

The hypotheses might be:

$$
H_0: X_i \sim p_0,
\qquad
H_1: X_i \sim p_1.
$$

The likelihood ratio compares how well the two distributions explain the observed sequence.

## Student Takeaways

- A detector converts data into a decision.
- The likelihood ratio measures relative evidence for $H_1$ versus $H_0$.
- Thresholds control the tradeoff between missed detections and false alarms.
- Mean changes lead to average-based detectors; variance changes lead to energy-based detectors.
