---
layout: single
title: "Demo: Linear Models and Least Squares"
permalink: /teaching/ese-531/demos/linear-models-least-squares/
author_profile: true
toc: false
toc_label: "Demo"
---

<div class="ese-531" markdown="1">

View ordinary least squares as projection onto a one-dimensional column space, then compare it with the geometry induced by weighted least squares.

## Mathematical setup

The toy model is $y=h\theta+e$ with

$$
h=
\begin{bmatrix}
1\\
\text{slope}
\end{bmatrix}.
$$

Ordinary least squares solves

$$
\hat\theta_{\mathrm{OLS}}=(h^Th)^{-1}h^Ty,
\qquad
h^T(y-h\hat\theta_{\mathrm{OLS}})=0.
$$

Weighted least squares with $W=\operatorname{diag}(1,w_2)$ solves

$$
\hat\theta_{\mathrm{WLS}}=(h^TWh)^{-1}h^TWy,
\qquad
h^TW(y-h\hat\theta_{\mathrm{WLS}})=0.
$$

The weighted residual is orthogonal in the $W$-inner product, so it need not be Euclidean-orthogonal to the column space.

## What to try

- Set $w_2=1$. OLS and WLS coincide because the two geometries are the same.
- Increase $w_2$. The fitted point moves to respect the second coordinate more strongly.
- Change the slope. The column space rotates, and both projections change even when the observed $y$ is fixed.

<div class="ese-demo" data-demo="linear-models-least-squares">
  <div class="ese-demo-grid">
    <div class="ese-demo-control">
      <label for="lm-y1">Observed coordinate y1: <output data-output="y1"></output></label>
      <input id="lm-y1" data-param="y1" type="range" min="-3" max="3" step="0.1" value="2">
    </div>
    <div class="ese-demo-control">
      <label for="lm-y2">Observed coordinate y2: <output data-output="y2"></output></label>
      <input id="lm-y2" data-param="y2" type="range" min="-3" max="3" step="0.1" value="1">
    </div>
    <div class="ese-demo-control">
      <label for="lm-slope">Design slope: <output data-output="slope"></output></label>
      <input id="lm-slope" data-param="slope" type="range" min="-2" max="2" step="0.05" value="0.6">
    </div>
    <div class="ese-demo-control">
      <label for="lm-w2">GLS weight on row 2: <output data-output="w2"></output></label>
      <input id="lm-w2" data-param="w2" type="range" min="0.2" max="5" step="0.1" value="1">
    </div>
  </div>
  <div class="ese-demo-plot"></div>
  <div class="ese-demo-stats"></div>
  <p class="ese-demo-takeaway"></p>
</div>

For weighted least squares, and for GLS with $W=\Sigma^{-1}$, the normal equation becomes $H^T W(y-H\hat\theta)=0$. The unweighted residual dot product need not be zero for the weighted fit.

## Try it in Python

<p class="ese-code-note">This cell computes the OLS and weighted projections, then checks the two normal equations directly.</p>

```python
import numpy as np
import matplotlib.pyplot as plt

y = np.array([2.0, 1.0])
slope = 0.6
w2 = 1.0

h = np.array([1.0, slope])
W = np.diag([1.0, w2])

theta_ols = h @ y / (h @ h)
fit_ols = h * theta_ols
resid_ols = y - fit_ols

theta_wls = (h @ W @ y) / (h @ W @ h)
fit_wls = h * theta_wls
resid_wls = y - fit_wls

line_t = np.linspace(-3, 3, 100)
line = np.outer(line_t, h)

plt.plot(line[:, 0], line[:, 1], color="gray", label="column space")
plt.scatter(*y, color="black", label="observed y")
plt.scatter(*fit_ols, label="OLS fit")
plt.scatter(*fit_wls, label="WLS fit")
plt.plot([y[0], fit_ols[0]], [y[1], fit_ols[1]], "--", label="OLS residual")
plt.plot([y[0], fit_wls[0]], [y[1], fit_wls[1]], ":", label="WLS residual")
plt.axis("equal")
plt.xlabel("coordinate 1")
plt.ylabel("coordinate 2")
plt.legend()
plt.show()

print(f"theta_OLS = {theta_ols:.3f}")
print(f"theta_WLS = {theta_wls:.3f}")
print(f"h dot OLS residual = {h @ resid_ols:.3e}")
print(f"h^T W WLS residual = {h @ W @ resid_wls:.3e}")
print(f"h dot WLS residual = {h @ resid_wls:.3e}")
```

<p class="ese-next"><a href="/teaching/ese-531/linear-models-least-squares/">Back to topic notes</a></p>

</div>

<script src="/assets/js/ese531-demos.js" defer></script>
