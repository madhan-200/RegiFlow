import React, { useEffect, useState } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../services/api';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await getTasks();
            setTasks(response.data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    const handleAddTask = async (task) => {
        try {
            const response = await createTask(task);
            setTasks([...tasks, response.data]);
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    const handleUpdateTask = async (id, updatedTask) => {
        try {
            const response = await updateTask(id, updatedTask);
            setTasks(tasks.map(t => t.id === id ? response.data : t));
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    const handleDeleteTask = async (id) => {
        try {
            await deleteTask(id);
            setTasks(tasks.filter(t => t.id !== id));
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-4">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">To-Do List</h1>
            <TaskForm onAdd={handleAddTask} />
            <div className="space-y-4">
                {tasks.map(task => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        onUpdate={handleUpdateTask}
                        onDelete={handleDeleteTask}
                    />
                ))}
                {tasks.length === 0 && (
                    <p className="text-center text-gray-500">No tasks yet. Add one above!</p>
                )}
            </div>
        </div>
    );
};

export default TaskList;
