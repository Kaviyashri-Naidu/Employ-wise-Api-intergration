import { useState } from "react"
import { updateUser } from "./ApiCall"
import Swal from "sweetalert2"
import { Modal, Button, Form } from "react-bootstrap"

const Edit = ({ show, onHide, user, setUsers }) => {
    const [editedName, setEditedName] = useState(`${user.first_name} ${user.last_name}`);

    const handleSave = async () => {
        try {
            const [firstName, lastName] = editedName.split(" ");
            const updatedUser = await updateUser(user.id, { first_name: firstName, last_name: lastName });

            setUsers(prevUsers =>
                prevUsers.map(u => (u.id === user.id ? { ...u, first_name: firstName, last_name: lastName } : u))
            );

            Swal.fire({
                title: "Updated!",
                text: "User details updated successfully.",
                icon: "success",
                timer: 1500,
                showConfirmButton: false
            });
            onHide();
        } catch (err) {
            Swal.fire({
                title: "Error!",
                text: err.error || "Failed to update user.",
                icon: "error",
            });
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Edit User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={editedName} 
                            onChange={(e) => setEditedName(e.target.value)} 
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Cancel</Button>
                <Button variant="primary" onClick={handleSave}>Save Changes</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default Edit