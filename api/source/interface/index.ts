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

export {User, Project, Bug}