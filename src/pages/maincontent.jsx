import styled from "styled-components";
import { Box, Typography, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import DeleteButton from "../component/DeleteModal";
import { useNavigate } from "react-router-dom";
import {setID} from "../Redux/userSlice"


const MainContainer = styled(Box)`
  border: 1px solid black;

  .button {
    padding: 0.7%;
    text-transform: none;
    color: white;

    &:nth-of-type(1) {
      background-color: #eeac57;
    }
    &:last-of-type {
      background-color: #f1453d;
    }
  }

  .flex {
    display: flex;
    justify-content: space-around;
    text-align: center;
    padding: 35px 0;
    border-bottom: 1px solid black;

    &:last-child {
      border-bottom: none;
    }

    & > * {
      flex: 0 1 calc(100% / 8);
    }
  }

  .table_header {
    background-color: #f5f5f5;
  }

  .no_data {
    padding: 50px 0;
    text-align: center;
    font-weight: 600;
    font-size: 30px;
  }
`;

const Nodata = () => <div className="no_data">No user data</div>;

const MainContent = () => {
  const data = useSelector(({ users }) => users);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (data.status === "idle") {
    return <div>loading</div>;
  }

  if (data.status === "failed") {
    return <div>network error</div>;
  }

  return (
    <MainContainer className="table_container">
      <div className="table_header flex">
        <Typography>Id</Typography>
        <Typography>Name</Typography>
        <Typography>Username</Typography>
        <Typography>Email</Typography>
        <Typography>City</Typography>
        <Typography>Edit</Typography>
        <Typography>Delete</Typography>
      </div>

      <div className="table_body">
        {data.usersList.length > 0 ? (
          data.usersList.map(({ id, name, username, email, city }, i) => (
            <div className="table_item flex" key={i}>
              {" "}
              <Typography>{id}</Typography>
              <Typography>{name}</Typography>
              <Typography>{username}</Typography>
              <Typography>{email}</Typography>
              <Typography>{city}</Typography>
              <Button
                className="button"
                onClick={() => {
                  dispatch(setID(id));
                  navigate("/edit");
                }}
              >
                edit
              </Button>
              <DeleteButton id={id} />
            </div>
          ))
        ) : (
          <Nodata />
        )}
      </div>
    </MainContainer>
  );
};

export default MainContent;
