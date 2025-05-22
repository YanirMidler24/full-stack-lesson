import axios from "axios";
import type { User } from "../types/User";

const API_BASE = "http://localhost:9000/users";

export const getUsers = async (): Promise<User[]> => {
    const res = await axios.get<User[]>(API_BASE);
    return res.data;
};

export const getUserById = async (id: number): Promise<User> => {
    const res = await axios.get<User>(`/${API_BASE}/${id}`);
    return res.data;
};

export const createUser = async (user: Omit<User, "id">): Promise<User> => {
    const res = await axios.post<User>(API_BASE, user);
    return res.data;
};

export const updateUser = async (
    id: number,
    user: Partial<User>
): Promise<User> => {
    const res = await axios.put<User>(`${API_BASE}/${id}`, user);
    return res.data;
};

export const deleteUser = async (id: number): Promise<void> => {
    await axios.delete(`${API_BASE}/${id}`);
};
