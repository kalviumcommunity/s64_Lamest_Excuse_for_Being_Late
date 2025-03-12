// // const express = require("express");
// // const router = express.Router();
// // const Excuse = require("../Model/excuseModel.js");
// // const authMiddleware = require("./middleware/authMiddleware.js");

// // // ✅ Create a new Excuse (POST)
// // router.post("/", authMiddleware, async (req, res) => {

// //     try {
// //       const { title, description } = req.body;
// //       const email = req.user.email; // Extract user email from token
  
// //       if (!title || !description) {
// //         return res.status(400).json({ error: "All fields are required" });
// //       }
  
// //       const newExcuse = new Excuse({
// //         title,
// //         description,
// //         email, // Save user email in database
// //       });
  
// //       await newExcuse.save();
// //       res.status(201).json({ message: "Excuse posted successfully" });
// //     } catch (error) {
// //       res.status(500).json({ error: "Server error" });
// //     }
// //   });

// // // ✅ Get all Excuses (GET)
// // router.get("/", async (req, res) => {
// //     try {
// //         const excuses = await Excuse.find();
// //         res.status(200).json(excuses);
// //     } catch (error) {
// //         res.status(500).json({ error: "Error fetching excuses" });
// //     }
// // });

// // // ✅ Get a single Excuse by ID (GET)
// // router.get("/:id", async (req, res) => {
// //     try {
// //         const excuse = await Excuse.findById(req.params.id);
// //         if (!excuse) return res.status(404).json({ error: "Excuse not found" });
// //         res.status(200).json(excuse);
// //     } catch (error) {
// //         res.status(500).json({ error: "Error fetching the excuse" });
// //     }
// // });

// // // ✅ Update an Excuse by ID (PUT)
// // router.put("/:id", async (req, res) => {
// //     try {
// //         const updatedExcuse = await Excuse.findByIdAndUpdate(
// //             req.params.id,
// //             req.body,
// //             { new: true, runValidators: true }
// //         );
// //         if (!updatedExcuse) return res.status(404).json({ error: "Excuse not found" });

// //         res.status(200).json({ message: "Excuse updated successfully!", updatedExcuse });
// //     } catch (error) {
// //         console.error("Update Error:", error);
// //         res.status(500).json({ error: "Error updating the excuse" });
// //     }
// // });

// // router.delete("/:id", authMiddleware, async (req, res) => {
// //     try {
// //       const excuse = await Excuse.findById(req.params.id);
// //       if (!excuse) return res.status(404).json({ message: "Excuse not found" });
  
// //       if (excuse.userEmail !== req.user.email) {
// //         return res.status(403).json({ message: "Unauthorized to delete this excuse" });
// //       }
  
// //       await excuse.deleteOne();
// //       res.json({ message: "Excuse deleted successfully" });
// //     } catch (error) {
// //       res.status(500).json({ error: error.message });
// //     }
// //   });
  

// // // ✅ Like an Excuse (PATCH)
// // router.patch("/:id/like", async (req, res) => {
// //     try {
// //         const excuse = await Excuse.findByIdAndUpdate(
// //             req.params.id,
// //             { $inc: { likes: 1 } },
// //             { new: true }
// //         );
// //         if (!excuse) return res.status(404).json({ error: "Excuse not found" });

// //         res.status(200).json({ message: "Excuse liked!", excuse });
// //     } catch (error) {
// //         res.status(500).json({ error: "Error liking the excuse" });
// //     }
// // });

// // // ✅ Dislike an Excuse (PATCH)
// // router.patch("/:id/dislike", async (req, res) => {
// //     try {
// //         const excuse = await Excuse.findByIdAndUpdate(
// //             req.params.id,
// //             { $inc: { dislikes: 1 } },
// //             { new: true }
// //         );
// //         if (!excuse) return res.status(404).json({ error: "Excuse not found" });

