import { useEffect } from 'react'
import MovieCard from '../../components/MovieCard/MovieCard'
import type { Movie } from '../../types/movie'
import './HomeView.css'

interface HomeViewProps {
  movies: Movie[]
  loading: boolean
  error: string
  onMount: () => void
  onFavourite: (movie: Movie) => void
  isFavourite: (imdbID: string) => boolean
}

function HomeView({ movies, loading, error, onMount, onFavourite, isFavourite }: HomeViewProps) {
  useEffect(() => {
    onMount()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className="home">
      {loading && <p className="home__message">Loading...</p>}

      {error && <p className="home__message home__message--error">{error}</p>}

      <div className="home__grid">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} onFavourite={onFavourite} isFavourite={isFavourite(movie.imdbID)} />
        ))}
      </div>
    </div>
  )
}

export default HomeView
