import { Request, Response } from 'express';
import moment from 'moment'; 

import { PrismaClient } from '@prisma/client';
import { use } from '../routes/routes';
const prisma = new PrismaClient()

// getting all bugs
const getBugs = async (req: Request, res: Response) => {
    console.log(req.body)
    // get the data from req.body
    const project_id: number = req.body.project_id ?? null;
    const user_id: number = req.body.user_id ?? null;
    const start_date: string = req.body.start_date ?? null; 
    const end_date: string = req.body.end_date ?? null;
    // validate that at least one parameter comes
    if(! (project_id !== null || user_id !== null || start_date !== null || end_date !== null)){
        return res.status(500).json({
            error: 'At least one search parameter must be provided',
            message: 'At least one search parameter must be provided',
        });
    }
    if(isNaN(user_id)){
        return res.status(500).json({
            error: 'The user_id field must be an integer',
            message: 'The user_id field must be an integer',
        });
    }
    if(isNaN(project_id)){
        return res.status(500).json({
            error: 'The project_id field must be an integer',
            message: 'The project_id field must be an integer',
        });
    }
    if(start_date !== null && !moment(start_date).isValid()){
        return res.status(500).json({
            error: 'The start_date provided is not valid',
            message: 'The start_date provided is not valid',
        });
    }
    if(end_date !== null && !moment(end_date).isValid()){
        return res.status(500).json({
            error: 'The end_date provided is not valid',
            message: 'The end_date provided is not valid',
        });
    }
    
    // preparing the search "Where" condition
    let searchWhere: Object = {
        projectId: project_id ?? undefined,
        userId: user_id  ?? undefined,
        creationDate: {
            gte: start_date ?? undefined,
            lt:  end_date ?? undefined
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