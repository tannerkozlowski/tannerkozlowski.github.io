Client - What I was hired for.
Sigsense Technologies, in its infancy, hired me to build their Device Monitoring Dashboard from the scratch.
They had the design ready, and I owned the project as the sole full-stack developer.

Contributions - What value I added to the project.
* The whole REST API built with Django framework
* The whole front-end built with Angular 2
* 9 different types of data visualizations using D3 and Highcharts
* Machine learning UI that helps the underlying AI engine collect and analyze the patterns in device incidents

Challenges - How I overcame them.
The Machine Learning module needed some input from the users directly onto the already-rendered graphs.
Specifically, I had to implement on-the-fly drawing and moving of colored pillars as a part of the graph.
The target graph was built with Highchart library, and the official documentation wasn't for such use cases.
I did what a desparate would do. I literally dissected the libary's source code and documented necessary interfaces one by one. When done, I put them together to build a highly interactive graph that helped users mark the incident time ranges over the metrics plot.

Accomplishments - What I learned from this engagement.
The choice of technology deeply impacts the productivity. And all different choices should be given enough consideration with the longest vision involved in it.
Here's the story.
The Machine Learning module's interactive graph could have been much easier if we started with D3 in the very first place. We were short-sighted in the beginning, and saw that Highchart would help us build most of the visualizations effortlessly. And there came the hardest and the unexpected.
If we had considered more scenarios and use-cases of the product, we could have ended up starting with D3.
(In the end, we used it on 3 complicated visualizations though.)
