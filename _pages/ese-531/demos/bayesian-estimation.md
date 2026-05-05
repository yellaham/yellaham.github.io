---
layout: single
title: "Demo: Bayesian Estimation"
permalink: /teaching/ese-531/demos/bayesian-estimation/
author_profile: true
toc: false
toc_label: "Demo"
---

<div class="ese-531" markdown="1">

For Bernoulli data with a beta prior, posterior updating is parameter updating:

$$
\Theta\mid x\sim\mathrm{Beta}(\alpha+s,\beta+n-s).
$$

<div class="ese-demo" data-demo="bayesian-estimation">
  <div class="ese-demo-grid">
    <div class="ese-demo-control">
      <label for="bayes-alpha">Prior alpha: <output data-output="alpha"></output></label>
      <input id="bayes-alpha" data-param="alpha" type="range" min="0.5" max="20" step="0.5" value="2">
    </div>
    <div class="ese-demo-control">
      <label for="bayes-beta">Prior beta: <output data-output="beta"></output></label>
      <input id="bayes-beta" data-param="beta" type="range" min="0.5" max="20" step="0.5" value="2">
    </div>
    <div class="ese-demo-control">
      <label for="bayes-n">Trials n: <output data-output="n"></output></label>
      <input id="bayes-n" data-param="n" type="range" min="1" max="80" value="20">
    </div>
    <div class="ese-demo-control">
      <label for="bayes-successes">Successes s: <output data-output="successes"></output></label>
      <input id="bayes-successes" data-param="successes" type="range" min="0" max="80" value="9">
    </div>
  </div>
  <div class="ese-demo-plot"></div>
  <div class="ese-demo-stats"></div>
  <p class="ese-demo-takeaway"></p>
</div>

When $s>n$, the script caps the effective number of successes at $n$ so the posterior remains meaningful.
When the beta posterior is not maximized in the interior, the MAP statistic is reported as a boundary value rather than by the interior formula.

<p class="ese-next"><a href="/teaching/ese-531/bayesian-estimation/">Back to topic notes</a></p>

</div>

<script src="/assets/js/ese531-demos.js" defer></script>
