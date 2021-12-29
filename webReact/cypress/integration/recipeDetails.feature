Feature: Recipe Details
  Background: Go to Recipe Details
    Given I am on the recipe details page

  Scenario: I can see the recipe details
    Then I see 'Lentil Soup'
