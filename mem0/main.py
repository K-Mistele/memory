import os
from mem0 import Memory # pip install mem0ai
from dotenv import load_dotenv

load_dotenv('../.env')

m = Memory.from_config(config_dict={
    "graph_store": {
        "provider": "neo4j",
        "config": {
            "url": "neo4j://localhost:7687",
            "username": "neo4j",
            "password": os.environ.get("NEO4J_PASSWORD")
        },
    },
    "vector_store": {
        "provider": "pgvector",
        "config": {
            "user": "postgres",
            "password": "password",
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

        }
    },
    "embedder": {
        "provider": "openai",
        "config": {

        }
    },
    "custom_prompt": "Please only extract entities related to technologies and user preferences.",
    # NOTE - vector store?
    "version": "v1.1"
})