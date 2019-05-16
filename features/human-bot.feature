Feature: Human to bot
  To be able to se if the moves of the bot are randomized.

Background:
  Given that I goto the game page
  When I choose to play as human to bot
  And with two different names
  And press the Börja spela-button
  Then the game should start

Scenario: Human to bot
  When the bot plays 4 bricks in a row
  Then the bot should win

Scenario: Human to bot
  When the bot plays 4 bricks in a row
  Then the bot should win

Scenario: Human to bot
  When the bot plays 4 bricks in a row
  Then the bot should win

Scenario: Human to bot
  When the bot plays 4 bricks in a row
  Then the bot should win

Scenario: Human to bot
  When the bot plays 4 bricks in a row
  Then the bot should win