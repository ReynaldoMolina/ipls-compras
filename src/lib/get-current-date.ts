export function getCurrentDate() {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = String(now.getMonth() + 1).padStart(2, '0');
  const currentDay = String(now.getDate()).padStart(2, '0');

  const currentDate = `${currentYear}-${currentMonth}-${currentDay}`;
  return { currentYear, currentDate };
}
