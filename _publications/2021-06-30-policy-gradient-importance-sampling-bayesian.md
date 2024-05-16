---
title: "Policy Gradient Importance Sampling for Bayesian Inference"
collection: publications
permalink: /publication/2021-06-30-policy-gradient-importance-sampling-bayesian
date: 2021-06-30
venue: 'IEEE Transactions on Signal Processing'
volume: '69'
pages: '4245-4256'
year: 2021
authors: 'Yousef El-Laham, Mónica F Bugallo'
publisher: 'IEEE'
---

<details>
<summary>Description</summary>
<br>
In this paper, we propose a novel adaptive importance sampling (AIS) algorithm for probabilistic inference. The sampler 
learns a proposal distribution adaptation strategy by framing AIS as a reinforcement learning problem. Under this 
structure, the proposal distribution of the sampler is treated as an agent whose state is controlled using a 
parameterized policy. At each iteration of the algorithm, the agent earns a reward that is related to its contribution 
to the variance of the AIS estimator of the normalization constant of the target distribution. Policy gradient methods 
are employed to learn a locally optimal policy that maximizes the expected value of the sum of all rewards. Numerical 
simulations on two different examples demonstrate promising results for the future application of the proposed method 
to complex Bayesian models.
</details>

[Link to paper](http://yellaham.github.io/files/2021-06-30-policy-gradient-importance-sampling-bayesian.pdf)