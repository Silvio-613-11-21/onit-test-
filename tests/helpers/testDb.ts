import 'dotenv/config';
import { Client } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { sql } from 'drizzle-orm';

process.env.NODE_ENV = 'test';

export function testDbUrl() {
    const url = process.env.TEST_DATABASE_URL;

    if (!url) {
        throw new Error("TEST_DATABASE_URL не задан в .env");
    }

    return url.trim();
}

function databaseName(url: string) {
    return decodeURIComponent(new URL(url).pathname.replace(/^\//, ''));
}

export async function ensureTestDatabase() {
    const url = testDbUrl();
    const dbName = databaseName(url);
    const adminUrl = new URL(url);

    adminUrl.pathname = '/postgres';

    const client = new Client({ connectionString: adminUrl.toString() });
    await client.connect();

    try {
        const exists = await client.query('select 1 from pg_database where datname = $1', [dbName]);

        if (exists.rowCount === 0) {
            await client.query(`create database "${dbName.replace(/"/g, '""')}"`);
            console.log(`создана тестовая база ${dbName}`);
        } else {
            console.log(`тестовая база ${dbName} найдена, очищаю данные`);
        }
    } finally {
        await client.end();
    }
}

const db = drizzle(testDbUrl());

export async function applyMigrations() {
    await ensureTestDatabase();
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
