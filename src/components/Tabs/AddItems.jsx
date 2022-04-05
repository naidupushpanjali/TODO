import React from "react";
import PropTypes from "prop-types";

const AddItems = ({ onHandleAdd, addItems, onHandleChange, disabled }) => {
    return (
        <form onSubmit={(event) => onHandleAdd(addItems, event)}>
            <input
                autoFocus
                type="text"
                value={addItems}
                className="add-items"
                placeholder="Add Task name"
                onChange={onHandleChange}
                disabled={disabled ? true : false}
            />
            <button
                type="submit"
                className="secondary-btn add-btn"
                disabled={disabled ? true : false}
            >
                Add Task
            </button>
        </form>
    );
};

AddItems.propTypes = {
    onHandleAdd: PropTypes.func,
    addItems: PropTypes.string,
    onHandleChange: PropTypes.func,
};

export default AddItems;
