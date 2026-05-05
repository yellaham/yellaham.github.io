---
layout: single
title: "Demo: Efficient Estimators and Vector Cramer-Rao Bounds"
permalink: /teaching/ese-531/demos/efficient-estimators-vector-crlb/
author_profile: true
toc: false
toc_label: "Demo"
---

<div class="ese-531" markdown="1">

In a two-parameter Gaussian location model, use the covariance ellipse to connect Fisher information with the matrix form of the Cramer-Rao lower bound.

## Mathematical setup

Let $X_i\sim N_2(\theta,\Sigma)$ iid, where

$$
\Sigma=
\begin{bmatrix}
\sigma_1^2 & \rho\sigma_1\sigma_2\\
\rho\sigma_1\sigma_2 & \sigma_2^2
\end{bmatrix}.
$$

For the vector mean parameter $\theta=(\theta_1,\theta_2)^T$, the Fisher information is

$$
I_n(\theta)=n\Sigma^{-1}.
$$

The vector CRLB says that any unbiased estimator $\hat\theta$ must satisfy

$$
\operatorname{Cov}(\hat\theta)-I_n(\theta)^{-1}
\quad\text{is positive semidefinite}.
$$

The sample mean attains the bound because $\operatorname{Cov}(\bar X)=\Sigma/n$. The plotted ellipse is the covariance contour

$$
u^T(\Sigma/n)^{-1}u=4,
$$

so its semiaxes are twice the principal standard deviations. It is not the same object as a fixed-probability confidence ellipse unless the radius is chosen from a chi-squared quantile.

## What to try

- Increase $n$. The whole ellipse contracts, reflecting the $1/n$ covariance scaling.
- Change $\rho$. Correlation rotates the ellipse and changes the covariance term without changing the marginal variances directly.
- Make $\sigma_1$ much larger than $\sigma_2$. The ellipse stretches in the less precise coordinate.

<div class="ese-demo" data-demo="efficient-estimators-vector-crlb">
  <div class="ese-demo-grid">
    <div class="ese-demo-control">
      <label for="vec-s1">Sigma 1: <output data-output="sigma1"></output></label>
      <input id="vec-s1" data-param="sigma1" type="range" min="0.4" max="3" step="0.1" value="1.4">
    </div>
    <div class="ese-demo-control">
      <label for="vec-s2">Sigma 2: <output data-output="sigma2"></output></label>
      <input id="vec-s2" data-param="sigma2" type="range" min="0.4" max="3" step="0.1" value="0.8">
    </div>
    <div class="ese-demo-control">
      <label for="vec-rho">Correlation rho: <output data-output="rho"></output></label>
      <input id="vec-rho" data-param="rho" type="range" min="-0.9" max="0.9" step="0.05" value="0.4">
    </div>
    <div class="ese-demo-control">
      <label for="vec-n">Sample size n: <output data-output="n"></output></label>
      <input id="vec-n" data-param="n" type="range" min="1" max="100" value="20">
    </div>
  </div>
  <div class="ese-demo-plot"></div>
  <div class="ese-demo-stats"></div>
  <p class="ese-demo-takeaway"></p>
</div>

The ellipse shows the Mahalanobis-radius-2 contour for the inverse-information covariance $\Sigma/n$.

## Try it in Python

<p class="ese-code-note">This code computes the inverse-information covariance and draws the same Mahalanobis-radius-2 ellipse.</p>

```python
import numpy as np
import matplotlib.pyplot as plt

sigma1 = 1.4
sigma2 = 0.8
rho = 0.4
n = 20

Sigma = np.array([
    [sigma1**2, rho * sigma1 * sigma2],
    [rho * sigma1 * sigma2, sigma2**2],
])
cov_xbar = Sigma / n
information = n * np.linalg.inv(Sigma)

angles = np.linspace(0, 2 * np.pi, 300)
circle = np.vstack([np.cos(angles), np.sin(angles)])
eigvals, eigvecs = np.linalg.eigh(cov_xbar)
ellipse = eigvecs @ np.diag(2 * np.sqrt(eigvals)) @ circle

print("Sigma / n =")
print(cov_xbar)
print("\nI_n(theta) =")
print(information)
print("\nCov(xbar) - inverse information =")
print(cov_xbar - np.linalg.inv(information))

plt.plot(ellipse[0], ellipse[1])
plt.scatter([0], [0], color="black")
plt.gca().set_aspect("equal", adjustable="box")
plt.xlabel("theta1 error")
plt.ylabel("theta2 error")
plt.title("Mahalanobis-radius-2 covariance ellipse")
plt.show()
```

<p class="ese-next"><a href="/teaching/ese-531/efficient-estimators-vector-crlb/">Back to topic notes</a></p>

</div>

<script src="/assets/js/ese531-demos.js" defer></script>
