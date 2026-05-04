---
layout: single
title: "Detection Theory"
permalink: /teaching/ese-531/detection-theory/
redirect_from:
  - /teaching/ese-531/lectures/detection-theory/
author_profile: true
toc: true
toc_label: "Topic Outline"
---

<div class="ese-531" markdown="1">

Detection theory studies how to choose between competing hypotheses from observed data. The central problem is balancing missed detections against false alarms.

## Gaussian Review

If

$$
X\sim N(\mu,\sigma^2),
$$

then the standardized variable

$$
Z=\frac{X-\mu}{\sigma}
$$

has distribution $N(0,1)$.

The standard normal CDF is

$$
\Phi(a)=P(Z\leq a).
$$

The complementary CDF, or survival function, is

$$
Q(a)=P(Z>a)=1-\Phi(a).
$$

If $X\sim N(\mu,\sigma^2)$, then

$$
P(X>\gamma)
=
Q\left(\frac{\gamma-\mu}{\sigma}\right),
$$

and

$$
P(X\leq \gamma)
=
\Phi\left(\frac{\gamma-\mu}{\sigma}\right).
$$

These two standardization identities are the main tools for converting detector thresholds into false alarm and detection probabilities.

## Chi-Squared Random Variables

If $Z_1,\ldots,Z_k$ are iid standard normal random variables, then

$$
Y=\sum_{i=1}^k Z_i^2
$$

has a chi-squared distribution with $k$ degrees of freedom.

Chi-squared distributions appear naturally when detection statistics are sums of squared Gaussian observations.

## Binary Hypothesis Testing

A binary hypothesis test chooses between

$$
H_0: \text{null hypothesis},
\qquad
H_1: \text{alternative hypothesis}.
$$

For example, in radar detection:

$$
H_0: \text{no aircraft},
\qquad
H_1: \text{aircraft present}.
$$

A detector maps observed data to a decision:

$$
\delta(x)\in\{H_0,H_1\}.
$$

There are two common design philosophies:

- **Neyman-Pearson:** constrain the false alarm probability and maximize detection probability.
- **Bayesian:** assign prior probabilities and costs, then minimize expected loss.

The same likelihood ratio appears in both approaches, but the threshold is chosen for different reasons.

## False Alarm and Detection Probability

If a test rejects $H_0$ when a statistic $T(X)$ exceeds a threshold $\gamma$, then

$$
P_{\mathrm{FA}}
= P(T(X)>\gamma\mid H_0),
$$

and

$$
P_D
= P(T(X)>\gamma\mid H_1).
$$

Choosing $\gamma$ controls the tradeoff. A small threshold increases detections but also increases false alarms.

## Neyman-Pearson Lemma

> **Neyman-Pearson Lemma:** For testing a simple null hypothesis against a simple alternative, the most powerful test at false alarm level $\alpha$ rejects $H_0$ when the likelihood ratio exceeds a threshold.
{: .ese-box .ese-theorem}

The likelihood ratio is

$$
\Lambda(x)=\frac{p(x\mid H_1)}{p(x\mid H_0)}.
$$

If a sufficient statistic $T(X)$ exists for the family under both hypotheses, the factorization theorem often makes the likelihood ratio a function of $T(X)$ alone. This is why Gaussian mean-shift detection reduces to the sample mean and Gaussian variance-change detection reduces to the energy statistic.

The test is

$$
\Lambda(x)>\eta.
$$

The threshold $\eta$ is chosen so that

$$
P_{\mathrm{FA}}\leq\alpha.
$$

In continuous problems the threshold can usually be chosen so equality holds. In discrete problems, exact equality may require randomization at the boundary.

Different thresholds trace out a receiver operating characteristic curve: each threshold gives one pair $(P_{\mathrm{FA}},P_D)$. The ROC curve summarizes the achievable tradeoff between false alarms and detections.

<details class="ese-proof">
<summary><strong>Proof Idea for Neyman-Pearson</strong></summary>

Let $R$ be the rejection region where the detector decides $H_1$. The optimization problem is

$$
\max_R \int_R p_1(x)\,dx
\qquad
\text{subject to}
\qquad
\int_R p_0(x)\,dx\leq \alpha.
$$

The Lagrangian is

$$
\int_R p_1(x)\,dx
-\lambda\left(\int_R p_0(x)\,dx-\alpha\right)
=
\int_R [p_1(x)-\lambda p_0(x)]\,dx+\lambda\alpha.
$$

For a fixed $\lambda$, the integral is maximized by including exactly those points where

$$
p_1(x)-\lambda p_0(x)>0,
$$

or equivalently

$$
\frac{p_1(x)}{p_0(x)}>\lambda.
$$

The multiplier $\lambda$ is then selected so the false alarm constraint is satisfied. This gives the likelihood-ratio test.

</details>

## Gaussian Mean Shift Example

Suppose

$$
H_0: X_i\sim N(0,\sigma^2),
\qquad
H_1: X_i\sim N(\mu,\sigma^2),
$$

with $\mu$ and $\sigma^2$ known.

For $\mu>0$, the likelihood ratio test is equivalent to thresholding the sample mean:

$$
\bar{X}>\gamma.
$$

<details class="ese-proof">
<summary><strong>Derivation</strong></summary>

The log likelihood ratio is

$$
\log \Lambda(x)
=
\sum_{i=1}^n
\left[
-\frac{(x_i-\mu)^2}{2\sigma^2}
+\frac{x_i^2}{2\sigma^2}
\right].
$$

Expanding the square,

