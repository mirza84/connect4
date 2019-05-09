Feature: Dum bot vs bot
  As user I would like to be able to play bot against dum bot. 

Background:
  Given that I goto the game page
  When I choose to play as bot to dum bot
  And with two different names
  And press the Börja spela-button
  Then the game should start

Scenario: Dum bot vs bot 
  When the bot plays 4 bricks in a row
  Then the bot should win
  And the winning result should show
