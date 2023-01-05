import { getDatabase, onValue, ref } from "firebase/database";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import firebaseApp from "../../firebase";
import { addTodoAction, deleteAllTodosAction, deleteTodoAction, getTodos, markTodoDoneAction, toggleLoading, updateTodoAction, } from "./todosSlice";

const Todos = () => {
  const inpRef = useRef();
  const [edit, setEdit] = useState({ status: false, id: "" });
  const [filter, setFilter] = useState([]);
  const state = useSelector((state) => state.todosReducer);
  const dispatch = useDispatch();
  const db = getDatabase(firebaseApp);

  useEffect(() => {
    dispatch(toggleLoading())
    const todoRef = ref(db, "/todos");
    onValue(todoRef, (snapshot) => {
      const todos = snapshot.val();
      const temp = [];
      for (let id in todos) {
        temp.push({ id, ...todos[id] });
      }
      setTimeout(() => {
        dispatch(getTodos(temp));
        dispatch(toggleLoading());
      }, 5);
    });
  }, [db]);

  const addTodo = () => {
    if (inpRef.current.value === "") {
      alert("Task cannot be empty");
    } else {
      const todo = {
        title: inpRef.current.value,
        done: false,
      };
      dispatch(addTodoAction(todo));
      inpRef.current.value = "";
    }
  };

  const deleteAllTodos = () => {
    dispatch(deleteAllTodosAction());
  };

  const deleteDoneTodos = () => {
    state.todos.forEach((ele) => {
      ele.done && dispatch(deleteTodoAction(ele.id));
    });
  };

  const deletePendingTodos = () => {
    state.todos.forEach((ele) => {
      !ele.done && dispatch(deleteTodoAction(ele.id));
    });
  };

  const updateTodo = () => {
    if (inpRef.current.value === "") {
      alert("Task cannot be empty");
    } else {
      dispatch(updateTodoAction({ id: edit.id, value: inpRef.current.value }));
      setEdit({});
      inpRef.current.value = "";
    }
  };

  return (
    <>
      <h3>Todo Input</h3>
      <div className="card p-3">
        <div className="input-group mb-3">
          <span
            className="input-group-text bg-primary bg-gradient"
            id="basic-addon1"
          >
            <i className="bi bi-journal-plus text-white fs-5"></i>
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="New Todo"
            aria-label="Username"
            aria-describedby="basic-addon1"
            ref={inpRef}
          />
        </div>
        <button
          className="w-100 bg-primary bg-gradient text-white fw-light border-0 rounded-2 py-2"
          onClick={edit.status ? updateTodo : addTodo}
        >
          {edit.status ? "Update Task" : "Add new task"}
        </button>
      </div>
      {state.loading?<span>Loading... <img className="loading" src='https://i.gifer.com/origin/3f/3face8da2a6c3dcd27cb4a1aaa32c926_w200.webp' alt="loading gif"/></span>:''}
      <h3 className="my-3">Todo List</h3>
      <span className="d-flex gap-3">
        <button
          className="bg-primary bg-gradient text-white fw-light border-0 rounded-2 py-2 flex-grow-1"
          onClick={() => setFilter([])}
        >
          All
        </button>
        <button
          className="bg-primary bg-gradient text-white fw-light border-0 rounded-2 py-2 flex-grow-1"
          onClick={() => setFilter(["done", true])}
        >
          Done
        </button>
        <button
          className="bg-primary bg-gradient text-white fw-light border-0 rounded-2 py-2 flex-grow-1"
          onClick={() => setFilter(["done", false])}
        >
          Pending
        </button>
      </span>
      <ul className="p-0">
        {state.todos.map((ele) => {
          if (ele[filter[0]] === filter[1]) {
            return (
              <li key={ele.id} className="card px-4 p-3 flex-row my-3 fs-5">
                {ele.done ? (
                  <span className="flex-grow-1 text-start text-danger text-decoration-line-through">
                    {ele.title}
                  </span>
                ) : (
                  <span className="flex-grow-1 text-start">{ele.title}</span>
                )}
                <span className="d-flex gap-3 align-items-center">
                  <input
                    onChange={() =>
                      dispatch(
                        markTodoDoneAction({
                          id: ele.id,
                          value: ele.done ? false : true,
                        })
                      )
                    }
                    checked={ele.done}
                    className="chkbox--green"
                    type="checkbox"
                  />
                  <i
                    className="bi bi-pencil-fill text-warning"
                    onClick={() => {
                      inpRef.current.value = ele.title;
                      setEdit({ status: true, id: ele.id });
                    }}
                  ></i>
                  <i
                    className="bi bi-trash-fill text-danger"
                    onClick={() => dispatch(deleteTodoAction(ele.id))}
                  ></i>
                </span>
              </li>
            );
          }
        })}
      </ul>
      <span className="d-flex gap-3">
        <button
          className="bg-danger bg-gradient text-white fw-light border-0 rounded-2 py-2 flex-grow-1"
          onClick={deleteDoneTodos}
        >
          Delete Done Tasks
        </button>
        <button
          className="bg-danger bg-gradient text-white fw-light border-0 rounded-2 py-2 flex-grow-1"
          onClick={deleteAllTodos}
        >
          Delete All Tasks
        </button>
        <button
          className="bg-danger bg-gradient text-white fw-light border-0 rounded-2 py-2 flex-grow-1"
          onClick={deletePendingTodos}
        >
          Delete Pending Tasks
        </button>
      </span>
    </>
  );
};

export default Todos;
