import { useUser } from "../hooks/useUser"; // Adjust import path as needed
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function UserDetails({
    id,
    onClose
}: {
    id: number;
    onClose: () => void;
}) {
    const { user, isLoading, error, refetch } = useUser(id);

    return (
        <Dialog open onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>User Details</DialogTitle>
                    <DialogDescription>
                        View detailed information about the selected user.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    {isLoading && (
                        <div className="flex items-center justify-center py-8">
                            <p className="text-muted-foreground">Loading user...</p>
                        </div>
                    )}

                    {error && (
                        <div className="text-red-500 dark:text-red-400 text-center py-4 space-y-2">
                            <p>{error}</p>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={refetch}
                                className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                            >
                                Try Again
                            </Button>
                        </div>
                    )}

                    {user && !isLoading && (
                        <div className="space-y-3">
                            <div className="flex flex-col space-y-1">
                                <span className="text-sm font-medium text-muted-foreground">ID</span>
                                <span className="text-base">{user.id}</span>
                            </div>

                            <div className="flex flex-col space-y-1">
                                <span className="text-sm font-medium text-muted-foreground">Name</span>
                                <span className="text-base font-medium">{user.name}</span>
                            </div>

                            <div className="flex flex-col space-y-1">
                                <span className="text-sm font-medium text-muted-foreground">Email</span>
                                <span className="text-base">{user.email}</span>
                            </div>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}