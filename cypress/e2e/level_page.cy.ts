const startLevel = () => {
	cy.visit('/level/main/1');
	cy.get('[data-cy=start-level-dialog]').find('button:contains(Start)').click();
};

describe('Left panel', () => {
	beforeEach(() => {
		startLevel();
	});

	it('clicking on the home button should redirect to levels page', () => {
		cy.get('[data-cy=left-panel-go-back-button]').click();
		cy.location('pathname').should('equal', '/levels');
	});

	it('clicking on the reset button should reset the current level', () => {
		cy.get('[data-cy=left-panel-reset-level-button]').click();
		cy.get('[data-cy=start-level-dialog]').should('be.visible');
	});

	it('score bar number should update when user makes a match', () => {
		cy.get('[data-cy=score-number]').should('have.text', '0');
		cy.moveLevelCandies(27, 28);
		cy.get('[data-cy=score-number]').should('not.have.text', '0');
	});

	it('move counter should update when user makes a match', () => {
		cy.get('[data-cy=move-counter').should('have.text', '0/6');
		cy.moveLevelCandies(27, 28);
		cy.get('[data-cy=move-counter').should('have.text', '1/6');
	});
});

it('Should load start level dialog', () => {
	cy.visit('/level/main/1');
	cy.get('[data-cy=start-level-dialog]').should('be.visible');
});

it('Should show run out of moves dialog', () => {
	cy.intercept('GET', 'http://localhost:5173/levels/1.json', { fixture: 'test_level1.json' });
	startLevel();
	cy.get('[data-cy=no-moves-dialog]').should('not.exist');
	cy.moveLevelCandies(40, 49);
	cy.get('[data-cy=no-moves-dialog]').should('be.visible');
});

it('Should show game over dialog', () => {
	cy.intercept('GET', 'http://localhost:5173/levels/1.json', { fixture: 'test_level2.json' });
	startLevel();
	cy.get('[data-cy=game-over-dialog]').should('not.exist');
	cy.moveLevelCandies(46, 55);
	cy.get('[data-cy=game-over-dialog]').should('be.visible');
});

it.only('Should show level complete dialog', () => {
	cy.intercept('GET', 'http://localhost:5173/levels/1.json', { fixture: 'test_level3.json' });
	startLevel();
	cy.get('[data-cy=level-complete-dialog]').should('not.exist');
	cy.moveLevelCandies(38, 39);
	cy.get('[data-cy=level-complete-dialog]').should('be.visible');
});
