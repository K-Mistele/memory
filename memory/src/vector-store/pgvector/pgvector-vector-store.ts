import {AbstractVectorStore} from '../abstract-vector-store'
import { PgDatabase} from 'drizzle-orm/pg-core'
import {sql} from 'drizzle-orm'

export type PgvectorIndex = 'HNSW' | 'DiskANN' | null

export class PgvectorVectorStore extends AbstractVectorStore {

    private db: PgDatabase<any>
    private index: PgvectorIndex
    private tableName: string

    /**
     * Create a PgvectorDataStore
     * @param database - your database created with drizzle() whether using postgres.js, node-postgres, or other
     * @param tableName - the name of the table to create
     * @param options - optional configurations
     */
    constructor(
        database: PgDatabase<any>,
        tableName: string,
        options?: {
            index?: PgvectorIndex
        }
    ) {
        super()
        this.db = database
        this.tableName = tableName
        this.index = options?.index ?? 'HNSW'
    }

    /**
     * Create a new collection (table) in postgres. Will initialize HNSW index.
     * @param embeddingModelDimensions
     */
    public override async createCol(embeddingModelDimensions: number) {

        console.log(`running query`)
        // Create a table
        await this.db.execute(
            sql`
            CREATE TABLE IF NOT EXISTS ${this.tableName} (
                id UUID PRIMARY KEY,
                vector vector(${embeddingModelDimensions}),
                payload JSONB
            )`
        )
        console.log(`table created`)

        // Set up the index
        if (this.index === 'DiskANN') {
            console.log(`creating index`)
            const [result] = await this.db.execute(sql`SELECT * FROM pg_extension WHERE extname = 'vectorscale';`)
            if (result) await this.db.execute(
                sql`
                 CREATE INDEX IF NOT EXISTS ${this.tableName}_vector_idx 
                 ON ${this.tableName}
                 USING diskann (vector);
                `
            )
            console.log(`index created`)
        }
        else if (this.index === 'HNSW') {
            console.log(`creating HNSW index`)
            await this.db.execute(sql`
                CREATE INDEX IF NOT EXISTS ${this.tableName}_vector_idx 
                ON ${this.tableName}
                USING hnsw (vector vector_l2_ops);
            `)
            console.log(`index created`)
        }
    }
}