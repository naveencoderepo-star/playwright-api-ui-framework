import { test, expect } from '@playwright/test';
import { createShot } from '../../services/shotService.js';
import { createShotPayload } from '../../test-data/shot-payload.js';
import { loginAs } from '../../services/authService.js';

test.describe('Shots API - Supervisor', () => {

  test('Supervisor should create a new shot successfully', async ({ request }) => {
    // 1. Dynamic Login as Supervisor
    const token = await loginAs(request, 'supervisor');
    
    // 2. Set Token for BaseApi to use
    process.env.SUPERVISOR_TOKEN = token;

    // 4. Create Shot
    const payload = createShotPayload();
    const response = await createShot(request, payload, 'supervisor');

    // 5. Assertions
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(typeof body).toBe('number');
    console.log(`Supervisor Created Shot ID: ${body}`);
  });
});
