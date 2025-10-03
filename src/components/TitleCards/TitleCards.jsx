import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import "./TitleCards.css";

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
    },
  };

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  const handleAddToList = async (movie, e) => {
    e.stopPropagation(); 

    if (!auth.currentUser) {
      toast.error("Please log in to add movies to your list!");
      return;
    }

    try {
      await setDoc(
        doc(db, "users", auth.currentUser.uid, "watchlist", movie.id.toString()),
        {
          id: movie.id,
          title: movie.original_title || movie.name,
          poster_path: movie.poster_path || movie.backdrop_path,
          backdrop_path: movie.backdrop_path,
          addedAt: new Date(),
        }
      );
      toast.success(`${movie.original_title || movie.name} added to My List! 🍿`);
    } catch (error) {
      console.error("Error adding movie:", error);
      toast.error("Failed to add to My List");
    }
  };

  useEffect(() => {
    // Fetch movies
    fetch(
      `https://api.themoviedb.org/3/movie/${
        category || "now_playing"
      }?language=en-US&page=1`,
      options
    )
      .then((res) => res.json())
      .then((res) => setApiData(res.results))
      .catch((err) => console.error(err));

    // Add horizontal scroll
    const cardsEl = cardsRef.current;
    cardsEl.addEventListener("wheel", handleWheel);

    return () => {
      cardsEl.removeEventListener("wheel", handleWheel);
    };
  }, [category]);

  return (
    <div className="title-cards">
      <h2>{title || "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card) => (
          <div className="card-wrapper" key={card.id}>
          <motion.div className="card"
          whileHover={{ scale: 1.2 , zIndex: 10}}
          transition={{ type: "spring", stiffness: 300 }}
          >
            <Link to={`/player/${card.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`}
                alt={card.original_title || card.name}
              />
            </Link>
            <button onClick={(e) => handleAddToList(card, e)}>+ My List</button>
          </motion.div>
          <div className="card-title">
            <p>{card.original_title || card.name}</p>
          </div> 
          </div>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;
