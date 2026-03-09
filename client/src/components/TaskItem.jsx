const TaskItem = ({ task, onEdit, onDelete, onToggleStatus }) => {
  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'var(--danger)';
      case 'medium': return '#F59E0B'; // Amber
      case 'low': return 'var(--success)';
      default: return 'var(--text-muted)';
    }
  };

  const isCompleted = task.status === 'completed';

  return (
    <div className="task-item" style={{
      background: 'white',
      padding: '15px',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      marginBottom: '15px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderLeft: `4px solid ${getPriorityColor(task.priority)}`,
      opacity: isCompleted ? 0.7 : 1
    }}>
      <div style={{ flex: 1 }}>
        <h4 style={{
          textDecoration: isCompleted ? 'line-through' : 'none',
          color: isCompleted ? 'var(--text-muted)' : 'var(--text-main)',
          marginBottom: '5px'
        }}>
          {task.title}
        </h4>
        {task.description && (
          <p style={{
            fontSize: '0.9rem',
            color: 'var(--text-muted)',
            marginBottom: '8px',
            textDecoration: isCompleted ? 'line-through' : 'none'
          }}>
            {task.description}
          </p>
        )}
        <div style={{ display: 'flex', gap: '15px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          <span>Priority: <strong>{task.priority}</strong></span>
          {task.dueDate && <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>}
        </div>
      </div>
      
      <div style={{ display: 'flex', gap: '10px', marginLeft: '20px' }}>
        <button 
          onClick={() => onToggleStatus(task._id, isCompleted ? 'pending' : 'completed')}
          className={`btn ${isCompleted ? 'btn-secondary' : 'btn-success'}`}
        >
          {isCompleted ? 'Mark Pending' : 'Complete'}
        </button>
        <button 
          onClick={() => onEdit(task)}
          className="btn btn-secondary"
        >
          Edit
        </button>
        <button 
          onClick={() => onDelete(task._id)}
          className="btn btn-danger"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
