// // src/services/api.ts
// import { Todo, TodoFormData, ApiResponse } from '../types';

// // Your backend URL
// const API_URL = 'http://localhost:5000';

// export const getTodos = async (): Promise<ApiResponse<Todo[]>> => {
//   try {
//     // Updated to use root endpoint for getting all todos
//     const response = await fetch(`${API_URL}/`);
    
//     if (!response.ok) {
//       throw new Error('Failed to fetch todos');
//     }
    
//     const data = await response.json();
//     return { data };
//   } catch (error) {
//     console.error('Error fetching todos:', error);
//     return { data: [], error: error instanceof Error ? error.message : 'Unknown error' };
//   }
// };

// export const addTodo = async (todoData: TodoFormData): Promise<ApiResponse<Todo>> => {
//   try {
//     // Updated to use /save endpoint and only send the text field
//     const response = await fetch(`${API_URL}/save`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ 
//         text: todoData.title 
//       }),
//     });
    
//     if (!response.ok) {
//       throw new Error('Failed to add todo');
//     }
    
//     const data = await response.json();
//     return { data };
//   } catch (error) {
//     console.error('Error adding todo:', error);
//     return { 
//       data: {} as Todo, 
//       error: error instanceof Error ? error.message : 'Unknown error' 
//     };
//   }
// };

// export const updateTodo = async (id: string, todoData: Partial<Todo>): Promise<ApiResponse<Todo>> => {
//   try {
//     // Updated to use /update endpoint with id and text fields
//     const response = await fetch(`${API_URL}/update`, {
//       method: 'PUT', // or 'POST' if your backend expects POST for updates
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         id: id,
//         text: todoData.text,
//         // If your backend handles completed status, include it here
//         ...(todoData.completed !== undefined && { completed: todoData.completed })
//       }),
//     });
    
//     if (!response.ok) {
//       throw new Error('Failed to update todo');
//     }
    
//     const data = await response.json();
//     return { data };
//   } catch (error) {
//     console.error('Error updating todo:', error);
//     return { 
//       data: {} as Todo, 
//       error: error instanceof Error ? error.message : 'Unknown error' 
//     };
//   }
// };

// export const deleteTodo = async (id: string): Promise<ApiResponse<{ success: boolean }>> => {
//   try {
//     // Updated to use /delete endpoint with id
//     const response = await fetch(`${API_URL}/delete`, {
//       method: 'DELETE', // or 'POST' if your backend expects POST for deletes
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ id }),
//     });
    
//     if (!response.ok) {
//       throw new Error('Failed to delete todo');
//     }
    
//     const data = await response.json();
//     return { data: { success: true } };
//   } catch (error) {
//     console.error('Error deleting todo:', error);
//     return { 
//       data: { success: false }, 
//       error: error instanceof Error ? error.message : 'Unknown error' 
//     };
//   }
// };



import axios from 'axios';

const baseUrl = "http://localhost:5000";

interface Todo {
  _id: string;
  text: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

// Get all todos
export const getAllTodos = async (): Promise<Todo[]> => {
  try {
    const { data } = await axios.get(`${baseUrl}/`);
    return data;
  } catch (error) {
    console.error("Error fetching all todos:", error);
    throw error;
  }
};

// Get completed todos
export const getCompletedTodos = async (): Promise<Todo[]> => {
  try {
    const { data } = await axios.get(`${baseUrl}/completed`);
    return data;
  } catch (error) {
    console.error("Error fetching completed todos:", error);
    throw error;
  }
};

// Get active (not completed) todos
export const getActiveTodos = async (): Promise<Todo[]> => {
  try {
    const { data } = await axios.get(`${baseUrl}/active`);
    return data;
  } catch (error) {
    console.error("Error fetching active todos:", error);
    throw error;
  }
};

// Add a new todo
export const addTodo = async (text: string): Promise<Todo> => {
  try {
    const { data } = await axios.post(`${baseUrl}/save`, { text });
    return data;
  } catch (error) {
    console.error("Error adding todo:", error);
    throw error;
  }
};

// Update a todo's text
export const updateTodoText = async (todoId: string, text: string): Promise<Todo> => {
  try {
    const { data } = await axios.put(`${baseUrl}/update`, { _id: todoId, text });
    return data;
  } catch (error) {
    console.error("Error updating todo text:", error);
    throw error;
  }
};

// Toggle a todo's completed status
export const toggleTodoStatus = async (todoId: string): Promise<Todo> => {
  try {
    const { data } = await axios.put(`${baseUrl}/toggle`, { _id: todoId });
    return data;
  } catch (error) {
    console.error("Error toggling todo status:", error);
    throw error;
  }
};

// Mark a todo as completed
export const markTodoCompleted = async (todoId: string): Promise<Todo> => {
  try {
    const { data } = await axios.put(`${baseUrl}/update`, { 
      _id: todoId, 
      completed: true 
    });
    return data;
  } catch (error) {
    console.error("Error marking todo as completed:", error);
    throw error;
  }
};

// Mark a todo as active
export const markTodoActive = async (todoId: string): Promise<Todo> => {
  try {
    const { data } = await axios.put(`${baseUrl}/update`, { 
      _id: todoId, 
      completed: false 
    });
    return data;
  } catch (error) {
    console.error("Error marking todo as active:", error);
    throw error;
  }
};

// Delete a todo
export const deleteTodo = async (todoId: string): Promise<void> => {
  try {
    await axios.delete(`${baseUrl}/delete`, { data: { _id: todoId } });
  } catch (error) {
    console.error("Error deleting todo:", error);
    throw error;
  }
};

// Clear all completed todos
export const clearCompletedTodos = async (): Promise<void> => {
  try {
    await axios.delete(`${baseUrl}/clear-completed`);
  } catch (error) {
    console.error("Error clearing completed todos:", error);
    throw error;
  }
};