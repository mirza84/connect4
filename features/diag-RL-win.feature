Feature: Diagonal (right to left) win
  As user I would like the app to detect diagonal (right to left) way of winning.

Background:
  Given that I goto the game page
  When I choose to play as two human players
  And with two different names
  And press the Börja spela-button
  Then the game should start

Scenario: Diagonal win (right to left)
  When the first player plays 4 bricks in a diagonally (right to left)
  Then he/she should win