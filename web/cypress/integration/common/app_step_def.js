import {
  Given, Then,
} from 'cypress-cucumber-preprocessor/steps';

Given('I am on the app', () => {
  cy.visit('/');
});

Given('I am on the Home Page', () => {
  cy.visit('/home');
});

Then('I can see the app details', (label) => {
  cy.get('body')
    .contains(label)
    .should('exist');
});

Then('I can see the recipe card list after the page loads', (name) => {
  cy.get('body')
    .contains(name)
    .should('exist');
});

Then('I see {string}', (label) => {
  cy.get('body')
    .contains(label)
    .should('exist');
});
