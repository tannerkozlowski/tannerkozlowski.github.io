---
layout: blog_post
title: Challenge & Solution (Highcharts)
category: blog
---

While working at <a href="http://www.sigsensetech.com" target="_blank">Sigsense Technologies</a>, I was badly stuck with unseen customization of Highcharts graph.

![Machine Learning UI](/img/portfolio/sigsense_machine_learning.png)

Highcharts graph needed to be made bi-directional, which meant end-users being able to draw different types of plots using their mouse.  
In addition, already-drawn plots were to be resized by the end-users' dragging of the plot edges. (you could notice the colorful pillars from the above figure)  
Given the primary purpose of Highcharts, it implied heavy customization and an elaborate manipulation of the available interfaces to the graph.

Google it! That was my first response to this challenge.  
It was not very successful, as there were no such use cases discussed or answered publicly.  
So there came the realization -
> I need the **top-down approach**

Here's how I broke the issue down to smaller pieces.

<img src="/img/blog/top-down-sigsense.png" alt="Flight History Simulator" width="100%">

At the end of the day, the challenge boiled down to resolving 3 **<abbr title="the green ones on the above figure">leaf issues</abbr>** :
- Catch mouse events on Highcharts canvas
- Add plots after the graph is rendered
- Remove plots after the graph is rendered

<p class="codepen" data-height="501" data-theme-id="0" data-default-tab="result" data-user="zixingliu" data-slug-hash="WPWBpJ" style="height: 501px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid black; margin: 1em 0; padding: 1em;" data-pen-title="Highcharts draw on-the-fly">
  <span>See the Pen <a href="https://codepen.io/zixingliu/pen/WPWBpJ/">
  Highcharts draw on-the-fly</a> by Zixing Liu (<a href="https://codepen.io/zixingliu">@zixingliu</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

Then, with the issue broken down to tangible, atomic and easy-to-solve pieces, I did the dreaded and contributed to the original value of the product.
