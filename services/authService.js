/**
 * Auth Service to manage API tokens and login
 */

// 1. Define the Map of Roles to Credentials
const ROLE_CREDENTIALS = {
  admin: {
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD
  },
  head: {
    email: process.env.HEAD_EMAIL,
    password: process.env.HEAD_PASSWORD
  },
  supervisor: {
    email: process.env.SUPERVISOR_EMAIL,
    password: process.env.SUPERVISOR_PASSWORD
  },
  tl: {
    email: process.env.TL_EMAIL,
    password: process.env.TL_PASSWORD
  },
  artist: {
    email: process.env.ARTIST_EMAIL,
    password: process.env.ARTIST_PASSWORD
  }
};

/**
 * Main function to login as a specific role
 * @param {object} request - Playwright request context
 * @param {string} role - Role name (admin, head, etc.)
 */
export async function loginAs(request, role) {
  const roleKey = role.toLowerCase();
  const credentials = ROLE_CREDENTIALS[roleKey];

  if (!credentials) {
    throw new Error(`Role '${role}' not found in configuration. Available roles: ${Object.keys(ROLE_CREDENTIALS).join(', ')}`);
  }

  // Reuse the core logic
  return await getLoginToken(request, credentials.email, credentials.password);
}

/**
 * Base function to hit the API
 */
export async function getLoginToken(request, email, password) {
  const endpoint = '/auth/login'; 
  
  const response = await request.post(endpoint, {
    data: {
      email: email,
      password: password
    }
  });

  if (!response.ok()) {
    const errorBody = await response.text();
    console.error(`Login failed for ${email}. Status: ${response.status()}`);
    throw new Error(`Login failed for ${email}: ${errorBody}`);
  }

  const body = await response.json();
  const token = body.accessToken;
  console.log(`Token for ${email}: ${token}`);
  return token;
}
