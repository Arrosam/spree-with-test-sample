import { test, expect } from '@playwright/test';
import { generateEmailAddress, generatePassword } from '../utils/account-generator';
import { UserComponents } from '../utils/landing-page-components';
import { AccountComponents } from '../utils/account-components';




test('has title', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Shop/);
});
test('user registration', async ({ browser }) => {
    const context = await browser.newContext({
        viewport: { width: 1280, height: 720 }
    });
    const page = await context.newPage();
    const landingPageComponents = new UserComponents(page);
    const accountComponents = new AccountComponents(page);

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const email = generateEmailAddress();
    const password = generatePassword();

    function registerUser(email, password) {
        return test.step('User Registration', async () => {
            await page.waitForLoadState('networkidle');
            await landingPageComponents.userIconButton.click();
            await expect(landingPageComponents.loginModal).toBeVisible();
            await landingPageComponents.registerButton.click();

            // Wait for the registration form to be visible.
            await expect(landingPageComponents.userPasswordConfirmationInput).toBeVisible();
            await landingPageComponents.userEmailInput.fill(email);
            await landingPageComponents.userPasswordInput.fill(password);
            await landingPageComponents.userPasswordConfirmationInput.fill(password);

            await landingPageComponents.signUpButton.click();
        });
    }

    await test.step('Initial Registration', async () => {
        await registerUser(email, password);
        await expect(landingPageComponents.messageBanner).toHaveText(UserComponents.WELCOME_MESSAGE);
        await expect(page).toHaveURL('/');
    });

    
    await test.step('User Logout', async () => {
        await page.waitForLoadState('networkidle');
        await landingPageComponents.userIconButton.click();
        await accountComponents.logoutButton.click();

        await expect(landingPageComponents.messageBanner).toHaveText(UserComponents.LOGOUT_MESSAGE);
        await expect(page).toHaveURL('/');
    });
    
    await test.step('Duplicated registration', async () => {
        await registerUser(email, password);
        await expect(landingPageComponents.errorExplanation).toHaveText(UserComponents.EMAIL_ERROR_MESSAGE);
        
        await expect(page).toHaveURL('/');
    });

    await test.step('User Login', async () => {
        await page.goto('/');
        await page.waitForLoadState('networkidle');
        await landingPageComponents.userIconButton.click();
        await expect(landingPageComponents.loginModal).toBeVisible();

        await landingPageComponents.userEmailInput.fill(email);
        await landingPageComponents.userPasswordInput.fill(password);
        await landingPageComponents.signUpButton.click();

        await expect(landingPageComponents.messageBanner).toHaveText(UserComponents.LOGIN_MESSAGE);
        await expect(page).toHaveURL('/');
    });

    await test.step('Forgot Password', async () => {
        await page.goto('/');
        await page.waitForLoadState('networkidle');
        await landingPageComponents.userIconButton.click();
        await expect(landingPageComponents.loginModal).toBeVisible();

        // Click on the "Forgot Password?" link
        const forgotPasswordLink = landingPageComponents.loginModal.locator('a:has-text("Forgot your password?")');
        await forgotPasswordLink.click();

        // Fill in the email and submit the form
        await landingPageComponents.userEmailInput.fill(email);
        await landingPageComponents.signUpButton.click();

        // Verify the success message
        await expect(landingPageComponents.messageBanner).toHaveText('You will receive an email with instructions on how to reset your password in a few minutes.');
    });
});