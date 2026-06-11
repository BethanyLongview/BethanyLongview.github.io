---
title: Sermons & Past Worship
permalink: /sermons/
header_image: /assets/images/worship-pews.jpg
order: 7
---

Catch up on a recent message or revisit a favorite. Our worship services are streamed and archived online, free to watch any time.

{% if site.data.site.facebook_url %}
[**Watch past services on Facebook →**]({{ site.data.site.facebook_url }})

Our **Facebook page** is updated most regularly — it's the best place to find recent and live-streamed services.
{% endif %}

{% if site.data.site.youtube_playlist_url %}
You'll also find an archive of sermons on our [**YouTube playlist**]({{ site.data.site.youtube_playlist_url }}).
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
