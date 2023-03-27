describe('Home page', () => {
	it('successfuly loads', () => {
		cy.visit('/');
	});

	it('loads page elements', () => {
		cy.get('[data-cy=create-level-button]').should('exist');
		cy.get('[data-cy=play-button]').should('exist');
	});

	it('CREATE button redirects to create level page', () => {
		cy.get('[data-cy=create-level-button]').click();
		cy.location('pathname').should('equal', '/level-creator');
	});

	it('PLAY button  redirects to levels page', () => {
		cy.visit('/');
		cy.get('[data-cy=play-button]').click();
		cy.location('pathname').should('equal', '/levels');
	});
});