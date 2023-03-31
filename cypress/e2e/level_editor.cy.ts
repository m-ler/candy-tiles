describe('Level editor page', () => {
	beforeEach(() => {
		cy.visit('/level-editor');
	});

	it('clicking the go back button in should return to previous page', () => {
		cy.get('[data-cy=level-editor-go-back-button]').should('be.visible').click();
		cy.get('[data-cy=level-editor-go-back-button]').should('not.exist');
	});

	it('clicking the clear editor button should open a clear level dialog', () => {
		cy.get('[data-cy=clear-editor-button]').should('be.visible').click();
		cy.get('[data-cy=clear-editor-dialog]').should('be.visible');
	});

	it('clicking the cancel button in clear editor dialog should close the dialog', () => {
		cy.get('[data-cy=clear-editor-button]').should('be.visible').click();
		cy.get('[data-cy=clear-editor-dialog]').find('button:contains("Cancel")').should('be.visible').click();
		cy.get('[data-cy=clear-editor-dialog]').should('not.exist');
	});

	it('clicking the clear button in clear editor dialog should clear grid editor', () => {
		cy.get('[data-cy=editor-level-element-button').first().click();
		cy.get('[data-cy=grid-editor-tile').first().click();
		cy.get('[data-cy=grid-editor-tile').filter(':has(*)').should('have.length', 1);

		cy.get('[data-cy=clear-editor-button]').click();

		cy.get('[data-cy=clear-editor-dialog]').find('button:contains("Clear")').should('be.visible').click();
		cy.get('[data-cy=clear-editor-dialog]').should('not.exist');

		cy.get('[data-cy=grid-editor-tile').filter(':has(*)').should('have.length', 0);
	});

	it('clicking the download button should download a JSON file with the level content', () => {
		cy.get('[data-cy=level-editor-download-button]').should('be.visible').click();
		cy.readFile('cypress\\Downloads\\candy_tiles_level.json').should('exist');
	});

	it('clicking the save button should open the authentication dialog when user is not logged', () => {
		cy.get('[data-cy=level-editor-save-button]').should('be.visible').click();
		cy.get('[data-cy=auth-dialog]').should('be.visible');
	});
});

describe('Save level validations', () => {
	beforeEach(() => {
		cy.intercept('POST', 'https://wjkhdliegkpfcyhdsnvk.supabase.co/rest/v1/levels?*');
		cy.login();
		cy.visit('/level-editor');
	});

	it('should show "All avaliable tiles must have an item." message', () => {
		cy.get('[data-cy=level-editor-save-button]').click();
		cy.contains('All avaliable tiles must have an item.').should('be.visible');
	});

	it.only('should show "Level title is empty." message', () => {
		cy.get('[data-cy=editor-level-element-button').eq(2).click();
		cy.get('[data-cy=grid-editor-item-slot]').each(($slot) => cy.wrap($slot).click({ force: true }));

		cy.get('[data-cy=level-editor-save-button]').click();
		cy.contains('Level title is empty.').should('be.visible');
	});
});

//describe('Form validation', () => {});
