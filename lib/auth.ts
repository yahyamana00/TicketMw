import { ID, Query } from 'appwrite';
import { account, databases, DATABASE_ID, COLLECTIONS } from './appwrite';

export type UserRole = 'customer' | 'employee';

export async function loginWithGoogle() {
  try {
    // Create OAuth2 session with Google
    const success = await account.createOAuth2Session(
      'google',
      `${window.location.origin}/dashboard`,
      `${window.location.origin}/login`,
      ['profile', 'email']
    );
    
    return { success: true, data: success };
  } catch (error: any) {
    console.error('Google login error:', error);
    return { 
      success: false, 
      error: { 
        message: error.message || 'Failed to sign in with Google', 
        code: error.code || 500 
      }
    };
  }
}

export async function login(email: string, password: string) {
  try {
    const session = await account.createEmailSession(email, password);
    
    // Check if email is verified
    const user = await account.get();
    if (!user.emailVerification) {
      await account.createVerification(`${window.location.origin}/verify`);
      return { 
        success: false, 
        error: { message: 'Please verify your email first', code: 401 }
      };
    }
    
    return { success: true, data: session };
  } catch (error: any) {
    return { 
      success: false, 
      error: { message: error.message, code: error.code || 500 }
    };
  }
}

export async function register(email: string, password: string, name: string) {
  try {
    // Create user account
    const user = await account.create(ID.unique(), email, password, name);
    
    // Create verification email
    await account.createVerification(`${window.location.origin}/verify`);
    
    // Create user profile with role
    const role = email.endsWith('@ticketme.com') ? 'employee' : 'customer';
    await databases.createDocument(
      DATABASE_ID,
      COLLECTIONS.USERS,
      ID.unique(),
      {
        userId: user.$id,
        email,
        name,
        role,
        createdAt: new Date().toISOString()
      }
    );
    
    return { 
      success: true, 
      data: user,
      message: 'Please check your email to verify your account'
    };
  } catch (error: any) {
    return { 
      success: false, 
      error: { message: error.message, code: error.code || 500 }
    };
  }
}

export async function getCurrentUser() {
  try {
    const user = await account.get();
    return { success: true, data: user };
  } catch (error: any) {
    return { 
      success: false, 
      error: { message: error.message, code: error.code || 500 }
    };
  }
}

export async function logout() {
  try {
    await account.deleteSession('current');
    return { success: true };
  } catch (error: any) {
    return { 
      success: false, 
      error: { message: error.message, code: error.code || 500 }
    };
  }
}

export async function updateLastActive() {
  try {
    await account.updateSession('current');
    return { success: true };
  } catch (error: any) {
    return { 
      success: false, 
      error: { message: error.message, code: error.code || 500 }
    };
  }
}

export async function verifyEmail(userId: string, secret: string) {
  try {
    await account.updateVerification(userId, secret);
    return { success: true };
  } catch (error: any) {
    return { 
      success: false, 
      error: { message: error.message, code: error.code || 500 }
    };
  }
}

export async function resendVerificationEmail() {
  try {
    await account.createVerification(`${window.location.origin}/verify`);
    return { success: true };
  } catch (error: any) {
    return { 
      success: false, 
      error: { message: error.message, code: error.code || 500 }
    };
  }
}