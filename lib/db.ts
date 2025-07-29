import Database from 'better-sqlite3';
import { User } from '@/types/user';
import path from 'path';

interface UserRecord {
  phone: string;
  user: User;
  createdAt: string;
}

interface UserRow {
  phone: string;
  user_data: string;
  created_at: string;
}

interface TokenRow {
  phone: string;
}

class SQLiteDatabase {
  private db: Database.Database;

  constructor() {
    const dbPath = path.join(process.cwd(), 'data', 'auth.db');
    this.db = new Database(dbPath);
    this.initTables();
  }

  private initTables() {
    // Create users table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        phone TEXT PRIMARY KEY,
        user_data TEXT NOT NULL,
        created_at TEXT NOT NULL
      )
    `);

    // Create tokens table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS tokens (
        token TEXT PRIMARY KEY,
        phone TEXT NOT NULL,
        created_at TEXT NOT NULL,
        FOREIGN KEY (phone) REFERENCES users (phone)
      )
    `);
  }

  async saveUser(phone: string, user: User): Promise<void> {
    const stmt = this.db.prepare(`
      INSERT OR REPLACE INTO users (phone, user_data, created_at)
      VALUES (?, ?, ?)
    `);
    
    stmt.run(phone, JSON.stringify(user), new Date().toISOString());
  }

  async getUserByPhone(phone: string): Promise<UserRecord | null> {
    const stmt = this.db.prepare(`
      SELECT phone, user_data, created_at FROM users WHERE phone = ?
    `);
    
    const row = stmt.get(phone) as UserRow | undefined;
    if (!row) return null;

    return {
      phone: row.phone,
      user: JSON.parse(row.user_data),
      createdAt: row.created_at
    };
  }

  async saveToken(token: string, phone: string): Promise<void> {
    const stmt = this.db.prepare(`
      INSERT OR REPLACE INTO tokens (token, phone, created_at)
      VALUES (?, ?, ?)
    `);
    
    stmt.run(token, phone, new Date().toISOString());
  }

  async getPhoneByToken(token: string): Promise<string | null> {
    const stmt = this.db.prepare(`
      SELECT phone FROM tokens WHERE token = ?
    `);
    
    const row = stmt.get(token) as TokenRow | undefined;
    return row ? row.phone : null;
  }

  async deleteToken(token: string): Promise<void> {
    const stmt = this.db.prepare(`
      DELETE FROM tokens WHERE token = ?
    `);
    
    stmt.run(token);
  }

  async getAllUsers(): Promise<UserRecord[]> {
    const stmt = this.db.prepare(`
      SELECT phone, user_data, created_at FROM users
    `);
    
    const rows = stmt.all() as UserRow[];
    return rows.map(row => ({
      phone: row.phone,
      user: JSON.parse(row.user_data),
      createdAt: row.created_at
    }));
  }

  close() {
    this.db.close();
  }
}

export const db = new SQLiteDatabase(); 