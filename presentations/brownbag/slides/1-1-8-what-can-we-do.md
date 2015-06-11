---
title:
presentation: brownbag
published: true
classes:
- slides-step_VerticalSlides
---
<section>
    <div class="ContentAligner ContentAligner-Vertical">
        <div class="ContentAligner-LeftTop u-ShortTitleAlign">
            <div class="title__container">
                <h1 class="SlideContentTitle u-sans u-bold">What can we do with it?</h1>
                <div class="SlideTitleUnderline"></div>
            </div>
        </div>
        <div class="ContentContainer ContentAligner-LeftBottom">
            <ul class="SquareList u-list-padding">
                <li>
                    <p class="fragment highlight-current-blue">Multiplexing with <a href="http://socket.io/">socket.io</a></p>
                </li>
                <li>
                    <p class="fragment highlight-current-blue">Leap Motion Integration and Internet of things</p>
                </li>
                <li>
                    <p class="fragment highlight-current-blue">Amazing charts and <a href="http://fivethirtyeight.com/interactives/pollster-ratings/">interactive data</a></p>
                </li>
                <li>
                    <p class="fragment highlight-current-blue">Embedding code and highlighting</p>
                </li>
                <li>
                    <p class="fragment highlight-current-blue">Dynamix Data with <a href="http://d3js.org/">D3</a></p>
                </li>
            </ul>
            <p>And the posibilities just grow...</p>
        </div>
    </div>
    <aside class="notes">
        Even have speaker notes.
    </aside>
</section>
<section>
    <div class="ContentAligner ContentAligner-Vertical">
        <div class="ContentAligner-LeftTop u-ShortTitleAlign">
            <div class="title__container">
                <h1 class="SlideContentTitle u-sans u-bold">Embed Videos</h1>
                <div class="SlideTitleUnderline"></div>
            </div>
        </div>
        <div class="ContentContainer ContentAligner-LeftBottom">
            <iframe width="853" height="480" src="//www.youtube.com/embed/_d6KuiuteIA?rel=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>
        </div>
    </div>
</section>
<section>
    <div class="ContentAligner ContentAligner-Vertical">
        <div class="ContentAligner-LeftTop u-ShortTitleAlign">
            <div class="title__container">
                <h1 class="SlideContentTitle u-sans u-bold">Code highlighting</h1>
                <div class="SlideTitleUnderline"></div>
            </div>
        </div>
        <div class="ContentContainer ContentAligner-LeftBottom">
   <pre><code data-trim class="javascript">
(function(document, window) {
    'use strict';
        var fooBar = (function(window, document, fullScreenAPI) {
        var init = function() {
            //foo
        };
        return {
            init: init
        };
    })(window, document);
    fooBar.init();
})(document, window);
</code></pre>
        </div>
    </div>
</section>
<section>
    <div class="ContentAligner ContentAligner-Vertical">
        <div class="ContentAligner-LeftTop u-ShortTitleAlign">
            <div class="title__container">
                <h1 class="SlideContentTitle u-sans u-bold">Dynamic Data</h1>
                <div class="SlideTitleUnderline"></div>
            </div>
        </div>
        <div class="ContentContainer ContentAligner-LeftBottom">
        <div class="dynamicData d3"></div>
        </div>
    </div>
</section>