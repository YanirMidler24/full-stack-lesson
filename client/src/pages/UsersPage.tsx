import { useState } from "react";
import { useUsers } from "../hooks/useUsers"; // Adjust import path as needed

import DeleteUserDialog from "../components/DeleteUserDialog";
import EditUserForm from "../components/EditUserForm";
import UserDetails from "../components/UserDetails";
import UsersTable from "../components/UsersTable";

export default function UsersPage() {
    const { users, isLoading, error, fetchUsers, handleDelete } = useUsers();
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [editId, setEditId] = useState<number | null>(null);
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const handleDeleteUser = async (id: number) => {
        try {
            await handleDelete(id);
            setDeleteId(null);
        } catch (err) {
            console.error("Failed to delete user:", err);
            setErrorMessage("Failed to delete user. Server may be down.");
        }
    };

    const handleEditSave = async () => {
        await fetchUsers();
        setEditId(null); // Close the edit form
    };

    const userToEdit = editId ? users.find((u) => u.id === editId) : null;

    if (isLoading) return <p className="text-muted-foreground">Loading users...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (errorMessage) return <p className="text-red-500">{errorMessage}</p>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold tracking-tight">Users Management</h2>

            <UsersTable
                users={users}
                onView={setSelectedId}
                onEdit={setEditId}
                onDelete={setDeleteId}
            />


            {selectedId && (
                <UserDetails
                    id={selectedId}
                    onClose={() => setSelectedId(null)}
                />
            )}

            {userToEdit && (
                <EditUserForm
                    user={userToEdit}
                    onSave={handleEditSave}
                    onCancel={() => setEditId(null)}
                />
            )}


            {deleteId && (
                <DeleteUserDialog
                    id={deleteId}
                    onDelete={() => handleDeleteUser(deleteId)}
                    onCancel={() => setDeleteId(null)}
                />
            )}
        </div>
    );
}