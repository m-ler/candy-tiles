import { GRID_NUMBER } from '../../src/config';

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
		cy.get('[data-cy=editor-element-button-Ice-tile]').click();
		cy.get('[data-cy=grid-editor-tile-slot]').first().click();
		cy.get('[data-cy=grid-editor-tile-slot]').filter(':has(img)').should('have.length', 1);

		cy.get('[data-cy=clear-editor-button]').click();

		cy.get('[data-cy=clear-editor-dialog]').find('button:contains("Clear")').should('be.visible').click();
		cy.get('[data-cy=clear-editor-dialog]').should('not.exist');

		cy.get('[data-cy=grid-editor-tile-slot]').filter(':has(img)').should('have.length', 0);
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

describe('Grid editor', () => {
	beforeEach(() => {
		cy.visit('/level-editor');
	});

	it('level element cursor should indicate the selected element', () => {
		cy.get('[data-cy=level-editor-cursor]').find('img').should('not.exist');
		cy.get('[data-cy=editor-element-button-Red-candy]').click();
		cy.get('[data-cy=level-editor-cursor]').find('img').should('exist');
	});

	it('level element cursor should show an eraser icon when holding right click mouse button', () => {
		cy.get('[data-cy=level-editor-cursor]').find('svg').should('not.exist');
		cy.get('[data-cy=grid-editor-slot]').first().rightclick();
		cy.get('[data-cy=level-editor-cursor]').find('svg').should('exist');
	});

	it('right click on a slot should remove slots from the grid.', () => {
		cy.get('[data-cy=grid-editor-slot]').filter(':has(span)').should('have.length', GRID_NUMBER);
		cy.get('[data-cy=grid-editor-slot]').first().rightclick();
		cy.get('[data-cy=grid-editor-slot]')
			.filter(':has(span)')
			.should('have.length', GRID_NUMBER - 1);
	});

	it('left click on a slot should add slots to the grid.', () => {
		cy.get('[data-cy=grid-editor-slot]').first().rightclick();
		cy.get('[data-cy=grid-editor-slot]')
			.filter(':has(span)')
			.should('have.length', GRID_NUMBER - 1);

		cy.get('[data-cy=grid-editor-slot]').first().click();
		cy.get('[data-cy=grid-editor-slot]').filter(':has(span)').should('have.length', GRID_NUMBER);
	});

	it('right click on a slot should remove tiles from the grid when a tile is selected.', () => {
		cy.get('[data-cy=editor-element-button-Ice-tile]').click();
		cy.get('[data-cy=grid-editor-tile-slot]').first().click();
		cy.get('[data-cy=grid-editor-tile-slot]').filter(':has(img)').should('have.length', 1);
		cy.get('[data-cy=grid-editor-tile-slot]').first().rightclick();
		cy.get('[data-cy=grid-editor-tile-slot]').filter(':has(img)').should('have.length', 0);
	});

	it('right click on a slot should remove items from the grid when an item is selected.', () => {
		cy.get('[data-cy=editor-element-button-Chocolate]').click();
		cy.get('[data-cy=grid-editor-item-slot]').first().click();
		cy.get('[data-cy=grid-editor-item-slot]').filter(':has(img)').should('have.length', 1);
		cy.get('[data-cy=grid-editor-item-slot]').first().rightclick();
		cy.get('[data-cy=grid-editor-item-slot]').filter(':has(img)').should('have.length', 0);
	});

	it('right click on a slot should remove a slot from the grid when an there is no tile or item selected.', () => {
		cy.get('[data-cy=editor-element-button-Ice-tile]').click();
		cy.get('[data-cy=grid-editor-tile-slot]').first().click();

		cy.get('[data-cy=editor-element-button-Chocolate]').click();
		cy.get('[data-cy=grid-editor-item-slot]').first().click();
		cy.get('[data-cy=editor-element-button-Chocolate]').click();

		cy.get('[data-cy=grid-editor-slot]').first().rightclick();
		cy.get('[data-cy=grid-editor-slot]')
			.filter(':has(span)')
			.should('have.length', GRID_NUMBER - 1);
	});
});

describe('Save level validations', () => {
	beforeEach(() => {
		cy.login();
		cy.visit('/level-editor');
	});

	it('should show "All avaliable tiles must have an item." message', () => {
		cy.get('[data-cy=level-editor-save-button]').click();
		cy.contains('All avaliable tiles must have an item.').should('be.visible');
	});

	it('should show "Level title is empty." message', () => {
		cy.fillGridEditor();

		cy.get('[data-cy=level-editor-save-button]').click();
		cy.contains('Level title is empty.').should('be.visible');
	});

	it('should show "Level must contain at least (N) ice tiles." message', () => {
		const iceTilesCount = 5;
		cy.fillGridEditor();

		cy.get('input[name=level-ice-tiles]').type(iceTilesCount.toString());

		cy.get('[data-cy=level-editor-save-button]').click();
		cy.contains(`Level must contain at least ${iceTilesCount} ice tiles.`).should('be.visible');
	});

	it('should show "Level must contain at least (N) rock tiles." message', () => {
		const rockTilesCount = 14;
		cy.fillGridEditor();

		cy.get('input[name=level-rock-tiles]').type(rockTilesCount.toString());

		cy.get('[data-cy=level-editor-save-button]').click();
		cy.contains(`Level must contain at least ${rockTilesCount} rock tiles.`).should('be.visible');
	});

	it('should show "Level must contain at least (N) ice creams." message', () => {
		const iceCreamCount = 9;
		cy.fillGridEditor();

		cy.get('input[name=level-ice-creams]').type(iceCreamCount.toString());

		cy.get('[data-cy=level-editor-save-button]').click();
		cy.contains(`Level must contain at least ${iceCreamCount} ice creams.`).should('be.visible');
	});

	it('should show "Somthing went wrong." message if save level request fails', () => {
		cy.intercept('POST', 'https://wjkhdliegkpfcyhdsnvk.supabase.co/rest/v1/levels', { statusCode: 500 });
		cy.get('input[name=level-title]').type('test');

		cy.fillGridEditor();

		cy.get('[data-cy=level-editor-save-button]').click();
		cy.contains('Something went wrong. Please try again.').should('be.visible');
	});

	it('should show "Level saved!" message if save level request succeed', () => {
		cy.intercept('POST', 'https://wjkhdliegkpfcyhdsnvk.supabase.co/rest/v1/levels', { statusCode: 200 });
		cy.get('input[name=level-title]').type('test');

		cy.fillGridEditor();

		cy.get('[data-cy=level-editor-save-button]').click();
		cy.contains('Level saved!').should('be.visible');
	});
});
