---
title: "Fusion of Information in Multiple Particle Filtering in the Presence of Unknown Static Parameters"
collection: publications
permalink: /publication/2025-04-06-pf_fusion_parameters
paperurl: 'http://yellaham.github.io/files/2025-04-06-pf_fusion_parameters.pdf'
date: 2025-04-06
venue: '2025 IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP)' 
authors: 'Xiaokun Zhao, Marija Iloska, <b>Yousef El-Laham</b>, Monica F. Bugallo'
pages: ''
year: 2025
publisher: 'IEEE'
---

<details>
<summary>Abstract</summary>
<br>
An important and often overlooked aspect of particle filtering methods is the estimation of unknown static parameters. 
A simple approach for addressing this problem is to augment the unknown static parameters as auxiliary states that are 
jointly estimated with the time-varying parameters of interest. This can be impractical, especially when the system of 
interest is high-dimensional. Multiple particle filtering (MPF) methods were introduced to try to overcome the curse of 
dimensionality by using a "divide and conquer" approach, where the vector of unknowns is partitioned into a set of 
subvectors, each estimated by a separate particle filter. Each particle filter weighs its own particles by using 
predictions and estimates communicated from the other filters. Currently, there is no principled way to implement MPF 
methods where the particle filters share unknown parameters or states. In this work, we propose a fusion strategy to 
allow for the sharing of unknown static parameters in the MPF setting. Specifically, we study the systems which are 
separable in states and observations. It is proved that optimal Bayesian fusion can be obtained for state-space models 
with non-interacting states and observations. Simulations are performed to show that MPF with fusion strategy can 
provide more accurate estimates within fewer time steps comparing to existing algorithms.
</details>