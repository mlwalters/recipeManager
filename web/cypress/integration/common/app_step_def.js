import {
  Given, When, Then,
} from 'cypress-cucumber-preprocessor/steps';

Given('I am on the Landing Page of the app', () => {
  cy.visit('/');
});

Given('I am on the Home Page', () => {
  cy.visit('/home');
});

Given('I am on the Recipe Details Page', () => {
  cy.visit('/recipe/2');
});

Then('I can see the app details', (label) => {
  cy.get('body')
    .contains(label)
    .should('exist');
});

// Then('I can see the app bar', (name) => {
//   cy.get('body')
//     .contains(name)
//     .should('exist');
// });

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

// Then('I can add a recipe', () => {
//   // code that adds a recipe
// });

When('I click on {string} within {string}', (label, roleSelector) => {
  cy.get(`[role='${roleSelector}']`).find('button').contains(label).click();
});

// Then('I see...', () => {
//   // check that recipe titles exist and new one
// });

Then('I see {string}', (label) => {
  cy.get('body')
    .contains(label)
    .should('exist');
});

// When('I type {string} into {string}', (value, label) => {
//   cy.get('form').contains(label).type(value);
// });

// When('I select {string} from the options', (value) => {
//   cy.get('[role="listbox"]').contains(value).click({ multiple: true });
// });

// Then('I see {string}', (label) => {
//   cy.get('body')
//     .contains(label)
//     .should('exist');
// });
