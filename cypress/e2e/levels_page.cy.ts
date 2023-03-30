import { LevelWithUserDB } from '../../src/types/database-aliases';
import { MAIN_LEVELS_COUNT } from './../../src/config/index';
describe('Levels page', () => {
	it('successfuly loads', () => {
		cy.visit('/levels');
	});

	it('main levels tab should load all levels', () => {
		cy.get('[data-cy=main-levels-tab-button').click();

		cy.get('[data-cy=main-levels-tab]')
			.should('exist')
			.and('be.visible')
			.find('[data-cy=main-level-button]')
			.should('have.length', MAIN_LEVELS_COUNT);
	});
});

describe('Online levels tab', { testIsolation: true }, () => {
	it('should load all levels from the first page of online levels', () => {
		cy.intercept('GET', 'https://wjkhdliegkpfcyhdsnvk.supabase.co/rest/v1/levels?*', { fixture: 'online-levels.json' });
		cy.visit('/levels');
		cy.get('[data-cy=online-levels-tab-button').click();

		cy.fixture('online-levels.json').then((fixture) => {
			const levelCount = (fixture as LevelWithUserDB[]).length;

			cy.get('[data-cy=online-levels-tab]')
				.should('exist')
				.and('be.visible')
				.find('[data-cy=online-level-card]')
				.should('have.length', levelCount);
		});
	});

	it('should load the pagination component', () => {
		cy.intercept('GET', 'https://wjkhdliegkpfcyhdsnvk.supabase.co/rest/v1/levels?*', { fixture: 'online-levels.json' });
		cy.visit('/levels');

		cy.get('[data-cy=online-levels-tab-button').click();
		cy.get('[data-cy=online-levels-tab]').should('exist').and('be.visible');
		cy.get('[data-cy=online-levels-pagination]').should('exist');
	});

	it('clicking a level card should redirect to level page', () => {
		cy.intercept('GET', 'https://wjkhdliegkpfcyhdsnvk.supabase.co/rest/v1/levels?*', { fixture: 'online-levels.json' }).as(
			'getOnlineLevels',
		);
		cy.visit('/levels');

		cy.intercept('GET', 'https://wjkhdliegkpfcyhdsnvk.supabase.co/rest/v1/levels?*', { fixture: 'level.json' });
		cy.wait('@getOnlineLevels').then((interception) => {
			cy.get('[data-cy=online-levels-tab-button]').click();
			cy.get('[data-cy=online-levels-tab]').find('[data-cy=online-level-card]').first().click();
			cy.location('pathname').should('equal', `/level/${interception.response.body[0].id}`);
		});
	});

	it('empty state message should appear if there are not online levels to show', () => {
		cy.intercept('GET', 'https://wjkhdliegkpfcyhdsnvk.supabase.co/rest/v1/levels?*', []).as('getOnlineLevels');
		cy.visit('/levels');
		cy.wait('@getOnlineLevels');

		cy.get('[data-cy=online-levels-tab-button]').click();
		cy.get('[data-cy=online-levels-empty-state]').should('exist').and('be.visible');
	});

	it('validation message should appear if online levels request fails', () => {
		cy.intercept('GET', 'https://wjkhdliegkpfcyhdsnvk.supabase.co/rest/v1/levels?*', { fixture: 'level.json', statusCode: 500 }).as(
			'getOnlineLevels',
		);
		cy.visit('/levels');
		cy.wait('@getOnlineLevels');

		cy.get('[data-cy=online-levels-tab-button]').click();
		cy.get('[data-cy=fetch-error-state-message]').should('exist').and('be.visible');
	});
});

