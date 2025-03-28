import { useState, useEffect } from "react"
import { fetchUsers } from "./ApiCall"
import EditUserModal from "./Edit"
import DeleteUser from "./Delete"
import Header from './Header'
import { Container, Row, Col, Card } from "react-bootstrap"
import { Pencil, Trash2 } from "lucide-react"

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const data = await fetchUsers();
                setUsers(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        loadUsers();
    }, []);
    
    return (
      < >
      <Header />
        <Container className="mt-5" >
            <h2 className="text-center mb-4">User List</h2>

            {loading ? (
                <div className="text-center">Loading...</div>
            ) : (
                <Row className="g-4">
                    {users.map(user => (
                        <Col key={user.id} xs={12} sm={6} md={4} lg={3}>
                            <Card className="shadow-sm border-0 text-center">
                                <Card.Img 
                                    variant="top" 
                                    src={user.avatar} 
                                    alt={user.first_name} 
                                    className="rounded-circle mx-auto mt-3"
                                    style={{ width: "80px", height: "80px" }}
                                />
                                <Card.Body>
                                    <Card.Title>{user.first_name} {user.last_name}</Card.Title>
                                    <Card.Text>{user.email}</Card.Text>
                                    <div className="d-flex justify-content-center gap-3">
                                        <Pencil 
                                            className="icon edit-icon" 
                                            onClick={() => { setSelectedUser(user); setShowEditModal(true); }}
                                        />
                                        <DeleteUser userId={user.id} setUsers={setUsers} />
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}

            {/* Edit Modal */}
            {selectedUser && (
                <EditUserModal 
                    show={showEditModal} 
                    onHide={() => setShowEditModal(false)} 
                    user={selectedUser} 
                    setUsers={setUsers} 
                />
            )}
        </Container>
        </>
    )
}

export default UserList
