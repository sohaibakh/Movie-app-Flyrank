import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User,
} from 'firebase/auth'
import { auth } from './firebaseService'

function mapAuthError(code: string): string {
  const map: Record<string, string> = {
    'auth/email-already-in-use': 'This email is already registered',
    'auth/invalid-email': 'Invalid email address',
    'auth/user-not-found': 'No account found with this email',
    'auth/wrong-password': 'Incorrect password',
    'auth/weak-password': 'Password must be at least 6 characters',
    'auth/invalid-credential': 'Invalid email or password',
    'auth/too-many-requests': 'Too many attempts. Please try again later',
  }
  return map[code] ?? 'An authentication error occurred'
}

export async function registerUser(
  email: string,
  password: string
): Promise<User> {
  try {
    const credential = await createUserWithEmailAndPassword(auth, email, password)
    return credential.user
  } catch (err: any) {
    throw new Error(mapAuthError(err.code))
  }
}

export async function loginUser(
  email: string,
  password: string
): Promise<User> {
  try {
    const credential = await signInWithEmailAndPassword(auth, email, password)
    return credential.user
  } catch (err: any) {
    throw new Error(mapAuthError(err.code))
  }
}

export async function logoutUser(): Promise<void> {
  try {
    await signOut(auth)
  } catch {
    throw new Error('Failed to sign out')
  }
}

export function subscribeToAuthChanges(
  callback: (user: User | null) => void
): () => void {
  return onAuthStateChanged(auth, callback)
}
