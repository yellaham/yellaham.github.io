---
title: "LSCD: Lomb--Scargle Conditioned Diffusion for Time series Imputation"
collection: publications
permalink: /publication/2025-05-01-lomb-scargle
paperurl: 'https://www.arxiv.org/pdf/2506.17039'
date: 2025-05-01
venue: 'International Conference on Machine Learning'
authors: 'Elizabeth Fons, Alejandro Sztrajman, <b>Yousef El-Laham</b>, Luciana Ferrer, Svitlana Vyetrenko, Manuela Veloso'
pages: ""
year: 2025
publisher: 'PMLR'
---

<details>
<summary>Abstract</summary>
<br>
Time series with missing or irregularly sampled data are a persistent challenge in machine learning. Many methods 
operate on the frequency-domain, relying on the Fast Fourier Transform (FFT) which assumes uniform sampling, 
therefore requiring prior interpolation that can distort the spectra. To address this limitation, we introduce 
a differentiable Lomb--Scargle layer that enables a reliable computation of the power spectrum of irregularly 
sampled data. We integrate this layer into a novel score-based diffusion model (LSCD) for time series imputation 
conditioned on the entire signal spectrum. Experiments on synthetic and real-world benchmarks demonstrate that our 
method recovers missing data more accurately than purely time-domain baselines, while simultaneously producing 
consistent frequency estimates. Crucially, our method can be easily integrated into learning frameworks, enabling 
broader adoption of spectral guidance in machine learning approaches involving incomplete or irregular data.
</details>