// //         res.status(200).json({ message: "Excuse disliked!", excuse });
// //     } catch (error) {
// //         res.status(500).json({ error: "Error disliking the excuse" });
// //     }
// // });

// // // ✅ Add a Comment (POST)
// // router.post("/:id/comment", async (req, res) => {
// //     try {
// //         const { text, user } = req.body;
// //         const excuse = await Excuse.findById(req.params.id);
// //         if (!excuse) return res.status(404).json({ error: "Excuse not found" });

// //         excuse.comments.push({ text, user });
// //         await excuse.save();

// //         res.status(201).json({ message: "Comment added!", excuse });
// //     } catch (error) {
// //         res.status(500).json({ error: "Error adding comment" });
// //     }
// // });

// // module.exports = router;

// const express = require("express");
// const router = express.Router();
// const mongoose = require("mongoose");
// const Excuse = require("../Model/excuseModel"); // Make sure this path is correct
// const User = require("../Model/authModel"); // For user references
// const authMiddleware = require("./middleware/authMiddleware.js");

// // GET all excuses
// router.get("/", async (req, res) => {
//   try {
//     const excuses = await Excuse.find()
//       .sort({ createdAt: -1 }) // Sort by newest first
//       .populate("user", "name avatar"); // Populate user details (only name and avatar)
    
//     res.json(excuses);
//   } catch (error) {
//     console.error("Error fetching excuses:", error);
//     res.status(500).json({ error: "Failed to fetch excuses" });
//   }
// });

// // GET a single excuse by ID
// router.get("/:id", async (req, res) => {
//   try {
//     if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
//       return res.status(400).json({ error: "Invalid excuse ID" });
//     }

//     const excuse = await Excuse.findById(req.params.id)
//       .populate("user", "name avatar");
    
//     if (!excuse) {
//       return res.status(404).json({ error: "Excuse not found" });
//     }
    
//     res.json(excuse);
//   } catch (error) {
//     console.error("Error fetching excuse:", error);
//     res.status(500).json({ error: "Failed to fetch excuse" });
//   }
// });

// // POST a new excuse
// router.post("/", async (req, res) => {
//   try {
//     const { title, content, category, userId } = req.body;
    
//     // Basic validation
//     if (!title || !content || !category) {
//       return res.status(400).json({ error: "Title, content, and category are required" });
//     }

//     // Find the user by the ID
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     // Create the new excuse
//     const newExcuse = new Excuse({
//       title,
//       content,
//       category,
//       user: userId, // Reference to the user
//       likes: [],
//       comments: []
//     });

//     await newExcuse.save();

//     // Populate user details before sending response
//     const populatedExcuse = await Excuse.findById(newExcuse._id)
//       .populate("user", "name avatar");

//     res.status(201).json(populatedExcuse);
//   } catch (error) {
//     console.error("Error creating excuse:", error);
//     res.status(500).json({ error: "Failed to create excuse" });
//   }
// });

// // UPDATE an excuse
// router.put("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { title, content, category } = req.body;
    
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ error: "Invalid excuse ID" });
//     }

//     // Find the excuse
//     const excuse = await Excuse.findById(id);
//     if (!excuse) {
//       return res.status(404).json({ error: "Excuse not found" });
//     }

//     // Check if the logged-in user is the owner of the excuse
//     // assuming req.user contains the decoded JWT user data
//     const userFromToken = req.user?.email;
//     const excuseUser = await User.findById(excuse.user);
    
//     if (!excuseUser || excuseUser.email !== userFromToken) {
//       return res.status(403).json({ error: "Not authorized to update this excuse" });
//     }

//     // Update the excuse
//     const updatedExcuse = await Excuse.findByIdAndUpdate(
//       id,
//       { title, content, category },
//       { new: true } // Return the updated document
//     ).populate("user", "name avatar");

//     res.json(updatedExcuse);
//   } catch (error) {
//     console.error("Error updating excuse:", error);
//     res.status(500).json({ error: "Failed to update excuse" });
//   }
// });

