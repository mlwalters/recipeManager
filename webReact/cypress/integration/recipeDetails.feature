Feature: Recipe Details
  Background: Go to Recipe Details
    Given I am on the Recipe Details Page

  Scenario: I can see the recipe details
    Then I see 'Lentil Soup'
    Then I see 'The touch of spices and finishing it off with lemon really lifts this soup to the next level.'
    Then I see '6'
    Then I see 'Preheat oven to 160C/320F (standard) or 140C/295F (fan/convection)'