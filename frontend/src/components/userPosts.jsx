import React, { useState, useEffect } from "react";
import axios from "axios";
import excuseStyles from "./css/excuseCard.module.css";
import styles from "./css/userPosts.module.css";
import { getCookie } from "../utils/cookieUtils";

/**
 * Component to display excuses posted by a specific user
 * @param {Object} props - Component props
 * @param {Object} props.selectedUser - The user whose posts we want to display
 * @param {Function} props.onClose - Function to close the user posts view
 * @param {Object} props.currentUser - The currently logged-in user
 */
const UserPosts = ({ selectedUser, onClose, currentUser }) => {
  const [userExcuses, setUserExcuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: "",
    description: ""
  });

  useEffect(() => {
    if (selectedUser && selectedUser._id) {
      fetchUserExcuses();
    }
  }, [selectedUser]);

  const fetchUserExcuses = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      
      if (!token) {
        setError("Authentication token is missing");
        return;
      }
      
      // Fetch excuses for the selected user
      const response = await axios.get(`http://localhost:3001/api/excuses/user/${selectedUser._id}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true
      });
      
      setUserExcuses(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching user excuses:", err);
      setError("Failed to load excuses for this user");
      setLoading(false);
    }
  };

  const handleLike = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authentication token is missing");
        return;
      }

      const res = await axios.post(
        `http://localhost:3001/api/excuses/${id}/like`,
        { userId: currentUser.id },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true
        }
      );
      
      // Update the excuse in the state with the returned updated excuse
      setUserExcuses(userExcuses.map(excuse => 
        excuse._id === id ? res.data : excuse
      ));
    } catch (error) {
      console.error("Error liking excuse:", error);
    }
  };

  const handleDislike = async (id) => {
    // Reuse the handleLike function to toggle
    await handleLike(id);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authentication token is missing");
        return;
      }

      await axios.delete(`http://localhost:3001/api/excuses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true
      });
      
      setUserExcuses(userExcuses.filter(excuse => excuse._id !== id));
    } catch (error) {
      console.error("Error deleting excuse:", error);
    }
  };

  const handleEdit = (excuse) => {
    setEditMode(excuse._id);
    setEditFormData({
      title: excuse.title,
      description: excuse.description || excuse.content
    });
  };

  const handleCancelEdit = () => {
    setEditMode(null);
    setEditFormData({
      title: "",
      description: ""
    });
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitEdit = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authentication token is missing");
        return;
      }

      const res = await axios.put(
        `http://localhost:3001/api/excuses/${id}`,
        editFormData,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true
        }
      );
      
      // Update the excuse in the state with the returned updated excuse
      setUserExcuses(userExcuses.map(excuse => 
        excuse._id === id ? res.data : excuse
      ));
      
      // Exit edit mode
      setEditMode(null);
    } catch (error) {
      console.error("Error updating excuse:", error);
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading excuses...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorMessage}>{error}</p>
        <button className={styles.retryButton} onClick={fetchUserExcuses}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className={styles.userPostsContainer}>
      <div className={styles.userPostsHeader}>
        <button className={styles.backButton} onClick={onClose}>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            style={{ marginRight: "8px" }}
          >
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to Feed
        </button>
        <h2 className={styles.userPostsTitle}>
          {selectedUser.name}'s Excuses
        </h2>
      </div>
      
      {userExcuses.length > 0 ? (
        <div className={excuseStyles.excusesList}>
          {userExcuses.map((excuse) => (
            <div key={excuse._id} className={excuseStyles.excuseCard}>
              <div className={excuseStyles.excuseHeader}>
                <img 
                  src={selectedUser.avatar || "/default/default-avatar.png"} 
                  alt="User Avatar" 
                  className={excuseStyles.avatar} 
                />
                <span className={excuseStyles.username}>{selectedUser.name}</span>
              </div>
              
              {editMode === excuse._id ? (
                <div className={excuseStyles.editForm}>
                  <input
                    type="text"
                    name="title"
                    value={editFormData.title}
                    onChange={handleEditFormChange}
                    className={excuseStyles.editInput}
                  />
                  <textarea
                    name="description"
                    value={editFormData.description}
                    onChange={handleEditFormChange}
                    className={excuseStyles.editTextarea}
                  />
                  <div className={excuseStyles.editActions}>
                    <button 
                      className={excuseStyles.saveButton}
                      onClick={() => handleSubmitEdit(excuse._id)}
                    >
                      Save
                    </button>
                    <button 
                      className={excuseStyles.cancelButton}
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h3 className={excuseStyles.excuseTitle}
                  >{excuse.title}</h3>
                  <p className={excuseStyles.excuseDescription}>{excuse.description || excuse.content}</p>
                  <div className={excuseStyles.excuseActions}>
                    <button className={excuseStyles.actionButton} onClick={() => handleLike(excuse._id)}>
                      👍 {excuse.likes?.length || 0}
                    </button>
                    <button className={excuseStyles.actionButton} onClick={() => handleDislike(excuse._id)}>
                      👎 {0}
                    </button>
                    <button className={excuseStyles.actionButton}>
                      💬 {excuse.comments?.length || 0}
                    </button>

                    {/* Show Edit and Delete buttons only for the Logged-in User */}
                    {currentUser?.id === excuse.user?._id && (
                      <>
                        <button className={excuseStyles.editButton} onClick={() => handleEdit(excuse)}>
                          ✏️ Edit
                        </button>
                        <button className={excuseStyles.deleteButton} onClick={() => handleDelete(excuse._id)}>
                          🗑️ Delete
                        </button>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.noExcuses}>
          <p>This user hasn't posted any excuses yet.</p>
        </div>
      )}
    </div>
  );
};

export default UserPosts;