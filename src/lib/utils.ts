import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function combineDateAndTime(date: Date, time: string) {

  const [timePart, modifier] = time.split(" "); 
  const [h, m] = timePart.split(":").map(Number);

  let hours = h;
  if (modifier === "PM" && h !== 12) hours += 12;
  if (modifier === "AM" && h === 12) hours = 0;

  const combined = new Date(date);
  combined.setHours(hours, m, 0, 0);

  return combined.toISOString();
}
