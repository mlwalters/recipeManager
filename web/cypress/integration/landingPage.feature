Feature: Landing Page
  Background: Go to the App
    Given I am on the app

  Scenario: I can see the app details
    Then I see 'Save your favorite recipes. Explore the foodie in you.'
    And I see 'Free for commercial or personal use'
    And I see 'Made by: Maricar Lusuegro Walters'
