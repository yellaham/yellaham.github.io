---
layout: single
title: "Homework 1: Properties of Random Samples"
permalink: /teaching/ese-531/homework/random-samples/
redirect_from:
  - /teaching/ese-531/homeworks/homework-1/
author_profile: true
toc: true
toc_label: "Homework Problems and Solutions"
---

<div class="ese-531" markdown="1">

### Problem 1

Let $\bar{X}_n=\frac{1}{n}\sum_{i=1}^n X_i$ and $S_n^2=\frac{1}{n-1}\sum_{i=1}^n (X_i-\bar{X}_n)^2$ be the sample mean and sample variance, respectively, of $X_1, \ldots, X_n$. Then suppose another observation, $X_{n+1}$, becomes available. Establish the following recursion relations for sample means and sample variances.

#### (a) Show that $\bar{X}_{n+1}=\frac{X_{n+1}+n\bar{X}_n}{n+1}$.

<details class="ese-proof">
<summary>Show Solution</summary>

$$\begin{align}
\bar{X}_{n+1}&=\frac{1}{n+1}\sum_{i=1}^{n+1} X_i\\
&=\frac{1}{n+1}\left(X_{n+1}+\sum_{i=1}^{n} X_i\right)\\
&=\frac{1}{n+1}\left(X_{n+1}+n\bar{X}_n\right)
\end{align}$$

</details>

#### (b) Show that $n S_{n+1}^2=(n-1) S_n^2+\left(\frac{n}{n+1}\right)\left(X_{n+1}-\bar{X}_n\right)^2$

<details class="ese-proof">
<summary>Show Solution</summary>

We proceed by using the solution to part (a) and further manipulating the equality:

$$\begin{align}
n S_{n+1}^2 &=\frac{n}{(n+1)-1} \sum_{i=1}^{n+1}\left(X_i-\bar{X}_{n+1}\right)^2 \\
& =\sum_{i=1}^{n+1}\left(X_i-\frac{X_{n+1}+n \bar{X}_n}{n+1}\right)^2 \quad(\text{using part (a))} \\
& =\sum_{i=1}^{n+1}\left(X_i-\frac{X_{n+1}}{n+1}-\frac{n \bar{X}_n}{n+1}\right)^2 \\
& =\sum_{i=1}^{n+1}\left[\left(X_i-\bar{X}_n\right)-\left(\frac{X_{n+1}}{n+1}-\frac{\bar{X}_n}{n+1}\right)\right]^2 \quad\left( \pm\bar{X}_n\right) \\
& =\sum_{i=1}^{n+1}\left[\left(X_i-\bar{X}_n\right)^2-2\left(X_i-\bar{X}_n\right)\left(\frac{X_{n+1}-\bar{X}_n}{n+1}\right)+\frac{1}{(n+1)^2}\left(X_{n+1}-\bar{X}_n\right)^2\right] \\
& =\sum_{i=1}^n\left(X_i-\bar{X}_n\right)^2+\left(X_{n+1}-\bar{X}_n\right)^2-2 \frac{\left(X_{n+1}-\bar{X}_n\right)^2}{n+1}+\frac{n+1}{(n+1)^2}\left(X_{n+1}-\bar{X}_n\right)^2 \\
& =(n-1) S_n^2+\frac{n}{n+1}\left(X_{n+1}-\bar{X}_n\right)^2 .
\end{align}$$

</details>

---

### Problem 2

Let $\bar{X}_n=\frac{1}{n}\sum_{i=1}^n X_i$. The empirical variance is another estimator of the population variance defined as

$$\widehat\sigma_n^2 = \frac{1}{n}\sum_{i=1}^n (X_i-\bar{X}_n)^2$$

#### (a) Show that $\widehat\sigma_n^2$ is a biased estimator of the population variance $\sigma^2$.

<details class="ese-proof">
<summary>Show Solution</summary>

We need to see if $\mathbb{E}[\widehat\sigma_n^2]=\sigma^2$

