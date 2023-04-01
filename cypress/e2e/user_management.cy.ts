describe('User management dialog', () => {
	beforeEach(() => {
		cy.login();
		cy.visit('/levels');
		cy.get('[data-cy=user-avatar-header-button]').click();
		cy.get('[data-cy=user-avatar-menu]').find('li').first().click();
	});

	it('clicking avatar button should open profile image menu', () => {
		cy.get('[data-cy=manage-user-dialog]').find('button').first().click();
		cy.contains('Upload avatar').should('be.visible');
	});

	it('clicking delete account button should open the delete account dialog', () => {
		cy.contains('Delete account').click();
		cy.get('[data-cy=delete-account-dialog]').should('be.visible');
	});
});

describe('Delete account dialog', () => {
	beforeEach(() => {
		cy.login();
		cy.visit('/levels');
		cy.get('[data-cy=user-avatar-header-button]').click();
		cy.get('[data-cy=user-avatar-menu]').find('li').first().click();
		cy.contains('Delete account').click();
	});

	it('should show error message if the delete account request fails', () => {
		cy.intercept('https://wjkhdliegkpfcyhdsnvk.supabase.co/auth/v1/token?grant_type=password', { statusCode: 500 });
		cy.contains('There was an error on the server. Please try again later.').should('not.be.visible');
		cy.get('input[name=confirm-password]').type('foo{enter}');
		cy.contains('There was an error on the server. Please try again later.').should('be.visible');
	});

	it('should show invalid password message if user the password did not match', () => {
		cy.intercept('https://wjkhdliegkpfcyhdsnvk.supabase.co/auth/v1/token?grant_type=password', {
			statusCode: 400,
			body: {
				error: 'invalid_grant',
				error_description: 'Invalid login credentials',
			},
		});

		cy.contains('Your password was incorrect. Please double-check your password.').should('not.exist');
		cy.get('input[name=confirm-password]').type('wrongpassword{enter}');
		cy.contains('Your password was incorrect. Please double-check your password.').should('be.visible');
	});
});

describe('Password recovery page', () => {
	beforeEach(() => {
		cy.visit('/recover-password');
	});

	it('should show invalid email message below the email input', () => {
		cy.contains('Invalid email').should('not.exist');
		cy.get('input[name=password-recovery]').type('invalid_email').blur();
		cy.contains('Invalid email').should('be.visible');
	});

	it('should show email does not exist message below the email input', () => {
		cy.intercept('https://wjkhdliegkpfcyhdsnvk.supabase.co/rest/v1/users?select=email&email=eq.not_registered%40gmail.com', {
			statusCode: 200,
			body: [],
		}).as('isEmailDuplicatedRequest');
		cy.contains('That email does not belong to any account.').should('not.exist');
		cy.get('input[name=password-recovery]').type('not_registered@gmail.com').blur();

		cy.wait('@isEmailDuplicatedRequest');

		cy.contains('That email does not belong to any account.').should('be.visible');
	});

	it('should show email sent message', () => {
		cy.intercept('https://wjkhdliegkpfcyhdsnvk.supabase.co/rest/v1/users?*', { email: 'foo' });
		cy.intercept(
			'POST',
			'https://wjkhdliegkpfcyhdsnvk.supabase.co/auth/v1/recover?redirect_to=http%3A%2F%2Flocalhost%3A5173%2Freset-password',
			{
				statusCode: 200,
				body: {},
			},
		);

		cy.contains('We sent an email with a password-reset link.').should('not.be.visible');
		cy.get('input[name=password-recovery]').type('forgot_my_pass@gmail.com').blur();
		cy.get('body').find('button:contains(Send)').click();
		cy.contains('We sent an email with a password-reset link.').should('be.visible');
	});
});

describe('Reset password page', () => {
	beforeEach(() => {
		cy.visit('/reset-password');
	});

	it('should show password length validation message', () => {
		cy.contains('Password must contain at least 6 characters.').should('not.exist');
		cy.get('input[name=reset-password]').type('short').blur();
		cy.contains('Password must contain at least 6 characters.').should('be.visible');
	});

	it('should show error message if reset password request fails', () => {
		cy.get('[data-cy=reset-password-error-message]').should('not.be.visible');
		cy.get('input[name=reset-password]').type('new_password').blur();
		cy.get('body').find('button:contains(Reset)').click();
		cy.get('[data-cy=reset-password-error-message]').should('be.visible');
	});
});
