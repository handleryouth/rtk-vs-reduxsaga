import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "@redux-saga/core";

import { Todo, getTodos, createTodo, updateTodo, deleteTodo } from "./api";

import { put, takeEvery } from "redux-saga/effects";

function* getTodosAction() {
  const todos: Todo[] = yield getTodos();
  // yield put will send an action to the store when the promise is resolved/succeeded
  yield put({ type: "TODOS_FETCH_SUCCEEDED", payload: todos });
}

function* updateTodoAction({
  payload,
}: {
  type: "UPDATE_TODO_REQUESTED";
  payload: Todo;
}) {
  yield updateTodo(payload);
  yield put({ type: "TODOS_FETCH_REQUESTED" });
}

function* createTodoAction({
  payload,
}: {
  type: "CREATE_TODO_REQUESTED";
  payload: string;
}) {
  yield createTodo(payload);
  yield put({ type: "TODOS_FETCH_REQUESTED" });
}

function* deleteTodoAction({
  payload,
}: {
  type: "DELETE_TODO_REQUESTED";
  payload: Todo;
}) {
  yield deleteTodo(payload);
  yield put({ type: "TODOS_FETCH_REQUESTED" });
}

function* rootSaga() {
  //this code means that every time the action type is "TODOS_FETCH_REQUESTED", then the getTodosAction function will be called
  yield takeEvery("TODOS_FETCH_REQUESTED", getTodosAction);
  yield takeEvery("UPDATE_TODO_REQUESTED", updateTodoAction);
  yield takeEvery("DELETE_TODO_REQUESTED", deleteTodoAction);
  yield takeEvery("CREATE_TODO_REQUESTED", createTodoAction);
}

const reducer = (
  state: Todo[] = [],
  action: { type: "TODOS_FETCH_SUCCEEDED"; payload: Todo[] }
) => {
  switch (action.type) {
    case "TODOS_FETCH_SUCCEEDED":
      return action.payload;
    default:
      return state;
  }
};

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export const selectTodos = (state: Todo[]) => state;

export const fetchTodos = () => ({ type: "TODOS_FETCH_REQUESTED" });

export const toggleTodo = (todo: Todo) => ({
  type: "UPDATE_TODO_REQUESTED",
  payload: { ...todo, done: !todo.done },
});

export const removeTodo = (todo: Todo) => ({
  type: "DELETE_TODO_REQUESTED",
  payload: todo,
});

export const addTodo = (text: string) => ({
  type: "CREATE_TODO_REQUESTED",
  payload: text,
});
