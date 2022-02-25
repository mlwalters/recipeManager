
Feature: Home Page
  Background: Go to the Home Page
    Given I am on the Home Page

  Scenario: I can see the recipe card list after the page loads
    Then I see 'Loading...'
    Then I see 'Strawberry Cheesecake'
    Then I see 'Dessert'
    And I see 'A light-yet-rich cheesecake, creamy but not dense-creamy like New York cheesecake.'
