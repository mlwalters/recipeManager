Feature: Recipe
  Background: Go to the App
    Given I am on the app

  Scenario: I can see the recipe details
    Then I see 'Strawberry Cheesecake'
    Then I see 'A light-yet-rich cheesecake, creamy but not dense-creamy like New York cheesecake.'
    And I see '12'