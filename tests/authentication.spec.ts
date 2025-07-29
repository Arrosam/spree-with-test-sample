import { test, expect } from '@playwright/test';
import { generateEmailAddress, generatePassword } from '../utils/account-generator';
import { UserComponents } from '../utils/auth-components';




test('has title', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.waitForLoadState('networkidle');
    
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Shop/);
});
test('user registration', async ({ browser }) => {
    const context = await browser.newContext({
        viewport: { width: 1280, height: 720 }
    });
    const page = await context.newPage();
    const userComponents = new UserComponents(page);
    await page.goto('http://localhost:3000/');
    await page.waitForLoadState('networkidle');

    await test.step('User Registration', async () => {
        const email = generateEmailAddress();
        const password = generatePassword();

        await userComponents.userIconButton.click();
        await expect(userComponents.loginModal).toBeVisible();
        await userComponents.registerButton.click();

        // Wait for the registration form to be visible.
        await expect(userComponents.userPasswordConfirmationInput).toBeVisible();

        await userComponents.userEmailInput.fill(email);
        await userComponents.userPasswordInput.fill(password);
        await userComponents.userPasswordConfirmationInput.fill(password);

        // Click the sign up button.
        await userComponents.signUpButton.click();

        // Expect a success message to be visible.
        await expect(userComponents.messageBanner).toHaveText("Welcome! You have signed up successfully.");
    });

    
    
});