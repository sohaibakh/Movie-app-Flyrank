import { searchMovies } from '../../services/omdbMovieService'
import type { Movie } from '../../types/movie'

const SEED_KEYWORDS = [
  'Batman', 'Avengers', 'Harry Potter', 'Star Wars', 'Spider-Man',
  'Marvel', 'Disney', 'Matrix', 'Lord of the Rings', 'Fast',
  'Mission Impossible', 'Pixar', 'Horror', 'Comedy', 'Action',
]

function shuffle<T>(array: T[]): T[] {
  const copy = [...array]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

export class HomeModel {
  async getMovies(query: string): Promise<Movie[]> {
    const cleaned = query.trim()

    if (cleaned.length < 2) {
      throw new Error('Query must be at least 2 characters')
    }

    return searchMovies(cleaned)
  }

  async initialMovies(): Promise<Movie[]> {
    const picked = shuffle(SEED_KEYWORDS).slice(0, 5)

    const results = await Promise.all(
      picked.map((keyword) => searchMovies(keyword).catch(() => [] as Movie[]))
    )

    const seen = new Set<string>()
    const merged: Movie[] = []

    for (const list of results) {
      for (const movie of list) {
        if (!seen.has(movie.imdbID)) {
          seen.add(movie.imdbID)
          merged.push(movie)
        }
      }
    }

    return shuffle(merged).slice(0, 20)
  }
}
