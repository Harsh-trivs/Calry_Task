export interface RoomServiceRequest {
    id: string;
    guestName: string;
    roomNumber: number;
    requestDetails: string;
    priority: number; // Lower number indicates higher priority
    status: 'received' | 'in progress' | 'awaiting confirmation' | 'completed' | 'canceled';
}
