import { useState, useEffect } from 'react';
import TodoItem from './components/todos-item';
import { toast } from 'sonner';

const App = () => {
  const [todos, setTodos] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    try {
      const savedData = localStorage.getItem('simple-todo-list');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setTodos(parsedData);
        console.log("📂 Data loaded from LocalStorage:");
        console.table(parsedData);
      }
    } catch (error) {
      console.error("Error reading from LocalStorage", error);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('simple-todo-list', JSON.stringify(todos));
  }, [todos]);

  const handleAdd = (e: any) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newTodo = {
      id: Date.now(),
      title: inputValue,
      completed: false
    };

    const updatedList = [newTodo, ...todos];
    setTodos(updatedList);
    setInputValue("");

    toast.success('New task added successfully!');

    console.log("➕ Added Task:");
    console.table([newTodo]);
  };

  const toggleComplete = (id: any) => {
    const updatedList = todos.map((item: any) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setTodos(updatedList);

    const changedItem = updatedList.find(t => t.id === id);

    if (changedItem.completed) {
      toast.info('Task marked as completed! 🎉');
    } else {
      toast('Task moved back to pending.');
    }

    console.log(`🔄 Item "${changedItem.title}" is now ${changedItem.completed ? "DONE" : "PENDING"}`);
  };

  const deleteTodo = (id: any) => {
    const filteredList = todos.filter((item: any) => item.id !== id);
    setTodos(filteredList);

    toast.error('Task has been deleted.');

    console.warn("🗑️ Item Deleted. Remaining tasks:");
    console.table(filteredList);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6">
          
          <h2 className="text-3xl font-extrabold text-center mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent uppercase tracking-wider">
            Simple Todo
          </h2>

          <form onSubmit={handleAdd} className="flex mb-6 shadow-sm">
            <input
              className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="What needs to be done?"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-r-lg hover:bg-blue-700 active:scale-95 transition-all"
            >
              Add
            </button>
          </form>

          <div className="space-y-1">
            {todos.length === 0 ? (
              <p className="text-center py-10 text-gray-400 italic">No tasks yet. Add one above!</p>
            ) : (
              <div className="border border-gray-100 rounded-lg divide-y divide-gray-100">
                {todos.map((t: any) => (
                  <TodoItem
                    key={t.id}
                    todo={t}
                    onToggle={toggleComplete}
                    onDelete={deleteTodo}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;