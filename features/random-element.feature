Feature: Check that there is a random element in bot play
  As system owner I would like bots to play a bit randomly so that they are more fun to meet
 
Background:
  Given that I goto the game page
  When I choose to play as two smart bots
  And with two different names
  And press the Börja spela-button
  Then the game should start
 
Scenario: 
  Given that two smart bots meet
  When they have played until someone wins
  Then they should not always have played identically
