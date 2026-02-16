import { useEffect, useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-hot-toast';
import { FiSearch, FiType, FiAlignLeft, FiCalendar, FiAlertCircle, FiLogOut } from 'react-icons/fi';
import TaskCard from '../components/TaskCard';

function Dashboard() {

    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [priority, setPriority] = useState("medium");
    const [dueDate, setDueDate] = useState('');
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [editingTask, setEditingTask] = useState(null);

    const navigate = useNavigate();


    // ✅ LOGOUT
    const logout = () => {
        localStorage.removeItem("token");
        toast.success("Logged out successfully");
        navigate('/login');
    };


    // ✅ FETCH TASKS
    useEffect(() => {

        const fetchTasks = async () => {
            try {
                const res = await API.get('/tasks');
                setTasks(res.data);
            } catch (err) {
                console.log(err);
                if (err.response?.status !== 401) toast.error("Failed to fetch tasks");
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();

    }, []);



    // ✅ CREATE OR UPDATE TASK
    const handleTaskSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim()) return;

        try {

            if (editingTask) {
                // UPDATE MODE
                const res = await API.patch(`/tasks/${editingTask._id}`, {
                    title,
                    desc,
                    priority,
                    dueDate
                });

                setTasks(prev =>
                    prev.map(t => t._id === editingTask._id ? res.data : t)
                );

                toast.success("Task updated! 📝");
                setEditingTask(null);

            } else {
                // CREATE MODE
                const res = await API.post('/tasks', {
                    title,
                    desc,
                    priority,
                    dueDate
                });

                setTasks(prev => [res.data, ...prev]);
                toast.success("Task created! 🚀");
            }

            // RESET FORM
            setTitle('');
            setDesc('');
            setPriority('medium');
            setDueDate('');

        } catch (err) {
            console.log(err);
            toast.error("Failed to save task");
        }
    };

    // ✅ START EDITING
    const startEditing = (task) => {
        setEditingTask(task);
        setTitle(task.title);
        setDesc(task.desc);
        setPriority(task.priority);
        setDueDate(task.dueDate ? task.dueDate.split('T')[0] : '');

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // ✅ CANCEL EDITING
    const cancelEditing = () => {
        setEditingTask(null);
        setTitle('');
        setDesc('');
        setPriority('medium');
        setDueDate('');
    };



    // ✅ TOGGLE COMPLETE
    const toggleComplete = async (task) => {

        try {

            const res = await API.patch(`/tasks/${task._id}`, {
                completed: !task.completed
            });

            setTasks(prev =>
                prev.map(t => t._id === task._id ? res.data : t)
            );

        } catch (err) {
            console.log(err);
            toast.error("Failed to update task");
        }
    };



    // ✅ DELETE TASK
    const deleteTask = async (id) => {
        try {

            await API.delete(`/tasks/${id}`);

            setTasks(prev =>
                prev.filter(task => task._id !== id)
            );
            toast.success("Task deleted!");

        } catch (err) {
            console.log(err);
            toast.error("Failed to delete task");
        }
    };



    // ✅ LOADING UI
    if (loading) {
        return <h2>Loading tasks... ⏳</h2>
    }



    return (
        <div className="dashboard-container">

            <div className="dashboard-header">
                <h2>TaskFlow 🔥</h2>
                <button onClick={logout} className="logout-btn">
                    <FiLogOut className="logout-icon" /> Logout
                </button>
            </div>

            <div className="dashboard-glass">

                {/* SEARCH */}
                <div className="input-wrapper" style={{ marginBottom: "2rem" }}>
                    <FiSearch className="input-icon" />
                    <input
                        className="auth-input"
                        placeholder="Search tasks..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {/* CREATE/EDIT TASK FORM */}
                <form onSubmit={handleTaskSubmit} className="task-form">

                    {editingTask && (
                        <div style={{ marginBottom: "1rem", color: "#fbbf24", fontWeight: "bold" }}>
                            ✏️ Editing: {editingTask.title}
                        </div>
                    )}

                    <div className="task-input-group">
                        <div className="input-wrapper" style={{ flex: 1 }}>
                            <FiType className="input-icon" />
                            <input
                                className="auth-input"
                                placeholder="Task title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>

                        <div className="input-wrapper">
                            <FiAlertCircle className="input-icon" />
                            <select
                                className="auth-input"
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                                style={{ width: "150px" }}
                            >
                                <option value="low">Low 🟢</option>
                                <option value="medium">Medium 🟠</option>
                                <option value="high">High 🔴</option>
                            </select>
                        </div>
                    </div>

                    <div className="task-input-group">
                        <div className="input-wrapper" style={{ flex: 1 }}>
                            <FiAlignLeft className="input-icon" />
                            <input
                                className="auth-input"
                                placeholder="Description"
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                            />
                        </div>

                        <div className="input-wrapper">
                            <FiCalendar className="input-icon" />
                            <input
                                type="date"
                                className="auth-input"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                style={{ width: "150px" }}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button className="action-btn" style={{ flex: 1 }}>
                            {editingTask ? "Update Task 💾" : "+ Create Task"}
                        </button>

                        {editingTask && (
                            <button
                                type="button"
                                onClick={cancelEditing}
                                className="action-btn"
                                style={{ background: "#fee2e2", color: "#dc2626" }}
                            >
                                Cancel ❌
                            </button>
                        )}
                    </div>

                </form>
            </div>


            {/* TASK LIST */}
            <div className="task-list">
                {tasks.length === 0 ? (
                    <div style={{ textAlign: "center", color: "white", marginTop: "2rem" }}>
                        <h3>No tasks found 🚀</h3>
                        <p>Create one to get started!</p>
                    </div>
                ) : (
                    tasks
                        .filter(task => task.title?.toLowerCase().includes(search.toLowerCase()))
                        .map((task) => (
                            <TaskCard
                                key={task._id}
                                task={task}
                                deleteTask={deleteTask}
                                toggleComplete={toggleComplete}
                                startEditing={startEditing}
                            />
                        ))
                )}
            </div>

        </div>
    )
}

export default Dashboard;
