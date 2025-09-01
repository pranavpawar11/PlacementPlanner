// Date utility functions for calendar operations
export const dateUtils = {
  // Format date to YYYY-MM-DD string
  formatDate: (date) => {
    return date.toISOString().split('T')[0];
  },
  
  // Parse date string to Date object
  parseDate: (dateString) => {
    return new Date(dateString);
  },
  
  // Get number of days in a month
  getDaysInMonth: (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  },
  
  // Get first day of month (0 = Sunday, 6 = Saturday)
  getFirstDayOfMonth: (year, month) => {
    return new Date(year, month, 1).getDay();
  },
  
  // Get month name from month number
  getMonthName: (month) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[month];
  },
  
  // Check if date is today
  isToday: (dateString) => {
    const today = new Date();
    const date = new Date(dateString);
    return dateUtils.formatDate(today) === dateUtils.formatDate(date);
  },
  
  // Check if date is in the past
  isPastDate: (dateString) => {
    const today = new Date();
    const date = new Date(dateString);
    return date < today && !dateUtils.isToday(dateString);
  },
  
  // Get week number of the year
  getWeekNumber: (date) => {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  },
  
  // Add days to a date
  addDays: (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  },
  
  // Get date range for a week
  getWeekRange: (date) => {
    const start = new Date(date);
    const day = start.getDay();
    const diff = start.getDate() - day;
    start.setDate(diff);
    
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    
    return { start, end };
  }
};

export default dateUtils;