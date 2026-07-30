import type { Movie } from '../../types/movie'
import './MovieCard.css'

interface MovieCardProps {
  movie: Movie
  onFavourite?: (movie: Movie) => void
  isFavourite?: boolean
}

function MovieCard({ movie, onFavourite, isFavourite }: MovieCardProps) {
  return (
    <div className="movie-card">
      <img
        className="movie-card__poster"
        src={movie.Poster}
        alt={movie.Title}
      />
      <div className="movie-card__info">
        <h3 className="movie-card__title">{movie.Title}</h3>
        <p className="movie-card__meta">
          <span>{movie.Year}</span>
          <span>{movie.Type}</span>
        </p>
      </div>
      <button
        className={`movie-card__favourite${isFavourite ? ' movie-card__favourite--active' : ''}`}
        type="button"
        aria-label="Favourite"
        onClick={() => onFavourite?.(movie)}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill={isFavourite ? 'currentColor' : 'none'}
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </button>
    </div>
  )
}

export default MovieCard
