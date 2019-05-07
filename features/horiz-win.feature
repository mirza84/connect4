Feature: Horizontal win
  As user I would like the app to detect horizontal way of winning.

Background:
  Given that I goto the game page
  When I choose to play as two human players
  And with two different names
  And press the Börja spela-button
  Then the game should start

Scenario: Horizontal win
  When the first player plays 4 bricks in a row horizontally
  Then he/she should win
