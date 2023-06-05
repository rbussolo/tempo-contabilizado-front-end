export interface Activity {
  id: number;
  description: string;
  date: string;
  startTime: string;
  stopTime: string;
  duration: number;
  stats: string;
  tags: string[];
}