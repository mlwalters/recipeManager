Feature: Recipe
  Background: Go to the App
    Given I am on the app

  Scenario: I can see the recipe details
    Then I see 'Strawberry Cheesecake'
    Then I see 'A light-yet-rich cheesecake, creamy but not dense-creamy like New York cheesecake.'
    Then I see 12
    And I see 'This is my favorite cheesecake recipe.'
  