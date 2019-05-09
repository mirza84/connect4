Feature: Bot vs bot
  Test who wins most between the two bots.

Background:
  Given that I goto the game page
  When I choose to play as two bot players
  And with two different names
  And press the Börja spela-button
  Then the game should start

Scenario: Bot vs bot - who wins
  When the player wins
  Then the results should be displayed