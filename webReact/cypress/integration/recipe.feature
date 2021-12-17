Feature: Recipe
  Background: Go to the App
    Given I am on the app

  Scenario: I can see the recipe card
    Then I see 'Strawberry Cheesecake'
    Then I see 'A light-yet-rich cheesecake, creamy but not dense-creamy like New York cheesecake.'
    Then I see 'View Recipe'
    And I see 'Add to meal planner'

  Scenario: I can see the recipe dashboard
    Then I see 'Favorites'
    Then I see 'Meal Planner'
    And I see 'Shopping List'