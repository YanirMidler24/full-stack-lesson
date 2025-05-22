import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function DeleteUserDialog({
    id,
    onDelete,
    onCancel,
}: {
    id: number;
    onDelete: () => void;
    onCancel: () => void;
}) {
    return (
        <Dialog open onOpenChange={(open) => !open && onCancel()}>
            <DialogContent className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                <DialogHeader>
                    <DialogTitle className="text-gray-900 dark:text-gray-100">
                        Delete User #{id}
                    </DialogTitle>
                    <DialogDescription className="text-gray-600 dark:text-gray-400">
                        Are you sure you want to delete this user? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className="gap-2">
                    <Button
                        variant="outline"
                        onClick={onCancel}
                        className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={onDelete}
                        className="bg-red-600 dark:bg-red-700 text-white hover:bg-red-700 dark:hover:bg-red-800"
                    >
                        Yes, Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}