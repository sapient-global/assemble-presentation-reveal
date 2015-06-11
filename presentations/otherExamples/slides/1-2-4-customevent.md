---
title: Custom Events
slideDataAttr:
  state: customevent
presentation: otherExamples
published: true
---


Additionally custom events can be triggered on a per slide basis by binding to the `data-state` name.

{% highlight javascript %}
Reveal.addEventListener( 'customevent', function() {
  console.log( '"customevent" has fired' );
} );
{% endhighlight %}