$$\begin{align}
\mathbb{E}[\widehat\sigma_n^2] &= \mathbb{E}\left[\frac{1}{n}\sum_{i=1}^n (X_i-\bar{X}_n)^2\right] \\
&=\mathbb{E}\left[\frac{1}{n}\sum_{i=1}^n (X_i-\bar{X}_n + \mu - \mu)^2 \right]  \quad (\pm\mu) \\
&= \mathbb{E}\left[\frac{1}{n}\sum_{i=1}^n ((X_i-\mu)-(\bar{X}_n - \mu))^2 \right] \\
&= \mathbb{E}\left[\frac{1}{n}\sum_{i=1}^n (X_i-\mu)^2 -2(X_i-\mu)(\bar{X}_n - \mu) + (\bar{X}_n-\mu)^2\right] \\
&=\frac{1}{n}\sum_{i=1}^n \mathbb{E}[(X_i-\mu)^2] - \frac{2}{n}\mathbb{E}\left[\sum_{i=1}^n (\bar{X}_n-\mu)(X_i-\mu)\right] + \frac{1}{n}\sum_{i=1}^n \mathbb{E}[(\bar{X}_n-\mu)^2]
\end{align}$$

We can deal with each of these terms separately. For the first term, we use the fact that the samples are identically distributed to obtain

$$\frac{1}{n}\sum_{i=1}^n \mathbb{E}[(X_i-\mu)^2] = \frac{1}{n}\sum_{i=1}^n \mathbb{E}[(X-\mu)^2] = \frac{1}{n}\sum_{i=1}^n \sigma^2 = \sigma^2$$

The second term is the most tricky, but can be determined easily by manipulating the sum:

$$\begin{align}
- \frac{2}{n}\mathbb{E}\left[\sum_{i=1}^n (\bar{X}_n-\mu)(X_i-\mu)\right] &= - \frac{2}{n}\mathbb{E}\left[(\bar{X}_n-\mu)\sum_{i=1}^n (X_i-\mu)\right] \\
&=  - 2\mathbb{E}\left[(\bar{X}_n-\mu)\frac{1}{n}\sum_{i=1}^n (X_i-\mu)\right] \\
&=- 2\mathbb{E}\left[(\bar{X}_n-\mu)(\bar{X}_n-\mu)\right] \\
&=-2\left(\frac{\sigma^2}{n}\right) \quad \text{(variance of sample mean)}
\end{align}$$

Finally, the last term is simply the variance of the sample mean:

$$\frac{1}{n}\sum_{i=1}^n \mathbb{E}[(\bar{X}_n-\mu)^2] =  \mathbb{E}[(\bar{X}_n-\mu)^2] = \frac{\sigma^2}{n}$$

Putting these three parts together, we obtain:

$$\mathbb{E}[\widehat{\sigma}_n^2] = \sigma^2 - \frac{2\sigma^2}{n} + \frac{\sigma^2}{n} = \left(\frac{n-1}{n}\right)\sigma^2$$

</details>

#### (b) Propose a correction to the empirical variance that removes the bias in the estimator. In other words, find a meaningful function $g(\cdot)$ that guarantees: $\mathbb{E}[g(\widehat\sigma_n^2)]=\sigma^2$

<details class="ese-proof">
<summary>Show Solution</summary>

Consider a class of linear functions $g(x)=cx$, where $c$ is some constant. We have that:

$$\mathbb{E}[g(\widehat\sigma_n^2)] = \mathbb{E}[c\widehat\sigma_n^2] = c\mathbb{E}[\widehat\sigma_n^2] = c\left(\frac{n-1}{n}\right)\sigma^2$$

To satisfy $\mathbb{E}[g(\widehat\sigma_n^2)]=\sigma^2$, we can choose $c=\frac{n}{n-1}$. This is called **Bessel's correction** and yields the sample variance.

</details>

