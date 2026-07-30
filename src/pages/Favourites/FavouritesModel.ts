import {
  addFavourite,
  removeFavourite,
  getFavourites,
} from '../../services/firebaseService'
import type { Movie } from '../../types/movie'

export class FavouritesModel {
  async loadFavourites(userId: string): Promise<Movie[]> {
    return getFavourites(userId)
  }

  async saveFavourite(userId: string, movie: Movie): Promise<void> {
    return addFavourite(userId, movie)
  }

  async deleteFavourite(userId: string, imdbID: string): Promise<void> {
    return removeFavourite(userId, imdbID)
  }
}
