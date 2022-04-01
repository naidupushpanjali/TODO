import React from "react";
import PropTypes from "prop-types";
import { ReactComponent as Complete } from "../../assets/done.svg";
import { ReactComponent as Delete } from "../../assets/delete.svg";

const TabContent = ({
    allTask,
    onHandleDeleteClick,
    onHandleCompletedClick,
}) => {
    return (
        <div className="content-playground">
            {allTask &&
                allTask.map((elem, i) => (
                    <div key={`${elem.item}-${i}`} className="content-wrapper">
                        <p
                            className={
                                elem.status === "Complete" ? "complete" : ""
                            }
                        >
                            {i + 1}. {elem.item}
                        </p>
                        <div className="button-group">
                            {elem.status !== "Complete" ? (
                                <button
                                    onClick={(event) =>
                                        onHandleCompletedClick(elem, event)
                                    }
                                    value="Complete"
                                >
                                    <Complete
                                        className="complete-task"
                                        title="Complete"
                                    />
                                </button>
                            ) : (
                                <button
                                    onClick={(event) =>
                                        onHandleCompletedClick(elem, event)
                                    }
                                    value="TODO"
                                >
                                    TODO
                                </button>
                            )}
                            <button onClick={() => onHandleDeleteClick(elem)}>
                                <Delete
                                    className="delete-task"
                                    title="Delete"
                                />
                            </button>
                        </div>
                    </div>
                ))}
        </div>
    );
};

TabContent.propTypes = {
    allTask: PropTypes.array,
    onHandleDeleteClick: PropTypes.func,
    onHandleCompletedClick: PropTypes.func,
};

export default TabContent;
