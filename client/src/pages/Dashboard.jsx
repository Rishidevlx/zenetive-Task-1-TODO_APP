import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import Navbar from '../components/Navbar';
import TaskForm from '../components/TaskForm';
import TaskItem from '../components/TaskItem';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [loadingTasks, setLoadingTasks] = useState(true);
  
  const navigate = useNavigate();
  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  const getHeaders = () => {
    return {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    };
  };

  const fetchTasks = async () => {
    try {
      const res = await axios.get('/api/tasks', getHeaders());
      setTasks(res.data);
    } catch (error) {
      console.error('Error fetching tasks', error);
    } finally {
      setLoadingTasks(false);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      const res = await axios.post('/api/tasks', taskData, getHeaders());
      setTasks([...tasks, res.data]);
    } catch (error) {
      console.error('Error creating task', error);
    }
  };

  const handleUpdateTask = async (taskData) => {
    try {
      const res = await axios.put(`/api/tasks/${editingTask._id}`, taskData, getHeaders());
      setTasks(tasks.map(task => task._id === editingTask._id ? res.data : task));
      setEditingTask(null);
    } catch (error) {
      console.error('Error updating task', error);
    }
  };

  const handleDeleteTask = async (id) => {
    if(window.confirm('Are you sure you want to delete this task?')) {
      try {
        await axios.delete(`/api/tasks/${id}`, getHeaders());
        setTasks(tasks.filter(task => task._id !== id));
      } catch (error) {
        console.error('Error deleting task', error);
      }
    }
  };

  const handleToggleStatus = async (id, newStatus) => {
    try {
      const res = await axios.patch(`/api/tasks/${id}/status`, { status: newStatus }, getHeaders());
      setTasks(tasks.map(task => task._id === id ? res.data : task));
    } catch (error) {
      console.error('Error updating status', error);
    }
  };

  if (loading || !user) {
    return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div style={{ display: 'flex', gap: '30px', alignItems: 'flex-start' }}>
        
        {/* Sidebar Form Area */}
        <div style={{ width: '350px', position: 'sticky', top: '20px' }}>
          {editingTask ? (
            <TaskForm 
              initialData={editingTask} 
              onSubmitForm={handleUpdateTask} 
              onCancel={() => setEditingTask(null)} 
            />
          ) : (
            <TaskForm onSubmitForm={handleCreateTask} />
          )}
        </div>

        {/* Main Content Area */}
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2>Your Tasks ({tasks.length})</h2>
          </div>

          {loadingTasks ? (
            <p>Loading tasks...</p>
          ) : tasks.length > 0 ? (
            <div>
              {tasks.map(task => (
                <TaskItem 
                  key={task._id} 
                  task={task} 
                  onEdit={setEditingTask}
                  onDelete={handleDeleteTask}
                  onToggleStatus={handleToggleStatus}
                />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px', background: 'white', borderRadius: '8px' }}>
              <p style={{ color: 'var(--text-muted)' }}>You don't have any tasks yet. Create one on the left!</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
