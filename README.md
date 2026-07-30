# Movie App Flyrank

## Feature Prompts

1. Implement the OMDb movie search request inside `src/services/omdbMovieService.ts` — `searchMovies(query: string): Promise<Movie[]>`

2. Implement the Home model inside `src/pages/Home/HomeModel.ts` — `getMovies(query: string): Promise<Movie[]>`

3. Implement a custom hook inside `src/pages/Home/useHomeViewModel.ts` — `useHomeViewModel()` with query, movies, loading, error state and `handleSearch()`

4. Implement the Home view inside `src/pages/Home/HomeView.tsx` — search form, loading, error, movie list with `.map()`

5. Create an `initialMovies()` function inside `HomeModel` — fetch 20 random movies on load using seed keywords and `Promise.all`

6. Create a reusable `MovieCard` component at `src/components/MovieCard/MovieCard.tsx` — poster, title, year, type, Favourite button

7. Create and configure Firebase for the application in `src/services/firebaseService.ts`

8. Add Firebase functions for managing favourite movies — `addFavourite`, `removeFavourite`, `getFavourites`

9. Implement the Favourites model in `src/pages/Favourites/FavouritesModel.ts` — wrapper around Firebase service

10. Implement `useFavouritesViewModel` hook — favourites, loading, error state, `loadMovies()`, `removeMovie(imdbID)`

11. Implement the Favourites view in `src/pages/Favourites/FavouritesView.tsx` — display favourites using MovieCard

12. Install Firebase and update config — add `getAuth`, `getFirestore`, export `auth` and `db`

13. Create `src/services/authService.ts` — `registerUser`, `loginUser`, `logoutUser`, `subscribeToAuthChanges`

14. Create MVVM file structure for authentication — `AuthModel.ts`, `useAuthViewModel.ts`, `AuthView.tsx`

15. Implement `AuthModel` — `register`, `login`, `logout` with validation

16. Implement `useAuthViewModel` — email, password, mode (login/register), loading, error, `handleSubmit()`, `toggleMode()`

17. Implement `AuthView` — login/register form with email, password, submit, toggle mode

18. Create global `AuthContext` — `onAuthStateChanged`, `user`, `authLoading`, `logout`, `AuthProvider`

19. Update application routing — `/auth` route, protect `/favourites`, redirect authenticated users from `/auth`

20. Update favourites service to use `users/{userId}/favourites/{imdbID}` structure

21. Add logout button in Header connected to `AuthContext.logout`

22. Move types under `/types` directory

## Bug Fix & Issue Prompts

1. "when i am reloading the home page it is not showing any movies on the homepage" — Fixed by adding initial movies fetch on mount

2. "neither are the movies still appearing + the console of the browser doesnt show any logs" — Fixed by adding `<Routes>` with `<Route>` components in `App.tsx` (HomeView was never rendered)

3. "it is automatically pressed the home button and the screen keeps reloading every second" — Fixed by using empty dependency array in `useEffect` instead of `[onMount]`

4. "when i have searched something it fetches movies based on that search after that when i click on home button in the header it should again reload 20 random movies" — Fixed by wiring `onHome` callback to clear query and increment key to force remount

5. "when i click on the favourite button in the header and then click on home it reloads the home page 3 times" — Fixed by using key-based remount instead of calling `loadInitial` from both the click handler and mount effect

6. "the search header is not functioning correctly when i enter a name and press search it doesnt change the movies" — Fixed by lifting `useHomeViewModel` to App level and passing state down as props to both Header and HomeView

7. "when i click a favourite button from a single card of the movie, nothing happens" — Fixed by connecting `onFavourite` through HomeView → MovieCard, wiring to `FavouritesModel.saveFavourite`

8. "the heart should have a glow and should become the neon green version when clicked or hover" — Added CSS transitions, `drop-shadow` glow, and `--active` class for favourited state

9. "the heart should be filled in the favourites tab too" — Passed `isFavourite={true}` to MovieCard in FavouritesView

10. "the auth view is not looking according to the design md file" — Styled AuthView with dark surface card, neon accents, uppercase typography matching the design system

11. "when something is favourite kindly make the heart filled with the neon green color" — Added `favouriteIds` state, `syncFavouriteIds()`, and `isFavourite()` check; SVG fill switches to `currentColor` when favourited

12. "if i am unauthenticated and i try to favourite redirect me to favourite page which is covered by login and dont register that favourite unless and until the auth is complete" — Added auth guard in `addFavourite` using `useAuth` and `useNavigate` to redirect to `/auth`
