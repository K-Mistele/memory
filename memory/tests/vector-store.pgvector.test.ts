import {test, describe, beforeEach, expect} from 'bun:test'
import {drizzle} from 'drizzle-orm/node-postgres'
import {PgvectorVectorStore} from '../src/vector-store/pgvector/pgvector-vector-store'

const db = drizzle(
    `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@localhost:5432/postgres`
)

describe('Postgres vector store tests', async () => {

    let pgvectorStore: PgvectorVectorStore
    beforeEach(async () => {

        pgvectorStore = new PgvectorVectorStore(db, 'example_column', {index: 'HNSW'})
    })

    test('Creating a column should not error', async () => {

        expect(async () => {
            await pgvectorStore.createCol(2000)
        }).not.toThrow()
    })
})