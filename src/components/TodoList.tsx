"use client";

import { useState } from "react";
import scss from "./TodoAdd.module.scss";
import {
  useDeleteAllTodoMutation,
  useDeleteTodoMutation,
  useEditTodoMutation,
  useGetTodosQuery,
} from "@/redux/api/todo";
import { SubmitHandler, useForm } from "react-hook-form";

const TodoList = () => {
  const { data, isLoading } = useGetTodosQuery();
  const [editTodoMutation] = useEditTodoMutation();
  const [deleteTodoMutation] = useDeleteTodoMutation();
  const [deleteAllTodo] = useDeleteAllTodoMutation();

  const [editId, setEditId] = useState<string | null>(null);

  const { register, handleSubmit, setValue } = useForm<ITodo>();

  const editTodo: SubmitHandler<ITodo> = async (data) => {
    if (editId) {
      await editTodoMutation({ _id: editId, data });
      setEditId(null);
    }
  };

  async function deleteAll() {
    return await deleteAllTodo();
  }

  return (
    <div className={scss.TodoListBlock}>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <button onClick={deleteAll}>delete all</button>
          <div>
            {data?.map((item) => (
              <div key={item._id}>
                <h1>TodoList</h1>
                {editId === item._id ? (
                  <>
                    <form
                      className={scss.formListBlock}
                      onSubmit={handleSubmit(editTodo)}
                    >
                      <input
                        placeholder="edit title"
                        type="text"
                        {...register("title", { required: true })}
                      />
                      <input
                        placeholder="edit description"
                        type="text"
                        {...register("description", { required: true })}
                      />
                      <button type="submit">save</button>
                    </form>
                  </>
                ) : (
                  <div className={scss.TodoListDiv}>
                    <div className={scss.TodoListDiv2}>
                      <h1>{item.title}</h1>
                      <p>{item.description}</p>
                      <img src={item.img} alt={item.title} />
                      <button onClick={() => deleteTodoMutation(item._id!)}>
                        remove
                      </button>
                      <button
                        onClick={() => {
                          setEditId(item._id!);
                          setValue("title", item.title);
                          setValue("description", item.description);
                        }}
                      >
                        edit
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default TodoList;
