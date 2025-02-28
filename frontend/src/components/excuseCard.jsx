// import React from 'react';
// import './css/excuseCard.css'; // Import the CSS file

// const ExcuseCard = ({ excuse, description, name, time, likes, comments }) => {
//   return (
//     <div className="excuse-card">
//       <div className="excuse-card-container">
//         <div className="avatar-container">
//           <div className="avatar"></div>
//         </div>
//         <div className="content-container">
//           <div className="header">
//             <span className="name">{name}</span>
//             <span className="time">{time}</span>
//           </div>
//           <h2 className="excuse">
//             {excuse}
//           </h2>
//           <p className="description">
//             {description}
//           </p>
//           <div className="interaction-bar">
//             <div className="interaction-item">
//               <svg className="icon" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M7 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2h2z"></path>
//               </svg>
//               <span className="count">{likes}</span>
//             </div>
//             <div className="interaction-item">
//               <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
//               </svg>
//               <span className="count">0</span>
//             </div>
//             <div className="interaction-item">
//               <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
//               </svg>
//               <span className="count">{comments}</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ExcuseCard;


import React from 'react';
import styles from './css/excuseCard.module.css';

const Card = ({ excuse }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.userAvatar}></div>
        <div className={styles.userInfo}>
          <h3 className={styles.userName}>{excuse.user?.name || 'Anonymous'}</h3>
          <span className={styles.timestamp}>
            {new Date(excuse.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
      
      <p className={styles.excuseContent}>{excuse.content}</p>
      
      <div className={styles.cardDivider}></div>
      
      <div className={styles.cardActions}>
        <div className={styles.actionButton}>
          <span className={styles.likeIcon}></span>
          <span className={styles.actionCount}>{excuse.likes || 0}</span>
        </div>
        
        <div className={styles.actionButton}>
          <span className={styles.dislikeIcon}></span>
          <span className={styles.actionCount}>{excuse.dislikes || 0}</span>
        </div>
        
        <div className={styles.actionButton}>
          <span className={styles.commentIcon}></span>
          <span className={styles.actionCount}>{excuse.comments?.length || 0}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;