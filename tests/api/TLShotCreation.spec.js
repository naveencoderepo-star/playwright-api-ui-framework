import { test, expect } from '@playwright/test';
import { createShot } from '../../services/shotService.js';
import { createShotPayload } from '../../test-data/shot-payload.js';
import { loginAs } from '../../services/authService.js';

test.describe('Shots API - TL @regression', () => {

  test('TL should create a new shot successfully', async ({ request }) => {
    // 1. Dynamic Login as TL
    const token = await loginAs(request, 'tl');
    
    // 2. Set Token for BaseApi to use
    process.env.TL_TOKEN = token;

    // 3. Create Shot
    const payload = createShotPayload();
    const response = await createShot(request, payload, 'tl');

    // 4. Assertions
    expect(response.status()).toBe(200);

    const body = await response.json();
    console.log(`TL Created Shot ID: ${body}`);
  });
});
