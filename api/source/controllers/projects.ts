import { Request, Response } from 'express';

import { Project } from '../interface';

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


// getting all projects
const getProjects = async (req: Request, res: Response) => {
    // get all projects
    const projects: [Project] = await prisma.project.findMany({
        include: {
            bugs: true
        }
    });
    return res.status(200).json({
        data: projects
    });
};

// getting a single user
const getProject = async (req: Request, res: Response) => {
    // get the project id from the req
    const id: string = req.params.id;
    // get the project
    const project: Project = await prisma.project.findUnique({
        where: {
            id: id
        },
        include: {
            bugs: true
        }
    });
    return res.status(200).json({
        data: project
    });
};

// updating a project
const updateProject = async (req: Request, res: Response) => {
    // get the project id from the req.params
    const id: string = req.params.id;
    // get the data from req.body
    const description: string = req.body.description ?? null;
    // update the user
    const response: Project = await prisma.project.update({
        where: {
            id
        },
        data: {
            description
        }
    })
    // return response
    return res.status(200).json({
        data: response,
        message: 'project update successfully'
    });
};

// deleting a project
const deleteProject = async (req: Request, res: Response) => {
    // get the project id from req.params
    const id: string = req.params.id;
    // delete the project
    const response: Project = await prisma.project.delete({
        where: {
            id
        }
    })
    // return response
    return res.status(200).json({
        data: response,
        message: 'project deleted successfully'
    });
};

// adding a project
const addProject = async (req: Request, res: Response) => {
    // get the data from req.body
    const description: string = req.body.description;
    // add the user
    let response: Project = await prisma.user.create({
        data:{
            description
        }
    })
    // return response
    return res.status(200).json({
        data: response,
        message: 'project insert successfully'
    });
};

export default { getProjects, getProject, updateProject, deleteProject, addProject };