#### (c) Show that if the population mean is known, then the empirical variance is unbiased. That is, show the following estimator is unbiased: $\widehat\sigma_n^2 = \frac{1}{n}\sum_{i=1}^n (X_i-\mu)^2$

<details class="ese-proof">
<summary>Show Solution</summary>

The proof is straightforward and simply uses the linearity property of expectation and the definition of variance:

$$\begin{align}
\mathbb{E}[\widehat\sigma_n^2] &= \mathbb{E}\left[\frac{1}{n}\sum_{i=1}^n (X_i-\mu)^2\right] \\
&= \frac{1}{n}\sum_{i=1}^n \mathbb{E}\left[(X_i-\mu)^2\right] \\
&=\mathbb{E}\left[(X-\mu)^2\right]=\sigma^2
\end{align}$$

</details>

---

### Problem 3

Let $w_1, \ldots, w_n$ define a set of weights such that $w_i\geq 0$ and $\sum_{i=1}^n w_i=1$. The weighted sample mean is defined as:

$$\widehat\mu_n = \sum_{i=1}^n w_iX_i$$

#### (a) Show that $\widehat\mu_n$ is an unbiased estimator for the population mean.

<details class="ese-proof">
<summary>Show Solution</summary>

The proof is straightforward and uses the given condition $\sum_{i=1}^n w_i = 1$ and the linearity property of expectations:

$$\begin{align}
\mathbb{E}[\widehat\mu_n] &= \mathbb{E}\left[\sum_{i=1}^n w_iX_i\right] \\
&= \sum_{i=1}^n w_i\mathbb{E}[X_i] \\
&= \sum_{i=1}^n w_i\mu = \mu
\end{align}$$

</details>

#### (b) Compare the variance of the weighted sample mean $\widehat\mu_n$ with the unweighted sample mean $\bar{X}_n$. Which has smaller variance?

<details class="ese-proof">
<summary>Show Solution</summary>

Recall the variance of the unweighted sample mean is $\mathbb{V}[\bar{X}_n]= \frac{\sigma^2}{n}$. For the weighted sample mean we have:

$$\begin{align}
\mathbb{V}[\widehat\mu_n] &= \mathbb{V}\left[\sum_{i=1}^n w_iX_i\right] \\
&= \sum_{i=1}^n \mathbb{V}\left[w_iX_i\right] \quad \text{(by independence)}\\
&=\sum_{i=1}^n w_i^2\mathbb{V}[X_i] \quad (\mathbb{V}[aX]=a^2\mathbb{V}[X]) \\
&=\sigma^2\left(\sum_{i=1}^n w_i^2\right)
\end{align}$$

It is not difficult to see that the minimum variance of $\widehat\mu_n$ is obtained by setting $w_i=\frac{1}{n}$ for all $i$ and so:

$$\mathbb{V}[\bar{X}_n] \leq \mathbb{V}[\widehat\mu_n]$$

The maximum variance is achieved when only one of the samples has nonzero weight. In that case, $\mathbb{V}[\widehat\mu_n]=\sigma^2$.

</details>

---

### Problem 4

Let $X_1, \ldots, X_n$ be a random sample from a population with mean $\mu$ and variance $\sigma^2$. Show that

$$\mathbb{E}\left[\frac{\sqrt{n}\left(\bar{X}_n-\mu\right)}{\sigma}\right]=0$$

$$\mathbb{V}\left[\frac{\sqrt{n}\left(\bar{X}_n-\mu\right)}{\sigma}\right] = 1$$

Thus, the normalization of $\bar{X}_n$ in the Central Limit Theorem gives random variables that have the same mean and variance as the limiting $\mathcal{N}(0,1)$ distribution.

<details class="ese-proof">
<summary>Show Solution</summary>

Using $\mathbb{E}[\bar{X}_n]=\mu$ and $\mathbb{V}[\bar{X}_n]=\sigma^2 / n$, we obtain:

