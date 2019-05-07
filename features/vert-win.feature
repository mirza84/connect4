Feature: Vertical win
  As user I would like the app to detect vertical way of winning.

Background:
  Given that I goto the game page
  When I choose to play as two human players
  And with two different names
  And press the Börja spela-button
  Then the game should start
  
Scenario: Vertical win
  When the first player plays 4 bricks in a row vertically
  Then he/she should win