---
title: Newsletter Archive
permalink: /newsletter-archive/
header_image: /assets/images/narthex-cross.jpg
order: 9
---

Catch up on what's been happening at Bethany. Each month's newsletter is archived here — click any issue to read it right in your browser, or download the PDF.

{% assign newsletters = site.newsletters | sort: "date" | reverse %}
<ul class="newsletter-list">
{% for issue in newsletters %}
  <li>
    <strong>{{ issue.date | date: "%B %Y" }}</strong> &mdash;
    <a href="{{ issue.url | relative_url }}">{{ issue.title }}</a>
    {% if issue.pdf %} &middot; <a href="{{ issue.pdf | relative_url }}" target="_blank" rel="noopener">PDF</a>{% endif %}
    {% if issue.summary %}<br><small>{{ issue.summary }}</small>{% endif %}
  </li>
{% endfor %}
{%- comment -%}
  Auto-list any PDF dropped into assets/uploads/ that doesn't yet have a curated
  _newsletters entry, so a newly added file appears here (and is viewable inline)
  with no other change. site.static_files works on the classic GitHub Pages build,
  so no plugin is required.
{%- endcomment -%}
{%- assign known = "" -%}
{%- for issue in site.newsletters -%}{%- if issue.pdf -%}{%- assign known = known | append: issue.pdf | append: "|" -%}{%- endif -%}{%- endfor -%}
{%- assign dropped = site.static_files | where_exp: "f", "f.extname == '.pdf'" | sort: "path" | reverse -%}
{%- for f in dropped -%}
  {%- if f.path contains "/assets/uploads/" and f.name contains "ewsletter" -%}
    {%- unless known contains f.path -%}
  <li>
    <strong>{{ f.basename | remove: "newsletter-" | remove: "Newsletter-" }}</strong> &mdash;
    <a href="{{ "/newsletters/view/" | relative_url }}?file={{ f.path }}">{{ f.basename }}</a>
    &middot; <a href="{{ f.path | relative_url }}" target="_blank" rel="noopener">PDF</a>
    <br><small>Recently added</small>
  </li>
    {%- endunless -%}
  {%- endif -%}
{%- endfor -%}
</ul>

{% if newsletters.size == 0 %}*The first newsletter will appear here once it's uploaded.*{% endif %}
