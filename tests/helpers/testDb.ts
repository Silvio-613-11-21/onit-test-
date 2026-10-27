import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { sql } from 'drizzle-orm';

function normalize(url: string) {
    return url.trim().replace('postgresql+psycopg2', 'postgresql');
}

export function testDbUrl() {
    const testUrl = process.env.TEST_DATABASE_URL;

    if (!testUrl) {
        throw new Error("TEST_DATABASE_URL не задан в .env");
    }

    const test = new URL(normalize(testUrl));
    const main = process.env.DATABASE_URL ? new URL(normalize(process.env.DATABASE_URL)) : undefined;

    if (main && main.host === test.host && main.pathname === test.pathname) {
        throw new Error("TEST_DATABASE_URL указывает на ту же базу, что и DATABASE_URL");
    }

    return normalize(testUrl);
}

const db = drizzle(testDbUrl());

export async function applyMigrations() {
    await db.execute(sql`drop schema if exists drizzle cascade`);
    await db.execute(sql`drop schema if exists public cascade`);
    await db.execute(sql`create schema public`);
    await migrate(db, { migrationsFolder: './drizzle' });
}

export async function resetDatabase() {
    await db.execute(sql`truncate table block, note, task, subtask restart identity cascade`);
}

export async function closeDatabase() {
    await db.$client.end();
}
