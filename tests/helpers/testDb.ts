import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { sql } from 'drizzle-orm';

export function testDbUrl() {
    const url = process.env.TEST_DATABASE_URL;

    if (!url) {
        throw new Error("TEST_DATABASE_URL не задан в .env");
    }

    return url.trim().replace('postgresql+psycopg2', 'postgresql');
}

const db = drizzle(testDbUrl());

export async function applyMigrations() {
    await migrate(db, { migrationsFolder: './drizzle' });
}

export async function resetDatabase() {
    await db.execute(sql`truncate table block, note, task, subtask restart identity cascade`);
}

export async function closeDatabase() {
    await db.$client.end();
}
