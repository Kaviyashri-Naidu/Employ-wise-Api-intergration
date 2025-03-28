import { deleteUser } from "./ApiCall"
import Swal from "sweetalert2"
import { Trash2 } from "lucide-react"

const Delete = ({ userId, setUsers }) => {
    const handleDelete = async () => {
        Swal.fire({
            title: "Are you sure?",
            text: "This user will be permanently deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteUser(userId);
                    setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));

                    Swal.fire({
                        title: "Deleted!",
                        text: "User has been deleted.",
                        icon: "success",
                        timer: 1500,
                        showConfirmButton: false
                    });
                } catch (err) {
                    Swal.fire({
                        title: "Error!",
                        text: err.error || "Failed to delete user.",
                        icon: "error",
                    });
                }
            }
        })
    }

    return <Trash2 className="icon delete-icon" onClick={handleDelete} />;
}

export default Delete