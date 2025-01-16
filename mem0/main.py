import os
from mem0 import Memory # pip install mem0ai
from dotenv import load_dotenv

load_dotenv('../.env')

NEO4J_PASSWORD = os.environ.get("NEO4J_PASSWORD")
POSTGRES_PASSWORD = os.environ.get("POSTGRES_PASSWORD")
OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")

m = Memory.from_config(config_dict={
    "graph_store": {
        "provider": "neo4j",
        "config": {
            "url": "neo4j://localhost:7687",
            "username": "neo4j",
            "password": NEO4J_PASSWORD
        },
    },
    "vector_store": {
        "provider": "pgvector",
        "config": {
            "user": "postgres",
            "password": POSTGRES_PASSWORD,
            "dbname": "postgres",
            "host": "localhost",
            "port": 5432,
            "diskann": True,
            "hnsw": False
        }
    },
    "llm": {
        "provider": "openai",
        "config": {
            "model": "text-embedding-3-small",
            "embedding_dims": 2048,
            "api_key": OPENAI_API_KEY,
            "openai_base_url": "https://api.openai.com/v1",  # also for litellm
        }
    },
    "embedder": {
        "provider": "openai", # or, litellm -- same parameters
        "config": {
            "model": "gpt-4o-mini",
            "temperature": "0.7",
            "api_key": OPENAI_API_KEY,
            "openai_base_url": "https://api.openai.com/v1", # also for litellm
        }
    },
    "custom_prompt": "Please only extract entities related to technologies and user preferences.",
    # NOTE - vector store?
    "version": "v1.1"
})