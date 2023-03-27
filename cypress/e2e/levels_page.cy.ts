import { LevelWithUserDB } from '../../src/types/database-aliases';
import { MAIN_LEVELS_COUNT, ONLINE_LEVELS_PAGE_LENGTH } from './../../src/config/index';
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

describe('Online levels', { testIsolation: true }, () => {
	it('online levels tab should load all levels from selected pagination page', () => {
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

	/* it('should correctly load the pagination depending on number of levels per page', () => {
		let firstPageLevelsCount: number;
		cy.intercept('GET', 'https://wjkhdliegkpfcyhdsnvk.supabase.co/rest/v1/levels?*', (req) => {
			req.on('response', (res) => {
				firstPageLevelsCount = res.body.length;
			});
		});

		cy.visit('/levels');

		cy.get('[data-cy=online-levels-tab-button').click();
		cy.get('[data-cy=online-levels-tab]').then(($onlineLevelsTab) => {
			cy.wrap($onlineLevelsTab).should('exist').and('be.visible');
			cy.get('[data-cy=online-levels-pagination]').should('exist');

			const expectedPageCount = Math.ceil((firstPageLevelsCount || 0) / ONLINE_LEVELS_PAGE_LENGTH);
			console.log(expectedPageCount);

			cy.get('[data-cy=online-levels-pagination]').find('.MuiPaginationItem-page').should('have.length', expectedPageCount);
		});
	}); */
});
