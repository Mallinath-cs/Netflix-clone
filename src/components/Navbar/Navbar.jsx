import React, { useEffect, useRef, useState } from 'react';
import './Navbar.css';
import logo from '../../assets/logo.png';
import search_icon from '../../assets/search_icon.svg';
import bell_icon from '../../assets/bell_icon.svg';
import profile_img from '../../assets/profile_img.png';
import caret_icon from '../../assets/caret_icon.svg';
import { logout } from '../../firebase';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navRef = useRef();
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);   
  
  const navigate = useNavigate();

  const API_KEY =
    import.meta.env.VITE_TMDB_API_KEY;  

  useEffect(() => {
      const handleScroll = () => {
        if (navRef.current) {
          if (window.scrollY >= 80) {
            navRef.current.classList.add('nav-dark');
          } else {
            navRef.current.classList.remove('nav-dark');
          }
        }
      };

      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);


  // 🔹 Fetch results whenever query changes
  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const timer = setTimeout(() => {
      fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US&page=1`, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${API_KEY}`
        }
      })
        .then(res => res.json())
        .then(data => setResults(data.results || []))
        .catch(err => console.error(err));
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <>
      <div ref={navRef} className="navbar">
        <div className="navbar-left">
          <img src={logo} alt="" />
          <ul>
            <Link to="/"><li>Home</li></Link>
            <li>TV Shows</li>
            <li>Movies</li>
            <li>New & Popular</li>
            <Link to="/mylist"><li>My List</li></Link>
            <li>Browse by Language</li>
          </ul>
        </div>

        <div className="navbar-right">
          <img
            src={search_icon}
            alt=""
            className="icons"
            onClick={() => setShowSearch(!showSearch)}
          />
          {showSearch && (
            <form className="search-form" onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                placeholder="Search movies..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
              />
            </form>
          )}
          <div className="navbar-profile">
            <img src={profile_img} alt="" className="profile" />
            <img src={caret_icon} alt="" />
            <div className="dropdown">
              <p onClick={logout}>Sign Out of Netflix</p>
            </div>
          </div>
        </div>
      </div>

      {results.length > 0 && (
      <div className="search-results">
      {results.map((movie) => (
      <div
        key={movie.id}
        className="search-result-item"
        onClick={() => navigate(`/player/${movie.id}`)}
      >
        <img
          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
          alt={movie.title}
        />
        <p>{movie.title}</p>
      </div>
    ))}
  </div>
      )}
    </>
  );
};

export default Navbar;
