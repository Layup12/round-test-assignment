import { expect, test } from '@playwright/test';

test.describe('Авторизация', () => {
  test('успешный вход по имени перенаправляет на ленту', async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.clear();
    });

    await page.goto('/');

    await expect(page).toHaveURL(/\/auth$/);
    await expect(page.getByRole('heading', { name: 'Введите имя' })).toBeVisible();

    const input = page.getByLabel('Имя пользователя');
    const button = page.getByRole('button', { name: 'Продолжить' });

    await expect(button).toBeDisabled();

    await input.fill('Bobby');
    await expect(button).toBeEnabled();

    await button.click();

    await expect(page).toHaveURL(/\/feed$/);
    await expect(page.getByRole('heading', { name: 'Лента' })).toBeVisible();
  });
});
