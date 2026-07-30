import { useFavouritesViewModel } from './useFavouritesViewModel'
import MovieCard from '../../components/MovieCard/MovieCard'

function FavouritesView() {
  const { favourites, loading, error, removeMovie } = useFavouritesViewModel()

  return (
    <div>
      {loading && <p>Loading...</p>}

      {error && <p>{error}</p>}

      {!loading && !error && favourites.length === 0 && (
        <p>No favourites yet</p>
      )}

      {favourites.map((movie) => (
        <MovieCard
          key={movie.imdbID}
          movie={movie}
          isFavourite={true}
          onFavourite={() => removeMovie(movie.imdbID)}
        />
      ))}
    </div>
  )
}

export default FavouritesView
