import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Todo {
  id: number;
  text: string;
  active: boolean;
  done: boolean;
}

export const todoApi = createApi({
  // reducerpath is the path to the reducer
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/" }),
  //tagTypes is the types of the tags
  tagTypes: ["Todos"],
  endpoints: (builder) => ({
    // endpoint is the name of the endpoint
    // query is the query to be sent to the server

    //builder typescript consist of Resulttype, and   queryArg
    //you can return something from RTKQueryBuilder
    getAll: builder.query<Todo[], void>({
      query: () => "todos",
      providesTags: [{ type: "Todos", id: "LIST" }],
    }),
    updateTodo: builder.mutation<Todo, Todo>({
      query(todo) {
        return {
          url: `todos/${todo.id}`,
          method: "PUT",
          body: todo,
        };
      },
      //invalidatedtags is the tags that will be invalidated (run) after the mutation
      //in this case, after the updateTodo mutation, the todo list will be invalidated (getall)
      invalidatesTags: [{ type: "Todos", id: "LIST" }],
    }),
    deleteTodo: builder.mutation<Todo, Todo>({
      query(todo) {
        return {
          url: `todos/${todo.id}`,
          method: "DELETE",
          body: todo,
        };
      },
      invalidatesTags: [{ type: "Todos", id: "LIST" }],
    }),
    addTodo: builder.mutation<string, string>({
      query(text) {
        return {
          url: `todos`,
          method: "POST",
          body: {
            text,
          },
        };
      },
      invalidatesTags: [{ type: "Todos", id: "LIST" }],
    }),
  }),
});
