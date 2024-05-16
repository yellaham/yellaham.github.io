---
title: "Neural Stochastic Differential Equations with Change Points: A Generative Adversarial Approach"
collection: publications
permalink: /publication/2024-04-14-neural-sde-changepoints
paperurl: 'http://yellaham.github.io/files/2024-04-14-neural-sde-changepoints.pdf'
date: 2024-04-14
venue: '2024 IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP)' 
authors: 'Zhongchang Sun, Yousef El-Laham, Svitlana Vyetrenko'
pages: '6965-6969'
year: 2024
publisher: 'IEEE'
---

<details>
<summary>Abstract</summary>
<br>
Stochastic differential equations (SDEs) have been widely used to model real world random phenomena. 
Existing works mainly focus on the case where the time series is modeled by a single SDE, which might be restrictive 
for modeling time series with distributional shift. In this work, we propose a change point detection algorithm for
time series modeled as neural SDEs. Given a time series dataset, the proposed method jointly learns the unknown change 
points and the parameters of distinct neural SDE models corresponding to each change point. Specifically, the SDEs are 
learned under the framework of generative adversarial networks (GANs) and the change points are detected based on the 
output of the GAN discriminator in a forward pass. Numerical results on both synthetic and real datasets are provided 
to validate the performance of the algorithm in comparison to classical change point detection benchmarks, standard 
GAN-based neural SDEs, and other state-of-the-art deep generative models for time series data
</details>

[Link to paper](http://yellaham.github.io/files/2024-04-14-neural-sde-changepoints.pdf)