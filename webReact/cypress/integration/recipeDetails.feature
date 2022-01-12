Feature: Recipe Details
  Background: Go to Recipe Details
    Given I am on the Recipe Details Page

  Scenario: I can see the recipe details
    Then I see 'Lentil Soup'
    And I see 'The touch of spices and finishing it off with lemon really lifts this soup to the next level.'
    And I see '6'
    And I see 'Soup'
    And I see 'Heat oil in a large pot over medium heat. Add garlic and onion, cook for 2 minutes.'
