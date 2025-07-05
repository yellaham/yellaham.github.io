---
title: "Variational Neural Stochastic Differential Equations with Change Points"
collection: publications
permalink: /publication/2024-04-14-umap-mixup
paperurl: 'https://openreview.net/pdf?id=GEilvtsFNV'
date: 2025-03-13
venue: 'Transactions on Machine Learning Research'
authors: '<b>Yousef El-Laham</b>, Zhongchang Sun, Haibei Zhu, Tucker Balch, Svitlana Vyetrenko'
pages: "7040-7044"
year: 2025
publisher: 'TMLR'
---

<details>
<summary>Abstract</summary>
<br>
In this work, we explore modeling change points in time-series data using neural stochastic differential equations 
(neural SDEs). We propose a novel model formulation and training procedure based on the variational autoencoder (VAE) 
framework for modeling time-series as a neural SDE. Unlike existing algorithms training neural SDEs as VAEs, our 
proposed algorithm only necessitates a Gaussian prior of the initial state of the latent stochastic process, 
rather than a Wiener process prior on the entire latent stochastic process. We develop two methodologies for 
modeling and estimating change points in time-series data with distribution shifts. Our iterative algorithm 
alternates between updating neural SDE parameters and updating the change points based on either a maximum 
likelihood-based approach or a change point detection algorithm using the sequential likelihood ratio test. 
We also discuss theoretical implications of the proposed change point detection scheme. Finally, we present an 
empirical evaluation that demonstrates the expressive power of our proposed model, showing that it can 
effectively model both classical parametric SDEs and some real datasets with distribution shifts
</details>