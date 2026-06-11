---
title: Sermons & Past Worship
permalink: /sermons/
header_image: /assets/images/worship-pews.jpg
order: 7
---

Catch up on a recent message or revisit a favorite. Our sermons and full Sunday services are archived on YouTube, free to watch any time.

{% if site.data.site.youtube_playlist_url %}
[**Watch all past sermons on YouTube →**]({{ site.data.site.youtube_playlist_url }})
{% endif %}

Whether you missed a Sunday, are traveling, or want to share a message with a friend, the archive is open to everyone.

{% assign recent_sermons = site.sermons | sort: "date" | reverse %}
{% if recent_sermons.size > 0 %}
## Recent Sermons

<ul class="sermon-list">
{% for sermon in recent_sermons limit: 12 %}
  <li>
    <strong>{{ sermon.date | date: "%B %-d, %Y" }}</strong> &mdash;
    <a href="{{ sermon.youtube_url }}">{{ sermon.title }}</a>
    {% if sermon.scripture %} <em>({{ sermon.scripture }})</em>{% endif %}
    {% if sermon.preacher %} &middot; {{ sermon.preacher }}{% endif %}
  </li>
{% endfor %}
</ul>
{% endif %}
