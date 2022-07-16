import express from 'express';
import users from '../controllers/users';
import projects from '../controllers/projects';
import bugs from '../controllers/bugs';
const router = express.Router();

// route users
router.get('/users', users.getUsers);
router.get('/users/:id', users.getUser);
router.put('/users/:id', users.updateUser);
router.delete('/users/:id', users.deleteUser);
router.post('/users', users.addUser);

// route projects
router.get('/projects', projects.getProjects);
router.get('/projects/:id', projects.getProject);
router.put('/projects/:id', projects.updateProject);
router.delete('/projects/:id', projects.deleteProject);
router.post('/projects', projects.addProject);

// route bugs
router.get('/bugs', bugs.getBugs);
router.get('/bugs/:id', bugs.getBug);
router.put('/bugs/:id', bugs.updateBug);
router.delete('/bugs/:id', bugs.deleteBug);
router.post('/bugs', bugs.addBug);

export = router;