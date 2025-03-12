// src/types/index.ts
export interface Todo {
    _id: string;
    text: string; 
    completed: boolean;
    createdAt?: string; 
  }
  
  export interface TodoFormData {
    title: string; 
  }
  
  export interface ApiResponse<T> {
    data: T;
    message?: string;
    error?: string;
  }