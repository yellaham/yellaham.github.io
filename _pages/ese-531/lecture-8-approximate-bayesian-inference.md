---
layout: single
title: "Lecture 8: Predictive Checks and Approximate Bayesian Inference"
permalink: /teaching/ese-531/lectures/predictive-checks-approximate-bayesian-inference/
author_profile: true
toc: true
toc_label: "Lecture Outline"
---

This lecture studies model checking, predictive accuracy, and approximation methods for Bayesian models whose posteriors are not analytically tractable.

## Prior Predictive Checks

The prior predictive distribution is

$$
p(\tilde{x})
=
\int p(\tilde{x}\mid \theta)p(\theta)\,d\theta.
$$

It asks: before observing data, what data sets does the model believe are plausible?

Prior predictive checks are useful for catching priors that imply unrealistic data.

## Posterior Predictive Checks

The posterior predictive distribution is

$$
p(\tilde{x}\mid x)
=
\int p(\tilde{x}\mid \theta)p(\theta\mid x)\,d\theta.
$$

It asks: after fitting the model, what new data sets does the model predict?

Good calibration means that observed data should look plausible under the posterior predictive distribution.

## Credible Intervals

A Bayesian credible interval is an interval containing a specified amount of posterior probability. A 95 percent credible interval $[a,b]$ satisfies

$$
P(a\leq \Theta \leq b\mid x)=0.95.
$$

Credible intervals can be computed analytically, by Gaussian approximation, or empirically from posterior samples.

## Predictive Accuracy

To assess generalization, evaluate the predictive distribution on held-out data. One useful metric is the log posterior predictive density:

$$
\mathrm{lppd}
=
\sum_{i=1}^m
\log p(x_i^{\mathrm{test}}\mid x^{\mathrm{train}}).
$$

Higher lppd indicates that the model assigned higher probability to unseen observations.

If posterior samples $\theta^{(1)},\ldots,\theta^{(S)}$ are available, the predictive density can be approximated by

$$
p(x_i^{\mathrm{test}}\mid x^{\mathrm{train}})
\approx
\frac{1}{S}\sum_{s=1}^S
p(x_i^{\mathrm{test}}\mid \theta^{(s)}).
$$

This approximation uses the full posterior uncertainty rather than plugging in one parameter estimate.

## Cross-Validation

A single train-test split can be unstable. Cross-validation averages predictive performance over several splits.

In $K$-fold cross-validation:

1. Split the data into $K$ folds.
2. For each fold, fit on the other $K-1$ folds.
3. Evaluate predictive accuracy on the held-out fold.
4. Average the scores.

Leave-one-out cross-validation is the special case where each fold contains one observation.

## Why Approximate Inference?

For many Bayesian models,

$$
p(\theta\mid x)
=
\frac{p(x\mid \theta)p(\theta)}
{\int p(x\mid \theta)p(\theta)\,d\theta}
$$

cannot be computed in closed form because the marginal likelihood integral is intractable.

Approximate inference replaces the exact posterior with an approximation that is easier to evaluate, sample from, or optimize.

The central tradeoff is accuracy versus tractability. Exact Bayesian inference is ideal but often impossible; approximate inference is useful when the approximation error is smaller than the modeling or sampling uncertainty we already face.

## Laplace Approximation

The Laplace approximation uses a Gaussian centered at the MAP estimator:

$$
p(\theta\mid x)
\approx
N(\hat{\theta}_{\mathrm{MAP}}, H^{-1}),
$$

where

$$
H
=
-\nabla^2 \log p(\theta\mid x)
\bigg|_{\theta=\hat{\theta}_{\mathrm{MAP}}}.
$$

It is often good when $n$ is large and the posterior is approximately unimodal and Gaussian.

Limitations:

- It can fail for multimodal posteriors.
- It can be poor for small sample sizes.
- It may be expensive in high dimensions because it requires a Hessian.

### One-Dimensional Laplace Recipe

Let

$$
h(\theta)=\log p(\theta\mid x).
$$

If $\hat{\theta}_{\mathrm{MAP}}$ maximizes $h$, then a second-order Taylor expansion gives

$$
h(\theta)
\approx
h(\hat{\theta}_{\mathrm{MAP}})
-
\frac{1}{2}H(\theta-\hat{\theta}_{\mathrm{MAP}})^2,
$$

where

$$
H=-h''(\hat{\theta}_{\mathrm{MAP}}).
$$

Exponentiating both sides shows that the posterior is approximated by

$$
N(\hat{\theta}_{\mathrm{MAP}},H^{-1}).
$$

## Variational Inference

Variational inference is another parametric approximation strategy. Choose a family of tractable distributions $\mathcal{Q}$ and solve

$$
q^\star
=
\arg\min_{q\in\mathcal{Q}}
D_{\mathrm{KL}}(q(\theta)\|p(\theta\mid x)).
$$

Equivalently, variational inference maximizes an evidence lower bound. The benefit is scalability; the cost is approximation bias introduced by the chosen family $\mathcal{Q}$.

## Monte Carlo Expectations

If $\theta^{(1)},\ldots,\theta^{(M)}$ are samples from a target distribution $\pi(\theta)$, then

$$
E_\pi[h(\Theta)]
\approx
\frac{1}{M}\sum_{m=1}^M h(\theta^{(m)}).
$$

This is justified by the law of large numbers.

## Rejection Sampling

Rejection sampling draws candidates from a proposal $q(\theta)$ and accepts them with probability based on the ratio between the target and proposal.

It requires a constant $M$ such that

$$
\pi(\theta)\leq Mq(\theta)
$$

for all $\theta$ in the support.

Poor proposals lead to high rejection rates.

<details>
<summary><strong>Why Accepted Samples Have the Target Distribution</strong></summary>

Let $A$ be the event that a proposed value is accepted. The density of an accepted value is proportional to

$$
q(\theta)\frac{\pi(\theta)}{Mq(\theta)}
=
\frac{1}{M}\pi(\theta).
$$

After normalizing over accepted samples, the accepted density is exactly $\pi(\theta)$.

</details>

## Student Takeaways

- Predictive checks diagnose model calibration.
- lppd and cross-validation evaluate predictive accuracy.
- Approximate Bayesian inference is needed when exact posteriors are unavailable.
- Laplace approximation and Monte Carlo methods are two core approximation ideas.
