import db from './database.js';

// Log user login
export const logUserLogin = (req, res) => {
  try {
    const { uid, email, displayName, photoURL } = req.body;

    if (!uid || !email) {
      return res.status(400).json({ 
        error: 'Missing required fields: uid and email' 
      });
    }

    // Check if user exists
    const existingUser = db.prepare('SELECT * FROM users WHERE uid = ?').get(uid);

    if (existingUser) {
      // Update existing user
      const updateStmt = db.prepare(`
        UPDATE users 
        SET email = ?,
            display_name = ?,
            photo_url = ?,
            last_login = CURRENT_TIMESTAMP,
            login_count = login_count + 1
        WHERE uid = ?
      `);
      
      updateStmt.run(email, displayName, photoURL, uid);

      console.log(`✅ User login updated: ${email}`);
      
      return res.status(200).json({ 
        message: 'User login logged',
        isNewUser: false,
        loginCount: existingUser.login_count + 1
      });
    } else {
      // Insert new user
      const insertStmt = db.prepare(`
        INSERT INTO users (uid, email, display_name, photo_url)
        VALUES (?, ?, ?, ?)
      `);
      
      insertStmt.run(uid, email, displayName, photoURL);

      console.log(`✅ New user created: ${email}`);
      
      return res.status(201).json({ 
        message: 'New user created',
        isNewUser: true,
        loginCount: 1
      });
    }
  } catch (error) {
    console.error('❌ Error logging user:', error);
    return res.status(500).json({ 
      error: 'Failed to log user',
      details: error.message 
    });
  }
};

// Get all users (optional - for viewing)
export const getAllUsers = (req, res) => {
  try {
    const users = db.prepare('SELECT * FROM users ORDER BY last_login DESC').all();
    
    res.status(200).json({ 
      total: users.length,
      users 
    });
  } catch (error) {
    console.error('❌ Error fetching users:', error);
    res.status(500).json({ 
      error: 'Failed to fetch users',
      details: error.message 
    });
  }
};

// Get user stats
export const getUserStats = (req, res) => {
  try {
    const stats = {
      totalUsers: db.prepare('SELECT COUNT(*) as count FROM users').get().count,
      todayLogins: db.prepare(`
        SELECT COUNT(*) as count FROM users 
        WHERE DATE(last_login) = DATE('now')
      `).get().count,
      newUsersToday: db.prepare(`
        SELECT COUNT(*) as count FROM users 
        WHERE DATE(created_at) = DATE('now')
      `).get().count,
    };
    
    res.status(200).json(stats);
  } catch (error) {
    console.error('❌ Error fetching stats:', error);
    res.status(500).json({ 
      error: 'Failed to fetch stats',
      details: error.message 
    });
  }
};

