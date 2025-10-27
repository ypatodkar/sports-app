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
    const totalQueriesResult = await pool.query('SELECT COUNT(*) as count FROM search_queries');
    const todayQueriesResult = await pool.query(`
      SELECT COUNT(*) as count FROM search_queries 
      WHERE DATE(created_at) = CURRENT_DATE
    `);
    
    const stats = {
      totalUsers: parseInt(totalUsersResult.rows[0].count),
      todayLogins: parseInt(todayLoginsResult.rows[0].count),
      newUsersToday: parseInt(newUsersTodayResult.rows[0].count),
      totalQueries: parseInt(totalQueriesResult.rows[0].count),
      todayQueries: parseInt(todayQueriesResult.rows[0].count),
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

// ========================================
// SEARCH QUERY TRACKING
// ========================================

// Log a search query
export const logSearchQuery = async (req, res) => {
  try {
    const { uid, sport, query, hasError } = req.body;

    // uid is optional now (for anonymous users)
    if (!sport || !query) {
      return res.status(400).json({
        error: 'Missing required fields: sport and query'
      });
    }

    // Insert query (uid can be null for anonymous users)
    await pool.query(`
      INSERT INTO search_queries (user_uid, sport, query_text, has_error)
      VALUES ($1, $2, $3, $4)
    `, [uid || null, sport, query, hasError || false]);

    const logMessage = uid 
      ? `✅ Query logged: ${query} for ${sport} by user ${uid}`
      : `✅ Anonymous query logged: ${query} for ${sport}`;
    console.log(logMessage);

    return res.status(201).json({
      message: 'Query logged successfully'
    });
  } catch (error) {
    console.error('❌ Error logging query:', error);
    return res.status(500).json({
      error: 'Failed to log query',
      details: error.message
    });
  }
};

// Get popular queries (most searched)
export const getPopularQueries = async (req, res) => {
  try {
    const { sport, limit = 10 } = req.query;

    let query = `
      SELECT 
        query_text,
        sport,
        COUNT(*) as search_count,
        MAX(created_at) as last_searched
      FROM search_queries
      WHERE has_error = false
    `;

    const params = [];

    if (sport) {
      query += ` AND sport = $1`;
      params.push(sport);
    }

    query += `
      GROUP BY query_text, sport
      ORDER BY search_count DESC
      LIMIT $${params.length + 1}
    `;
    params.push(parseInt(limit));

    const result = await pool.query(query, params);

    res.status(200).json({
      total: result.rows.length,
      queries: result.rows
    });
  } catch (error) {
    console.error('❌ Error fetching popular queries:', error);
    res.status(500).json({
      error: 'Failed to fetch popular queries',
      details: error.message
    });
  }
};

// Get a user's search history
export const getUserSearchHistory = async (req, res) => {
  try {
    const { uid } = req.params;
    const { limit = 20 } = req.query;

    if (!uid) {
      return res.status(400).json({ error: 'User UID is required' });
    }

    const result = await pool.query(`
      SELECT 
        id,
        sport,
        query_text,
        has_error,
        created_at
      FROM search_queries
      WHERE user_uid = $1
      ORDER BY created_at DESC
      LIMIT $2
    `, [uid, parseInt(limit)]);

    res.status(200).json({
      total: result.rows.length,
      history: result.rows
    });
  } catch (error) {
    console.error('❌ Error fetching user search history:', error);
    res.status(500).json({
      error: 'Failed to fetch search history',
      details: error.message
    });
  }
};

// Get query analytics
export const getQueryAnalytics = async (req, res) => {
  try {
    // Total queries by sport
    const queriesBySport = await pool.query(`
      SELECT 
        sport,
        COUNT(*) as total_queries,
        COUNT(DISTINCT user_uid) as unique_users
      FROM search_queries
      GROUP BY sport
      ORDER BY total_queries DESC
    `);

    // Recent queries
    const recentQueries = await pool.query(`
      SELECT 
        sq.query_text,
        sq.sport,
        sq.created_at,
        u.email as user_email,
        u.display_name as user_name
      FROM search_queries sq
      JOIN users u ON sq.user_uid = u.uid
      ORDER BY sq.created_at DESC
      LIMIT 20
    `);

    // Most active users
    const activeUsers = await pool.query(`
      SELECT 
        u.email,
        u.display_name,
        COUNT(sq.id) as query_count
      FROM users u
      JOIN search_queries sq ON u.uid = sq.user_uid
      GROUP BY u.uid, u.email, u.display_name
      ORDER BY query_count DESC
      LIMIT 10
    `);

    // Queries over time (last 7 days)
    const queriesOverTime = await pool.query(`
      SELECT 
        DATE(created_at) as date,
        COUNT(*) as query_count
      FROM search_queries
      WHERE created_at >= CURRENT_DATE - INTERVAL '7 days'
      GROUP BY DATE(created_at)
      ORDER BY date DESC
    `);

    res.status(200).json({
      queriesBySport: queriesBySport.rows,
      recentQueries: recentQueries.rows,
      activeUsers: activeUsers.rows,
      queriesOverTime: queriesOverTime.rows
    });
  } catch (error) {
    console.error('❌ Error fetching query analytics:', error);
    res.status(500).json({
      error: 'Failed to fetch analytics',
      details: error.message
    });
  }
};

