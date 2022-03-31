import React from "react";
import PropTypes from "prop-types";

const TabContent = ({
    activeTabs,
    allTask,
    handleActiveCompletedClick,
    taskStatus,
}) => {
    return (
        <>
            {allTask &&
                allTask.map(
                    (elem) =>
                        elem.activeTab === activeTabs && (
                            <div key={elem.item} className={elem.activeTab}>
                                {elem.item}
                                <button
                                    onClick={() =>
                                        handleActiveCompletedClick(
                                            elem,
                                            (elem.activeTab = "Active")
                                        )
                                    }
                                >
                                    Active
                                </button>
                                <button
                                    onClick={() =>
                                        handleActiveCompletedClick(
                                            elem,
                                            (elem.activeTab = "Completed")
                                        )
                                    }
                                >
                                    Completed
                                </button>
                            </div>
                        )
                )}
        </>
    );
};

TabContent.propTypes = {
    activeTabs: PropTypes.string,
    tabName: PropTypes.array,
};

export default TabContent;
