// src/utils/getGreeting.js

export const getGreeting = () => {
  const hour = new Date().getHours();

  if (hour >= 3 && hour <= 11) return "Good Morning";
  if (hour >= 12 && hour <= 16) return "Good Afternoon";
  if (hour >= 17 && hour <= 19) return "Good Evening";
  return "Good Night";
};
