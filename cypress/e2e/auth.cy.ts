describe('Sign in form', () => {
	beforeEach(() => {
		cy.visit('/levels');
		cy.get('[data-cy=login-button]').click();
	});

	it('should show "Invalid email" message below email input', () => {
		cy.contains('Invalid email').should('not.exist');
		cy.get('input[name=signin-email]').type('invalid email').blur();
		cy.contains('Invalid email').should('be.visible');
	});

	it('clicking on "Forgot your password" link should redirect to password recovery page', () => {
		cy.contains('a', 'Forgot your password?').click();
		cy.location('pathname').should('equal', '/recover-password');
	});

	it('should show a validation message when sign in request fails', () => {
		cy.intercept('https://wjkhdliegkpfcyhdsnvk.supabase.co/auth/v1/token?grant_type=password', { statusCode: 500 });
		cy.contains('Sign in failed. Please check your credentials and try again.').should('not.exist');
		cy.get('input[name=signin-email]').type('test_account@gmail.com').blur();
		cy.get('input[name=signin-password]').type(`password_test{enter}`, { log: false });
		cy.contains('Sign in failed. Please check your credentials and try again.').should('be.visible');
	});

	it.only('should reaload page and show user avatar button after sign in event', () => {
		cy.get('input[name=signin-email]').type('test@gmail.com');
		cy.get('input[name=signin-password]').type(`test123{enter}`, { log: false });

		cy.get('[data-cy=user-avatar-header-button]').should('be.visible');
	});
});

describe('Sign up form', () => {
	beforeEach(() => {
		cy.visit('/levels');
		cy.get('[data-cy=login-button]').click();
		cy.contains('Create account').click();
	});

	it('should show "Invalid email" message below email input', () => {
		cy.contains('Invalid email').should('not.exist');
		cy.get('input[name=signup-email]').type('invalid email').blur();
		cy.contains('Invalid email').should('be.visible');
	});

	it('should show "Email taken" message below email input', () => {
		const email = 'taken_email@gmail.com';
		cy.intercept('GET', `https://wjkhdliegkpfcyhdsnvk.supabase.co/rest/v1/users?*`, [{ taken: true }]);
		cy.contains('That email is taken. Please try another.').should('not.exist');
		cy.get('input[name=signup-email]').type(email).blur();
		cy.contains('That email is taken. Please try another.').should('be.visible');
	});

	it('should show "Username taken" message below username input', () => {
		const username = 'taken_username99';
		cy.intercept('GET', `https://wjkhdliegkpfcyhdsnvk.supabase.co/rest/v1/users?select=nickname&nickname=eq.${username}`, [
			{ taken: true },
		]);
		cy.contains('That username is taken. Please try another.').should('not.exist');
		cy.get('input[name=signup-username]').type(username).blur();
		cy.contains('That username is taken. Please try another.').should('be.visible');
	});

	it('should show "Passoword length" message below password input', () => {
		cy.contains('Password must contain at least 6 characters.').should('not.exist');
		cy.get('input[name=signup-password]').type('foo').blur();
		cy.contains('Password must contain at least 6 characters.').should('be.visible');
	});

	it('should show "Sign up failed" message if sign up request failed', () => {
		cy.intercept('https://wjkhdliegkpfcyhdsnvk.supabase.co/auth/v1/signup', { statusCode: 500 });
		cy.contains('Sign up failed. Please try again.').should('not.exist');
		cy.get('input[name=signup-email]').type('test_account@gmail.com').blur();
		cy.get('input[name=signup-username]').type('test_username').blur();
		cy.get('input[name=signup-password]').type('password_test').blur();

		cy.get('body').find('button:contains("SIGN UP")').click();
		cy.contains('Sign up failed. Please try again.').should('be.visible');
	});
});

describe('User avatar menu', () => {
	beforeEach(() => {
		cy.login();
		cy.visit('/levels');
		cy.get('[data-cy=user-avatar-header-button]').click();
		cy.get('[data-cy=user-avatar-menu]').should('be.visible');
	});

	it('clicking outside the menu should close it ', () => {
		cy.get('body').click();
		cy.get('[data-cy=user-avatar-menu]').should('not.exist');
	});

	it('clicking the avatar button inside the menu should open the manage user dialog', () => {
		cy.get('[data-cy=user-avatar-menu]').find('li').first().click();
		cy.get('[data-cy=manage-user-dialog]').should('be.visible');
	});

	it('clicking the logout button should logout the current user', () => {
		cy.get('[data-cy=user-avatar-menu]').find('li').eq(1).click();
		cy.get('[data-cy=user-avatar-header-button]').should('not.exist');
		cy.get('[data-cy=login-button]').should('be.visible');

		cy.then(() => {
			const loggedUser = JSON.parse(localStorage.getItem('logged-user'));
			cy.wrap(loggedUser).should('be.null');
		});
	});
});
