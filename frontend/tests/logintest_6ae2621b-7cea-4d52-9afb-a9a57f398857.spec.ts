import { test, expect } from '@playwright/test';

// test('TC_LOGIN-001', async ({ page }) => {
//   await page.goto('http://localhost:5173/authorization/login');
//   await page.getByRole('textbox', { name: 'Email' }).fill('nghia999@gmail.com');
//   await page.getByRole('textbox', { name: 'Mật khẩu' }).fill('helloWorld123@');
//   await page.getByRole('button', { name: 'Đăng nhập', exact: true }).click();

//   //Move to dashboar
//   await expect(page).toHaveURL('http://localhost:5173/patient/dashboard');

//   //Now open
// });

test('TC_LOGIN-002', async ({ page }) => {
  await page.goto('http://localhost:5173/authorization/login');
  await page.getByRole('textbox', { name: 'Email' }).fill('nghia99@gmail.com');
  await page.getByRole('textbox', { name: 'Mật khẩu' }).fill('helloWorld111@');

  await page.getByRole('button', { name: 'Đăng nhập', exact: true }).click();

  await expect(page.getByText('Nhập sai email hoặc mật khẩu')).toBeVisible();
});