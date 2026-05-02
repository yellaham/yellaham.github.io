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

A prior predictive simulation workflow is:

1. Draw $\theta^{(m)}\sim p(\theta)$.
2. Draw $\tilde{x}^{(m)}\sim p(\tilde{x}\mid\theta^{(m)})$.
3. Compare simulated summaries $T(\tilde{x}^{(m)})$ with values that would be plausible before seeing the real data.

This check is especially valuable before fitting the model. If the prior predictive distribution assigns most probability to impossible or absurd data sets, the prior-likelihood combination is already miscalibrated.

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

There are multiple valid 95 percent credible intervals. An **equal-tailed interval** uses the 2.5 percent and 97.5 percent posterior quantiles. A **highest posterior density interval** contains the most probable parameter values and can be shorter for skewed posteriors. Unlike frequentist confidence intervals, the probability statement is directly about the parameter conditional on the observed data and the assumed model.

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

The logarithm must be applied after averaging the likelihood over posterior draws:

$$
\log\left[
\frac{1}{S}\sum_{s=1}^S
p(x_i^{\mathrm{test}}\mid\theta^{(s)})
\right].
$$

This is different from averaging log likelihoods,

$$
\frac{1}{S}\sum_{s=1}^S
\log p(x_i^{\mathrm{test}}\mid\theta^{(s)}),
$$

which usually gives a smaller value by Jensen's inequality. The predictive density integrates over parameter uncertainty; it is not a plug-in score.

## Cross-Validation

A single train-test split can be unstable. Cross-validation averages predictive performance over several splits.

In $K$-fold cross-validation:

1. Split the data into $K$ folds.
2. For each fold, fit on the other $K-1$ folds.
3. Evaluate predictive accuracy on the held-out fold.
4. Average the scores.

Leave-one-out cross-validation is the special case where each fold contains one observation.

Cross-validation estimates out-of-sample predictive performance, not parameter accuracy directly. A model can have parameters that are hard to interpret but strong predictive performance, or interpretable parameters with weak prediction. The target of the evaluation should match the scientific goal.

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

The same expansion also approximates integrals. If

$$
Z=\int \exp(h(\theta))\,d\theta,
$$

then in one dimension

$$
Z
\approx
\exp(h(\hat{\theta}))
\sqrt{\frac{2\pi}{H}}.
$$

In $d$ dimensions,

$$
Z
\approx
\exp(h(\hat{\theta}))
(2\pi)^{d/2}|H|^{-1/2}.
$$

This is why Laplace approximation can be used both to approximate posterior distributions and to approximate marginal likelihoods.

## Variational Inference

Variational inference is another parametric approximation strategy. Choose a family of tractable distributions $\mathcal{Q}$ and solve

$$
q^\star
=
\arg\min_{q\in\mathcal{Q}}
D_{\mathrm{KL}}(q(\theta)\|p(\theta\mid x)).
$$

Equivalently, variational inference maximizes an evidence lower bound. The benefit is scalability; the cost is approximation bias introduced by the chosen family $\mathcal{Q}$.

The evidence lower bound comes from

$$
\log p(x)
=
\log \int
\frac{p(x,\theta)}{q(\theta)}q(\theta)\,d\theta
\geq
E_q[\log p(x,\theta)-\log q(\theta)].
$$

Define

$$
\mathrm{ELBO}(q)
=
E_q[\log p(x,\theta)]-E_q[\log q(\theta)].
$$

Then

$$
\log p(x)
=
\mathrm{ELBO}(q)
+D_{\mathrm{KL}}(q(\theta)\|p(\theta\mid x)).
$$

Since $\log p(x)$ does not depend on $q$, maximizing the ELBO is equivalent to minimizing $D_{\mathrm{KL}}(q\|p)$. The direction of the KL divergence matters: this common direction often prefers approximations that concentrate on one high-density region rather than covering all posterior modes.

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

The acceptance probability is

$$
P(\text{accept})
=
\int q(\theta)\frac{\pi(\theta)}{Mq(\theta)}\,d\theta
=
\frac{1}{M}
$$

when $\pi$ is normalized. Thus a large envelope constant $M$ means many rejected proposals. In high dimensions, finding a proposal $q$ that tightly envelopes the target can be extremely difficult.

## Importance Sampling

Importance sampling estimates posterior expectations using draws from a proposal distribution $q$:

$$
E_\pi[h(\Theta)]
=
\int h(\theta)\frac{\pi(\theta)}{q(\theta)}q(\theta)\,d\theta.
$$

With $\theta^{(m)}\sim q$,

$$
\hat{\mu}_{\mathrm{IS}}
=
\frac{1}{M}\sum_{m=1}^M
h(\theta^{(m)})
w(\theta^{(m)}),
\qquad
w(\theta)=\frac{\pi(\theta)}{q(\theta)}.
$$

If the target is known only up to a constant, use normalized weights:

$$
\hat{\mu}_{\mathrm{SNIS}}
=
\frac{\sum_{m=1}^M w_m h(\theta^{(m)})}
{\sum_{m=1}^M w_m}.
$$

The proposal must have support wherever the target has support. If $q(\theta)=0$ in a region where $\pi(\theta)>0$, that region can never be sampled and the estimator is invalid.

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
- Approximation quality depends on shape: unimodal Gaussian-like posteriors favor Laplace methods, while irregular or high-dimensional posteriors often require sampling or variational approximations.
