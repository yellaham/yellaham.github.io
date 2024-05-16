---
layout: archive
title: "Publications"
permalink: /publications/
author_profile: true
---

{% if site.author.googlescholar %}
  <div class="wordwrap">You can also find my articles on <a href="{{site.author.googlescholar}}">my Google Scholar profile</a>.</div>
{% endif %}

{% assign postsByYear = site.publications | group_by_exp: "item", "item.date | date: '%Y'" %}
{% for year in postsByYear reversed %}
  <h1 class="archive__subtitle">{{ year.name }}</h1>
  {% for post in year.items %}
    {% include archive-single.html %}
  {% endfor %}
{% endfor %}
