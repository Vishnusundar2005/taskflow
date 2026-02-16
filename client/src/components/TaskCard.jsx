import { useState } from 'react';
function TaskCard({ task, deleteTask, toggleComplete, startEditing }) {
    return (
        <div className="task-card" style={{
            borderLeft: `6px solid ${task.priority === "high"
                ? "#ef4444" // Red-500
                : task.priority === "medium"
                    ? "#f97316" // Orange-500
                    : "#10b981" // Emerald-500
                }`
        }}>
            <div className="task-header">

                {/* CHECKBOX */}
                <input
                    type="checkbox"
                    style={{ width: "20px", height: "20px", cursor: "pointer", marginTop: "4px" }}
                    checked={task.completed}
                    onChange={() => toggleComplete(task)}
                />

                {/* CONTENT */}
                <div className="task-content">
                    <h3 className="task-title" style={{
                        textDecoration: task.completed ? "line-through" : "none",
                        opacity: task.completed ? 0.5 : 1
                    }}>
                        {task.title}
                    </h3>

                    <p className="task-desc">{task.desc}</p>

                    <div className="task-meta">
                        {task.dueDate && (
                            <span style={{
                                color: new Date(task.dueDate) < new Date() ? "#ef4444" : "inherit",
                                fontWeight: new Date(task.dueDate) < new Date() ? "bold" : "normal"
                            }}>
                                📅 {task.dueDate.split("T")[0]}
                            </span>
                        )}
                        <span className="status-badge">
                            {task.priority?.toUpperCase()}
                        </span>
                    </div>
                </div>

                {/* ACTIONS */}
                <div style={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>
                    <button
                        onClick={() => startEditing(task)}
                        className="edit-btn"
                    >
                        EDIT
                    </button>
                    <button
                        onClick={() => deleteTask(task._id)}
                        className="delete-btn"
                    >
                        DELETE
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TaskCard;
