// src/components/TodoList.tsx
import React, { useState, useEffect } from 'react';
import { getAllTodos, getActiveTodos, getCompletedTodos } from '../services/api';
import { Todo } from '../types';
import TodoItem from './TodoItem';

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const fetchTodos = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      let fetchedTodos: Todo[];
      
      // Use the appropriate API function based on the selected filter
      switch (filter) {
        case 'active':
          fetchedTodos = await getActiveTodos();
          break;
        case 'completed':
          fetchedTodos = await getCompletedTodos();
          break;
        case 'all':
        default:
          fetchedTodos = await getAllTodos();
          break;
      }
      
      setTodos(fetchedTodos);
    } catch (err) {
      console.error('Error fetching todos:', err);
      setError('Failed to fetch tasks. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch todos on component mount and when filter changes
  useEffect(() => {
    fetchTodos();
  }, [filter]);

  const handleTodoUpdated = () => {
    fetchTodos();
  };

  const handleTodoDeleted = () => {
    fetchTodos();
  };

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          {filter === 'all' ? 'All Tasks' : filter === 'active' ? 'Active Tasks' : 'Completed Tasks'}
        </h2>
        
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-3 py-1 rounded ${
              filter === 'active'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-3 py-1 rounded ${
              filter === 'completed'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            Completed
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
        </div>
      ) : todos.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <p className="text-gray-600">
            {filter === 'all'
              ? 'No tasks yet. Add a new task to get started!'
              : filter === 'active'
              ? 'No active tasks. All your tasks are completed!'
              : 'No completed tasks yet.'}
          </p>
        </div>
      ) : (
        <div>
          {todos.map((todo) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              onTodoUpdated={handleTodoUpdated}
              onTodoDeleted={handleTodoDeleted}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TodoList;