import React, { useEffect, useState } from "react";
import { Page, PageHeader } from "../common/ui/pages";
import {
    BasicButton,
    DeleteButton,
    EditButton,
    LeftButton,
    RightButton,
} from "../common/ui/buttons";
import AddBoxIcon from "@material-ui/icons/AddBox";
import { TodoItem } from "../common/ui/todos";
import TextField from "@material-ui/core/TextField";

const TodoAPI = {
    get: async (page: number, size: number) =>
        await (await fetch(`/api/todos?page=${page}&page_size=${size}`)).json(),
    create: async (todo: string) =>
        await (
            await fetch("/api/todos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ text: todo }),
            })
        ).json(),
    delete: async (id: number) =>
        await fetch(`/api/todos/${id}`, { method: "DELETE" }),
    update: async (id: number, todo: string) =>
        await fetch(`/api/todos/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ text: todo }),
        }),
};

export const Todos = () => {
    const [text, setText] = useState<string>("");
    const [creatingTodo, setCreatingTodo] = useState<boolean>(false);
    const [selectedTodo, editTodo] = useState<Todo | null>(null);
    const [todos, setTodos] = useState<PaginationResult<Todo>>();
    const [createdTodo, setCreatedTodo] = useState<Todo>();
    const pageSize = 5;
    const [page, setPage] = useState<number>(0);
    const [numPages, setPages] = useState<number>(1);
    const [processing, setProcessing] = useState<boolean>(false);
    console.log(creatingTodo);
    console.log("Text  :", text);
    const createTodo = async (todo: string) => {
        setProcessing(true);
        let createdTodo = await TodoAPI.create(todo);
        let todos = await TodoAPI.get(page, pageSize);
        setTodos(todos);
        setCreatedTodo(createdTodo);
        setText("");
        setProcessing(false);
    };

    const updateTodo = async (todo: Todo) => {
        setProcessing(true);
        await TodoAPI.update(todo.id, text);
        setTodos(await TodoAPI.get(page, pageSize));
        setText("");
        editTodo(null);
        setProcessing(false);
    };

    const deleteTodo = async (todo: Todo) => {
        setProcessing(true);
        await TodoAPI.delete(todo.id);
        setTodos(await TodoAPI.get(page, pageSize));
        setProcessing(false);
    };

    useEffect(() => {
        setText(selectedTodo?.text || "");
    }, [selectedTodo]);

    // fetch on page change
    useEffect(() => {
        setProcessing(true);
        TodoAPI.get(page, pageSize).then((todos) => {
            setTodos(todos);
            setProcessing(false);
        });
    }, [page]);

    // update total number of pages
    useEffect(() => {
        if (todos) setPages(todos?.num_pages);
    }, [todos]);

    useEffect(() => {
        editTodo(null);
        if (page < 0) setPage(0);
        if (numPages != 0 && page >= numPages) setPage(numPages - 1);
    }, [page, numPages]);

    useEffect(() => {
        // go to the latest page when a new todo is created
        setPage(numPages - 1);
        setCreatedTodo(undefined);
    }, [createdTodo]);

    return (
        <Page>
            <PageHeader>Todos</PageHeader>
            {(!todos || todos.total_items === 0) && "No todos, create one!"}
            {todos?.items.map((todo) =>
                todo.id === selectedTodo?.id ? (
                    <div key="form" className="Form">
                        <div style={{ display: "flex" }}>
                            <input
                                style={{ flex: 1 }}
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            />
                            <button
                                disabled={processing}
                                style={{ height: "40px" }}
                                onClick={() => updateTodo(todo)}
                            >
                                Save
                            </button>
                            <button
                                disabled={processing}
                                style={{ height: "40px" }}
                                onClick={() => editTodo(null)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="Form">
                        <TodoItem todo={todo} />
                        <div>
                            <EditButton onClick={() => editTodo(todo)} />
                            <DeleteButton onClick={() => deleteTodo(todo)} />
                        </div>
                    </div>
                )
            )}
            <div style={{marginBottom: "20px"}}></div>
            {creatingTodo ? (
                <div>
                    <TextField
                        fullWidth
                        id="text"
                        label="New todo"
                        variant="filled"
                        value={text}
                        margin="normal"
                        onChange={(e) => {
                            setText(e.target.value);
                        }}
                    ></TextField>
                    <BasicButton
                        variant="outlined"
                        color="primary"
                        onClick={() => {
                            setCreatingTodo(false);
                            createTodo(text);
                        }}
                    >
                        Add
                    </BasicButton>
                </div>
            ) : (
                <div>
                    <BasicButton
                        className="Button"
                        variant="outlined"
                        startIcon={<AddBoxIcon />}
                        onClick={() => {
                            setCreatingTodo(true);
                        }}
                        // sx={{ height: "50px" }}
                    >
                        Add new Todo
                    </BasicButton>
                </div>
            )}
            <div className="Form">
                <div style={{ display: "flex" }}>
                    <LeftButton
                        onClick={() => setPage(page - 1)}
                        disabled={processing || page === 0}
                    />
                    <span style={{ flex: 1, textAlign: "center" }}>
                        Page {page + 1} of {numPages}
                    </span>
                    <RightButton
                        onClick={() => setPage(page + 1)}
                        disabled={processing || page === numPages - 1}
                    />
                </div>
            </div>
        </Page>
    );
};
