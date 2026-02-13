import { test, expect } from '@playwright/test';
import { createShot } from '../../services/shotService.js';
import { createShotPayload } from '../../test-data/shot-payload.js';
import { getLoginToken, loginAs } from '../../services/authService.js';

test.describe('Shots API - Admin', () => {
  
  test.beforeAll(async ({ request }) => {
    // Dynamic login using the new helper
    const token = await loginAs(request, 'admin');
    process.env.ADMIN_TOKEN = token;
  });

  test('Admin - Should create a new shot successfully', async ({ request }) => {
    const payload = createShotPayload();

    // Explicitly passing 'admin' for clarity (though it is the default)
    const response = await createShot(request, payload, 'admin');

    // This will now pass (200 OK) because the token is fresh
    expect(response.status()).toBe(200);

    const body = await response.json();
    console.log(`Admin Created Shot ID: ${body}`);
  });
});