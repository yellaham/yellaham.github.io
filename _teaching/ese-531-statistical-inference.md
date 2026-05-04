---
title: "ESE 531: Statistical Learning and Inference"
collection: teaching
type: "Graduate"
permalink: /teaching/ese-531
venue: "Stony Brook University, Department of Electrical and Computer Engineering"
date: 2024-01-01
location: "Stony Brook, NY"
excerpt: "Graduate-level course covering statistical inference and estimation theory, including parameter estimation, hypothesis testing, and Bayesian methods."
---

<div class="ese-531" markdown="1">

## Course Description

ESE 531 is a graduate-level course on statistical estimation, inference, and detection. The course develops the tools used to infer unknown quantities from data: random samples, point estimation, estimator evaluation, Bayesian inference, linear models, and hypothesis testing.

The notes below are web-native course materials organized by topic. The sequence is meant to move from the behavior of random samples, through estimators and their limits, into Bayesian computation, linear models, and detection.

## Topic Sequence

<ol class="ese-course-map">
  <li><a href="/teaching/ese-531/random-samples/">Random Samples and Sample Statistics</a><span>Population models, iid samples, sample means, sample variances, and why statistics are random variables.</span></li>
  <li><a href="/teaching/ese-531/probability-inequalities-limit-theorems/">Probability Inequalities and Limit Theorems</a><span>Markov, Chebyshev, Chernoff, convergence modes, laws of large numbers, the central limit theorem, Slutsky, and the delta method.</span></li>
  <li><a href="/teaching/ese-531/point-estimation/">Point Estimation</a><span>Identifiability, method of moments, likelihood construction, maximum likelihood estimation, constraints, and boundary cases.</span></li>
  <li><a href="/teaching/ese-531/mle-properties-optimization/">MLE Properties and Numerical Optimization</a><span>Consistency, Fisher information, asymptotic normality, invariance, convexity, gradient methods, Newton updates, and exponential families.</span></li>
  <li><a href="/teaching/ese-531/expectation-maximization/">Expectation-Maximization</a><span>Latent-variable likelihoods, EM monotonicity, and Gaussian mixture model updates.</span></li>
  <li><a href="/teaching/ese-531/estimator-risk-cramer-rao/">Estimator Risk and Scalar Cramer-Rao Bounds</a><span>MSE, bias-variance decomposition, risk, MVUEs, Fisher information benchmarks, and scalar efficiency.</span></li>
  <li><a href="/teaching/ese-531/efficient-estimators-vector-crlb/">Efficient Estimators and Vector Cramer-Rao Bounds</a><span>Equality in the CRLB, transformed parameters, nuisance parameters, and matrix lower bounds.</span></li>
  <li><a href="/teaching/ese-531/bayesian-estimation/">Bayesian Estimation</a><span>Bayes' theorem, conjugacy, MAP, MMSE, beta-Bernoulli updating, Gaussian priors, and improper flat priors.</span></li>
  <li><a href="/teaching/ese-531/prior-design-predictive-checks/">Prior Design and Predictive Checks</a><span>Prior strength, reparameterization, Jeffreys prior, calibration by moment matching, and posterior predictive diagnostics.</span></li>
  <li><a href="/teaching/ese-531/approximate-bayesian-inference/">Approximate Bayesian Inference</a><span>Predictive accuracy, cross-validation, Laplace approximation, variational inference, and the role of approximation error.</span></li>
  <li><a href="/teaching/ese-531/monte-carlo-methods/">Monte Carlo Methods</a><span>Monte Carlo error, rejection sampling, importance sampling, effective sample size, and Metropolis-Hastings.</span></li>
  <li><a href="/teaching/ese-531/linear-models-least-squares/">Linear Models and Least Squares</a><span>Normal equations, projection geometry, covariance, Gauss-Markov intuition, generalized least squares, and whitening.</span></li>
  <li><a href="/teaching/ese-531/detection-theory/">Detection Theory</a><span>Binary hypothesis tests, likelihood ratios, Neyman-Pearson testing, Gaussian mean and variance detection, and Bayes risk.</span></li>
  <li><a href="/teaching/ese-531/detection-examples/">Detection Theory Examples</a><span>Worked mean-shift, variance-change, threshold, and change-point calculations.</span></li>
</ol>

## Practice

- [Homework 1: Properties of Random Samples](/teaching/ese-531/homework/random-samples/)

## Topics

- **Properties of random samples:** sampling distributions, sample mean, sample variance, probability inequalities, convergence, laws of large numbers, central limit theorem, and delta method.
- **Point estimation:** method of moments, maximum likelihood, sufficient statistics, exponential families, constrained estimation, numerical optimization, and expectation-maximization.
- **Evaluation of estimators:** mean squared error, bias-variance tradeoff, MVUEs, Fisher information, Cramer-Rao bounds, efficiency, and predictive performance.
- **Bayesian estimation:** priors, Bayes' theorem, conjugacy, MAP, MMSE, Jeffreys prior, posterior predictive checks, Laplace approximation, Monte Carlo, and MCMC.
- **Linear models and detection theory:** least squares, generalized least squares, Gaussian noise models, likelihood-ratio tests, Neyman-Pearson testing, ROC curves, and Bayes risk.

## Recommended Supplementary Reading

- S. M. Kay, *Fundamentals of Statistical Signal Processing: Estimation Theory*, Prentice Hall, 1993.
- S. M. Kay, *Fundamentals of Statistical Signal Processing: Detection Theory*, Prentice Hall, 1998.
- G. Casella and R. Berger, *Statistical Inference*, 2nd ed., Duxbury Press, 2002.

## Prerequisites

- Calculus
- Linear algebra
- Probability theory

</div>
