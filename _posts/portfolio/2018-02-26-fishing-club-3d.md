---
layout: default
title: Fishing Club 3D
category: portfolio
modal-id: 7
img: fishing.png
alt: Fishing Club 3D splash screen
team: Robot Riot
application: Fishing Game Engine
project-date: Feb 2017 - May 2017
tech:
- Ruby on Rails
- RSpec
- Capybara
- Rails Workers
- FactoryGirl
- Faker
- Leaderboard
- YAML
concepts:
- TDD
- Design Patterns
- REST API
- I18N
- Game Engine
tools:
- Sublime
- Asana
- Git
- Capistrano
- Postman
- cURL
stack:
- Linux
- MySQL
---

### Team

A German games studio, <a href="https://www.robotriotgames.com" target="_blank">Robot Riot</a>, had to uplift the player engagement with the final goal of revenue growth.
The team employed an ingenious concept of **Clubs** through which players could team up and compete against the other clubs in tournaments. These weekly club tournaments with prizes were the biggest incentives to the players, yet the biggest source of revenue to the company.

At some point, we saw the potential of better player engagement and increased revenue in
- increasing the number of tournaments
- increasing the odds of winning the prize for the clubs

The solution was to break the one big game-wide tournament down to several smaller ones that had configurable limits in the number of participants.  
Assuming there are 100 clubs total, 
- before: 1 tournament where 100 clubs participated, 1 prize winner
- after: 10 tournaments where 10 clubs participate, 10 prize winners

I was in charge of developing this feature, including some heavy migrations. The game engine was running on __Ruby on Rails__.
### Contributions

#### 8.9% increase in the annual revenue!

I took care of the refactoring, test coverage and the error-proof migration of the database.

On the other hand, I actively participated in the brainstorming sessions and helped them turn the idea into a refined action plan. I played a pivotal role in defining the specifications of this transformation.

The most significant contribution was bringing <abbr title="Test-driven development">TDD</abbr> to the table. The original engine didn't really have any tests written, and the QA was completely relying upon __beta testing__ on a staging server.
  
Confident that it could be better, I shed light on TDD and enforced it throughout the whole development phase.
### Challenges

Identifying and handling of the edge cases were the trickiest parts, both in terms of logic and implementation.  
Some of the trickiest scenarios were:
- a player joins a winning club at the end of a tournament, and should we prize him if the club wins?
- how to calculate a club's score when a player exits or enters it during the tournament?
- whom to prize when the scores are the same? what kinds of criteria to enforce?

These issues needed some creative thinking and great attention to detail when writing tests.

Technologically, the biggest challenge was writing tests that could adequately mimic the data flow of the real game.  
As for the nature of the game, the test cases had to __cover large sets of data__. And at the same time, test data __couldn't be statically defined__.  
I came up with my own testing system where
1. YAML files define the skeleton of large input data-sets
2. a middleware parses YAML files to pseudo models
3. a <abbr title="a Ruby gem">Faker</abbr> randomly generates test outputs
4. a reverse algorithm deduces input values from the outputs
5. Psuedo models get filled with the deduced input values
6. Rspec script verifies that the populated models result in the defined outputs

### Accomplishments, My lesson

I personally proved that TDD was worth its fame.  
With the TDD in place, the number of failing beta tests decreased by 85%.

To the team's delight, the revenue increased by 8.9% after the transformation.  
It took 7 months to get the statistics, and they happily informed me at the end of the fiscal year.
