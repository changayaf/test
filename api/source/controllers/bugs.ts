import { Request, Response } from 'express';
import moment from 'moment'; 

import { PrismaClient } from '@prisma/client';
import { use } from '../routes/routes';
import { UrlWithParsedQuery } from 'url';
const prisma = new PrismaClient()

// getting all bugs
const getBugs = async (req: Request, res: Response) => {
    console.log(req.query)
    // get the data from req.query
    const  { project_id, user_id, start_date, end_date } = req.query;

    console.log(project_id)
    console.log(user_id)
    console.log(start_date)
    console.log(end_date)

    if(! (project_id !== undefined || user_id !== undefined || start_date !== undefined || end_date !== undefined)){
        return res.status(500).json({
            error: 'At least one search parameter must be provided',
            message: 'At least one search parameter must be provided',
        });
    }
    
    let projectId: number | undefined = undefined;
    let userId: number | undefined = undefined;
    let startDate: string | undefined = undefined; 
    let endDate: string | undefined = undefined;
    let startDateS: Date | undefined = undefined; 
    let endDateS: Date | undefined = undefined;

    // validate that at least one parameter comes    
    if(user_id !== undefined){
        userId = Number(user_id);
        if(isNaN(userId)){
            return res.status(500).json({
                error: 'The user_id field must be an integer',
                message: 'The user_id field must be an integer',
            });
        }
    }
    if(project_id !== undefined){
        projectId = Number(project_id);
        if(isNaN(projectId)){
            return res.status(500).json({
                error: 'The project_id field must be an integer',
                message: 'The project_id field must be an integer',
            });
        }
    }
    
    if(start_date !== undefined){
        startDate = String(start_date);
        if(!moment(startDate).isValid()){
            return res.status(500).json({
                error: 'The start_date provided is not valid',
                message: 'The start_date provided is not valid',
            });
        } else {
            startDateS = new Date(startDate);
        }        
    }
    if(end_date !== undefined ){
        endDate = String(end_date);
        if(!moment(endDate).isValid()){
            return res.status(500).json({
                error: 'The end_date provided is not valid',
                message: 'The end_date provided is not valid',
            });
        } else {
            endDateS = new Date(endDate);
        }        
    }
    
    // preparing the search "Where" condition
    let searchWhere: Object = {
        projectId: projectId ?? undefined,
        userId: userId  ?? undefined,
        creationDate: {
            gte: startDateS ?? undefined,
            lt:  endDateS ?? undefined
        }
    }
    
    // get all bugs by search
    const bugs = await prisma.bug.findMany({
        where: searchWhere,
        include: {
           user: true,
           project: true
        }
    });

    if (bugs){
        let data: Object[] = []; 
        for(const bug of bugs){
            const b: Object= {
                id: bug.id,
                description: bug.description,
                username: `${bug.user.name} ${bug.user.surname}`,
                project: bug.project.name,
                CreationDate: bug.creationDate
            }
            data.push(b);
        }
        return res.status(200).json({
            data: data
        });
    } else {
        return res.status(404).json({
            message: 'No bugs were found under these conditions'
        });
    }
    
};

const getBugsPut = async (req: Request, res: Response) => {
    const error = new Error('Method Not Allowed');
    return res.status(405).json({
        message: error.message
    });    
};


// getting a single bug
const getBug = async (req: Request, res: Response) => {
    // get the bug id from the req
    const id: number = Number(req.params.id);
    // get the bug
    const bug = await prisma.bug.findUnique({
        where: {
            id: id
        },
        include: {
            user: true,
            project: true
        }
    });
    return res.status(200).json({
        data: bug
    });
};

// updating a bug
const updateBug = async (req: Request, res: Response) => {
    // get the bug id from the req.params
    const id: number = Number(req.params.id);
    // get the data from req.body
    const description: string = req.body.description;
    // update the bug
    const response = await prisma.bug.update({
        where: {
            id
        },
        data: {
            description
        },
        include: {
            user: true,
            project: true
        }
    })
    // return response
    return res.status(200).json({
        data: response,
        message: 'Bug update successfully'
    });
};

// deleting a bug
const deleteBug = async (req: Request, res: Response) => {
    // get the bug id from req.params
    const id: number = Number(req.params.id);
    // delete the bug
    const response = await prisma.bug.delete({
        where: {
            id
        }
    })
    // return response
    return res.status(200).json({
        data: response,
        message: 'Bug deleted successfully'
    });
};

// adding a bug
const addBug = async (req: Request, res: Response) => {
    try {
        // get the data from req.body
        const description: string = req.body.description;
        const user: number = req.body.user;
        const project: number = req.body.project; 
        if(isNaN(user)){
            return res.status(500).json({
                error: 'The user field must be an integer',
                message: 'The user field must be an integer',
            });
        }
        if(isNaN(project)){
            return res.status(500).json({
                error: 'The project field must be an integer',
                message: 'The project field must be an integer',
            });
        }
        // add the user
        const bug = await prisma.bug.create({
            data: {
                description: description,
                user: {
                    connect: {
                        id: user
                    }
                },
                project: {
                    connect: {
                        id: project
                    }
                }
            }
        })
        // return response
        return res.status(200).json({
            data: bug,
            message: 'Bug insert successfully'
        });
    }
    catch(e){
        return res.status(500).json({
            error: e
        });
    }
    
};

export default { getBugs, getBug, updateBug, deleteBug, addBug, getBugsPut };