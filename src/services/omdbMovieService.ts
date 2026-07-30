export type { Movie } from '../types/movie'

const API_URL = 'https://www.omdbapi.com/'

interface OmdbSearchResponse {
  Search?: Movie[]
  totalResults?: string
  Response: string
  Error?: string
}

export async function searchMovies(query: string): Promise<Movie[]> {
  const apiKey = import.meta.env.VITE_OMDB_API_KEY
  const url = `${API_URL}?apikey=${apiKey}&s=${encodeURIComponent(query)}`

  let res: Response
  try {
    res = await fetch(url)
  } catch {
    throw new Error('Network error: failed to reach OMDb API')
  }

  if (!res.ok) {
    throw new Error(`OMDb request failed (${res.status} ${res.statusText})`)
  }

  const data: OmdbSearchResponse = await res.json()

  if (data.Response === 'False') {
    throw new Error(data.Error ?? 'OMDb returned an unknown error')
  }

  return data.Search ?? []
}
