import { LevelWithUserDB } from '../../src/types/database-aliases';
import { MAIN_LEVELS_COUNT } from './../../src/config/index';
describe('Levels page', () => {
	it('successfuly loads', () => {
		cy.visit('/levels');
	});

	it('main levels tab should load all levels', () => {
		cy.get('[data-cy=main-levels-tab-button').click();

		cy.get('[data-cy=main-levels-tab]').then(($mainLevelsTab) => {
			cy.wrap($mainLevelsTab).should('exist').and('be.visible');
			cy.wrap($mainLevelsTab).find('[data-cy=main-level-button]').should('have.length', MAIN_LEVELS_COUNT);
		});
	});
});

describe('Online levels tab', { testIsolation: true }, () => {
	it('should load all levels from the first page of online levels', () => {
		cy.intercept('GET', 'https://wjkhdliegkpfcyhdsnvk.supabase.co/rest/v1/levels?*', { fixture: 'online-levels.json', statusCode: 200 });
		cy.visit('/levels');

		cy.get('[data-cy=online-levels-tab-button').click();
		cy.get('[data-cy=online-levels-tab]').then(($onlineLevelsTab) => {
			cy.wrap($onlineLevelsTab).should('exist').and('be.visible');
			cy.fixture('online-levels.json').then((fixture) => {
				const levelsCount = (fixture as LevelWithUserDB[]).length;
				cy.wrap($onlineLevelsTab).find('[data-cy=online-level-card]').should('have.length', levelsCount);
			});
		});
	});

	it('should load the pagination component', () => {
		cy.intercept('GET', 'https://wjkhdliegkpfcyhdsnvk.supabase.co/rest/v1/levels?*', { fixture: 'online-levels.json', statusCode: 200 });
		cy.visit('/levels');

		cy.get('[data-cy=online-levels-tab-button').click();
		cy.get('[data-cy=online-levels-tab]').then(($onlineLevelsTab) => {
			cy.wrap($onlineLevelsTab).should('exist').and('be.visible');
			cy.get('[data-cy=online-levels-pagination]').should('exist');
		});
	});

	it('clicking a level card should redirect to level page', () => {
		cy.intercept('GET', 'https://wjkhdliegkpfcyhdsnvk.supabase.co/rest/v1/levels?*', { fixture: 'online-levels.json', statusCode: 200 }).as(
			'getOnlineLevels',
		);
		cy.visit('/levels');

		cy.intercept('GET', 'https://wjkhdliegkpfcyhdsnvk.supabase.co/rest/v1/levels?*', { fixture: 'level.json', statusCode: 200 });
		cy.wait('@getOnlineLevels').then((interception) => {
			cy.get('[data-cy=online-levels-tab-button]').click();
			cy.get('[data-cy=online-levels-tab]').find('[data-cy=online-level-card]').first().click();
			cy.location('pathname').should('equal', `/level/${interception.response.body[0].id}`);
		});
	});

	it('empty state message should appear if there are not online levels to show', () => {
		cy.intercept('GET', 'https://wjkhdliegkpfcyhdsnvk.supabase.co/rest/v1/levels?*', []).as('getOnlineLevels');
		cy.visit('/levels');
		cy.wait('@getOnlineLevels').then(() => {
			cy.get('[data-cy=online-levels-tab-button]').click();
			cy.get('[data-cy=online-levels-empty-state]').should('exist').and('be.visible');
		});
	});

	it('validation message should appear if online levels request fails', () => {
		cy.intercept('GET', 'https://wjkhdliegkpfcyhdsnvk.supabase.co/rest/v1/levels?*', { fixture: 'level.json', statusCode: 500 }).as(
			'getOnlineLevels',
		);
		cy.visit('/levels');
		cy.wait('@getOnlineLevels').then(() => {
			cy.get('[data-cy=online-levels-tab-button]').click();
			cy.get('[data-cy=fetch-error-state-message]').should('exist').and('be.visible');
		});
	});
});

