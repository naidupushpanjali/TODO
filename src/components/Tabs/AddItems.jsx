import React from "react";
import PropTypes from "prop-types";

const AddItems = ({ onHandleAdd, addItems, onHandleChange }) => {
    return (
        <>
            <input type="text" value={addItems} onChange={onHandleChange} className="add-items"/>
            <button type="button" onClick={() => onHandleAdd(addItems)}>
                Add
            </button>
        </>
    );
};

AddItems.propTypes = {};

export default AddItems;
