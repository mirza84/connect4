Feature: 
Check that the perfect bot (gamesolver)
always wins (will work if our bot is not perfect)
 
Background:
  Given that I goto the game page
  When I choose to play as a bot and a human
  And with the names 'Our Bot' and 'Ms Perfect'
  And press the Börja spela-button
  Then the game should begin
 
Scenario: 
  Given that we are on the gamesolver page
  When I choose to play as human and bot in the gamesolver
  When they have played until someone wins
  Then the gamesolver bot should always win