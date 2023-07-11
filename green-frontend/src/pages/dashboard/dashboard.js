import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { fetchUserData } from "../../api/authenticationService";
import { UserProvider } from "../../UserProvider";
import { useNavigate } from "react-router-dom";
import NavBar from "../../comp/NavBar";

const MainWrapper = styled.div`
  padding-top: 40px;
`;

export const Dashboard = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});

  React.useEffect(() => {
    fetchUserData()
      .then((response) => {
        setData(response.data);
      })
      .catch((e) => {
        localStorage.clear();
        props.history.push("/");
      });
  }, []);

  const logOut = () => {
    localStorage.clear();
    props.history.push("/");
  };

  return (
    <UserProvider>
      <NavBar />
      <Container>
        <MainWrapper>
          <h4>Hello {data && `${data.firstName} ${data.lastName}`}</h4>
          <br></br>
          {data &&
            data.roles &&
            data.roles.filter((value) => value.roleCode === "ADMIN").length >
              0 && <Button type="variant">Add User</Button>}
          <br></br>

          <Button style={{ marginTop: "5px" }} onClick={() => logOut()}>
            Logout
          </Button>
        </MainWrapper>
      </Container>
    </UserProvider>
  );
};
