
import { Request, Response } from 'express';

import { User } from '../interface';

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// getting all users
const getUsers = async (req: Request, res: Response) => {
    // get all users
    const users: [User] = await prisma.user.findMany({
        include: {
            bugs: true
        }
    });
    return res.status(200).json({
        data: users
    });
};

// getting a single user
const getUser = async (req: Request, res: Response) => {
    // get the user id from the req
    const id: string = req.params.id;
    // get the user
    const user: User = await prisma.user.findUnique({
        where: {
            id: id
        },
        include: {
            bugs: true
        }
    });
    return res.status(200).json({
        data: user
    });
};

// updating a user
const updateUser = async (req: Request, res: Response) => {
    // get the user id from the req.params
    const id: string = req.params.id;
    // get the data from req.body
    let name: string = req.body.name ?? null;
    let surname: string = req.body.surname ?? null;
    // update the user
    let response: User = await prisma.user.update({
        where: {
            id
        },
        data: {
            name,
            surname
        }
    })
    // return response
    return res.status(200).json({
        data: response,
        message: 'User update successfully'
    });
};

// deleting a user
const deleteUser = async (req: Request, res: Response) => {
    // get the user id from req.params
    const id: string = req.params.id;
    // delete the user
    const response: User = await prisma.user.delete({
        where: {
            id
        }
    })
    // return response
    return res.status(200).json({
        data: response,
        message: 'User deleted successfully'
    });
};

// adding a user
const addUser = async (req: Request, res: Response) => {
    // get the data from req.body
    const name: string = req.body.title;
    const surname: string = req.body.surname;
    // add the user
    let response: User = await prisma.user.create({
        data:{
            name,
            surname
        }
    })
    // return response
    return res.status(200).json({
        data: response,
        message: 'User insert successfully'
    });
};

export default { getUsers, getUser, updateUser, deleteUser, addUser };