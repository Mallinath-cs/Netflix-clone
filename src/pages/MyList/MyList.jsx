import React, { useEffect, useState } from 'react';
import { auth, db } from '../../firebase.js';
import { collection, getDocs } from "firebase/firestore";
import './MyList.css';

const MyList = () => {
  const [watchlist, setWatchList] = useState([]);
  const [userId, setUserId] = useState(null);
  const placeholderImg = "/placeholder.png";

  // Track authenticated user
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
        setWatchList([]);
      }
    });
    return () => unsubscribe();
  }, []);

  // Fetch watchlist from Firestore and convert ids to strings
  useEffect(() => {
    if (!userId) return;

    const fetchList = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(db, "users", userId, "watchlist")
        );

        const movies = querySnapshot.docs.map(doc => ({
          id: String(doc.id),
          ...doc.data()
        }));

        setWatchList(movies);
      } catch (error) {
        console.error("Error fetching watchlist:", error);
      }
    };

    fetchList();
  }, [userId]);

  return (
    <div className="mylist">
      <h2 className="mylist-title">My List</h2>
      <div className="mylist-grid">
        {watchlist.length > 0 ? (
          watchlist.map(movie => (
            <div className="mylist-card" key={movie.id}>
              <img
                src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : placeholderImg}
                alt={movie.title || "No Title"}
                className="mylist-poster"
              />
              <p className="mylist-movie-title">{movie.title || "Untitled"}</p>
            </div>
          ))
        ) : (
          <p className="mylist-empty">Your List is Empty. Add some movies 🍿</p>
        )}
      </div>
    </div>
  );
};

export default MyList;
