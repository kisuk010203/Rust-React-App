import React, { useEffect, useState } from "react";
import { Page, PageHeader } from "../../common/ui/pages";
import {
    BasicButton,
    CancelButton,
    DeleteButton,
    EditButton,
    LeftButton,
    RightButton,
    SaveButton,
    ShortButton,
} from "../../common/ui/buttons";
import AddBoxIcon from "@material-ui/icons/AddBox";
import { TodoItem } from "./todos";
import TextField from "@material-ui/core/TextField";
import { TodoDeleteModal } from "./todo-delete-modal";

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
    const pageSize = 5;

    const [text, setText] = useState<string>("");
    const [creatingTodo, setCreatingTodo] = useState<boolean>(false);
    const [deletingTodo, setDeletingTodo] = useState<boolean>(false);
    const [deleteTargetTodo, setDeleteTargetTodo] = useState<Todo | null>(null);
    const [selectedTodo, editTodo] = useState<Todo | null>(null);
    const [todos, setTodos] = useState<PaginationResult<Todo>>();
    const [createdTodo, setCreatedTodo] = useState<Todo>();
    const [page, setPage] = useState<number>(0);
    const [numPages, setPages] = useState<number>(1);
    const [processing, setProcessing] = useState<boolean>(false);
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
        setDeletingTodo(false);
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
                    <div style={{ flex: 1, marginBottom: 20 }}>
                        <div style={{ flex: 1, marginBottom: 10 }}>
                            <span style={{ fontWeight: "bold" }}>
                                #{todo.id}
                            </span>
                        </div>
                        <TextField
                            fullWidth
                            id="text_edit"
                            label="Edit todo"
                            variant="filled"
                            value={text}
                            margin="normal"
                            onChange={(e) => setText(e.target.value)}
                        />

                        <SaveButton onClick={() => updateTodo(todo)} />
                        <CancelButton onClick={() => editTodo(null)} />
                    </div>
                ) : (
                    <div>
                        <TodoItem todo={todo} />
                        <div style={{ marginBottom: "20px" }}>
                            <EditButton onClick={() => editTodo(todo)} />
                            <DeleteButton
                                onClick={() => {
                                    setDeleteTargetTodo(todo);
                                    console.log(selectedTodo);
                                    setDeletingTodo(true);
                                }}
                            />
                        </div>
                    </div>
                )
            )}
            <div style={{ marginBottom: "20px" }}></div>
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
                    />
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
                    &nbsp;&nbsp;
                    <BasicButton
                        variant="outlined"
                        color="secondary"
                        onClick={() => {
                            setCreatingTodo(false);
                        }}
                    >
                        Cancel
                    </BasicButton>
                </div>
            ) : (
                (numPages === 0 || page === numPages - 1) && (
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
                )
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
            <TodoDeleteModal
                deleteModal={deletingTodo}
                setDeleteModal={setDeletingTodo}
                deleteTodo={() => {
                    deleteTodo(deleteTargetTodo!);
                }}
            />
        </Page>
    );
};
