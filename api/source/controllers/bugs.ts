/** source/controllers/posts.ts */
import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

interface User {
    id: Number;
    name: String
    surname: String;
    bugs:       [Bug];
}

interface Project {
    id: Number;
    name: String;
    description: String;
    bugs:       [Bug];
}

interface Bug {
    id: Number;
    description: String;
    creationDate: Date;
    project: Project;
    user:   User;
}

// getting all bugs
const getBugs = async (req: Request, res: Response, next: NextFunction) => {
    // get all bugs
    const bugs: [Bug] = await prisma.bug.findMany({
        include: {
           user: true,
           project: true
        }
    });
    return res.status(200).json({
        data: bugs
    });
};

// getting a single bug
const getBug = async (req: Request, res: Response, next: NextFunction) => {
    // get the bug id from the req
    const id: string = req.params.id;
    // get the bug
    const bug: Bug = await prisma.bug.findUnique({
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
const updateBug = async (req: Request, res: Response, next: NextFunction) => {
    // get the bug id from the req.params
    const id: string = req.params.id;
    // get the data from req.body
    const description: string = req.body.description ?? null;
    // update the bug
    const response: Bug = await prisma.bug.update({
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
const deleteBug = async (req: Request, res: Response, next: NextFunction) => {
    // get the bug id from req.params
    const id: string = req.params.id;
    // delete the bug
    const response: Bug = await prisma.bug.delete({
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
const addBug = async (req: Request, res: Response, next: NextFunction) => {
    // get the data from req.body
    const description: string = req.body.description;
    // add the user
    let response: Bug = await prisma.bug.create({
        data:{
            description
        }
    })
    // return response
    return res.status(200).json({
        data: response,
        message: 'Bug insert successfully'
    });
};

export default { getBugs, getBug, updateBug, deleteBug, addBug };