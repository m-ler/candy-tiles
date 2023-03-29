/// <reference types="cypress" />

type Interception = import('cypress/types/net-stubbing').Interception;

declare namespace Cypress {
	interface Chainable {
		login(): Chainable;
		loginAndGoToMyLevels(): Chainable<Interception>;
	}
}
