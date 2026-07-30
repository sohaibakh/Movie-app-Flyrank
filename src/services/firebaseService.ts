import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getDatabase, ref, set, remove, get, child } from 'firebase/database'
import type { Movie } from '../types/movie'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)

const database = getDatabase(app)

function userFavouritesRef(userId: string) {
  return ref(database, `users/${userId}/favourites`)
}

export async function addFavourite(
  userId: string,
  movie: Movie
): Promise<void> {
  if (!userId) throw new Error('User ID is required')

  try {
    await set(child(userFavouritesRef(userId), movie.imdbID), movie)
  } catch {
    throw new Error('Failed to add favourite')
  }
}

export async function removeFavourite(
  userId: string,
  imdbID: string
): Promise<void> {
  if (!userId) throw new Error('User ID is required')

  try {
    await remove(child(userFavouritesRef(userId), imdbID))
  } catch {
    throw new Error('Failed to remove favourite')
  }
}

export async function getFavourites(userId: string): Promise<Movie[]> {
  if (!userId) throw new Error('User ID is required')

  try {
    const snapshot = await get(userFavouritesRef(userId))
    const data = snapshot.val()
    if (!data) return []
    return Object.values(data) as Movie[]
  } catch {
    throw new Error('Failed to load favourites')
  }
}
