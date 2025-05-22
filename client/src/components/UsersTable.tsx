import type { User } from "../types/User";
import { Button } from "./ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./ui/table";

interface Props {
    users: User[];
    onView: (id: number) => void;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

export default function UsersTable({ users, onView, onEdit, onDelete }: Props) {
    console.log('users', users);

    return (
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm dark:shadow-gray-900/10 mt-6 overflow-x-auto bg-white dark:bg-gray-900">
            <Table>
                <TableHeader>
                    <TableRow className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                        <TableHead className="w-[80px] text-gray-900 dark:text-gray-100 font-semibold">
                            ID
                        </TableHead>
                        <TableHead className="text-gray-900 dark:text-gray-100 font-semibold">
                            Name
                        </TableHead>
                        <TableHead className="text-gray-900 dark:text-gray-100 font-semibold">
                            Email
                        </TableHead>
                        <TableHead className="text-right text-gray-900 dark:text-gray-100 font-semibold">
                            Actions
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user) => (
                        <TableRow
                            key={user.id}
                            className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                        >
                            <TableCell className="text-gray-700 dark:text-gray-300 font-mono">
                                {user.id}
                            </TableCell>
                            <TableCell className="text-gray-900 dark:text-gray-100 font-medium">
                                {user.name}
                            </TableCell>
                            <TableCell className="text-gray-600 dark:text-gray-400">
                                {user.email}
                            </TableCell>
                            <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => onView(user.id)}
                                        className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100"
                                    >
                                        View
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        onClick={() => onEdit(user.id)}
                                        className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700"
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => onDelete(user.id)}
                                        className="bg-red-600 dark:bg-red-700 text-white hover:bg-red-700 dark:hover:bg-red-800"
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                    {users.length === 0 && (
                        <TableRow>
                            <TableCell
                                colSpan={4}
                                className="text-center py-8 text-gray-500 dark:text-gray-400"
                            >
                                No users found
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}