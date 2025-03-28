import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./css/Home.module.css";
import PostExcuse from "../components/postExcuseCard";
import ExcuseCard from "../components/excuseCard";
import UserPosts from "../components/userPosts";


const Home = () => {
  const [user, setUser] = useState({ id: "", name: "Guest", email: "",  });
  const [excuses, setExcuses] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  // Load user data from localStorage on component mount
  useEffect(() => {
    try {
      const storedUserData = localStorage.getItem("user");
      if (storedUserData) {
        const storedUser = JSON.parse(storedUserData);
        setUser(storedUser);
        
        // Only fetch data if we have a logged-in user
        if (storedUser.id) {
          fetchUsers();
          fetchExcuses();
        }
      }
    } catch (error) {
      console.error("Error parsing stored user:", error);
    }
  }, []);

  const fetchUsers = async () => {
    try {
      // Get token from localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No authentication token found");
        return;
      }

      const res = await axios.get(`http://localhost:3001/api/auth/users`,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  
  const fetchExcuses = async () => {
    try {
      // Get token from localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No authentication token found");
        return;
      }

      const res = await axios.get(`http://localhost:3001/api/excuses`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setExcuses(res.data);
    } catch (error) {
      console.error("Error fetching excuses:", error);
    }
  };

  const handleUserClick = (clickedUser) => {
    setSelectedUser(clickedUser);
  };

  const handleCloseUserPosts = () => {
    setSelectedUser(null);
  };

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.menuButton}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <h1 className={styles.headerTitle}>Excuse Feed</h1>
        <div className={styles.userIcon}>
          {user.name !== "Guest" && (
            <img 
              src={user.avatar || "/default/default-avatar.png"} 
              alt={user.name} 
              className={styles.avatar}
              style={{ width: "30px", height: "30px", borderRadius: "50%" }}
            />
          )}
        </div>
      </header>
      <div className={styles.content}>
        <aside className={styles.sidebar}>
          <h2 className={styles.sidebarTitle}>Users</h2>
          <ul className={styles.userList}>
            {users.length === 0 ? <p>Loading users...</p> : users.map((userItem, index) => (
              <li 
                key={userItem._id || index} 
                className={styles.userItem}
                onClick={() => handleUserClick(userItem)}
              >
                <img 
                  src={userItem.avatar || "/default/default-avatar.png"} 
                  alt="User Avatar" 
                  className={styles.avatar} 
                />
                <span className={styles.userName}>{userItem.name}</span>
              </li>
            ))}
          </ul>
        </aside>
        <main className={styles.main}>
          {selectedUser ? (
            <UserPosts 
              selectedUser={selectedUser} 
              onClose={handleCloseUserPosts} 
              currentUser={user}
            />
          ) : (
            <>
              <PostExcuse 
                user={user} 
                onPostSuccess={(newExcuse) => setExcuses([newExcuse, ...excuses])} 
              />
              <ExcuseCard 
                excuses={excuses} 
                setExcuses={setExcuses} 
                user={user} 
              />
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Home;