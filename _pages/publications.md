---
layout: archive
title: "Publications"
permalink: /publications/
author_profile: true
---

{% if site.author.googlescholar %}
  <div class="wordwrap">You can also find my articles on <a href="{{site.author.googlescholar}}">my Google Scholar profile</a>.</div>
{% endif %}

{% assign sortedPublications = site.publications | sort: 'date' | reverse %}
{% assign postsByYear = sortedPublications | group_by_exp: "item", "item.date | date: '%Y'" %}
{% assign sortedYears = postsByYear | sort: 'name' | reverse %}
{% for year in sortedYears %}
  <h1 class="archive__subtitle" style="color: black;">{{ year.name }}</h1>
  {% for post in year.items %}
    {% include archive-single.html %}
  {% endfor %}
{% endfor %}
