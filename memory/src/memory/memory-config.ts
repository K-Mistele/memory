import {EmbeddingModel, LanguageModel} from 'ai'
import {AbstractVectorStore} from '../vector-store/abstract-vector-store'

export class MemoryStoreConfig {
    
    public readonly vectorStore: AbstractVectorStore
    public readonly llm: LanguageModel
    public readonly embedder: EmbeddingModel<string>    // I think this is correct?
    public readonly historyStore                        // TODO
    public readonly customPrompt?: string
    
    constructor() {
        
    }
}