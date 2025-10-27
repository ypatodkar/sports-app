import pool from './database.js';

// Log user login
export const logUserLogin = async (req, res) => {
  try {
    const { uid, email, displayName, photoURL } = req.body;

    if (!uid || !email) {
      return res.status(400).json({ 
        error: 'Missing required fields: uid and email' 
      });
    }

    // Check if user exists
    const existingUserResult = await pool.query(
      'SELECT * FROM users WHERE uid = $1',
      [uid]
    );

    if (existingUserResult.rows.length > 0) {
      const existingUser = existingUserResult.rows[0];
      
      // Update existing user
      await pool.query(`
        UPDATE users 
        SET email = $1,
            display_name = $2,
            photo_url = $3,
            last_login = CURRENT_TIMESTAMP,
            login_count = login_count + 1
        WHERE uid = $4
      `, [email, displayName, photoURL, uid]);

      console.log(`✅ User login updated: ${email}`);
      
      return res.status(200).json({ 
        message: 'User login logged',
        isNewUser: false,
        loginCount: existingUser.login_count + 1
      });
    } else {
      // Insert new user
      await pool.query(`
        INSERT INTO users (uid, email, display_name, photo_url)
        VALUES ($1, $2, $3, $4)
      `, [uid, email, displayName, photoURL]);

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
export const getAllUsers = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users ORDER BY last_login DESC');
    
    res.status(200).json({ 
      total: result.rows.length,
      users: result.rows
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
export const getUserStats = async (req, res) => {
  try {
    const totalUsersResult = await pool.query('SELECT COUNT(*) as count FROM users');
    const todayLoginsResult = await pool.query(`
      SELECT COUNT(*) as count FROM users 
      WHERE DATE(last_login) = CURRENT_DATE
    `);
    const newUsersTodayResult = await pool.query(`
      SELECT COUNT(*) as count FROM users 
      WHERE DATE(created_at) = CURRENT_DATE
    `);
    
    const stats = {
      totalUsers: parseInt(totalUsersResult.rows[0].count),
      todayLogins: parseInt(todayLoginsResult.rows[0].count),
      newUsersToday: parseInt(newUsersTodayResult.rows[0].count),
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

