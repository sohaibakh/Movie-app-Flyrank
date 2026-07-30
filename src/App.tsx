import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header/Header'
import HomeView from './pages/Home/HomeView'
import FavouritesView from './pages/Favourites/FavouritesView'
import AuthView from './pages/Auth/AuthView'
import { useHomeViewModel } from './pages/Home/useHomeViewModel'
import { useAuth } from './context/AuthContext'

function AppContent() {
  const { query, setQuery, movies, loading, error, handleSearch, loadInitial, addFavourite, isFavourite } =
    useHomeViewModel()

  const { user, authLoading, logout } = useAuth()
  const [homeKey, setHomeKey] = useState(0)

  if (authLoading) {
    return <div className="app-shell"><p>Loading...</p></div>
  }

  return (
    <div className="app-shell">
      <Header
        query={query}
        onQueryChange={setQuery}
        onSearch={handleSearch}
        user={user}
        onLogout={logout}
        onHome={() => {
          setQuery('')
          setHomeKey((k) => k + 1)
        }}
      />
      <Routes>
        <Route
          index
          element={
            <HomeView
              key={homeKey}
              movies={movies}
              loading={loading}
              error={error}
              onMount={loadInitial}
              onFavourite={addFavourite}
              isFavourite={isFavourite}
            />
          }
        />
        <Route
          path="/favourites"
          element={
            user ? <FavouritesView /> : <Navigate to="/auth" replace />
          }
        />
        <Route
          path="/auth"
          element={
            user ? <Navigate to="/" replace /> : <AuthView />
          }
        />
      </Routes>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App
