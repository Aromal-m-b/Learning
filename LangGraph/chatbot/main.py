
from typing import TypedDict,Annotated
from langgraph.graph import StateGraph,END,START
from langgraph.graph.message import add_messages as add
from langchain_community.chat_models import ChatOllama

class State(TypedDict):
    messages:Annotated[list,add]

llm = ChatOllama(model = "mistral:instruct")


def chatbot(state:State):
    return { 
        'messages' : [llm.invoke(state['messages'])]
    }

builder = StateGraph(State)
builder.add_node('llm_node',chatbot)
builder.add_edge(START,'llm_node')
builder.add_edge('llm_node',END)

graph = builder.compile()

state = None

while True:
    in_message =  input("Human:- ")
    if in_message == "\\quit":
        break
    if state == None:
        state:State = {
            "messages":[{"role" : "user","content":in_message}]
        }
    else:
        state["messages"].append({"role" : "user","content":in_message})

    state = graph.invoke(state)
    print("Bot :- ",state["messages"][-1].content)
