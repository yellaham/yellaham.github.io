---
title: "Enhanced Mixture Population Monte Carlo Via Stochastic Optimization and Markov Chain Monte Carlo Sampling"
collection: publications
permalink: /publication/2020-05-04-enhanced-mixture-pmc-stochastic-optimization-mcmc
paperurl: 'http://yellaham.github.io/files/2020-05-04-enhanced-mixture-pmc-stochastic-optimization-mcmc.pdf'
date: 2020-05-04
venue: 'ICASSP 2020 - 2020 IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP)'
pages: '5475-5479'
year: 2020
authors: '<b>Yousef El-Laham</b>, Petar M Djurić, Mónica F Bugallo'
publisher: 'IEEE'
---

<details>
<summary>Description</summary>
<br>
The population Monte Carlo (PMC) algorithm is a popular adaptive importance sampling (AIS) method used for approximate 
computation of intractable integrals. Over the years, many advances have been made in the theory and implementation of 
PMC schemes. The mixture PMC (M-PMC) algorithm, for instance, optimizes the parameters of a mixture proposal distribution 
in a way that minimizes that Kullback-Leibler divergence to the target distribution. The parameters in M-PMC are updated 
using a single step of expectation maximization (EM), which limits its accuracy. In this work, we introduce a novel 
M-PMC algorithm that optimizes the parameters of a mixture proposal distribution, where parameter updates are resolved 
via stochastic optimization instead of EM. The stochastic gradients w.r.t. each of the mixture parameters are 
approximated using a population of Markov chain Monte Carlo samplers. We validate the proposed scheme via numerical 
simulations on an example where the considered target distribution is multimodal.
</details>

[Link to paper](http://yellaham.github.io/files/2020-05-04-enhanced-mixture-pmc-stochastic-optimization-mcmc.pdf)