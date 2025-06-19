// TODO: Move this to a server function and update AuthProvider
// TODO: Also, look! There's a whole ass plug and play REST API for auth https://payloadcms.com/docs/rest-api/overview#auth-operations

export async function getCurrentUser() {
    try {
      const res = await fetch('/api/auth/me', {
        method: 'GET',
        credentials: 'include', // Ensures cookies/session tokens are sent
      });
  
      if (!res.ok) {
        return null; // User is not logged in or session expired
      }
  
      const data = await res.json();
      
      return data.user || null;
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
}

export async function logoutUser() {
    try {
        const res = await fetch('/api/auth/logout', {
            method: 'GET',
            credentials: 'include', // Ensures cookies/session tokens are sent
        });
  
        if (!res.ok) {
            console.error('Error logging out');
            return false;
        }
  
        return true; // User successfully logged out
    } catch (error) {
        console.error('Error during logout:', error);
        return false;
    }
}
