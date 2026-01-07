import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should display the home page correctly', async ({ page }) => {
    await page.goto('/');
    
    await expect(page.getByRole('heading', { name: 'Full Stack Project' })).toBeVisible();
    await expect(page.getByText('A modern full-stack application')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Get Started' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Sign In' })).toBeVisible();
  });

  test('should navigate to register page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Get Started' }).click();
    
    await expect(page).toHaveURL('/register');
    await expect(page.getByRole('heading', { name: 'Create your account' })).toBeVisible();
  });

  test('should navigate to login page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Sign In' }).click();
    
    await expect(page).toHaveURL('/login');
    await expect(page.getByRole('heading', { name: 'Sign in to your account' })).toBeVisible();
  });
});

test.describe('Login Page', () => {
  test('should display login form', async ({ page }) => {
    await page.goto('/login');
    
    await expect(page.getByPlaceholder('Email address')).toBeVisible();
    await expect(page.getByPlaceholder('Password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign in' })).toBeVisible();
  });

  test('should have link to register page', async ({ page }) => {
    await page.goto('/login');
    
    const registerLink = page.getByRole('link', { name: /Register/ });
    await expect(registerLink).toBeVisible();
    await registerLink.click();
    await expect(page).toHaveURL('/register');
  });
});

test.describe('Register Page', () => {
  test('should display register form', async ({ page }) => {
    await page.goto('/register');
    
    await expect(page.getByPlaceholder('Username')).toBeVisible();
    await expect(page.getByPlaceholder('Email address')).toBeVisible();
    await expect(page.getByPlaceholder('First Name')).toBeVisible();
    await expect(page.getByPlaceholder('Last Name')).toBeVisible();
    await expect(page.getByPlaceholder(/Password/)).toBeVisible();
    await expect(page.getByRole('button', { name: 'Register' })).toBeVisible();
  });

  test('should have link to login page', async ({ page }) => {
    await page.goto('/register');
    
    const loginLink = page.getByRole('link', { name: /Sign in/ });
    await expect(loginLink).toBeVisible();
    await loginLink.click();
    await expect(page).toHaveURL('/login');
  });

  test('should validate password length', async ({ page }) => {
    await page.goto('/register');
    
    const passwordInput = page.getByPlaceholder(/Password/);
    await passwordInput.fill('12345');
    
    const registerButton = page.getByRole('button', { name: 'Register' });
    await registerButton.click();
    
    // HTML5 validation should prevent submission
    await expect(passwordInput).toBeFocused();
  });
});