// // DELETE an excuse
// router.delete("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
    
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ error: "Invalid excuse ID" });
//     }

//     // Find the excuse
//     const excuse = await Excuse.findById(id);
//     if (!excuse) {
//       return res.status(404).json({ error: "Excuse not found" });
//     }

//     // Check if the logged-in user is the owner of the excuse
//     const userFromToken = req.user?.email;
//     const excuseUser = await User.findById(excuse.user);
    
//     if (!excuseUser || excuseUser.email !== userFromToken) {
//       return res.status(403).json({ error: "Not authorized to delete this excuse" });
//     }

//     // Delete the excuse
//     await Excuse.findByIdAndDelete(id);
    
//     res.json({ message: "Excuse deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting excuse:", error);
//     res.status(500).json({ error: "Failed to delete excuse" });
//   }
// });

// // LIKE an excuse
// router.post("/:id/like", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { userId } = req.body;
    
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ error: "Invalid excuse ID" });
//     }

//     // Find the excuse
//     const excuse = await Excuse.findById(id);
//     if (!excuse) {
//       return res.status(404).json({ error: "Excuse not found" });
//     }

//     // Check if the user already liked this excuse
//     const alreadyLiked = excuse.likes.includes(userId);

//     // Toggle like status
//     if (alreadyLiked) {
//       // Unlike - remove user ID from likes array
//       excuse.likes = excuse.likes.filter(id => id.toString() !== userId);
//     } else {
//       // Like - add user ID to likes array
//       excuse.likes.push(userId);
//     }

//     await excuse.save();
    
//     // Return updated excuse with populated user
//     const updatedExcuse = await Excuse.findById(id)
//       .populate("user", "name avatar");

//     res.json(updatedExcuse);
//   } catch (error) {
//     console.error("Error toggling like:", error);
//     res.status(500).json({ error: "Failed to toggle like status" });
//   }
// });

// // ADD a comment to an excuse
// router.post("/:id/comments", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { userId, text } = req.body;
    
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ error: "Invalid excuse ID" });
//     }

//     if (!text) {
//       return res.status(400).json({ error: "Comment text is required" });
//     }

//     // Find the excuse
//     const excuse = await Excuse.findById(id);
//     if (!excuse) {
//       return res.status(404).json({ error: "Excuse not found" });
//     }

//     // Create new comment
//     const newComment = {
//       user: userId,
//       text,
//       createdAt: new Date()
//     };

//     // Add comment to the excuse
//     excuse.comments.push(newComment);
//     await excuse.save();
    
//     // Populate user details in comments
//     const updatedExcuse = await Excuse.findById(id)
//       .populate("user", "name avatar")
//       .populate("comments.user", "name avatar");

//     res.status(201).json(updatedExcuse);
//   } catch (error) {
//     console.error("Error adding comment:", error);
//     res.status(500).json({ error: "Failed to add comment" });
//   }
// });

// // DELETE a comment from an excuse
// router.delete("/:excuseId/comments/:commentId", async (req, res) => {
//   try {
//     const { excuseId, commentId } = req.params;
    
//     if (!mongoose.Types.ObjectId.isValid(excuseId)) {
//       return res.status(400).json({ error: "Invalid excuse ID" });
//     }

//     // Find the excuse
//     const excuse = await Excuse.findById(excuseId);
//     if (!excuse) {
//       return res.status(404).json({ error: "Excuse not found" });
//     }

//     // Find the comment
//     const comment = excuse.comments.id(commentId);
//     if (!comment) {
//       return res.status(404).json({ error: "Comment not found" });
//     }

//     // Check if the logged-in user is the owner of the comment
//     const userFromToken = req.user?.email;
//     const commentUser = await User.findById(comment.user);
    
//     if (!commentUser || commentUser.email !== userFromToken) {
//       return res.status(403).json({ error: "Not authorized to delete this comment" });
//     }

