import { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../api/usersApi";
import type { User } from "../types/User";

export function useUsers() {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchUsers = async () => {
        console.log("🔥 Fetching users from server...");
        setIsLoading(true);
        setError(null);
        try {
            const data = await getUsers();
            setUsers(data);
        } catch (err) {
            console.error("Failed to fetch users:", err);
            setUsers([]); // Clear old data
            setError("Failed to connect to server. Please check if the server is running.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteUser(id);
            await fetchUsers();
        } catch (err) {
            console.error("Failed to delete user:", err);
            setError("Failed to delete user. Server may be down.");
            throw err; // Re-throw so component can handle it
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return {
        users,
        isLoading,
        error,
        fetchUsers,
        handleDelete,
    };
}