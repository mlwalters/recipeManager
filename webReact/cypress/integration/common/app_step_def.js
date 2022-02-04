import {
  Given, Then,
} from 'cypress-cucumber-preprocessor/steps';

Given('I am on the app', () => {
  cy.visit('/');
});

Given('I am on the Recipe Details Page', () => {
  cy.visit('/recipe/2');
});

Then('I see {string}', (label) => {
  cy.get('body')
    .contains(label)
    .should('exist');
});

// Given('I see my current recipes', () => {
//   // check that recipe titles exist
// });

// And('I add...', () => {
//   // code that adds a recipe
// });

// Then('I see...', () => {
//   // check that recipe titles exist and new one
// });
