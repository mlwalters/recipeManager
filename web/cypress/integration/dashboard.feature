Feature: Dashboard
  Background: Go to the App
    Given I am on the app

  Scenario: I can see the recipe dashboard
    Then I see 'Favorites'
    And I see 'Meal Planner'
    And I see 'Shopping List'

  Scenario: I can see the recipe card
    Then I see 'Strawberry Cheesecake'
    And I see 'A light-yet-rich cheesecake, creamy but not dense-creamy like New York cheesecake.'
    And I see 'Lentil Soup'

  Scenario: I can add a recipe
    Given I see my current recipes
    And I add a new recipe
    Then I see my updated recipes
