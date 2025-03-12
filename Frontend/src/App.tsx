// src/App.tsx
import React, { useState } from 'react';
import Header from './Components/Header';
import TodoForm from './Components/TodoForm';
import TodoList from './Components/TodoList';

const App: React.FC = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleTodoAdded = () => {
    // Force refresh of the TodoList by updating the refreshTrigger state
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <TodoForm onTodoAdded={handleTodoAdded} />
        
        <TodoList key={refreshTrigger} />
      </main>
      
      <footer className="bg-white shadow-md mt-auto py-4">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          <p>TaskMaster © {new Date().getFullYear()} - Your Productivity Partner</p>
        </div>
      </footer>
    </div>
  );
};

export default App;