describe('My levels tab', { testIsolation: true }, () => {
	it('should load all levels from the first page of user levels', () => {
		cy.loginAndGoToMyLevels();

		cy.fixture('online-levels.json').then((fixture) => {
			const levelCount = (fixture as LevelWithUserDB[]).length;

			cy.get('[data-cy=my-levels-tab]')
				.should('exist')
				.and('be.visible')
				.find('[data-cy=online-level-card]')
				.should('have.length', levelCount);
		});
	});

	it('should load the pagination component', () => {
		cy.loginAndGoToMyLevels();

		cy.get('[data-cy=my-levels-tab]').should('exist').and('be.visible');
		cy.get('[data-cy=my-levels-pagination]').should('exist');
	});

	it('clicking a level card should redirect to level page', () => {
		cy.loginAndGoToMyLevels().then((interception) => {
			cy.intercept('GET', 'https://wjkhdliegkpfcyhdsnvk.supabase.co/rest/v1/levels?*', { fixture: 'level.json' }).then(() => {
				cy.get('[data-cy=my-levels-tab-button]').click();
				cy.get('[data-cy=my-levels-tab]').find('[data-cy=online-level-card]').first().click();
				cy.location('pathname').should('equal', `/level/${interception.response.body[0].id}`);
			});
		});
	});

	it('empty state message should appear if there are no user levels to show', () => {
		cy.intercept('GET', 'https://wjkhdliegkpfcyhdsnvk.supabase.co/rest/v1/levels?*', []).as('myOnlineLevels');
		cy.loginAndGoToMyLevels(false);
		cy.wait('@myOnlineLevels');

		cy.get('[data-cy=my-levels-tab-button]').click();
		cy.get('[data-cy=my-levels-empty-state]').should('exist').and('be.visible');
	});

	it('validation message should appear if user levels request fails', () => {
		cy.intercept('GET', 'https://wjkhdliegkpfcyhdsnvk.supabase.co/rest/v1/levels?*', { statusCode: 500 }).as('myOnlineLevels');
		cy.loginAndGoToMyLevels(false);
		cy.wait('@myOnlineLevels');

		cy.get('[data-cy=my-levels-tab-button]').click();
		cy.get('[data-cy=fetch-error-state-message]').should('exist').and('be.visible');
	});

	it('should open the delete level dialog when user clicks the delete button from the level card menu ', () => {
		cy.loginAndGoToMyLevels();

		cy.get('[data-cy=my-levels-tab-button]').click();
		cy.get('[data-cy=my-levels-tab]')
			.find('[data-cy=online-level-card] [data-cy="level-card-menu-button"]')
			.first()
			.should('exist')
			.and('be.visible')
			.click();

		cy.get('[data-cy=delete-level-menu-button]').should('exist').and('be.visible').click();
		cy.get('[data-cy=delete-level-dialog]').should('exist').and('be.visible');
	});

	it('should close the delete level dialog when user clicks the dialog close button', () => {
		cy.loginAndGoToMyLevels();

		cy.get('[data-cy=my-levels-tab-button]').click();
		cy.get('[data-cy=my-levels-tab]').find('[data-cy=online-level-card] [data-cy="level-card-menu-button"]').first().click();

		cy.get('[data-cy=delete-level-menu-button]').click();
		cy.get('[data-cy=delete-level-dialog]').children().contains('Cancel').should('exist').and('be.visible').click();
		cy.get('[data-cy=delete-level-dialog]').should('not.exist');
	});

	it('should delete user level when user clicks the dialog DELETE button', () => {
		cy.intercept('DELETE', 'https://wjkhdliegkpfcyhdsnvk.supabase.co/rest/v1/levels?*', { statusCode: 200 }).as('deleteMyLevel');
		cy.loginAndGoToMyLevels();

		cy.get('[data-cy=my-levels-tab-button]').click();
		cy.get('[data-cy=my-levels-tab]').find('[data-cy=online-level-card] [data-cy="level-card-menu-button"]').first().click();
		cy.get('[data-cy=delete-level-menu-button]').click();

		let myNewLevelsFixture: LevelWithUserDB[];
		cy.fixture('online-levels.json').then((fixture) => {
			myNewLevelsFixture = [...fixture];
			myNewLevelsFixture.shift();
			cy.intercept('GET', 'https://wjkhdliegkpfcyhdsnvk.supabase.co/rest/v1/levels?*', myNewLevelsFixture).as('myNewLevels');
		});

		cy.get('button').contains('Delete').should('exist').and('be.visible').click();

		cy.wait('@myNewLevels').then((interception) => {
			const levelsAfterDeletion = interception.response.body as LevelWithUserDB[];
			expect(levelsAfterDeletion.length).to.eq(myNewLevelsFixture.length);
			cy.get('[data-cy=my-levels-tab]').find('[data-cy=online-level-card]').should('have.length', myNewLevelsFixture.length);
			cy.contains(/Level deleted./i)
				.should('exist')
				.and('be.visible');
		});
	});

	it('should show error message toast if delete level request fails', () => {
		cy.intercept('DELETE', 'https://wjkhdliegkpfcyhdsnvk.supabase.co/rest/v1/levels?*', { statusCode: 500 }).as('deleteMyLevel');
		cy.loginAndGoToMyLevels();

		cy.get('[data-cy=my-levels-tab-button]').click();
		cy.get('[data-cy=my-levels-tab]').find('[data-cy=online-level-card] [data-cy="level-card-menu-button"]').first().click();
		cy.get('[data-cy=delete-level-menu-button]').click();
		cy.get('button').contains('Delete').should('exist').and('be.visible').click();
		cy.contains(/Something went wrong. Please try again/i)
			.should('exist')
			.and('be.visible');
	});
});
