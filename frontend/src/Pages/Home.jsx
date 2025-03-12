// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import styles from "./css/Home.module.css";
// import PostExcuse from "../components/postExcuseCard";
// import ExcuseCard from "../components/excuseCard";

// const Home = () => {
//   let storedUser;
//   try {
//     const [user, setUser] = useState({ id: "", name: "Guest", email: "", avatar: "" });
//     // const storedUser = JSON.parse(localStorage.getItem("user")) || { id: "", name: "Guest", avatar: "" };
//     // const storedUser = JSON.parse(localStorage.getItem("user")) || { id: "" };
// // console.log("Stored User:", storedUser);  // Debugging line
// // console.log("User ID being sent:", storedUser.id);
//   } catch (error) {
//     console.error("Error parsing stored user:", error);
//     storedUser = { id: "", name: "Guest", avatar: "" };
//   }

//   const [excuses, setExcuses] = useState([]);
//   const [users, setUsers] = useState([]);

//   // useEffect(() => {
//   //   fetchUsers();
//   //   fetchExcuses();
//   // }, []);
//   useEffect(() => {
//     try {
//       const storedUser = JSON.parse(localStorage.getItem("user"));
//       if (storedUser) {
//         setUser(storedUser);
//       }
//     } catch (error) {
//       console.error("Error parsing stored user:", error);
//     }
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const storedUser = JSON.parse(localStorage.getItem("user")) || { email: "" };
  
//       if (!storedUser.id) {
//         console.error("User ID is missing from localStorage.");
//         return;
//       }
//       const res = await axios.get(`http://localhost:3001/api/auth/users?email=${storedUser.email}`);

//       setUsers(res.data);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     }
//   };
  
//   const fetchExcuses = async () => {
//     try {
//       const res = await axios.get("http://localhost:3001/api/excuses");
//       setExcuses(res.data);
//     } catch (error) {
//       console.error("Error fetching excuses:", error);
//     }
//   };

//   return (
//     <div className={styles.layout}>
//       <header className={styles.header}>
//         <div className={styles.menuButton}>
//           <span></span>
//           <span></span>
//           <span></span>
//         </div>
//         <h1 className={styles.headerTitle}>Excuse Feed</h1>
//         <div className={styles.userIcon}></div>
//       </header>
//       <div className={styles.content}>
//         <aside className={styles.sidebar}>
//           <h2 className={styles.sidebarTitle}>Users</h2>
//           <ul className={styles.userList}>
//             {users.length === 0 ? <p>Loading users...</p> : users.map((user, index) => (
//               <li key={user.id || user._id || index} className={styles.userItem}>
//                 <img src={user.avatar || "/default-avatar.png"} alt="User Avatar" className={styles.avatar} />
//                 <span className={styles.userName}>{user.name}</span>
//               </li>
//             ))}
//           </ul>
//         </aside>
//         <main className={styles.main}>
//           <PostExcuse user={storedUser} onPostSuccess={(newExcuse) => setExcuses([newExcuse, ...excuses])} />
//           <ExcuseCard excuses={excuses} setExcuses={setExcuses} user={storedUser} />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Home;


import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./css/Home.module.css";
import PostExcuse from "../components/postExcuseCard";
import ExcuseCard from "../components/excuseCard";

const Home = () => {
  const [user, setUser] = useState({ id: "", name: "Guest", email: "", avatar: "" });
  const [excuses, setExcuses] = useState([]);
  const [users, setUsers] = useState([]);

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

      const res = await axios.get("http://localhost:3001/api/auth/users", {
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
              src={user.avatar || "/default-avatar.png"} 
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
            {users.length === 0 ? <p>Loading users...</p> : users.map((user, index) => (
              <li key={user._id || index} className={styles.userItem}>
                <img src={user.avatar || "/default-avatar.png"} alt="User Avatar" className={styles.avatar} />
                <span className={styles.userName}>{user.name}</span>
              </li>
            ))}
          </ul>
        </aside>
        <main className={styles.main}>
          <PostExcuse user={user} onPostSuccess={(newExcuse) => setExcuses([newExcuse, ...excuses])} />
          <ExcuseCard excuses={excuses} setExcuses={setExcuses} user={user} />
        </main>
      </div>
    </div>
  );
};

export default Home;
