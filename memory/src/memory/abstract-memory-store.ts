/**
 * @class MemoryClient - for interacting with the Memory system.
 */
export abstract class AbstractMemoryStore<MEMORY, MEMORY_HISTORY> {

    protected constructor() {}

    /**
     * Get a single memory by ID
     * @param memoryId
     * @protected
     */
    protected abstract get(memoryId: string): Promise<MEMORY>;

    /**
     * Get all memories
     * @protected
     */
    protected abstract getAll(): Promise<Array<MEMORY>>;

    /**
     * Update a single memory
     * @param memoryId
     * @param update
     * @protected
     */
    protected abstract update(memoryId: string, update: Partial<MEMORY>): Promise<MEMORY>

    /**
     * Delete a memory
     * @param memoryId
     * @protected
     */
    protected abstract delete(memoryId: string): Promise<void>


    protected abstract history(memoryId: string): Promise<Array<MEMORY_HISTORY>>
}