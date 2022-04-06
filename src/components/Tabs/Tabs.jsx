import React, { useState, useRef } from "react";
import TabContent from "./TabContent";
import AddItems from "./AddItems";
import ErrorComponent from "../ErrorBoundary/ErrorComponent";

const Tabs = () => {
    const editInput = useRef([]);
    const addInput = useRef([]);
    const [allTask, setAllTask] = useState([]);
    const [addItems, setAddItems] = useState("");
    const [editItems, setEditItems] = useState("");
    const [addStatus, setAddStatus] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [existingTask, setExistingTask] = useState("");
    const [isCompletedTask, setIsCompletedTask] = useState(false);

    const handleAdd = (elem, e) => {
        e.preventDefault();
        const taskExist = allTask.findIndex((x) => x.item === elem);
        if (elem && taskExist < 0 && elem.trim() !== "") {
            setAllTask([...allTask, { status: "Active", item: elem }]);
            setAddItems("");
            setExistingTask("");
        } else {
            setAddItems("");
            const currentElem = editInput.current.findIndex(
                (x) => x.value === elem
            );
            editInput.current[currentElem].focus();
            setExistingTask(editInput.current[currentElem].value);
            setEditItems(elem);
            allTask[currentElem].status = "Edit";
            setDisabled(true);
            // alert("Task already exists !");
        }
    };

    const handleChange = (e) => {
        setAddItems(e.target.value);
    };

    const handleDeleteClick = (elem) => {
        const filteredList = allTask.filter((x) => x.item !== elem.item);
        setAllTask([...filteredList]);
        const deletedTask = filteredList.find((x) => x.status === "Complete");
        if (deletedTask) setAddStatus(true);
        else setAddStatus(false);
        setDisabled(false);
        document.querySelector('.add-items').disabled = false
        addInput.current.focus();
    };

    const handleDeleteAll = () => {
        var proceed = window.confirm("Are you sure you want to proceed?");
        if (proceed) {
            setAllTask([]);
        } else {
            setAllTask([...allTask]);
        }
    };

    const handleCompletedClick = (elem, e) => {
        updateTask(elem, e);
        setDisabled(false);
        checkStatusComplete();
    };

    const updateTask = (elem, e) => {
        const elemToUpdate = allTask.findIndex((x) => x.item === elem.item);
        allTask[elemToUpdate].status = e.target.value;
        setAllTask([...allTask]);
    };

    const checkStatusComplete = () => {
        const completeTask =
            allTask.findIndex((x) => x.status === "Complete") >= 0;
        if (completeTask) setAddStatus(true);
        else setAddStatus(false);
    };

    const handleCheckCompletedList = () => {
        setIsCompletedTask(true);
    };

    const handleBackToTodo = () => {
        setIsCompletedTask(false);
    };

    const handleEditClick = (elem) => {
        const elemToUpdate = allTask.findIndex((x) => x.item === elem.item);
        allTask[elemToUpdate].item = elem.item;
        allTask[elemToUpdate].status = "Edit";
        setAllTask([...allTask], ...editItems);
        setEditItems(elem.item);
        setDisabled(true);
        const currentElem = editInput.current.findIndex(
            (x) => x.value === elem.item
        );
        editInput.current[currentElem].focus();
    };

    const handleEditChange = (e) => {
        setEditItems(e.target.value);
    };

    const handleSave = (elem, e) => {
        const elemToUpdate = allTask.findIndex((x) => x.item === elem.item);
        allTask[elemToUpdate].item = editItems;
        allTask[elemToUpdate].status = "Save";
        setAllTask([...allTask]);
        setDisabled(false);
        document.querySelector('.add-items').disabled = false
        addInput.current.focus();
    };

    const handleKeyDown = (e) => {
        if (e.keyCode === 27) {
            setExistingTask("");
            const currentElem = editInput.current.findIndex(
                (x) => x.value === e.target.value
            );
            allTask[currentElem].status = "Active";
            setDisabled(false);
            document.querySelector('.add-items').disabled = false
            addInput.current.focus();
        }
    };

    return (
        <div className="todo-app">
            {!isCompletedTask ? (
                <>
                    <h1 className="heading">To-Do Application</h1>
                    <div className="todo-wrapper">
                        <AddItems
                            addItems={addItems}
                            disabled={disabled}
                            addInput={addInput}
                            onHandleAdd={handleAdd}
                            onHandleChange={handleChange}
                        />
                        {allTask.length > 0 && (
                            <>
                                {allTask.length > 1 ? (
                                    <button
                                        className="delete-btn"
                                        onClick={handleDeleteAll}
                                    >
                                        Delete All
                                    </button>
                                ) : (
                                    ""
                                )}
                                <TabContent
                                    allTask={allTask}
                                    disabled={disabled}
                                    editInput={editInput}
                                    editItems={editItems}
                                    onHandleSave={handleSave}
                                    existingTask={existingTask}
                                    onHandleKeyDown={handleKeyDown}
                                    onHandleEditClick={handleEditClick}
                                    onHandleEditChange={handleEditChange}
                                    onHandleDeleteClick={handleDeleteClick}
                                    onHandleCompletedClick={
                                        handleCompletedClick
                                    }
                                />
                                {addStatus && (
                                    <button
                                        onClick={handleCheckCompletedList}
                                        className="secondary-btn page-btn"
                                    >
                                        Completed task
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                </>
            ) : (
                <div className="completed-list">
                    <h2 className="heading">Completed Tasks</h2>
                    {!addStatus && (
                        <p>Oops, none of your tasks are completed !</p>
                    )}
                    <div className="content-playground">
                        {allTask.map(
                            (x, i) =>
                                x.status === "Complete" && (
                                    <div
                                        className="content-wrapper"
                                        key={`${x.item}-${i}`}
                                    >
                                        <p>{x.item}</p>
                                    </div>
                                )
                        )}
                    </div>
                    <button
                        onClick={handleBackToTodo}
                        className="secondary-btn page-btn"
                    >
                        Back to list
                    </button>
                </div>
            )}
        </div>
    );
};

export default Tabs;
