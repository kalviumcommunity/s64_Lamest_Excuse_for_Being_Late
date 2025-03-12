import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./css/postExcuse.module.css"; 

const PostExcuse = ({ onPostSuccess }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);

  // Fetch logged-in user details from local storage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserId(user.id);
      setUserName(user.name);
    }
  }, []);

  const handlePost = async () => {
    // Check if the user is logged in
    if (!userId) {
      setError("You must be logged in to post an excuse!");
      return;
    }

    // Form validation
    if (!title.trim() || !description.trim()) {
      setError("Title and description are required!");
      return;
    }

    try {
      setIsSubmitting(true);
      const token = localStorage.getItem("token");

      // Create headers with the authentication token
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };

      // Send the request with the token in headers
      const response = await axios.post(
        "http://localhost:3001/api/excuses", 
        {
          title,
          description,
          userId: userId,
        },
        config
      );

      // Reset fields on success 
      setTitle("");
      setDescription("");
      setError("");

      // Notify parent component of successful post
      if (onPostSuccess && response.data) {
        onPostSuccess(response.data);
      }
    } catch (err) {
      console.error("Error posting excuse:", err.response?.data || err.message);
      setError(err.response?.data?.message || err.response?.data?.error || "Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.postContainer}>
      {userId ? (
        <>
          <div className={styles.userInfo}>
            <span className={styles.username}>{userName || "Anonymous User"}</span>
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <input
            type="text"
            placeholder="Excuse Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.inputField}
            disabled={isSubmitting}
          />

          <textarea
            placeholder="Describe your excuse..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={styles.textArea}
            disabled={isSubmitting}
          />

          <button 
            onClick={handlePost} 
            className={styles.postButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Posting..." : "Post Excuse"}
          </button>
        </>
      ) : (
        <p className={styles.error}>You need to log in to post an excuse.</p>
      )}
    </div>
  );
};

export default PostExcuse;