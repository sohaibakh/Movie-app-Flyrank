import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { HomeModel } from './HomeModel'
import { FavouritesModel } from '../Favourites/FavouritesModel'
import type { Movie } from '../../types/movie'
import { useAuth } from '../../context/AuthContext'

const homeModel = new HomeModel()
const favouritesModel = new FavouritesModel()

export function useHomeViewModel() {
  const [query, setQuery] = useState('')
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [favouriteIds, setFavouriteIds] = useState<Set<string>>(new Set())

  const { user } = useAuth()
  const navigate = useNavigate()

  function getUserId(): string | null {
    return user?.uid ?? null
  }

  async function syncFavouriteIds() {
    const uid = getUserId()
    if (!uid) return

    try {
      const favourites = await favouritesModel.loadFavourites(uid)
      setFavouriteIds(new Set(favourites.map((m) => m.imdbID)))
    } catch {
      // silently ignore
    }
  }

  async function loadInitial() {
    setLoading(true)
    setError('')

    try {
      const [results] = await Promise.all([
        homeModel.initialMovies(),
        syncFavouriteIds(),
      ])
      setMovies(results)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load movies')
    } finally {
      setLoading(false)
    }
  }

  async function handleSearch() {
    setLoading(true)
    setError('')

    try {
      const results = await homeModel.getMovies(query)
      setMovies(results)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  async function addFavourite(movie: Movie) {
    if (!user) {
      navigate('/auth')
      return
    }

    try {
      await favouritesModel.saveFavourite(user!.uid, movie)
      setFavouriteIds((prev) => new Set(prev).add(movie.imdbID))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add favourite')
    }
  }

  function isFavourite(imdbID: string) {
    return favouriteIds.has(imdbID)
  }

  return { query, setQuery, movies, loading, error, handleSearch, loadInitial, addFavourite, isFavourite }
}