describe('My levels tab', { testIsolation: true }, () => {
	it('should load all levels from the first page of user levels', () => {
		cy.intercept('GET', 'https://wjkhdliegkpfcyhdsnvk.supabase.co/rest/v1/levels?*', { fixture: 'online-levels.json', statusCode: 200 });
		cy.visit('/levels');
		cy.login();
		cy.visit('/levels');

		cy.get('[data-cy=my-levels-tab-button').click();
		cy.get('[data-cy=my-levels-tab]').then(($myLevelsTab) => {
			cy.wrap($myLevelsTab).should('exist').and('be.visible');
			cy.fixture('online-levels.json').then((fixture) => {
				const levelsCount = (fixture as LevelWithUserDB[]).length;
				cy.wrap($myLevelsTab).find('[data-cy=online-level-card]').should('have.length', levelsCount);
			});
		});
	});

	it('should load the pagination component', () => {
		cy.intercept('GET', 'https://wjkhdliegkpfcyhdsnvk.supabase.co/rest/v1/levels?*', { fixture: 'online-levels.json', statusCode: 200 });
		cy.visit('/levels');
		cy.login();
		cy.visit('/levels');

		cy.get('[data-cy=my-levels-tab-button').click();
		cy.get('[data-cy=my-levels-tab]').then(($myLevelsTab) => {
			cy.wrap($myLevelsTab).should('exist').and('be.visible');
			cy.get('[data-cy=my-levels-pagination]').should('exist');
		});
	});

	it('clicking a level card should redirect to level page', () => {
		cy.intercept('GET', 'https://wjkhdliegkpfcyhdsnvk.supabase.co/rest/v1/levels?*', { fixture: 'online-levels.json', statusCode: 200 }).as(
			'getMyLevels',
		);
		cy.visit('/levels');
		cy.login();
		cy.visit('/levels');

		cy.intercept('GET', 'https://wjkhdliegkpfcyhdsnvk.supabase.co/rest/v1/levels?*', { fixture: 'level.json', statusCode: 200 });
		cy.wait('@getMyLevels').then((interception) => {
			cy.get('[data-cy=my-levels-tab-button]').click();
			cy.get('[data-cy=my-levels-tab]').find('[data-cy=online-level-card]').first().click();
			cy.location('pathname').should('equal', `/level/${interception.response.body[0].id}`);
		});
	});

	it('empty state message should appear if there are not user levels to show', () => {
		cy.intercept('GET', 'https://wjkhdliegkpfcyhdsnvk.supabase.co/rest/v1/levels?*', []).as('myOnlineLevels');
		cy.visit('/levels');
		cy.login();
		cy.visit('/levels');

		cy.wait('@myOnlineLevels').then(() => {
			cy.get('[data-cy=my-levels-tab-button]').click();
			cy.get('[data-cy=my-levels-empty-state]').should('exist').and('be.visible');
		});
	});

	it('validation message should appear if user levels request fails', () => {
		cy.intercept('GET', 'https://wjkhdliegkpfcyhdsnvk.supabase.co/rest/v1/levels?*', { statusCode: 500 }).as('myOnlineLevels');
		cy.visit('/levels');
		cy.login();
		cy.visit('/levels');

		cy.wait('@myOnlineLevels').then(() => {
			cy.get('[data-cy=my-levels-tab-button]').click();
			cy.get('[data-cy=fetch-error-state-message]').should('exist').and('be.visible');
		});
	});

	it('should open the delete level dialog when user clicks the delete button from the level card menu ', () => {
		cy.intercept('GET', 'https://wjkhdliegkpfcyhdsnvk.supabase.co/rest/v1/levels?*', { fixture: 'online-levels.json', statusCode: 200 }).as(
			'myOnlineLevels',
		);
		cy.visit('/levels');
		cy.login();
		cy.visit('/levels');

		cy.wait('@myOnlineLevels').then(() => {
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
	});

	it.only('should close the delete level dialog when user clicks the dialog close button', () => {
		cy.intercept('GET', 'https://wjkhdliegkpfcyhdsnvk.supabase.co/rest/v1/levels?*', { fixture: 'online-levels.json', statusCode: 200 }).as(
			'myOnlineLevels',
		);
		cy.visit('/levels');
		cy.login();
		cy.visit('/levels');

		cy.wait('@myOnlineLevels').then(() => {
			cy.get('[data-cy=my-levels-tab-button]').click();
			cy.get('[data-cy=my-levels-tab]').find('[data-cy=online-level-card] [data-cy="level-card-menu-button"]').first().click();

			cy.get('[data-cy=delete-level-menu-button]').click();
			cy.get('[data-cy=delete-level-dialog]').children().contains('Cancel').should('exist').and('be.visible').click();
			cy.get('[data-cy=delete-level-dialog]').should('not.exist');
		});
	});
});