$$\begin{align}
\mathbb{E}\left[\frac{\sqrt{n}\left(\bar{X}_n-\mu\right)}{\sigma}\right]&=\frac{\sqrt{n}}{\sigma} \mathbb{E}\left[\bar{X}_n-\mu\right]=\frac{\sqrt{n}}{\sigma}(\mu-\mu)=0
\end{align}$$

$$\begin{align}
\mathbb{V}\left[\frac{\sqrt{n}\left(\bar{X}_n-\mu\right)}{\sigma}\right]&=\frac{n}{\sigma^2} \mathbb{V}\left[\bar{X}_n-\mu\right]=\frac{n}{\sigma^2} \mathbb{V}\left[\bar{X}_n\right]=\frac{n}{\sigma^2} \frac{\sigma^2}{n}=1
\end{align}$$

</details>

---

### Problem 5

Let $X_1, X_2, \ldots$ be a sequence of random variables that converges in probability to a positive constant $a>0$, that is $X_n\rightarrow a$ in probability. Assume that $\mathbb{P}(X_i>0)=1$ for all $i$ (i.e., the random variables $X_i$ are positive). Verify that the sequences defined by $Y_i=\sqrt{X_i}\rightarrow \sqrt{a}$ and $Y_i^{\prime}=a / X_i\rightarrow 1$ converge in probability.

<details class="ese-proof">
<summary>Show Solution</summary>

The key for this problem is to try and rewrite the convergence in probability statement for each of these transformed random variables as a statement about the convergence in probability of $X_n$ to $a$.

**Showing $Y_i\rightarrow \sqrt{a}$ in probability:**

For any $\epsilon>0$,

$$\begin{align}
\mathbb{P}\left(\lvert\sqrt{X_n}-\sqrt{a}\rvert>\epsilon\right) & =\mathbb{P}\left(\lvert\sqrt{X_n}-\sqrt{a}\rvert\lvert\sqrt{X_n}+\sqrt{a}\rvert>\epsilon\lvert\sqrt{X_n}+\sqrt{a}\rvert\right) \\
& =\mathbb{P}\left(\lvert X_n-a\rvert>\epsilon\lvert\sqrt{X_n}+\sqrt{a}\rvert\right) \\
& \leq \mathbb{P}\left(\lvert X_n-a\rvert>\epsilon \sqrt{a}\right) \rightarrow 0,
\end{align}$$

as $n \rightarrow \infty$, since $X_n \rightarrow a$ in probability. Thus $\sqrt{X_n} \rightarrow \sqrt{a}$ in probability.

**Showing $Y_i^\prime \rightarrow 1$ in probability:**

For $0<\epsilon<1$, we have that:

$$\begin{align}
\mathbb{P}\left(\lvert\frac{a}{X_n}-1\rvert \leq \epsilon\right) & =\mathbb{P}\left(\frac{a}{1+\epsilon} \leq X_n \leq \frac{a}{1-\epsilon}\right) \\
& =\mathbb{P}\left(a-\frac{a \epsilon}{1+\epsilon} \leq X_n \leq a+\frac{a \epsilon}{1-\epsilon}\right) \\
& \geq \mathbb{P}\left(a-\frac{a \epsilon}{1+\epsilon} \leq X_n \leq a+\frac{a \epsilon}{1+\epsilon}\right) \quad \text{Use: } \left(a+\frac{a \epsilon}{1+\epsilon}<a+\frac{a \epsilon}{1-\epsilon}\right) \\
& =\mathbb{P}\left(\lvert X_n-a\rvert \leq \frac{a \epsilon}{1+\epsilon}\right) \rightarrow 1,
\end{align}$$

as $n \rightarrow \infty$, since $X_n \rightarrow a$ in probability. Thus $a / X_n \rightarrow 1$ in probability.

For $\epsilon\geq 1$, the convergence statement follows from the case $0<\epsilon<1$ because the event $\{\lvert a/X_n-1\rvert\leq\epsilon\}$ is larger.

</details>

---

</div>
