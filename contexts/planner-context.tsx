import React, { createContext, ReactNode, useContext, useState } from 'react';

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
  estimatedDuration: number;
  preferredTime: string;
  startTime?: string;
  endTime?: string;
  isCompleted?: boolean;
}

interface PlannerContextType {
  tasks: Task[];
  addTask: () => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  setTasksFromAI: (tasks: Task[]) => void;
  generatePlan: () => void;
  savedPlan: Task[];
  toggleTaskComplete: (id: string) => void;
}

const PlannerContext = createContext<PlannerContextType | undefined>(undefined);

export function PlannerProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [savedPlan, setSavedPlan] = useState<Task[]>([]);

  const addTask = () => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: '',
      priority: 'medium',
      estimatedDuration: 40,
      preferredTime: '01:50',
    };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, ...updates } : task)));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const setTasksFromAI = (aiTasks: Task[]) => {
    setTasks(aiTasks);
  };

  const generatePlan = () => {
    // Generate schedule with proper time slots based on preferred times
    const plan = tasks.map((task) => {
      // Use preferred time or calculate based on duration
      const [hours, minutes] = task.preferredTime.split(':').map(Number);
      const startTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      
      // Calculate end time
      const endMinutes = minutes + task.estimatedDuration;
      const endHours = hours + Math.floor(endMinutes / 60);
      const finalMinutes = endMinutes % 60;
      const endTime = `${endHours.toString().padStart(2, '0')}:${finalMinutes.toString().padStart(2, '0')}`;
      
      return {
        ...task,
        startTime,
        endTime,
        description: task.description || task.title,
      };
    });
    setSavedPlan(plan);
  };

  const toggleTaskComplete = (id: string) => {
    setSavedPlan(
      savedPlan.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  return (
    <PlannerContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        setTasksFromAI,
        generatePlan,
        savedPlan,
        toggleTaskComplete,
      }}
    >
      {children}
    </PlannerContext.Provider>
  );
}

export function usePlanner() {
  const context = useContext(PlannerContext);
  if (!context) {
    throw new Error('usePlanner must be used within PlannerProvider');
  }
  return context;
}