//     // Remove the comment
//     comment.remove();
//     await excuse.save();
    
//     // Return updated excuse with populated user
//     const updatedExcuse = await Excuse.findById(excuseId)
//       .populate("user", "name avatar")
//       .populate("comments.user", "name avatar");

//     res.json(updatedExcuse);
//   } catch (error) {
//     console.error("Error deleting comment:", error);
//     res.status(500).json({ error: "Failed to delete comment" });
//   }
// });

// // GET excuses by user ID
// router.get("/user/:userId", async (req, res) => {
//   try {
//     const { userId } = req.params;
    
//     if (!mongoose.Types.ObjectId.isValid(userId)) {
//       return res.status(400).json({ error: "Invalid user ID" });
//     }

//     const excuses = await Excuse.find({ user: userId })
//       .sort({ createdAt: -1 })
//       .populate("user", "name avatar");
    
//     res.json(excuses);
//   } catch (error) {
//     console.error("Error fetching user excuses:", error);
//     res.status(500).json({ error: "Failed to fetch user excuses" });
//   }
// });

// module.exports = router;


const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Excuse = require("../Model/excuseModel"); // Make sure this path is correct
const User = require("../Model/authModel"); // For user references
const authMiddleware = require("./middleware/authMiddleware.js");

// GET all excuses
router.get("/", async (req, res) => {
  try {
    const excuses = await Excuse.find()
      .sort({ createdAt: -1 }) // Sort by newest first
      .populate("user", "name avatar"); // Populate user details (only name and avatar)
    
    res.json(excuses);
  } catch (error) {
    console.error("Error fetching excuses:", error);
    res.status(500).json({ error: "Failed to fetch excuses" });
  }
});

// GET a single excuse by ID
router.get("/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid excuse ID" });
    }

    const excuse = await Excuse.findById(req.params.id)
      .populate("user", "name avatar");
    
    if (!excuse) {
      return res.status(404).json({ error: "Excuse not found" });
    }
    
    res.json(excuse);
  } catch (error) {
    console.error("Error fetching excuse:", error);
    res.status(500).json({ error: "Failed to fetch excuse" });
  }
});

// POST a new excuse
router.post("/", async (req, res) => {
  try {
    const { title, description, userId } = req.body;
    
    // Basic validation
    if (!title || !description) {
      return res.status(400).json({ error: "Title and description are required" });
    }

    // Find the user by the ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Create the new excuse
    const newExcuse = new Excuse({
      title,
      description,
      user: userId, // Reference to the user
      likes: [],
      comments: []
    });

    await newExcuse.save();

    // Populate user details before sending response
    const populatedExcuse = await Excuse.findById(newExcuse._id)
      .populate("user", "name avatar");

    res.status(201).json(populatedExcuse);
  } catch (error) {
    console.error("Error creating excuse:", error);
    res.status(500).json({ error: "Failed to create excuse" });
  }
});

// UPDATE an excuse
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid excuse ID" });
    }

    // Find the excuse
    const excuse = await Excuse.findById(id);
    if (!excuse) {
      return res.status(404).json({ error: "Excuse not found" });
    }

    // Check if the logged-in user is the owner of the excuse
    // assuming req.user contains the decoded JWT user data
    const userFromToken = req.user?.email;
    const excuseUser = await User.findById(excuse.user);
    
    if (!excuseUser || excuseUser.email !== userFromToken) {
      return res.status(403).json({ error: "Not authorized to update this excuse" });
    }

    // Update the excuse
    const updatedExcuse = await Excuse.findByIdAndUpdate(
      id,
      { title, description },
      { new: true } // Return the updated document
    ).populate("user", "name avatar");

    res.json(updatedExcuse);
  } catch (error) {
    console.error("Error updating excuse:", error);
    res.status(500).json({ error: "Failed to update excuse" });
  }
});

