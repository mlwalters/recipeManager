
Feature: Home Page
  Background: Go to the Home Page
    Given I am on the Home Page

#  Scenario: I can see the app bar
#     Then I see 'MY RECIPES'
#     Then I see 'FAVORITES'
#     And I see 'SHOPPING LIST'

  Scenario: I can see the recipe card list after the page loads
    Then I see 'Loading...'
    Then I see 'Strawberry Cheesecake'
    Then I see 'Dessert'
    And I see 'A light-yet-rich cheesecake, creamy but not dense-creamy like New York cheesecake.'

  Scenario: I can add a recipe
    When I click on 'ADD RECIPE'
    Then I type 'Greek Chicken Gyros' into 'Recipe name'
    Then I type 'The marinade for the chicken is so sensational' into 'Description'
    Then I select 'Poultry' from the options
    When I click on 'ADD RECIPE'
    Then display the recipe card list