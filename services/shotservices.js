import { getAuthHeaders } from './baseApi.js';

export async function createShot(request, payload) {
  return await request.post('/api/shots', {
    headers: getAuthHeaders(),
    data: payload
  });
}
