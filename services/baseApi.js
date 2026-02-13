/**
 * Generates Auth Headers for API requests
 * @param {string} role - Optional role to use (admin, head, supervisor, tl, artist)
 * @returns {object} Headers object
 */
export function getAuthHeaders(role = 'admin') {
  let token;
  
  switch (role.toLowerCase()) {
    case 'admin':
      token = process.env.ADMIN_TOKEN;
      break;
    case 'head':
      token = process.env.HEAD_TOKEN;
      break;
    case 'supervisor':
      token = process.env.SUPERVISOR_TOKEN;
      break;
    case 'tl':
      token = process.env.TL_TOKEN;
      break;
    case 'artist':
      token = process.env.ARTIST_TOKEN;
      break;
    default:
      token = process.env.ADMIN_TOKEN;
  }

  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
}
