const { Pool } = require('pg');

async function checkUsersTable() {
  const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'real_estate_db',
    password: '1572001',
    port: 5432,
  });

  try {
    const res = await pool.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'users'
      ORDER BY ordinal_position
    `);
    
    console.log('Users table columns:');
    res.rows.forEach((row: any) => {
      console.log(`${row.column_name}: ${row.data_type}`);
    });
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await pool.end();
  }
}

checkUsersTable();