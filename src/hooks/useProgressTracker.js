// Custom hook for tracking progress per category
export const useProgressTracker = (categories) => {
  return categories.map(category => {
    const totalTasks = category.tasks.length;
    const completedTasks = category.tasks.filter(task => task.completed).length;
    const progress = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);
    
    return {
      ...category,
      progress,
      completedTasks,
      totalTasks
    };
  });
};

export default useProgressTracker;