import React, { useState } from "react";
import TabContent from "./TabContent";
import TabList from "./TabList";
import AddItems from "./AddItems";

const Tabs = () => {
    const tabList = ["All", "Active", "Completed"];

    const [allTask, setAllTask] = useState([]);
    const [addItems, setAddItems] = useState("");
    const [activeTabs, setActiveTabs] = useState("All");
    const [taskStatus, setTaskStatus] = useState("All");

    const handleTabClick = (id) => {
        setActiveTabs(id);
    };

    const handleAdd = (elem) => {
        setAllTask([...allTask, { item: elem, activeTab: activeTabs }]);
    };

    const handleChange = (e) => {
        setAddItems(e.target.value);
    };

    const handleActiveCompletedClick = (elem) => {
        setTaskStatus(elem.activeTab);
        const filteredAllList = [...allTask].filter((x) => x.item !== elem.item);
        setAllTask([
            ...filteredAllList,
            { item: elem.item, activeTab: elem.activeTab },
        ]);
    };

    return (
        <div className="todo-app">
            <AddItems
                addItems={addItems}
                onHandleAdd={handleAdd}
                onHandleChange={handleChange}
            />
            <TabList
                tabName={tabList}
                activeTabs={activeTabs}
                onHandleTabClick={handleTabClick}
            />
            <TabContent
                allTask={allTask}
                activeTabs={activeTabs}
                taskStatus={taskStatus}
                handleActiveCompletedClick={handleActiveCompletedClick}
            />
        </div>
    );
};

export default Tabs;
