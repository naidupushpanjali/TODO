import React, { useState } from "react";
import TabContent from "./TabContent";
import AddItems from "./AddItems";
import ErrorComponent from "../ErrorBoundary/ErrorComponent";

const Tabs = () => {
    const [allTask, setAllTask] = useState([]);
    const [addItems, setAddItems] = useState("");
    const [isError, setIsError] = useState(false);
    const [editItems, setEditItems] = useState("");
    const [addStatus, setAddStatus] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [isCompletedTask, setIsCompletedTask] = useState(false);

    const handleAdd = (elem, e) => {
        e.preventDefault();
        const taskExist = allTask.findIndex((x) => x.item === elem);
        if (elem && taskExist < 0 && elem.trim() !== "") {
            setAllTask([...allTask, { status: "Active", item: elem }]);
            setAddItems("");
        } else {
            setIsError(true);
            setAddItems(elem);
        }
    };

    const handleChange = (e) => {
        setAddItems(e.target.value);
    };

    const handleDeleteClick = (elem) => {
        const filteredList = allTask.filter((x) => x.item !== elem.item);
        setAllTask([...filteredList]);
        const deletedTask = filteredList.find(x => x.status === "Complete");
        if(deletedTask) setAddStatus(true);
        else setAddStatus(false);
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
                            onHandleAdd={handleAdd}
                            onHandleChange={handleChange}
                        />
                        {isError && (
                            <ErrorComponent
                                allTask={allTask}
                                addItems={addItems}
                            />
                        )}
                        {allTask.length > 0 && (
                            <>
                                <TabContent
                                    allTask={allTask}
                                    disabled={disabled}
                                    editItems={editItems}
                                    onHandleSave={handleSave}
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
