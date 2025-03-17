import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./css/excuseCard.module.css";

const ExcuseCard = ({ excuses, setExcuses, user }) => {
  const [editMode, setEditMode] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: "",
    description: ""
  });

  useEffect(() => {
    fetchExcuses();
  }, []);

  const fetchExcuses = async () => {
    try {
      // Get token from localStorage
      const token = localStorage.getItem("token");
      
      if (!token) {
        console.error("No authentication token found");
        return;
      }
      
      const res = await axios.get("http://localhost:3001/api/excuses", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setExcuses(res.data);
    } catch (error) {
      console.error("Error fetching excuses:", error);
    }
  };

  const handleLike = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No authentication token found");
        return;
      }

      const res = await axios.post(
        `http://localhost:3001/api/excuses/${id}/like`,
        { userId: user.id },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      // Update the excuse in the state with the returned updated excuse
      setExcuses(excuses.map(excuse => 
        excuse._id === id ? res.data : excuse
      ));
    } catch (error) {
      console.error("Error liking excuse:", error);
    }
  };

  const handleDislike = async (id) => {
    try {
      // In the updated API, there is no separate dislike endpoint
      // So we're just toggling the like status which effectively works as a dislike when removed
      await handleLike(id);
    } catch (error) {
      console.error("Error disliking excuse:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No authentication token found");
        return;
      }

      await axios.delete(`http://localhost:3001/api/excuses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setExcuses(excuses.filter(excuse => excuse._id !== id));
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
        console.error("No authentication token found");
        return;
      }

      const res = await axios.put(
        `http://localhost:3001/api/excuses/${id}`,
        editFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      // Update the excuse in the state with the returned updated excuse
      setExcuses(excuses.map(excuse => 
        excuse._id === id ? res.data : excuse
      ));
      
      // Exit edit mode
      setEditMode(null);
    } catch (error) {
      console.error("Error updating excuse:", error);
    }
  };

  return (
    <div className={styles.excusesList}>
      {excuses.length > 0 ? (
        excuses.map((excuse) => (
          <div key={excuse._id} className={styles.excuseCard}>
            <div className={styles.excuseHeader}>
              <img 
                src={excuse.user?.avatar || "/default-avatar.png"} 
                alt="User Avatar" 
                className={styles.avatar} 
              />
              <span className={styles.username}>{excuse.user?.name || "Anonymous"}</span>
            </div>
            
            {editMode === excuse._id ? (
              <div className={styles.editForm}>
                <input
                  type="text"
                  name="title"
                  value={editFormData.title}
                  onChange={handleEditFormChange}
                  className={styles.editInput}
                />
                <textarea
                  name="description"
                  value={editFormData.description}
                  onChange={handleEditFormChange}
                  className={styles.editTextarea}
                />
                <div className={styles.editActions}>
                  <button 
                    className={styles.saveButton}
                    onClick={() => handleSubmitEdit(excuse._id)}
                  >
                    Save
                  </button>
                  <button 
                    className={styles.cancelButton}
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h3 className={styles.excuseTitle}>{excuse.title}</h3>
                <p className={styles.excuseDescription}>{excuse.description || excuse.content}</p>
                <div className={styles.excuseCategory}>
                  {/* Category: {excuse.category || "Other"} */}
                </div>
                <div className={styles.excuseActions}>
                  <button className={styles.actionButton} onClick={() => handleLike(excuse._id)}>
                    👍 {excuse.likes?.length || 0}
                  </button>
                  <button className={styles.actionButton} onClick={() => handleDislike(excuse._id)}>
                    👎 {0} {/* Since there's no dislikes array in the updated model */}
                  </button>
                  <button className={styles.actionButton}>
                    💬 {excuse.comments?.length || 0}
                  </button>

                  {/* Show Edit and Delete buttons only for the Logged-in User */}
                  {user?.id === excuse.user?._id && (
                    <>
                      <button className={styles.editButton} onClick={() => handleEdit(excuse)}>
                        ✏️ Edit
                      </button>
                      <button className={styles.deleteButton} onClick={() => handleDelete(excuse._id)}>
                        🗑️ Delete
                      </button>
                    </>
                  )}
                </div>
              </>
            )}
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