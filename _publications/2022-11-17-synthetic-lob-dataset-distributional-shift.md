---
title: "A Synthetic Limit Order Book Dataset for Benchmarking Forecasting Algorithms under Distributional Shift"
collection: publications
permalink: /publication/2022-11-17-synthetic-lob-dataset-distributional-shift
date: 2022-11-17
venue: 'NeurIPS 2022 Workshop on Distribution Shifts: Connecting Methods and Applications'
authors: 'Defu Cao, Yousef El-Laham, Loc Trinh, Svitlana Vyetrenko, Yan Liu'
---

<details>
<summary>Description</summary>
<br>
In electronic trading markets, limit order books (LOBs) provide information about pending buy/sell orders at various 
price levels for a given security. Recently, there has been a growing interest in using LOB data for resolving 
downstream machine learning tasks (e.g., forecasting). However, dealing with out-of-distribution (OOD) LOB data is 
challenging since distributional shifts are unlabeled in current publicly available LOB datasets. Therefore, it is 
critical to build a synthetic LOB dataset with labeled OOD samples serving as a testbed for developing models that 
generalize well to unseen scenarios. In this work, we utilize a multi-agent market simulator to build a synthetic LOB 
dataset, named DSLOB, with and without market stress scenarios, which allows for the design of controlled distributional 
shift benchmarking. Using the proposed synthetic dataset, we provide a holistic analysis on the forecasting performance 
of three different state-of-the-art forecasting methods. Our results reflect the need for increased researcher efforts 
to develop algorithms with robustness to distributional shifts in high-frequency time series data.
</details>

[Link to paper](http://yellaham.github.io/files/2022-11-17-synthetic-lob-dataset-distributional-shift.pdf)