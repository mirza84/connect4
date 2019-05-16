Feature: Human to dum bot
  As user I would like to be able to play human against dum bot. 

Background:
  Given that I goto the game page
  When I choose to play as human to dum bot
  And with two different names
  And press the Börja spela-button
  Then the game should start

Scenario: Human to dum bot
  When the human plays 4 bricks in a row
  Then he/she should win
  And the winning result should show