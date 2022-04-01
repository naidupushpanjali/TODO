import React, { useState } from "react";
import TabContent from "./TabContent";
import AddItems from "./AddItems";

const Tabs = () => {
    const [allTask, setAllTask] = useState([]);
    const [addItems, setAddItems] = useState("");
    const [addStatus, setAddStatus] = useState(false);
    const [isCompletedTask, setIsCompletedTask] = useState(false);

    const handleAdd = (elem, e) => {
        e.preventDefault();
        const taskExist = allTask.findIndex((x) => x.item === elem);
        if (elem && taskExist < 0) {
            setAllTask([...allTask, { status: "Active", item: elem }]);
            setAddItems("");
        }
    };

    const handleChange = (e) => {
        setAddItems(e.target.value);
    };

    const handleDeleteClick = (elem) => {
        const filteredList = allTask.filter((x) => x.item !== elem.item);
        setAllTask([...filteredList]);
        setAddStatus(false);
    };

    const handleCompletedClick = (elem, e) => {
        const elemToUpdate = allTask.findIndex((x) => x.item === elem.item);
        allTask[elemToUpdate].status = e.target.value;
        setAllTask([...allTask]);
        checkStatusComplete();
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

    return (
        <div className="todo-app">
            {!isCompletedTask ? (
                <>
                    <h1 className="heading">TODO Application</h1>
                    <AddItems
                        addItems={addItems}
                        onHandleAdd={handleAdd}
                        onHandleChange={handleChange}
                    />
                    {allTask.length > 0 && (
                        <>
                            <TabContent
                                allTask={allTask}
                                onHandleDeleteClick={handleDeleteClick}
                                onHandleCompletedClick={handleCompletedClick}
                            />
                            {addStatus && (
                                <button
                                    onClick={handleCheckCompletedList}
                                    className="secondary-btn page-btn"
                                >
                                    Completed tasks Lists
                                </button>
                            )}
                        </>
                    )}
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
                                    <div className="content-wrapper">
                                        <p key={`${x.item}-${i}`}>
                                            {i + 1}. {x.item}
                                        </p>
                                    </div>
                                )
                        )}
                    </div>
                    <button
                        onClick={handleBackToTodo}
                        className="secondary-btn page-btn"
                    >
                        Back to app
                    </button>
                </div>
            )}
        </div>
    );
};

export default Tabs;
