import { useMemo } from 'react';
import { dateUtils } from '../utils/dateUtils';

export const useCalendarData = ({ categories, currentDate, searchTerm, selectedCategory }) => {
  return useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = dateUtils.getDaysInMonth(year, month);
    const firstDay = dateUtils.getFirstDayOfMonth(year, month);
    
    // Get all tasks for the current month
    const monthTasks = categories.flatMap(category => 
      category.tasks
        .filter(task => {
          const taskDate = new Date(task.date);
          const matchesMonth = taskDate.getMonth() === month && taskDate.getFullYear() === year;
          const matchesSearch = searchTerm === '' || task.title.toLowerCase().includes(searchTerm.toLowerCase());
          const matchesCategory = selectedCategory === 'all' || category.id === selectedCategory;
          return matchesMonth && matchesSearch && matchesCategory;
        })
        .map(task => ({
          ...task,
          categoryId: category.id,
          categoryName: category.name,
          categoryColor: category.color,
          categoryIcon: category.icon
        }))
    );

    // Create calendar grid
    const days = [];
    
    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayTasks = monthTasks.filter(task => task.date === dateString);
      
      days.push({
        day,
        dateString,
        tasks: dayTasks,
        isToday: dateUtils.isToday(dateString),
        isPast: dateUtils.isPastDate(dateString)
      });
    }

    return { monthTasks, days };
  }, [categories, currentDate, searchTerm, selectedCategory]);
};