// DELETE an excuse
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid excuse ID" });
    }

    // Find the excuse
    const excuse = await Excuse.findById(id);
    if (!excuse) {
      return res.status(404).json({ error: "Excuse not found" });
    }

    // Check if the logged-in user is the owner of the excuse
    const userFromToken = req.user?.email;
    const excuseUser = await User.findById(excuse.user);
    
    if (!excuseUser || excuseUser.email !== userFromToken) {
      return res.status(403).json({ error: "Not authorized to delete this excuse" });
    }

    // Delete the excuse
    await Excuse.findByIdAndDelete(id);
    
    res.json({ message: "Excuse deleted successfully" });
  } catch (error) {
    console.error("Error deleting excuse:", error);
    res.status(500).json({ error: "Failed to delete excuse" });
  }
});

// LIKE an excuse
router.post("/:id/like", async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid excuse ID" });
    }

    // Find the excuse
    const excuse = await Excuse.findById(id);
    if (!excuse) {
      return res.status(404).json({ error: "Excuse not found" });
    }

    // Check if the user already liked this excuse
    const alreadyLiked = excuse.likes.includes(userId);

    // Toggle like status
    if (alreadyLiked) {
      // Unlike - remove user ID from likes array
      excuse.likes = excuse.likes.filter(id => id.toString() !== userId);
    } else {
      // Like - add user ID to likes array
      excuse.likes.push(userId);
    }

    await excuse.save();
    
    // Return updated excuse with populated user
    const updatedExcuse = await Excuse.findById(id)
      .populate("user", "name avatar");

    res.json(updatedExcuse);
  } catch (error) {
    console.error("Error toggling like:", error);
    res.status(500).json({ error: "Failed to toggle like status" });
  }
});

// ADD a comment to an excuse
router.post("/:id/comments", async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, text } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid excuse ID" });
    }

    if (!text) {
      return res.status(400).json({ error: "Comment text is required" });
    }

    // Find the excuse
    const excuse = await Excuse.findById(id);
    if (!excuse) {
      return res.status(404).json({ error: "Excuse not found" });
    }

    // Create new comment
    const newComment = {
      user: userId,
      text,
      createdAt: new Date()
    };

    // Add comment to the excuse
    excuse.comments.push(newComment);
    await excuse.save();
    
    // Populate user details in comments
    const updatedExcuse = await Excuse.findById(id)
      .populate("user", "name avatar")
      .populate("comments.user", "name avatar");

    res.status(201).json(updatedExcuse);
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ error: "Failed to add comment" });
  }
});

// DELETE a comment from an excuse
router.delete("/:excuseId/comments/:commentId", async (req, res) => {
  try {
    const { excuseId, commentId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(excuseId)) {
      return res.status(400).json({ error: "Invalid excuse ID" });
    }

    // Find the excuse
    const excuse = await Excuse.findById(excuseId);
    if (!excuse) {
      return res.status(404).json({ error: "Excuse not found" });
    }

    // Find the comment
    const comment = excuse.comments.id(commentId);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    // Check if the logged-in user is the owner of the comment
    const userFromToken = req.user?.email;
    const commentUser = await User.findById(comment.user);
    
    if (!commentUser || commentUser.email !== userFromToken) {
      return res.status(403).json({ error: "Not authorized to delete this comment" });
    }

    // Remove the comment
    comment.remove();
    await excuse.save();
    
    // Return updated excuse with populated user
    const updatedExcuse = await Excuse.findById(excuseId)
      .populate("user", "name avatar")
      .populate("comments.user", "name avatar");

    res.json(updatedExcuse);
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ error: "Failed to delete comment" });
  }
});

// GET excuses by user ID
router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const excuses = await Excuse.find({ user: userId })
      .sort({ createdAt: -1 })
      .populate("user", "name avatar");
    
    res.json(excuses);
  } catch (error) {
    console.error("Error fetching user excuses:", error);
    res.status(500).json({ error: "Failed to fetch user excuses" });
  }
});

module.exports = router;