import { RoomServiceRequest } from "../types/roomServiceType";
import { loadRequests, saveRequests } from "../utils/fileOperations";
import { Request,Response } from "express";
import { v4 as uuidv4 } from 'uuid';


// Get all service requests, sorted by priority
export const getRequests = async (req: Request, res: Response) => {
    const requests = await loadRequests();
    requests.sort((a, b) => a.priority - b.priority); // Sort by priority
    return res.json(requests);
};

export const getRequestsById = async(req:Request,res:Response)=>{
    const requests = await loadRequests();
    const request = requests.find(r => r.id === req.params.id);
    if(!request) return res.status(404).json({message : "Request with this id not found!"})
        
    return res.json(request);
}

export const createNewRequests = async(req:Request,res:Response)=>{
    const requests = await loadRequests();
    const newRequest : RoomServiceRequest={
        id: uuidv4(),
        guestName: req.body.guestName,
        roomNumber: req.body.roomNumber,
        requestDetails: req.body.requestDetails,
        priority: req.body.priority,
        status: "received" //setting default status as received.
    }
    requests.push(newRequest);
    await saveRequests(requests);
    return res.json(newRequest);
}

export const updateRequest = async(req:Request,res:Response)=>{
    const requests = await loadRequests();
    const request =  requests.find(r=> r.id === req.params.id)
    if(request){
        if(req.body?.requestDetails) request.requestDetails = req.body?.requestDetails 
        if(req.body?.priority ) request.priority = req.body?.priority
        if(req.body?.status ) request.status = req.body?.status  
    }
    else{
        return res.status(404).json({message : "Request with this id not found!"})
    }
    await saveRequests(requests)
    return res.json(request)
}

export const deleteRequest = async(req:Request , res:Response)=>{
    let requests = await loadRequests()
    const request = requests.find(r=> r.id === req.params.id)
    if(!request) return res.status(404).json({message:"Request with this id not found!"})
    if(request){
        if(request.status !== 'canceled' && request.status !=='completed') 
            return res.json({message:"Request is neither canceled nor completed"})
    }
    requests = requests.filter(r=> r.id !==req.params.id)
    await saveRequests(requests)
    return res.json({message:`Deleted request with id ${req.params.id}`})
}

export const completeRequest = async(req:Request , res:Response)=>{
    const requests = await loadRequests()
    const request = requests.find(r=> r.id === req.params.id)
    if(!request) return res.status(404).json({message:"Request with this id not found!"})
    request.status = 'completed'
    await saveRequests(requests)
    return res.json(request)
}