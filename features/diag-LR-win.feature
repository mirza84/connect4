Feature: Diagonal (left to right) win
  As user I would like the app to detect diagonal (left to right) way of winning.

Background:
  Given that I goto the game page
  When I choose to play as two human players
  And with two different names
  And press the Börja spela-button
  Then the game should start

Scenario: Diagonal win (left to right)
  When the first player plays 4 bricks in a diagonally (left to right)
  Then he/she should win