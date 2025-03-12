// src/components/TodoForm.tsx
import React, { useState } from 'react';
import { addTodo } from '../services/api';

interface TodoFormProps {
  onTodoAdded: () => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onTodoAdded }) => {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!text.trim()) {
      setError('Task cannot be empty');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Use the addTodo function from our updated API
      await addTodo(text.trim());
      setText('');
      onTodoAdded();
    } catch (err) {
      console.error('Error adding todo:', err);
      setError('Failed to add task. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md mb-6">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-3">
          <input
            type="text"
            placeholder="What needs to be done?"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition-colors duration-200 font-medium disabled:opacity-70"
            disabled={isLoading}
          >
            {isLoading ? 'Adding...' : 'Add Task'}
          </button>
        </div>
        {error && (
          <p className="text-red-500 mt-2 text-sm">{error}</p>
        )}
      </form>
    </div>
  );
};

export default TodoForm;