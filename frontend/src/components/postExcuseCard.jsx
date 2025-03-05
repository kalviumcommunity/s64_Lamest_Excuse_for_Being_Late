import React, { useState } from "react";
import axios from "axios";
import styles from "./css/postExcuse.module.css"; 

const PostExcuse = ({ user, onPostSuccess }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePost = async () => {
    // Form validation
    if (!title.trim() || !description.trim()) {
      setError("Title and Description are required!");
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await axios.post("http://localhost:3001/api/excuses", {
        title,
        description,
        userId: user.id,
        user: user.name // Including the username for display
      });

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
      setError(err.response?.data?.message || "Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.postContainer}>
      <div className={styles.userInfo}>
        <img 
          src={user.avatar} 
          alt="User Avatar" 
          className={styles.avatar} 
        />
        <span className={styles.username}>{user.name || `User ${user.id}`}</span>
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
    </div>
  );
};

export default PostExcuse;