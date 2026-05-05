---
layout: single
title: "Approximate Bayesian Inference"
permalink: /teaching/ese-531/approximate-bayesian-inference/
redirect_from:
  - /teaching/ese-531/lectures/predictive-checks-approximate-bayesian-inference/
author_profile: true
toc: true
toc_label: "Topic Outline"
---

<div class="ese-531" markdown="1">

Many Bayesian models have posteriors that cannot be computed in closed form. This topic studies model checking, predictive scoring, and two major approximation ideas: Laplace approximation and variational inference. Sampling algorithms are treated in the next topic.

<p class="ese-demo-callout"><span>Companion demo</span><a href="/teaching/ese-531/demos/approximate-bayesian-inference/">Compare grid posterior evaluation with an interior Laplace approximation.</a></p>

## Prior Predictive Checks

The prior predictive distribution is

$$
p(\tilde{x})
=
\int p(\tilde{x}\mid\theta)p(\theta)\,d\theta.
$$

It asks: before observing data, what data sets does the model believe are plausible?

A prior predictive simulation workflow is:

1. Draw $\theta^{(m)}\sim p(\theta)$.
2. Draw $\tilde{x}^{(m)}\sim p(\tilde{x}\mid\theta^{(m)})$.
3. Compare simulated summaries $T(\tilde{x}^{(m)})$ with values that would be plausible before seeing the real data.

This check is especially valuable before fitting the model. If the prior predictive distribution assigns most probability to impossible or implausible data sets, the prior-likelihood combination is already miscalibrated.

## Posterior Predictive Checks

The posterior predictive distribution is

$$
p(\tilde{x}\mid x)
=
\int p(\tilde{x}\mid\theta)p(\theta\mid x)\,d\theta.
$$

It asks: after fitting the model, what new data sets does the model predict? Good calibration means that observed data should look plausible under the posterior predictive distribution.

## Credible Intervals

A Bayesian credible interval is an interval containing a specified amount of posterior probability. A 95 percent credible interval $[a,b]$ satisfies

$$
P(a\leq \Theta\leq b\mid x)=0.95.
$$

Credible intervals can be computed analytically, by Gaussian approximation, or empirically from posterior samples.

There are multiple valid 95 percent credible intervals. An equal-tailed interval uses the 2.5 percent and 97.5 percent posterior quantiles. A highest posterior density interval contains the most probable parameter values and can be shorter for skewed posteriors.

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
p(x_i^{\mathrm{test}}\mid\theta^{(s)}).
$$

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

In $K$-fold cross-validation:

1. Split the data into $K$ folds.
2. For each fold, fit on the other $K-1$ folds.
3. Evaluate predictive accuracy on the held-out fold.
4. Average the scores.

Leave-one-out cross-validation is the special case where each fold contains one observation.

Cross-validation estimates out-of-sample predictive performance, not parameter accuracy directly. The target of the evaluation should match the scientific goal.

## Why Approximate Inference?

For many Bayesian models,

$$
p(\theta\mid x)
=
\frac{p(x\mid\theta)p(\theta)}
{\int p(x\mid\theta)p(\theta)\,d\theta}
$$

cannot be computed in closed form because the marginal likelihood integral is intractable.

Approximate inference replaces the exact posterior with an approximation that is easier to evaluate, sample from, or optimize. The central tradeoff is accuracy versus tractability.

## Laplace Approximation

The Laplace approximation uses a Gaussian centered at an interior MAP estimator:

$$
p(\theta\mid x)
\approx
N(\hat{\theta}_{\mathrm{MAP}},H^{-1}),
$$

where

$$
H
=
-\nabla^2\log p(\theta\mid x)
\bigg|_{\theta=\hat{\theta}_{\mathrm{MAP}}}.
$$

This ordinary form requires $H$ to be positive definite at an interior mode. It is often good when $n$ is large and the posterior is approximately unimodal and Gaussian.

Limitations:

- It can fail for multimodal posteriors.
- It can be poor for small sample sizes.
- It can be misleading when the posterior mode lies on a boundary or the local Hessian is singular.
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

When $\hat{\theta}_{\mathrm{MAP}}$ is interior and $H>0$, exponentiating both sides shows that the posterior is approximated by

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
(2\pi)^{d/2}\det(H)^{-1/2}.
$$

This is why Laplace approximation can approximate both posterior distributions and marginal likelihoods.

## Variational Inference

Variational inference is another parametric approximation strategy. Choose a family of tractable distributions $\mathcal{Q}$ and solve

$$
q^\star
=
\arg\min_{q\in\mathcal{Q}}
D_{\mathrm{KL}}(q(\theta)\,\Vert\,p(\theta\mid x)).
$$

Equivalently, variational inference maximizes an evidence lower bound.

The evidence lower bound comes from

$$
\log p(x)
=
\log\int
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
+D_{\mathrm{KL}}(q(\theta)\,\Vert\,p(\theta\mid x)).
$$

Since $\log p(x)$ does not depend on $q$, maximizing the ELBO is equivalent to minimizing $D_{\mathrm{KL}}(q\,\Vert\,p)$. The direction of the KL divergence matters: this common direction often prefers approximations that concentrate on one high-density region rather than covering all posterior modes.

## Student Takeaways

- Predictive checks diagnose model calibration.
- lppd and cross-validation evaluate predictive accuracy.
- Approximate Bayesian inference is needed when exact posteriors are unavailable.
- Laplace approximation uses local Gaussian curvature near the MAP estimate.
- Variational inference trades exactness for scalable optimization.

<p class="ese-next"><a href="/teaching/ese-531/monte-carlo-methods/">Next: Monte Carlo Methods</a></p>

</div>
