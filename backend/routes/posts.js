const express = require('express');
const router = express.Router();
const db = require('../db'); // اتصال قاعدة البيانات

// استرجاع المنشورات
router.get('/', async (req, res) => {
  try {
      const [posts] = await db.query('SELECT * FROM posts');
      res.status(200).json({ posts });
  } catch (err) {
      console.error('Error fetching posts:', err);
      res.status(500).json({ message: 'Error fetching posts', error: err.message });
  }
});


// إضافة منشور جديد
router.post('/', async (req, res) => {
    const { time, content, arrow_up, arrow_down, chat, pencilEdit, show_count } = req.body;
    const query = `
      INSERT INTO posts (time, content, arrow_up, arrow_down, chat, pencilEdit, show_count)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
  
    try {
      const [result] = await db.query(query, [
        time || null,
        content,
        arrow_up || 0,
        arrow_down || 0,
        chat || 0,
        pencilEdit || 'إضافة رد',
        show_count || 0,
      ]);
      res.status(201).json({ message: 'Post added successfully', postId: result.insertId });
    } catch (err) {
      res.status(500).json({ message: 'Error adding post', error: err.message });
    }
  });
  

// إضافة رد جديد
router.post('/:id/comments', (req, res) => {
  const { id } = req.params;
  const { text, user, parent_comment_id } = req.body;

  if (!user) {
    return res.status(400).json({ message: 'User must be logged in' });
  }

  const query = `
    INSERT INTO comments (post_id, parent_comment_id, text, user)
    VALUES (?, ?, ?, ?)
  `;
  db.query(query, [id, parent_comment_id || null, text, user], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error adding comment', error: err });
    }
    res.status(201).json({ message: 'Comment added successfully', commentId: result.insertId });
  });
});

// حذف منشور
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM posts WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error deleting post', error: err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json({ message: 'Post deleted successfully' });
  });
});

module.exports = router;
