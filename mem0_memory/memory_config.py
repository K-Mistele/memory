import os
from mem0 import Memory # pip install mem0ai
from mem0.proxy.main import Mem0
from dotenv import load_dotenv

load_dotenv('.env')

NEO4J_PASSWORD = os.environ.get("NEO4J_PASSWORD")
POSTGRES_PASSWORD = os.environ.get("POSTGRES_PASSWORD")
OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")

# Define the custom prompt for entity extraction from information
custom_prompt = """
Please only extract entities containing information about the user, their preferences, instructions they have given you, and important facts related to the conversation.
Here are some few-shot examples:

Input: Hi.
Output: {"facts" : []}

Input: The weather is nice today.
Output: {"facts" : []}

Input: My order #12345 hasn't arrived yet.
Output: {"facts" : ["Order #12345 not received"]}

Input: I'm John Doe, and I'd like to return the shoes I bought last week.
Output: {"facts" : ["Customer name: John Doe", "Wants to return shoes", "Purchase made last week"]}

Input: I need you to rewrite this code in Typescript
Output: {"facts" : ["Prefers typescript"]}

Return the facts and customer information in a json format as shown above.

"""

mem0_config = {
    "graph_store": {
        "provider": "neo4j",
        "config": {
            "url": "neo4j://localhost:7687",
            "username": "neo4j",
            "password": NEO4J_PASSWORD
        },
        "custom_prompt": "Please only extract entities related to technologies and user preferences.",
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
    "embedder": {
        "provider": "openai",
        "config": {
            "model": "text-embedding-3-small",
            "embedding_dims": 2048,
            "api_key": OPENAI_API_KEY,
            "openai_base_url": "https://api.openai.com/v1",  # also for litellm
        }
    },
    "llm": {
        "provider": "openai", # or, litellm -- same parameters
        "config": {
            "model": "gpt-4o-mini",
            "temperature": 0.7,
            "api_key": OPENAI_API_KEY,
            "openai_base_url": "https://api.openai.com/v1", # also for litellm
        }
    },
    "custom_prompt": custom_prompt,
    # NOTE - vector store?
    "version": "v1.1"
}

Mem0Memory = Memory.from_config(config_dict=mem0_config)

Mem0Client = Mem0(config=mem0_config)