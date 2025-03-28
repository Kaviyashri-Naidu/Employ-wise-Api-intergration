import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { loginUser } from "./ApiCall"
import Swal from "sweetalert2"
import { Container, Form, Button, Card } from "react-bootstrap"

const Login = () => {
  const [email, setEmail] = useState("eve.holt@reqres.in")
  const [password, setPassword] = useState("cityslicka")
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(email, password);
      localStorage.setItem("token", data.token);

      Swal.fire({
        title: "Login Successful!",
        text: "Redirecting to User List...",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
      setTimeout(() => navigate("/user"), 2000);
    } catch (err) {
      Swal.fire({
        title: "Login Failed!",
        text: err.error || "Invalid Credentials",
        icon: "error",
      });
    }
  }

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(to right,rgb(80, 80, 83),rgb(191, 194, 199))",
      }}
    >
      <Card className="p-4 shadow-lg rounded-lg" style={{ width: "400px", backgroundColor: "#ffffffcc" }}>
        <Card.Body>
          <h2 className="text-center mb-4 text-primary">Welcome Back!</h2>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="rounded-pill"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="rounded-pill"
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="w-100 rounded-pill"
              style={{ fontWeight: "bold", letterSpacing: "1px" }} onClick={handleLogin}
            >
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default Login
