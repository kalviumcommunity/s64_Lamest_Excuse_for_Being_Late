import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../components/excuseCard';
import styles from './css/Home.module.css';

const Home = () => {
  const [excuses, setExcuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newExcuseName, setNewExcuseName] = useState('');
  const [newExcuseDescription, setNewExcuseDescription] = useState('');

  // Mock users data - in a real app this would come from MongoDB too
  const users = [
    { id: 1, name: 'Jane Doe', status: 'online' },
    { id: 2, name: 'John Smith', status: 'offline' },
    { id: 3, name: 'Alex Chen', status: 'online' },
    { id: 4, name: 'Sarah Williams', status: 'away' },
    { id: 5, name: 'Mike Johnson', status: 'online' }
  ];

  useEffect(() => {
    const fetchExcuses = async () => {
      try {
        setLoading(true);
        // Using the route from excuseRoutes.js
        const response = await axios.get('/api/excuses');
        setExcuses(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching excuses:', err);
        setError('Failed to load excuses. Please try again later.');
        setLoading(false);
      }
    };

    fetchExcuses();
  }, []);

  const handlePostExcuse = async () => {
    if (!newExcuseName.trim() || !newExcuseDescription.trim()) {
      alert('Please provide both a name and description for your excuse');
      return;
    }
    
    try {
      // Using the route and data structure from excuseRoutes.js
      const response = await axios.post('/api/excuses', { 
        name: newExcuseName,
        description: newExcuseDescription
      });
      
      // Add the new excuse to the state
      if (response.data && response.data.newExcuse) {
        setExcuses([response.data.newExcuse, ...excuses]);
        // Clear the inputs
        setNewExcuseName('');
        setNewExcuseDescription('');
      }
    } catch (err) {
      console.error('Error posting excuse:', err);
      alert('Failed to post excuse. Please try again.');
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'online': return styles.statusOnline;
      case 'offline': return styles.statusOffline;
      case 'away': return styles.statusAway;
      default: return styles.statusOffline;
    }
  };

  if (loading) {
    return (
      <div className={styles.layout}>
        <header className={styles.header}>
          <div className={styles.menuButton}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <h1 className={styles.headerTitle}>Excuse Feed</h1>
          <div className={styles.userIcon}></div>
        </header>
        <div className={styles.content}>
          <aside className={styles.sidebar}>
            <h2 className={styles.sidebarTitle}>Users</h2>
            {/* Users would go here */}
          </aside>
          <main className={styles.main}>
            <div className={styles.loadingContainer}>
              <div className={styles.spinner}></div>
              <p>Loading excuses...</p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.layout}>
        <header className={styles.header}>
          <div className={styles.menuButton}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <h1 className={styles.headerTitle}>Excuse Feed</h1>
          <div className={styles.userIcon}></div>
        </header>
        <div className={styles.content}>
          <aside className={styles.sidebar}>
            <h2 className={styles.sidebarTitle}>Users</h2>
            {/* Users would go here */}
          </aside>
          <main className={styles.main}>
            <div className={styles.errorContainer}>
              <p className={styles.errorMessage}>{error}</p>
              <button 
                className={styles.retryButton}
                onClick={() => window.location.reload()}
              >
                Retry
              </button>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.layout}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.menuButton}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <h1 className={styles.headerTitle}>Excuse Feed</h1>
        <div className={styles.userIcon}></div>
      </header>
      
      <div className={styles.content}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <h2 className={styles.sidebarTitle}>Users</h2>
          <ul className={styles.userList}>
            {users.map(user => (
              <li key={user.id} className={styles.userItem}>
                <div className={styles.userAvatar}></div>
                <span className={styles.userName}>{user.name}</span>
                <span className={`${styles.statusIndicator} ${getStatusColor(user.status)}`}></span>
              </li>
            ))}
          </ul>
        </aside>
        
        {/* Main Content */}
        <main className={styles.main}>
          {/* Post Creator */}
          <div className={styles.postCreator}>
            <input 
              className={styles.excuseInput}
              placeholder="Give your excuse a name"
              value={newExcuseName}
              onChange={(e) => setNewExcuseName(e.target.value)}
            />
            <textarea 
              className={styles.excuseInput}
              placeholder="Describe your excuse in detail"
              value={newExcuseDescription}
              onChange={(e) => setNewExcuseDescription(e.target.value)}
            ></textarea>
            <button 
              className={styles.postButton}
              onClick={handlePostExcuse}
            >
              Post Excuse
            </button>
          </div>
          
          {/* Excuse Cards */}
          <div className={styles.excuseList}>
            {excuses.length > 0 ? (
              excuses.map((excuse) => (
                <Card 
                  key={excuse._id}
                  excuse={excuse}
                />
              ))
            ) : (
              <div className={styles.noExcuses}>
                <p>No excuses found. Be the first to post one!</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;