$$
\log \Lambda(x)
=
\frac{\mu}{\sigma^2}\sum_{i=1}^n x_i
-
\frac{n\mu^2}{2\sigma^2}.
$$

For $\mu>0$, this is an increasing function of $\sum_i x_i$, so the likelihood-ratio test is equivalent to thresholding $\bar{X}$ from above. For $\mu<0$, the inequality reverses and small values of $\bar{X}$ support $H_1$.

</details>

Under $H_0$,

$$
\bar{X}\sim N\left(0,\frac{\sigma^2}{n}\right).
$$

For this continuous Gaussian model, choose the threshold so the false alarm constraint is active:

$$
\gamma = \frac{\sigma}{\sqrt{n}}Q^{-1}(\alpha).
$$

Under $H_1$,

$$
\bar{X}\sim N\left(\mu,\frac{\sigma^2}{n}\right).
$$

For $\mu>0$, the resulting detection probability is

$$
P_D
=
P(\bar{X}>\gamma\mid H_1)
=
Q\left(Q^{-1}(\alpha)-\frac{\mu\sqrt{n}}{\sigma}\right).
$$

The quantity

$$
\mathrm{SNR}_{\mathrm{det}}
=
\frac{\mu\sqrt{n}}{\sigma}
$$

is the separation between the null and alternative distributions of $\bar{X}$ in standard-deviation units. Larger mean shift, smaller noise, or more samples all improve detection by increasing this separation.

## Gaussian Variance Change Example

Suppose

$$
H_0: X_i\sim N(0,\sigma_0^2),
\qquad
H_1: X_i\sim N(0,\sigma_1^2),
$$

where both variances are known.

The likelihood ratio depends on the energy statistic

$$
Y=\sum_{i=1}^n X_i^2.
$$

The log likelihood ratio is

$$
\log\Lambda(x)
=
n\log\frac{\sigma_0}{\sigma_1}
+
\frac{1}{2}
\left(
\frac{1}{\sigma_0^2}
-
\frac{1}{\sigma_1^2}
\right)
\sum_{i=1}^n x_i^2.
$$

Under $H_0$,

$$
\frac{Y}{\sigma_0^2}\sim \chi_n^2.
$$

The threshold can therefore be set using chi-squared quantiles.

If $\sigma_1^2>\sigma_0^2$, large values of $Y$ provide evidence for $H_1$. If $\sigma_1^2<\sigma_0^2$, small values of $Y$ provide evidence for $H_1$. The direction of the rejection region comes from the likelihood ratio, not from the statistic alone.

For the increasing-variance case $\sigma_1^2>\sigma_0^2$, choose $\gamma$ so

$$
P_{\mathrm{FA}}
=
P(Y>\gamma\mid H_0)
=
P\left(\chi_n^2>\frac{\gamma}{\sigma_0^2}\right)
=
\alpha.
$$

Thus

$$
\gamma
=
\sigma_0^2\chi^2_{n,1-\alpha},
$$

where $\chi^2_{n,1-\alpha}$ is the $(1-\alpha)$ quantile of the chi-squared distribution with $n$ degrees of freedom. The detection probability is

$$
P_D
=
P(Y>\gamma\mid H_1)
=
P\left(\chi_n^2>\frac{\gamma}{\sigma_1^2}\right).
$$

For the decreasing-variance case $\sigma_1^2<\sigma_0^2$, the rejection region is $Y<\gamma$, and the threshold is set from

$$
P\left(\chi_n^2<\frac{\gamma}{\sigma_0^2}\right)=\alpha.
$$

## Bayesian Detection and Bayes Risk

In a Bayesian detector, hypotheses have prior probabilities and decision errors have costs.

The Bayes risk is the expected cost:

$$
R
=
\sum_i\sum_j C_{ij}P(\text{decide }H_i\mid H_j)P(H_j).
$$

The optimal Bayesian decision minimizes conditional expected risk. After observing $x$, compute for each possible decision $d_i$:

$$
r(d_i\mid x)
=
\sum_j C_{ij}P(H_j\mid x).
$$

Choose the decision with smallest $r(d_i\mid x)$. With zero-one loss, this reduces to choosing the hypothesis with largest posterior probability.

For equal costs and two hypotheses, this often reduces to choosing the hypothesis with the larger posterior probability.

For two hypotheses, the Bayes rule can be written as a likelihood-ratio test with a cost-and-prior threshold. Decide $H_1$ if

$$
\Lambda(x)
=
\frac{p(x\mid H_1)}{p(x\mid H_0)}
>
\frac{(C_{10}-C_{00})P(H_0)}
{(C_{01}-C_{11})P(H_1)},
$$

assuming the denominator is positive. Here $C_{ij}$ is the cost of deciding $H_i$ when $H_j$ is true. With zero cost for correct decisions and equal cost for mistakes, this reduces to

$$
\Lambda(x)>\frac{P(H_0)}{P(H_1)}.
$$

If the priors are also equal, the threshold is $1$, so the Bayesian rule chooses the hypothesis with larger likelihood.

## Student Takeaways

- Detection is decision-making under uncertainty.
- False alarm and detection probabilities quantify detector performance.
- Neyman-Pearson gives the optimal simple-hypothesis test at a fixed false alarm rate.
- Gaussian detection problems often reduce to thresholding means or energies.
- Bayesian detection uses priors and costs to choose the likelihood-ratio threshold.

<p class="ese-next"><a href="/teaching/ese-531/detection-examples/">Next: Detection Theory Examples</a></p>

</div>
