///<reference types="cypress" />
import { LoggedUserData } from './../../src/types/index';

Cypress.Commands.add('login', () => {
	const email = 'test@gmail.com';
	const password = 'test123';

	cy.session(email, () => {
		cy.visit('/levels');
		cy.get('[data-cy=login-button]').click();
		cy.get('input[name=email]').type(email);
		cy.get('input[name=password]').type(`${password}{enter}`, { log: false });

		cy.get('[data-cy=logged-user-button]').should('exist');

		cy.then(() => {
			const loggedUser = JSON.parse(localStorage.getItem('logged-user')) as LoggedUserData | null;
			expect(loggedUser.auth?.aud).to.equal('authenticated');
		});
		
	});
});

