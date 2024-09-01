export interface Task {
    _id: string;
    title: string;
    exp: number;
    description: string;
    tutorials: [];
}

export interface User {
    _id: string;
    username: string;
    avatar: string;
    exp: number;
    lvl: number;
    taskToday: number[];
}

export interface LoginData {
    username: string;
    password: string;
}

export interface UserProp {
    users: User[];
}

export interface TaskProp {
    tasks: Task[];
}

export interface Levels {
    exp: number;
    level: number;
}