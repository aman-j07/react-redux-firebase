import { createSlice } from "@reduxjs/toolkit";
import { push, ref,getDatabase,remove,set } from "firebase/database";
import firebaseApp from '../../firebase'

const db=getDatabase(firebaseApp);

const initialState = {
  error: "",
  loading: false,
  todos: [],
};

export const todoSlice = createSlice({
  name: "todoSlice",
  initialState,
  reducers: {
    getTodos:(state,action)=>{
        state.todos=action.payload
    },
    addTodoAction:(state,action)=>{
        push(ref(db, "/todos"), action.payload);
    },
    deleteTodoAction:(state,action)=>{
        remove(ref(db, `/todos/${action.payload}`));
    },
    deleteAllTodosAction:()=>{
        remove(ref(db, "/todos"))
    },
    markTodoDoneAction:(state,action)=>{
        set(ref(db, `/todos/${action.payload.id}/done`), action.payload.value);
    },
    updateTodoAction:(state,action)=>{
        set(ref(db, `/todos/${action.payload.id}/title`), action.payload.value);
    },
    toggleLoading:(state)=>{
        state.loading=!state.loading;
    }
  }
});

export  const {getTodos,addTodoAction,deleteTodoAction,deleteAllTodosAction,markTodoDoneAction,updateTodoAction,toggleLoading} = todoSlice.actions;

export default todoSlice.reducer;
