import React from "react";
import PropTypes from "prop-types";

const ErrorComponent = ({ allTask, addItems }) => {
    return (
        <div className="error-message">
            {allTask.length === 0
                ? "Please end a valid task name"
                : allTask.find((x) => x.item === addItems)
                ? "Task is already added."
                : ""}
        </div>
    );
};

ErrorComponent.propTypes = {};

export default ErrorComponent;
