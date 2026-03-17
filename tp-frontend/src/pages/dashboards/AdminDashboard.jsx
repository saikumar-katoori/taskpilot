import { useEffect, useState } from 'react';
import api from '../../api/axios';
import TaskCard from '../../components/TaskCard';

const AdminDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [employees, setEmployees] = useState([]);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    assignedTo: '',
  });

  const loadTasks = async () => {
    setError('');
    try {
      const response = await api.get('/all-tasks');
      setTasks(response.data || []);
    } catch (err) {
      const message = err?.response?.data || 'Failed to load tasks';
      setError(typeof message === 'string' ? message : 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const loadEmployees = async () => {
    try {
      const response = await api.get('/department-employees');
      setEmployees(response.data || []);
    } catch (err) {
      // do not override existing task error state; keep this simple
      console.error('Failed to load employees', err);
    }
  };

  useEffect(() => {
    loadTasks();
    loadEmployees();
  }, []);

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateTask = async (event) => {
    event.preventDefault();
    setCreating(true);
    setError('');
    try {
      const payload = {
        title: form.title,
        description: form.description,
        assignedTo: form.assignedTo ? Number(form.assignedTo) : null,
      };
      await api.post('/create-task', payload);
      setForm({ title: '', description: '', assignedTo: '' });
      await loadTasks();
    } catch (err) {
      const message = err?.response?.data || 'Failed to create task';
      setError(typeof message === 'string' ? message : 'Failed to create task');
    } finally {
      setCreating(false);
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await api.put(`/update-task/${taskId}`, { status: newStatus });
      setTasks((prev) =>
        prev.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task)),
      );
    } catch {
      // keep simple; show alert for now
      alert('Failed to update task status');
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Delete this task?')) return;
    try {
      await api.delete(`/delete-task/${taskId}`);
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
    } catch {
      alert('Failed to delete task');
    }
  };

  return (
    <div className="tp-layout">
      <div className="tp-layout-header">
        <h1>Admin Dashboard</h1>
        <p>Manage all tasks and track team progress.</p>
      </div>

      <section className="tp-panel">
        <h2>Create task</h2>
        {error && <div className="tp-alert tp-alert-error">{error}</div>}
        <form className="tp-form tp-form-grid" onSubmit={handleCreateTask}>
          <label className="tp-field tp-field-full">
            <span>Title</span>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleFormChange}
              required
            />
          </label>
          <label className="tp-field tp-field-full">
            <span>Description</span>
            <textarea
              name="description"
              value={form.description}
              onChange={handleFormChange}
              rows={3}
              required
            />
          </label>
          <label className="tp-field">
            <span>Assign to employee</span>
            <select
              name="assignedTo"
              value={form.assignedTo}
              onChange={handleFormChange}
              required
            >
              <option value="">Select employee</option>
              {employees.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.firstName} {employee.surName} ({employee.email})
                </option>
              ))}
            </select>
          </label>
          <button
            type="submit"
            className="tp-btn tp-btn-primary tp-field-full tp-btn-align-right"
            disabled={creating}
          >
            {creating ? 'Creating...' : 'Create task'}
          </button>
        </form>
      </section>

      <section className="tp-panel">
        <div className="tp-panel-header">
          <h2>All tasks</h2>
        </div>
        {loading ? (
          <p>Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <p>No tasks created yet.</p>
        ) : (
          <div className="tp-task-grid">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onStatusChange={handleStatusChange}
                onDelete={handleDeleteTask}
                isAdmin
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminDashboard;
