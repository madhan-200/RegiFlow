import React from 'react';

const TaskItem = ({ task, onUpdate, onDelete }) => {
    const toggleComplete = () => {
        onUpdate(task.id, { ...task, completed: !task.completed });
    };

    return (
        <div className={`flex items-center justify-between p-4 mb-2 bg-white rounded shadow ${task.completed ? 'opacity-50' : ''}`}>
            <div className="flex items-center">
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={toggleComplete}
                    className="mr-4 h-5 w-5 text-blue-600"
                />
                <div>
                    <h3 className={`text-lg font-semibold ${task.completed ? 'line-through' : ''}`}>{task.title}</h3>
                    {task.description && <p className="text-gray-600">{task.description}</p>}
                </div>
            </div>
            <button
                onClick={() => onDelete(task.id)}
                className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
            >
                Delete
            </button>
        </div>
    );
};

export default TaskItem;
