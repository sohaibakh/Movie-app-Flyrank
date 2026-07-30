import { useState, useEffect } from 'react'
import { FavouritesModel } from './FavouritesModel'
import type { Movie } from '../../types/movie'
import { useAuth } from '../../context/AuthContext'

const favouritesModel = new FavouritesModel()

export function useFavouritesViewModel() {
  const [favourites, setFavourites] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const { user } = useAuth()

  async function loadMovies() {
    if (!user) return

    setLoading(true)
    setError('')

    try {
      const results = await favouritesModel.loadFavourites(user.uid)
      setFavourites(results)
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to load favourites'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadMovies()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function removeMovie(imdbID: string) {
    if (!user) return

    try {
      await favouritesModel.deleteFavourite(user.uid, imdbID)
      setFavourites((prev) => prev.filter((m) => m.imdbID !== imdbID))
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to remove favourite'
      )
    }
  }

  return { favourites, loading, error, loadMovies, removeMovie }
}
