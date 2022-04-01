import React, { useState } from "react";
import TabContent from "./TabContent";
import AddItems from "./AddItems";

const Tabs = () => {
    const [allTask, setAllTask] = useState([]);
    const [addItems, setAddItems] = useState("");
    const [addStatus, setAddStatus] = useState(false);

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

    return (
        <div className="todo-app">
            <h1>TODO Application</h1>
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

                    {/* <div className="completed-list">
                        {addStatus && <h2>Completed Tasks</h2>}
                        {allTask.map(
                            (x, i) =>
                                x.status === "Complete" && (
                                    <p key={`${x.item}-${i}`}>{x.item}</p>
                                )
                        )}
                    </div> */}
                </>
            )}
        </div>
    );
};

export default Tabs;
