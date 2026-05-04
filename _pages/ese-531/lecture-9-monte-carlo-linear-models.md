---
layout: single
title: "Monte Carlo Methods"
permalink: /teaching/ese-531/monte-carlo-methods/
redirect_from:
  - /teaching/ese-531/lectures/monte-carlo-linear-models/
author_profile: true
toc: true
toc_label: "Topic Outline"
---

<div class="ese-531" markdown="1">

Monte Carlo methods approximate expectations using samples. In Bayesian inference they are essential because posterior expectations are often easier to estimate from draws than to compute analytically.

## Standard Monte Carlo

If we can sample

$$
\theta^{(1)},\ldots,\theta^{(M)}\sim \pi(\theta),
$$

then expectations can be approximated by

$$
E_\pi[h(\Theta)]
\approx
\frac{1}{M}\sum_{m=1}^M h(\theta^{(m)}).
$$

The strong law of large numbers provides the foundation for this approximation.

If the samples are independent and $\mathrm{Var}_\pi(h(\Theta))<\infty$, the Monte Carlo central limit theorem gives

$$
\sqrt{M}
\left[
\frac{1}{M}\sum_{m=1}^M h(\theta^{(m)})
-E_\pi[h(\Theta)]
\right]
\xrightarrow{d}
N(0,\mathrm{Var}_\pi(h(\Theta))).
$$

Thus Monte Carlo error usually decreases like $1/\sqrt{M}$, independent of the parameter dimension. The dimension still matters because it affects how hard it is to obtain good samples.

## Rejection Sampling

Rejection sampling uses an easier proposal density $q(\theta)$ and a constant $M$ such that

$$
\pi(\theta)\leq Mq(\theta)
$$

for all $\theta$ in the support. Candidate samples from $q$ are accepted with probability

$$
\frac{\pi(\theta)}{Mq(\theta)}.
$$

If $q$ is not close to $\pi$, the required $M$ becomes large and the acceptance rate becomes small. For normalized $\pi$, the average acceptance probability is $1/M$.

<details class="ese-proof">
<summary>Why Accepted Samples Have the Target Distribution</summary>

Let $A$ be the event that a proposed value is accepted. The density of an accepted value is proportional to

$$
q(\theta)\frac{\pi(\theta)}{Mq(\theta)}
=
\frac{1}{M}\pi(\theta).
$$

After normalizing over accepted samples, the accepted density is exactly $\pi(\theta)$.

</details>

The best proposals have the same general shape and heavier tails than the target. If the proposal has lighter tails, the ratio $\pi/q$ may be unbounded and no finite envelope constant exists.

## Importance Sampling

Importance sampling rewrites the expectation as

$$
E_\pi[h(\Theta)]
=
\int h(\theta)\pi(\theta)\,d\theta
=
\int h(\theta)\frac{\pi(\theta)}{q(\theta)}q(\theta)\,d\theta.
$$

With samples from $q$, use weights

$$
w(\theta)=\frac{\pi(\theta)}{q(\theta)}.
$$

When the target is known only up to a normalizing constant, normalized importance sampling uses

$$
\frac{\sum_{m=1}^M w_mh(\theta^{(m)})}
{\sum_{m=1}^M w_m}.
$$

The support condition is essential:

$$
\pi(\theta)>0\quad\Longrightarrow\quad q(\theta)>0.
$$

Importance sampling can technically run when this condition fails, but it silently ignores target mass. A good proposal should put substantial probability in regions where both $\pi(\theta)$ and $|h(\theta)|$ are large.

The unnormalized estimator is unbiased when the normalized target density is known exactly. The self-normalized estimator is usually biased for finite $M$, but it is consistent and is often the practical choice in Bayesian inference because posteriors are known only up to a normalizing constant.

### Effective Sample Size

Importance weights reveal whether the proposal is working. A common diagnostic is the normalized-weight effective sample size:

$$
\mathrm{ESS}
=
\frac{1}{\sum_{m=1}^M\tilde{w}_m^2},
\qquad
\tilde{w}_m=\frac{w_m}{\sum_{\ell=1}^M w_\ell}.
$$

If one weight dominates, ESS is close to one even when $M$ is large. Good proposals produce more balanced weights and larger ESS.

## Markov Chain Monte Carlo

MCMC constructs a Markov chain whose stationary distribution is the target posterior $\pi$.

> **Definition (Markov Property):** A stochastic process satisfies the Markov property if the next state depends on the past only through the current state.
{: .ese-box .ese-definition}

In Metropolis-Hastings:

1. Start at $\theta^{(0)}$.
2. Propose $\theta^\star\sim q(\theta^\star\mid\theta^{(t)})$.
3. Accept with probability

$$
\alpha
=
\min\left\{
1,
\frac{\pi(\theta^\star)q(\theta^{(t)}\mid\theta^\star)}
{\pi(\theta^{(t)})q(\theta^\star\mid\theta^{(t)})}
\right\}.
$$

4. If accepted, set $\theta^{(t+1)}=\theta^\star$; otherwise keep $\theta^{(t+1)}=\theta^{(t)}$.

Chains need time to reach stationarity, and samples may be autocorrelated. In practice, analysts often discard an initial burn-in period and inspect trace plots. Thinning can reduce storage and visible autocorrelation, but it does not fix a poorly mixing chain. Better proposals and reparameterizations are usually more valuable.

### Why Metropolis-Hastings Has the Right Target

The acceptance probability is chosen to satisfy detailed balance:

$$
\pi(\theta)P(\theta,\theta^\star)
=
\pi(\theta^\star)P(\theta^\star,\theta),
$$

where $P$ is the Markov transition kernel. Detailed balance implies that $\pi$ is stationary. Under additional ergodicity conditions, long-run averages along the chain converge to posterior expectations:

$$
\frac{1}{M}\sum_{m=1}^M h(\theta^{(m)})
\to
E_\pi[h(\Theta)].
$$

The samples are dependent, so the effective sample size is usually smaller than the number of iterations. Slowly mixing chains can give precise-looking but misleading estimates.

## Student Takeaways

- Monte Carlo approximates expectations using samples.
- Rejection sampling and importance sampling depend heavily on proposal quality.
- Importance weights diagnose whether the proposal covers the target well.
- MCMC trades independent sampling for a Markov chain with the right stationary distribution.
- The number of iterations is not the same as the effective number of independent samples.

<p class="ese-next"><a href="/teaching/ese-531/linear-models-least-squares/">Next: Linear Models and Least Squares</a></p>

</div>
