const TaskCard = ({ task, onStatusChange, onDelete, isAdmin }) => {
  const handleStatusChange = (event) => {
    const newStatus = event.target.value;
    if (onStatusChange) {
      onStatusChange(task.id, newStatus);
    }
  };

  return (
    <article className="tp-task-card">
      <header className="tp-task-card-header">
        <h3>{task.title}</h3>
        <span className={`tp-status-badge tp-status-${task.status?.toLowerCase() || 'unknown'}`}>
          {task.status}
        </span>
      </header>
      <p className="tp-task-description">{task.description}</p>
      {task.assignedTo && (
        <p className="tp-task-meta">Assigned to: {task.assignedTo.firstName} {task.assignedTo.surName}</p>
      )}
      {task.createdBy && isAdmin && (
        <p className="tp-task-meta">Created by: {task.createdBy.firstName} {task.createdBy.surName}</p>
      )}
      {task.proof && (
        <p className="tp-task-meta">Proof: {task.proof}</p>
      )}
      <footer className="tp-task-actions">
        {onStatusChange && (
          <select
            className="tp-select"
            value={task.status || ''}
            onChange={handleStatusChange}
            disabled={task.status === 'COMPLETED'}
          >
            <option value="ASSIGNED">ASSIGNED</option>
            <option value="IN_PROGRESS">IN_PROGRESS</option>
            <option value="COMPLETED">COMPLETED</option>
          </select>
        )}
        {isAdmin && onDelete && (
          <button
            type="button"
            className="tp-btn tp-btn-danger"
            onClick={() => onDelete(task.id)}
          >
            Delete
          </button>
        )}
      </footer>
    </article>
  );
};

export default TaskCard;
