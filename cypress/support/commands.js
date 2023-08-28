/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// login command

Cypress.Commands.add("login", (email, password) => {
  cy.visit(
    "http://127.0.0.1:5500/frontend/authentication-page/login/index.html"
  );
  cy.get(".email").type(email);
  cy.get(".password").type(password);
  cy.get(".login-btn").click();
});

// Register Command

Cypress.Commands.add("register", (username, email, password, confirmP) => {
  cy.visit(
    "http://127.0.0.1:5500/frontend/authentication-page/register/index.html"
  );
  cy.get(".username").type(username);
  cy.get(".email").type(email);
  cy.get(".password").type(password);
  cy.get(".confirm-password").type(confirmP);
  cy.get(".register-btn").click();
});

//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
