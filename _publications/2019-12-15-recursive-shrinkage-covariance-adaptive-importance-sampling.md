---
title: "Recursive Shrinkage Covariance Learning in Adaptive Importance Sampling"
collection: publications
permalink: /publication/2019-12-15-recursive-shrinkage-covariance-adaptive-importance-sampling
paperurl: 'http://yellaham.github.io/files/2019-12-15-recursive-shrinkage-covariance-adaptive-importance-sampling.pdf'
date: 2019-12-15
venue: '2019 IEEE 8th International Workshop on Computational Advances in Multi-Sensor Adaptive Processing (CAMSAP)'
pages: '624-628'
year: 2019
authors: '<b>Yousef El-Laham</b>, Víctor Elvira, Mónica Bugallo'
publisher: 'IEEE'
---

<details>
<summary>Description</summary>
<br>
The estimation of covariance matrices has been a central problem in a variety of disciplines, including quantitative 
finance, genomics, and signal processing. In Bayesian statistical inference, the efficiency of Monte Carlo methods, 
such as adaptive importance sampling (AIS), can be improved significantly if the distribution used to draw samples has 
a similar covariance structure to the posterior distribution of interest. Unfortunately, it is generally difficult to 
learn covariance matrices in high-dimensional settings due to the large number of samples needed for its appropriate 
estimation. This problem is intensified in the importance sampling context, where the usual weighted covariance 
estimators do not yield full rank estimates in most practical settings due to the weight degeneracy problem. In this 
work, we propose an AIS algorithm that robustly learns the covariance structure of the target distribution. The new 
method is based on applying shrinkage in a recursive manner, where the learned covariance matrix is constructed 
iteratively using a sequence of biased weighted covariance estimators. Simulation results indicate that the proposed 
method outperforms other state of-the-art AIS methods, especially in the case where the number of samples drawn per 
iteration is relatively small.
</details>

[Link to paper](http://yellaham.github.io/files/2019-12-15-recursive-shrinkage-covariance-adaptive-importance-sampling.pdf)