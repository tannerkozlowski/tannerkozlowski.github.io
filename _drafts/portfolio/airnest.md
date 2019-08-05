Client - What I was hired for.
Airnest, now a part of Measure.com, was in need of a front-end developer who could build the complex UI/UX of their Drone Management System. Over time, I also took part in the back-end development, especially for the counter-parts of the front-end blocks I built.

Contributions - What value I added to the project.
Besides the generic purpose reports and data tables, I made 2 significant contributions to the project.
First off, I envisioned and built a Flight History Simulator which included self-made Altitude Meter.
Secondly, I brought Flight Area Planner into realization, using MapBox.

On the back-end, in collaboration with their drone expert, I wrote Flight Log Parser that transformed some raw drone log files into consumable PostgreSQL records.

Challenges - How I overcame them.
In this project, the challenges were attributable to the pursuit of optimal user experience.
First and the mildest one was how to keep the parsing time of drone logs from blocking the user's simultaneous activities. The solution was rather simple, I employeed Rails worker to do the job in the background.
Secondly, I had to figure out the ways to enable users use the Flight History Simulator without any prior training. After intensive brain-storming and surfing online for some insights, I made it resemble after the Youtube video player. Ever since, no single user reported confusion with the simulator.

The biggest challenge was with the Flight Area Planner, where I had to enable the drawing of a circle area both on 2D and 3D versions of the map. I had a go with the traditional way of doing it all by myself and realized that it'd take me nowhere. I asked the project lead, Justin, about the track drawing module of their iPad app. I picked the algorithm of breaking curves down to the lines and elaborated from there.

Accomplishments - What I learned from this engagement.
Needless to say, I got a level up in Ember DS (DataStore) and Ruby on Rails serializers.
Also, I learned how to delegate effectively and make use of existing resources to my advantages.

Another refreshing experience taught me that I need some fresh distractions from time to time.
Back to the story of Flight History Simulator - I couldn't have made it in time if I had been staring at the code-base for hours. My decision to let go and switch to my personal hobby of video editing gave me the aha moment.
