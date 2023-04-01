/// <reference types="cypress" />

type Interception = import('cypress/types/net-stubbing').Interception;

declare namespace Cypress {
	interface Chainable {
		login(): Chainable;
		loginAndGoToMyLevels(interceptLevelRequest?: boolean): Chainable<Interception>;
		fillGridEditor(): Chainable;
		moveLevelCandies(from: number, to: number): Chainable<Interception>;
	}
}
