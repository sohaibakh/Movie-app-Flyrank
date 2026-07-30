import { NavLink } from 'react-router-dom'
import type { User } from 'firebase/auth'
import './Header.css'

interface HeaderProps {
  query: string
  onQueryChange: (value: string) => void
  onSearch: () => void
  onHome: () => void
  user: User | null
  onLogout: () => void
}

function Header({ query, onQueryChange, onSearch, onHome, user, onLogout }: HeaderProps) {
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSearch()
  }

  return (
    <header className="header">
      <nav className="header__nav">
        <NavLink
          to="/"
          end
          onClick={onHome}
          className={({ isActive }) =>
            isActive ? 'header__link header__link--active' : 'header__link'
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/favourites"
          className={({ isActive }) =>
            isActive ? 'header__link header__link--active' : 'header__link'
          }
        >
          Favourites
        </NavLink>
      </nav>

      <form className="header__search" onSubmit={handleSubmit}>
        <input
          type="search"
          className="header__search-input"
          placeholder="Search movies"
          aria-label="Search movies"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
        />
        <button type="submit" className="header__search-button">
          Search
        </button>
      </form>

      {user && (
        <button type="button" className="header__logout" onClick={onLogout}>
          Logout
        </button>
      )}
    </header>
  )
}

export default Header
