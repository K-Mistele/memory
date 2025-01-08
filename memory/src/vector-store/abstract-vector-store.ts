export interface OutputData {
    id?: string
    score?: number
    payload?: any
}

export abstract class AbstractVectorStore<PAYLOAD_TYPE = any, FILTER_TYPE = any> {

    protected constructor(){}

    abstract createCol(vectorSize: number): Promise<void>;

    abstract insert(name: string, vectors: number[][], payloads?: PAYLOAD_TYPE[], ids?: string[]): Promise<void>;

    abstract search(name: string, query: number[], limit?: number, filters?: FILTER_TYPE): Promise<Array<{
        id: string;
        score: number;
        payload?: PAYLOAD_TYPE
    }>>;

    abstract delete(name: string, vectorId: string): Promise<void>;

    abstract update(name: string, vectorId: string, vector?: number[], payload?: Partial<PAYLOAD_TYPE>): Promise<void>;

    abstract get(name: string, vectorId: string): Promise<{
        id: string;
        vector: number[];
        payload?: PAYLOAD_TYPE
    } | null>;

    abstract listCols(): Promise<string[]>;

    abstract deleteCol(name: string): Promise<void>;

    abstract colInfo(name: string): Promise<{ vectorSize: number; distance: string; count: number }>;

    abstract list(filters?: FILTER_TYPE, limit?: number): Promise<Array<{
        id: string;
        vector: number[];
        payload?: PAYLOAD_TYPE
    }>>;
}