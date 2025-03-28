import { Navbar, Container, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

const Header = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token"); // Clear stored token
        navigate("/"); // Redirect to login
    };

    return (
        <Navbar bg="dark" variant="dark" className="px-4">
            <Container fluid className="d-flex justify-content-between">
                {/* Left: User List Text */}
                <Navbar.Brand className="fs-1 fw-bold">User List</Navbar.Brand>

                {/* Right: Logout Button */}
                <Button variant="danger" onClick={handleLogout}>
                    Logout
                </Button>
            </Container>
        </Navbar>
    )
}

export default Header
