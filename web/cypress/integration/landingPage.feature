Feature: Landing Page
  Background: Go to the App
    Given I am on the app

  Scenario: I can see the app details
    Then I see 'Big Bite Recipe Manager makes saving your recipes easier.'
    And I see 'Made by: Maricar Lusuegro Walters'
