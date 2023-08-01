import React, { useContext, useState } from "react";
import { Button, Col, Container, Row, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Directions from "../Directions";
import jwtDecode from "jwt-decode";
import { AuthContext } from "../Context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const [tokenData, setTokenData] = useState(null);
  const { token, role, login, logout } = useContext(AuthContext);

  function sendLoginRequest() {
    <Directions />;
    setErrorMsg("");
    const reqBody = {
      email: username,
      password: password,
    };
    var token = null;

    fetch("http://localhost:8080/api/auth/authenticate", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
      body: JSON.stringify(reqBody),
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        else if (response.status === 401 || response.status === 403) {
          setErrorMsg("Invalid username or password");
        } else {
          setErrorMsg("Something went wrong, try again later");
        }
      })
      .then((data) => {
        setTokenData(data);
        console.log("data", data);
        token = data.access_token;
        const decodedToken = jwtDecode(token);
        fetch(
          `http://localhost:8080/api/user/userrole?email=${decodedToken.sub}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            method: "get",
          }
        )
          .then((response) => {
            if (response.status === 200) return response.json();
            else if (response.status === 401 || response.status === 403) {
              setErrorMsg("Invalid username or password");
            } else {
              setErrorMsg("Something went wrong, try again later");
            }
          })
          .then((data) => {
            console.log("role", data);
            console.log("token", token);
            localStorage.setItem("token", token);
            localStorage.setItem("role", data);
            navigate("/dashboard");
          });
      });
  }
  return (
    <>
      <Container>
        <Row className="justify-content-center mt-5">
          <Col md="8" lg="6">
            <Form.Group className="mb-3" controlId="username">
              <Form.Label className="fs-4">Username</Form.Label>
              <Form.Control
                type="email"
                size="lg"
                placeholder="joe@gmail.com"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col md="8" lg="6">
            <Form.Group className="mb-3" controlId="password">
              <Form.Label className="fs-4">Password</Form.Label>
              <Form.Control
                type="password"
                size="lg"
                placeholder="Type in your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        {errorMsg ? (
          <Row className="justify-content-center mb-4">
            <Col md="8" lg="6">
              <div className="" style={{ color: "red", fontWeight: "bold" }}>
                {errorMsg}
              </div>
            </Col>
          </Row>
        ) : (
          <></>
        )}
        <Row className="justify-content-center">
          <Col
            md="8"
            lg="6"
            className="mt-2 d-flex flex-column gap-5 flex-md-row justify-content-md-between"
          >
            <Button
              id="submit"
              type="button"
              size="lg"
              onClick={() => sendLoginRequest()}
            >
              Login
            </Button>
            <Button
              variant="secondary"
              type="button"
              size="lg"
              onClick={() => {
                navigate("/");
              }}
            >
              Exit
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
