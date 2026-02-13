import { getAuthHeaders } from './baseApi.js';

/**
 * Creates a shot using the specified role's token
 * @param {object} request - Playwright request object
 * @param {object} payload - Shot data
 * @param {string} role - role name (admin, head, etc)
 */
export async function createShot(request, payload, role = 'admin') {
  return await request.post('/api/shots', {
    headers: getAuthHeaders(role),
    data: payload
  });
}
