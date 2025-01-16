from mem0_memory.memory_config import Mem0Memory, Mem0Client

def main():
    print('Adding memory')
    Mem0Memory.add("Rewrite that, but more concisely.", user_id='andrew', agent_id='kendra')
    print('getting memory')
    results = Mem0Memory.search("What is the preferred runtime at this company?", user_id="andrew", agent_id='kendra')
    print(results)

    print(Mem0Memory.get_all(user_id='andrew'))


if __name__ == '__main__':
    main()