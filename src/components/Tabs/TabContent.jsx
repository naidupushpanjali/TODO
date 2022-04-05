import React from "react";
import PropTypes from "prop-types";
import { ReactComponent as Complete } from "../../assets/done.svg";
import { ReactComponent as Delete } from "../../assets/delete.svg";
import { ReactComponent as Edit } from "../../assets/edit.svg";
import { ReactComponent as Save } from "../../assets/save.svg";

const TabContent = ({
    allTask,
    disabled,
    editItems,
    onHandleSave,
    onHandleEditClick,
    onHandleEditChange,
    onHandleDeleteClick,
    onHandleCompletedClick,
}) => {
    return (
        <div className="content-playground">
            <table>
                <tbody>
                    {allTask &&
                        allTask.map((elem, i) => (
                            <tr key={`${elem.item}-${i}`}>
                                <td>
                                    <div className="content-wrapper">
                                        <textarea
                                            value={
                                                elem.status === "Edit"
                                                    ? editItems
                                                    : elem.item
                                            }
                                            readOnly={
                                                elem.status === "Edit"
                                                    ? false
                                                    : true
                                            }
                                            className={
                                                elem.status === "Complete"
                                                    ? "complete"
                                                    : elem.status === "Edit"
                                                    ? "focus"
                                                    : ""
                                            }
                                            onChange={(event) =>
                                                onHandleEditChange(event)
                                            }
                                            rows={
                                                elem.item.split(" ").length < 20
                                                    ? "2"
                                                    : "5"
                                            }
                                            cols="50"
                                            maxLength="200"
                                        />
                                        <div className="button-group">
                                            {elem.status !== "Complete" ? (
                                                <button
                                                    onClick={(event) =>
                                                        onHandleCompletedClick(
                                                            elem,
                                                            event
                                                        )
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
                                                        onHandleCompletedClick(
                                                            elem,
                                                            event
                                                        )
                                                    }
                                                    value="TODO"
                                                >
                                                    TODO
                                                </button>
                                            )}
                                            <button
                                                onClick={() =>
                                                    onHandleDeleteClick(elem)
                                                }
                                                value="Delete"
                                            >
                                                <Delete
                                                    className="delete-task"
                                                    title="Delete"
                                                />
                                            </button>
                                            {elem.status !== "Complete" &&
                                                (elem.status === "Edit" ? (
                                                    <button
                                                        onClick={(event) =>
                                                            onHandleSave(
                                                                elem,
                                                                event
                                                            )
                                                        }
                                                        value="Save"
                                                    >
                                                        <Save
                                                            className="save-task"
                                                            title="Save"
                                                        />
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() =>
                                                            onHandleEditClick(
                                                                elem
                                                            )
                                                        }
                                                        value="Edit"
                                                        disabled={
                                                            disabled
                                                                ? true
                                                                : false
                                                        }
                                                    >
                                                        <Edit
                                                            className="edit-task"
                                                            title="Edit"
                                                        />
                                                    </button>
                                                ))}
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

TabContent.propTypes = {
    allTask: PropTypes.array,
    onHandleDeleteClick: PropTypes.func,
    onHandleCompletedClick: PropTypes.func,
};

export default TabContent;
