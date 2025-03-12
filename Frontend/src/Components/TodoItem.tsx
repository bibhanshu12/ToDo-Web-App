// src/components/TodoItem.tsx
import React, { useState } from 'react';
import { updateTodoText, toggleTodoStatus, deleteTodo } from '../services/api';

// Update this interface to match our backend model
interface Todo {
  _id: string;  // MongoDB uses _id instead of id
  text: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

interface TodoItemProps {
  todo: Todo;
  onTodoUpdated: () => void;
  onTodoDeleted: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onTodoUpdated, onTodoDeleted }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleStatusToggle = async () => {
    try {
      setIsLoading(true);
      await toggleTodoStatus(todo._id); // Using our dedicated toggle function
      setIsLoading(false);
      onTodoUpdated();
    } catch (error) {
      console.error("Error toggling todo status:", error);
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        setIsLoading(true);
        await deleteTodo(todo._id);
        setIsLoading(false);
        onTodoDeleted();
      } catch (error) {
        console.error("Error deleting todo:", error);
        setIsLoading(false);
      }
    }
  };

  const handleEdit = async () => {
    if (isEditing) {
      if (editText.trim() !== '') {
        try {
          setIsLoading(true);
          await updateTodoText(todo._id, editText.trim());
          setIsLoading(false);
          onTodoUpdated();
        } catch (error) {
          console.error("Error updating todo text:", error);
          setIsLoading(false);
        }
      }
    }
    
    setIsEditing(!isEditing);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 mb-3 transition-all hover:shadow-md">
      <div className="flex items-start gap-3">
        <button
          onClick={handleStatusToggle}
          disabled={isLoading}
          className="mt-1 flex-shrink-0"
          aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
        >
          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
            todo.completed ? 'bg-green-500 border-green-500' : 'border-gray-400'
          }`}>
            {todo.completed && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
        </button>
        
        <div className="flex-1">
          {isEditing ? (
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="w-full p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
          ) : (
            <p className={`text-lg ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
              {todo.text}
            </p>
          )}
          
          <div className="text-xs text-gray-500 mt-1 flex gap-3">
            {todo.createdAt && (
              <p>Created: {formatDate(todo.createdAt)}</p>
            )}
            {todo.updatedAt && todo.updatedAt !== todo.createdAt && (
              <p>Updated: {formatDate(todo.updatedAt)}</p>
            )}
          </div>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={handleEdit}
            disabled={isLoading}
            className="text-blue-600 hover:text-blue-800 p-1"
            aria-label={isEditing ? "Save changes" : "Edit task"}
          >
            {isEditing ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            )}
          </button>
          
          <button
            onClick={handleDelete}
            disabled={isLoading}
            className="text-red-600 hover:text-red-800 p-1"
            aria-label="Delete task"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;