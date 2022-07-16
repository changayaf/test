import express from 'express';
import users from '../controllers/users';
import projects from '../controllers/projects';
import bugs from '../controllers/bugs';
const router = express.Router();

// route users
//router.get('/users', users.getUsers);
//router.get('/user/:id', users.getUser);
//router.put('/user/:id', users.updateUser);
//router.delete('/user/:id', users.deleteUser);
//router.post('/user', users.addUser);

// route projects
//router.get('/projects', projects.getProjects);
//router.get('/project/:id', projects.getProject);
//router.put('/project/:id', projects.updateProject);
//router.delete('/project/:id', projects.deleteProject);
//router.post('/project', projects.addProject);

// route bugs
router.get('/bugs', bugs.getBugs);
router.post('/bugs', bugs.getBugsPut);
//router.get('/bug/:id', bugs.getBug);
//router.put('/bug/:id', bugs.updateBug);
//router.delete('/bug/:id', bugs.deleteBug);
router.post('/bug', bugs.addBug);

export = router;