import { useEffect, useState } from "react";
import { getUserById } from "../api/usersApi";
import type { User } from "../types/User";

export function useUser(id: number | null) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) {
            setUser(null);
            setIsLoading(false);
            setError(null);
            return;
        }

        const fetchUser = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const userData = await getUserById(id);
                setUser(userData);
            } catch (err) {
                console.error("Failed to fetch user:", err);
                setUser(null);
                setError("Failed to load user details");
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser();
    }, [id]);

    const refetch = async () => {
        if (!id) return;

        setIsLoading(true);
        setError(null);
        try {
            const userData = await getUserById(id);
            setUser(userData);
        } catch (err) {
            console.error("Failed to fetch user:", err);
            setUser(null);
            setError("Failed to load user details");
        } finally {
            setIsLoading(false);
        }
    };

    return {
        user,
        isLoading,
        error,
        refetch,
    };
}