import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

const db_url: string = process.env.DB_URL || "";
const client = postgres(db_url)
const db = drizzle(client)

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    username: text('username').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert; 

export async function getAllusers(): Promise<User[]> {
    return await db.select().from(users)
}

export async function insertUser(user: NewUser): Promise<User[]> {
  return db.insert(users).values(user).returning();
}