/** source/controllers/posts.ts */
import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


interface Bug {
    id: Number;
    description: String;
    creationDate: Date;
}

interface Proyect {
    id: Number;
    name: String;
    description: String;
    bugs:   [Bug]
}

// getting all proyects
const getProyects = async (req: Request, res: Response, next: NextFunction) => {
    // get all proyects
    const proyects: [Proyect] = await prisma.project.findMany({
        include: {
            bugs: true
        }
    });
    return res.status(200).json({
        data: proyects
    });
};

// getting a single user
const getProyect = async (req: Request, res: Response, next: NextFunction) => {
    // get the proyect id from the req
    const id: string = req.params.id;
    // get the proyect
    const proyect: Proyect = await prisma.project.findUnique({
        where: {
            id: id
        },
        include: {
            bugs: true
        }
    });
    return res.status(200).json({
        data: proyect
    });
};

// updating a proyect
const updateProyect = async (req: Request, res: Response, next: NextFunction) => {
    // get the proyect id from the req.params
    const id: string = req.params.id;
    // get the data from req.body
    const description: string = req.body.description ?? null;
    // update the user
    const response: Proyect = await prisma.project.update({
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
        message: 'Proyect update successfully'
    });
};

// deleting a proyect
const deleteProyect = async (req: Request, res: Response, next: NextFunction) => {
    // get the proyect id from req.params
    const id: string = req.params.id;
    // delete the proyect
    const response: Proyect = await prisma.project.delete({
        where: {
            id
        }
    })
    // return response
    return res.status(200).json({
        data: response,
        message: 'Proyect deleted successfully'
    });
};

// adding a Proyect
const addProyect = async (req: Request, res: Response, next: NextFunction) => {
    // get the data from req.body
    const description: string = req.body.description;
    // add the user
    let response: Proyect = await prisma.user.create({
        data:{
            description
        }
    })
    // return response
    return res.status(200).json({
        data: response,
        message: 'Proyect insert successfully'
    });
};

export default { getProyects, getProyect, updateProyect, deleteProyect, addProyect };