import fs from 'fs/promises';
import { RoomServiceRequest } from '../types/roomServiceType';

const FILE_PATH = './requests.json';

// Load requests from JSON file
export const loadRequests = async (): Promise<RoomServiceRequest[]> => {
    try {
        const data = await fs.readFile(FILE_PATH, 'utf8');
        return JSON.parse(data);
    } catch {
        return []; // Return an empty array if file doesn't exist
    }
};

// Save requests to JSON file
export const saveRequests = async (requests: RoomServiceRequest[]): Promise<void> => {
    await fs.writeFile(FILE_PATH, JSON.stringify(requests, null, 2));
};
