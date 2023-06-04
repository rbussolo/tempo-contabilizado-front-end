function getCurrentDate(): string {
  const now = new Date();

  return now.toISOString().substring(0,10);
}

function getDateFormatted(d: Date): string {
  return d.toLocaleDateString('pt-BR');
}

function getCurrentTime(): string {
  const now = new Date();
  const time = now.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return time;
}

function isValidTime(time: string): boolean {
  time = time.replace(":","");
  time = time.padEnd(4,'0');
  
  const hour = parseInt(time.substring(0, 2));
  const minute = parseInt(time.substring(2, 4));
  
  if (hour < 0)
    return false;

  if (hour > 23)
    return false;

  if (minute < 0)
    return false;
  
  if (minute > 59)
    return false;

  return true;
}

export { getCurrentDate, getCurrentTime, isValidTime, getDateFormatted }