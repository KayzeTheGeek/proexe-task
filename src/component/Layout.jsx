import styled from "styled-components";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { fetchUsers } from "../Redux/userSlice";


const Container = styled(Box)`
  margin: auto;
  width: 90%;

  .main_container {
    border: 1px solid black;
    border-radius: 10px;
    box-shadow: 2px 2px 2px 5px #f5f5f5;
  }

  .dashboard_header {
    padding: 40px 0;
    font-weight: 700;
  }

  .table_desc {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    border-bottom: 1px solid black;
  }

  .table_center {
    padding: 10px;
  }
`;

const Layout = ({ Component, main, newUser }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();


    useEffect(() => {
      dispatch(fetchUsers());
    }, []);


  return (
    <Container>
      <Typography variant="h4" className="dashboard_header">
        Dashboard
      </Typography>
      <div className="main_container">
        <div className="table_desc">
          <Typography>{main ? "User list" : "Form"}</Typography>
          {main && (
            <Button variant="contained" onClick={() => navigate("/addUser")}>
              Add new
            </Button>
          )}
        </div>
        <div className="table_center">
          <Component newUser={newUser} />
        </div>
      </div>
    </Container>
  );
};
export default Layout;
