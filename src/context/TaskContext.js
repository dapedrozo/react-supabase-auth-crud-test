import { createContext, useContext, useState } from "react";
import { supabase } from "../supabase/client";

export const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks debe estar en un contextProvider");
  return context;
};

export const TaskContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [adding, setAdding] = useState(false);
  const [loading, setLoading] = useState(false);

  const getTasks = async (done = false) => {
    setLoading(true);
    const user = supabase.auth.user();
    const { error, data } = await supabase
      .from("tasks")
      .select()
      .eq("userId", user.id)
      .eq("done", done)
      .order("id", { ascending: true });
    if (error) throw error;
    setTasks(data);
    setLoading(false);
  };

  const createTask = async (taskName) => {
    setAdding(true);
    try {
      const user = supabase.auth.user();
      const { error, data } = await supabase.from("tasks").insert({
        name: taskName,
        userId: user.id,
      });
      if (error) throw error;
      setTasks([...tasks, ...data]);
    } catch (error) {
      console.log(error);
    } finally {
      setAdding(false);
    }
  };

  const deleteTask = async (id) => {
    const user = supabase.auth.user();
    const { error } = await supabase
      .from("tasks")
      .delete()
      .eq("userId", user.id)
      .eq("id", id);

    if (error) throw error;
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const updateTask = async (id, updateFields) => {
    const user = supabase.auth.user();
    const {error} = await supabase
      .from("tasks")
      .update(updateFields)
      .eq("userId", user.id)
      .eq("id", id);
    if(error) throw error
    setTasks(tasks.filter(task => task.id !== id))
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        adding,
        loading,
        getTasks,
        createTask,
        deleteTask,
        updateTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
