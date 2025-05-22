import { useState } from "react";
import { updateUser } from "../api/usersApi";
import type { User } from "../types/User";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function EditUserForm({
    user,
    onSave,
    onCancel,
}: {
    user: User;
    onSave: () => void;
    onCancel: () => void;
}) {
    const [formData, setFormData] = useState({ name: user.name, email: user.email });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await updateUser(user.id, formData);
            onSave(); // This will refresh data and close the form
        } catch (error) {
            console.error("Failed to update user:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="w-full max-w-md mx-4">
                <form
                    onSubmit={handleSubmit}
                    className="space-y-6 p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl dark:shadow-2xl"
                >
                    <div className="space-y-2">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                            Edit User
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Update the user information below
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label
                                htmlFor="name"
                                className="text-gray-700 dark:text-gray-300 font-medium"
                            >
                                Name
                            </Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Enter name"
                                required
                                className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label
                                htmlFor="email"
                                className="text-gray-700 dark:text-gray-300 font-medium"
                            >
                                Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="Enter email"
                                required
                                className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400"
                            />
                        </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Saving...
                                </div>
                            ) : (
                                "Save Changes"
                            )}
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onCancel}
                            disabled={isSubmitting}
                            className="flex-1 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}