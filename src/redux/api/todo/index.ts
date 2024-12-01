import { api as index } from "..";

const ENDPOINT = "b58eef703175e7eed8b2ba35d5d24328/todo";

const api = index.injectEndpoints({
  endpoints: (builder) => ({
    getTodos: builder.query<TODO.GetTodosResponse, TODO.GetTodosRequest>({
      query: () => ({
        url: `${ENDPOINT}`,
        method: "GET",
      }),
      providesTags: ["todo"],
    }),
    postTodo: builder.mutation<TODO.PostTodoResponse, TODO.PostTodoRequest>({
      query: (data) => ({
        url: `${ENDPOINT}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["todo"],
    }),
    editTodo: builder.mutation<TODO.EditTodoResponse, TODO.EditTodoRequest>({
      query: ({ _id, data }) => ({
        url: `/${ENDPOINT}/${_id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["todo"],
    }),
    deleteTodo: builder.mutation<
      TODO.DeleteTodoResponse,
      TODO.DeleteTodoRequest
    >({
      query: (id) => ({
        url: `/${ENDPOINT}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["todo"],
    }),
    deleteAllTodo: builder.mutation<
      TODO.DeleteAllTodoResponse,
      TODO.DeleteAllTodoRequest
    >({
      query: () => ({
        url: `${ENDPOINT}`,
        method: "DELETE",
      }),
      invalidatesTags: ["todo"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  usePostTodoMutation,
  useEditTodoMutation,
  useDeleteTodoMutation,
  useDeleteAllTodoMutation,
} = api;
