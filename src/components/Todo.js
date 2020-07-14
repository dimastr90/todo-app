import React, { useEffect, useState } from "react";
import M from "materialize-css";
import TodoItem from "./TodoItem";
import SortBlock from "./SortBlock";

const Todo = (props) => {
    const [allTodos, setAllTodos] = useState(
        localStorage.getItem("todos")
            ? JSON.parse(localStorage.getItem("todos")).items
            : []
    );
    const [newToDoText, setNewToDoText] = useState("");
    const [currentSort, setCurrentSort] = useState("none");
    const [showDeleteButton, setShowDeleteButton] = useState(false);

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify({ items: allTodos }));
        setShowDeleteButton(allTodos.some((i) => i.done));
    }, [allTodos]);

    const todosSort = (todos) => {
        if (todos.length > 0) {
            switch (currentSort) {
                case "done":
                    return todos.filter((i) => i.done);
                case "active":
                    return todos.filter((i) => !i.done);
                default:
                    return todos;
            }
        }
    };

    const submitFormHandler = (e) => {
        e.preventDefault();
        if (newToDoText.length === 0) {
            M.toast({ html: "Input field is empty. Write your task, please." });
        } else {
            addTaskToStorage();
            setNewToDoText("");
        }
    };

    const addTaskToStorage = () => {
        if (!localStorage.getItem("todos")) {
            setAllTodos([{ todo: newToDoText, done: false }]);
        } else {
            const currentStorage = allTodos;
            if (
                currentStorage.filter((i) => i.todo === newToDoText).length !==
                0
            ) {
                M.toast({ html: "This todo is already exist!" });
            } else {
                setAllTodos([
                    ...currentStorage,
                    { todo: newToDoText, done: false },
                ]);
            }
        }
    };

    const onInputChange = (e) => {
        setNewToDoText(e.target.value);
    };

    const deleteTodosHandler = () => {
        setAllTodos([...allTodos.filter((i) => !i.done)]);
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col s12 offset-s0 m8 offset-m2 xl6 offset-xl3">
                    <div className="row">
                        <h1 className="center-align headText">ToDo App</h1>
                    </div>
                    <div className="row">
                        <form
                            onSubmit={submitFormHandler}
                            className="col s12 indigo darken-4 mainform"
                        >
                            <div className="row">
                                <div className="input-field col s12">
                                    <input
                                        id="todo"
                                        type="text"
                                        placeholder="What's need to do?"
                                        value={newToDoText}
                                        onChange={onInputChange}
                                        autoComplete="off"
                                    />
                                </div>
                                {allTodos.length > 0 &&
                                    todosSort(allTodos).map((i) => (
                                        <TodoItem
                                            key={'uniq-key-'+i.todo}
                                            todo={i.todo}
                                            done={i.done}
                                            setAllTodos={setAllTodos}
                                            allTodos={allTodos}
                                        />
                                    ))}
                            </div>
                            {
                                <SortBlock
                                    currentSort={currentSort}
                                    setCurrentSort={setCurrentSort}
                                />
                            }
                            {showDeleteButton && (
                                <a
                                    href="#/"
                                    onClick={deleteTodosHandler}
                                    className="delCompletedButton"
                                >
                                    Delete completed
                                </a>
                            )}
                        </form>
                    </div>
                    <div className='row'>
                        <div className="center-align">
                            <div className="authorTop">
                                <p>Designed and Coded By</p>
                            </div>
                            <div className="author">
                                <a href="https://github.com/dimastr90">Dima Stronov</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Todo;
