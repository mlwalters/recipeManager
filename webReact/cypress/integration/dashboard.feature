Feature: Dashboard
  Background: Go to the App
    Given I am on the app

  Scenario: I can see the recipe dashboard
    Then I see 'Favorites'
    Then I see 'Meal Planner'
    And I see 'Shopping List'

  Scenario: I can see the recipe card
    Then I see 'Strawberry Cheesecake'
    And I see 'Lentil Soup'