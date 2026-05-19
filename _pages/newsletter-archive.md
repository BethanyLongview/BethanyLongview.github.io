---
title: Newsletter Archive
permalink: /newsletter-archive/
order: 9
---

Catch up on what's been happening at Bethany. Each month's newsletter is archived here.

{% assign newsletters = site.newsletters | sort: "date" | reverse %}
{% if newsletters.size > 0 %}
<ul class="newsletter-list">
{% for issue in newsletters %}
  <li>
    <strong>{{ issue.date | date: "%B %Y" }}</strong> &mdash;
    {% if issue.pdf %}
      <a href="{{ issue.pdf | relative_url }}">{{ issue.title }} (PDF)</a>
    {% else %}
      {{ issue.title }}
    {% endif %}
    {% if issue.summary %}<br><small>{{ issue.summary }}</small>{% endif %}
  </li>
{% endfor %}
</ul>
{% else %}
*The first newsletter will appear here once it's uploaded.*
{% endif %}
