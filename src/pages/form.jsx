import styled from "styled-components";
import { Typography, Button } from "@mui/material";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser, updateUser } from "../Redux/userSlice";

const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>
        <Typography>{label}</Typography>
      </label>
      <div>
        <input
          {...field}
          {...props}
          type="text"
          className={meta.touched && meta.error && "inputError"}
        />
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </div>
    </>
  );
};

const FormInput = ({ className, newUser }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userID = useSelector(({ users }) => users.userID);


  return (
    <Formik
      initialValues={{ name: "", email: "" }}
      validationSchema={Yup.object({
        name: Yup.string().required("Name field is required"),
        email: Yup.string()
          .email("Invalid email address")
          .required("Email field is required"),
      })}
      onSubmit={(values) => {
        if (newUser) {
          dispatch(addUser(values));
          navigate("/");
          return;
        }
    
        dispatch(updateUser({ id: userID, ...values }));
        navigate("/");
      }}
    >
      <Form className={className}>
        <div className="input_container">
          <div className="item">
            <MyTextInput label="Name" name="name" type="text" />
          </div>
          <div className="item">
            <MyTextInput label="Email" name="email" type="email" />
          </div>
        </div>

        <div className="button_container">
          <Button
            onClick={() => navigate("/")}
            variant="contained"
            className="form_button"
          >
            Cancel
          </Button>
          <Button type="submit" variant="contained" className="form_button">
            Submit
          </Button>
        </div>
      </Form>
    </Formik>
  );
};

const FormContainer = styled(FormInput)`
  padding: 50px 0;

  input {
    border: 1px solid #bcbcbc;
    outline: none;
    width: 100%;
    padding: 10px 0;
    margin-bottom: 10px;
  }

  .input_container {
    .item {
      display: flex;
      align-items: center;

      & > * {
        margin-bottom: 20px;
      }

      & > *:nth-child(1) {
        flex: 30%;
        text-align: center;
      }

      & > *:nth-child(2) {
        flex: 70%;
      }
    }
    .inputError {
      border-color: #f1453d;
    }
    .error {
      color: #f1453d;
    }
  }
  .button_container {
    display: flex;
    justify-content: right;

    .form_button {
      margin-left: 15px;
      text-transform: none;
      width: 9%;

      &:nth-child(1) {
        background-color: transparent;
        border: 1px solid #f20e0e;
        color: #f20e0e;
      }

      &:nth-child(2) {
        background-color: #5fb760;
      }
    }
  }
`;

export default FormContainer;
