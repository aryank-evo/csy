// const { Pool } = require('pg');

async function updateAdminUser() {
  const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'real_estate_db',
    password: '1572001',
    port: 5432,
  });

  try {
    // Check if admin user exists
    const res = await pool.query('SELECT id, name, email, isAdmin FROM users WHERE email = $1', ['admin@example.com']);
    
    if (res.rows.length > 0) {
      console.log('Admin user found:', res.rows[0]);
      
      // Update isAdmin flag to true
      await pool.query('UPDATE users SET isAdmin = true WHERE email = $1', ['admin@example.com']);
      console.log('Updated isAdmin flag to true');
      
      // Verify the update
      const updatedRes = await pool.query('SELECT id, name, email, isAdmin FROM users WHERE email = $1', ['admin@example.com']);
      console.log('Updated admin user:', updatedRes.rows[0]);
    } else {
      console.log('Admin user not found');
    }
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await pool.end();
  }
}

updateAdminUser();