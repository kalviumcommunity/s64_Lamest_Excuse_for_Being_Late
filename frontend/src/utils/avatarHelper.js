/**
 * Helper function to get a valid avatar URL
 * @param {string} avatarPath - The avatar path from the server
 * @returns {string} - A valid avatar URL for display
 */
export const getAvatarUrl = (avatarPath) => {
  if (!avatarPath) return "http://localhost:3001/default/default-avatar.png";
  
  // If it's already a full URL
  if (avatarPath.startsWith('http')) {
    return avatarPath;
  }
  
  // If it starts with a slash, it's a server path
  if (avatarPath.startsWith('/')) {
    return `http://localhost:3001${avatarPath}`;
  }
  
  // If it's a relative path like ./default/1.jpg
  if (avatarPath.includes('default')) {
    // Extract the filename (1.jpg, 2.jpg, 3.jpg)
    const filename = avatarPath.split('/').pop();
    return `http://localhost:3001/default/${filename}`;
  }
  
  return "http://localhost:3001/default/default-avatar.png"; // Default fallback
};