import { useEffect, useState } from 'react';
import api from '../../api/axios';
import TaskCard from '../../components/TaskCard';

const EmployeeDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [proofByTask, setProofByTask] = useState({});

  const loadTasks = async () => {
    setError('');
    try {
      const response = await api.get('/my-tasks');
      setTasks(response.data || []);
    } catch (err) {
      const message = err?.response?.data || 'Failed to load tasks';
      setError(typeof message === 'string' ? message : 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleStatusChange = async (taskId, newStatus) => {
    const payload = { status: newStatus };
    if (newStatus === 'COMPLETED') {
      payload.proof = proofByTask[taskId] || '';
    }
    try {
      await api.put(`/update-task/${taskId}`, payload);
      setTasks((prev) =>
        prev.map((task) => (task.id === taskId ? { ...task, status: newStatus, proof: payload.proof } : task)),
      );
    } catch {
      alert('Failed to update task');
    }
  };

  const handleProofChange = (taskId, value) => {
    setProofByTask((prev) => ({ ...prev, [taskId]: value }));
  };

  return (
    <div className="tp-layout">
      <div className="tp-layout-header">
        <h1>My Tasks</h1>
        <p>See tasks assigned to you and update progress.</p>
      </div>

      <section className="tp-panel">
        {error && <div className="tp-alert tp-alert-error">{error}</div>}
        {loading ? (
          <p>Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <p>No tasks assigned yet.</p>
        ) : (
          <div className="tp-task-grid">
            {tasks.map((task) => (
              <div key={task.id} className="tp-task-with-proof">
                <TaskCard
                  task={task}
                  onStatusChange={handleStatusChange}
                  isAdmin={false}
                />
                <div className="tp-task-proof">
                  <label className="tp-field tp-field-full">
                    <span>Completion proof (optional)</span>
                    <input
                      type="text"
                      value={proofByTask[task.id] || ''}
                      onChange={(event) => handleProofChange(task.id, event.target.value)}
                      placeholder="Add a link or short note"
                    />
                  </label>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default EmployeeDashboard;
