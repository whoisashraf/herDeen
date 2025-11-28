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
  generatePlan: () => void;
  savePlan: () => void;
  generatedPlan: Task[];
  savedPlan: Task[];
  toggleTaskComplete: (id: string) => void;
}

const PlannerContext = createContext<PlannerContextType | undefined>(undefined);

export function PlannerProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: '',
      priority: 'medium',
      estimatedDuration: 40,
      preferredTime: '01:50',
    },
    {
      id: '2',
      title: '',
      priority: 'medium',
      estimatedDuration: 40,
      preferredTime: '01:50',
    },
  ]);
  const [generatedPlan, setGeneratedPlan] = useState<Task[]>([]);
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

  const generatePlan = () => {
    // Simulate AI generation - assign times to tasks
    const plan = tasks.map((task, index) => {
      const startHour = 9 + index;
      return {
        ...task,
        startTime: `${startHour}:00 AM`,
        endTime: `${startHour}:45 AM`,
        description: task.description || "Spend time on this task with focus and intention.",
      };
    });
    setGeneratedPlan(plan);
  };

  const savePlan = () => {
    setSavedPlan(generatedPlan);
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
        generatePlan,
        savePlan,
        generatedPlan,
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
