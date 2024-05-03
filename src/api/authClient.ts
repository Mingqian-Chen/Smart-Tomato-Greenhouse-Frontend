import Api from './api'

export interface SignUpParams {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
}


export interface LoginParams {
  email: string;
  password: string;
}

//class that includes all APIs related to user authorization
class AuthClient {
  // Use the POST method to send a request to the signup endpoint
  async signUp(params: SignUpParams): Promise<{ error?: string }> {
    try {
      const response = await Api.request('/api/signup/', {
        method: 'POST',
        data: params, 
      });
      return response;
    } catch (error) {
      throw error
    }
  }
  // Use the POST method to send a request to the login endpoint
  async login(params: LoginParams): Promise<{ error?: string }> {
    try {
      const response = await Api.request('/api/login/', {
        method: 'POST',
        data: params, 
      });
      return response;
    } catch (error) {
      throw error
    }
  }

  // Use the POST method to send a request to the logout endpoint
  async logout(): Promise<{ error?: string }> {
    try {

      const response = await Api.request('/api/logout/', {
        method: 'POST',
      });
      return response;
    } catch (error) {
      throw error
    }
  }
}

export const authClient = new AuthClient();