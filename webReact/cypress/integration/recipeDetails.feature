Feature: Recipe Details
  Background: Go to Recipe Details
    Given I am on the Recipe Details Page

  Scenario: I can see the recipe details
    Then I see 'Lentil Soup'
    Then I see 'The touch of spices and finishing it off with lemon really lifts this soup to the next level.'
    Then I see '6'
    Then I see 'Heat oil in a large pot over medium heat. Add garlic and onion, cook for 2 minutes.'
