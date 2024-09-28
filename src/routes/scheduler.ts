import { Request, Response } from 'express';
import { emitWarning } from 'process';


export const optimizeBookings = (bookings: number[][]): number[][] => {
    if (bookings.length === 0) return [];
  
    // Step 1: Sort bookings by start time
    bookings.sort((a, b) => a[0] - b[0]);
  
    const optimized: number[][] = [bookings[0]];
  
    for (let i = 1; i < bookings.length; i++) {
      const lastBooking = optimized[optimized.length - 1];
      const currentBooking = bookings[i];
  
      // Step 2: Check for overlap or consecutive bookings
      if (currentBooking[0] <= lastBooking[1]) {
        lastBooking[1] = Math.max(lastBooking[1], currentBooking[1]);
      } else {
        optimized.push(currentBooking);
      }
    }
    return optimized;
  };
  
  export const handleScheduleRequest = (req: Request, res: Response) => {
    const { bookings } = req.body;
  
    // Step 1: Validate the input
    if (!Array.isArray(bookings) || bookings.length === 0) {
      return res.status(400).json({ optimizedBookings:bookings,warning: 'Invalid input. Bookings should be a non-empty array of [start, end] times.' });
    }
  
    // Step 2: Optimize the bookings
    try {
      const optimizedBookings = optimizeBookings(bookings);
      return res.json({ optimizedBookings });
    } catch (error) {
      return res.status(500).json({ message: 'Error optimizing bookings', error });
    }
  };
  