import React, { useEffect } from "react";
import axios from "axios";
import styles from "./css/excuseCard.module.css";

const ExcuseCard = ({ excuses, setExcuses, user }) => {
  useEffect(() => {
    fetchExcuses();
  }, []);

  // const fetchExcuses = async () => {
  //   try {
  //     const res = await axios.get("http://localhost:3001/api/excuses", {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     const excusesWithUserData = await Promise.all(
  //       res.data.map(async (excuse) => {
  //         try {
  //           const userRes = await axios.get(`http://localhost:3001/api/auth/users?email=${excuse.userEmail}`);
  //           return { ...excuse, user: userRes.data.name, userAvatar: userRes.data.avatar };
  //         } catch (err) {
  //           console.error("Error fetching user data:", err);
  //           return { ...excuse, user: "Unknown", userAvatar: "/default-avatar.png" };
  //         }
  //       })
  //     );
  //     setExcuses(excusesWithUserData);
  //   } catch (error) {
  //     console.error("Error fetching excuses:", error);
  //   }
  // };

  // In excuseCard.jsx - fetchExcuses function
const fetchExcuses = async () => {
  try {
    // Get token from localStorage
    const token = localStorage.getItem("token");
    
    const res = await axios.get("http://localhost:3001/api/excuses", {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    });
    
    // Rest of your function...
  } catch (error) {
    console.error("Error fetching excuses:", error);
  }
};

  const handleLike = async (id) => {
    try {
      const res = await axios.post(`http://localhost:3001/api/excuses/${id}/like`);
      setExcuses(excuses.map(excuse => 
        excuse._id === id ? { ...excuse, likes: res.data.likes } : excuse
      ));
    } catch (error) {
      console.error("Error liking excuse:", error);
    }
  };

  const handleDislike = async (id) => {
    try {
      const res = await axios.post(`http://localhost:3001/api/excuses/${id}/dislike`);
      setExcuses(excuses.map(excuse => 
        excuse._id === id ? { ...excuse, dislikes: res.data.dislikes } : excuse
      ));
    } catch (error) {
      console.error("Error disliking excuse:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/excuses/${id}`);
      setExcuses(excuses.filter(excuse => excuse._id !== id));
    } catch (error) {
      console.error("Error deleting excuse:", error);
    }
  };

  return (
    <div className={styles.excusesList}>
      {excuses.length > 0 ? (
        excuses.map((excuse) => (
          <div key={excuse._id} className={styles.excuseCard}>
            <div className={styles.excuseHeader}>
              <img src={excuse.userAvatar || "/default-avatar.png"} alt="User Avatar" className={styles.avatar} />
              <span className={styles.username}>{excuse.user || "Anonymous"}</span>
            </div>
            <h3 className={styles.excuseTitle}>{excuse.title}</h3>
            <p className={styles.excuseDescription}>{excuse.description}</p>
            <div className={styles.excuseActions}>
              <button className={styles.actionButton} onClick={() => handleLike(excuse._id)}>
                👍 {excuse.likes}
              </button>
              <button className={styles.actionButton} onClick={() => handleDislike(excuse._id)}>
                👎 {excuse.dislikes}
              </button>
              <button className={styles.actionButton}>💬 Comment</button>

              {/* ✅ Show Delete Button only for the Logged-in User */}
              {user?.email === excuse.userEmail && (
                <button className={styles.deleteButton} onClick={() => handleDelete(excuse._id)}>🗑️ Delete</button>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className={styles.noExcuses}>
          <p>No excuses found. Be the first to post one!</p>
        </div>
      )}
    </div>
  );
};

export default ExcuseCard;
