import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Avatar,
  Button,
  Paper,
  Typography,
  TextField,
} from "@material-ui/core";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import CommonHeader from "../../components/Common/CommonHeader";
import Styles from "./Profile.module.css";
import ToggleProfileInfo from "./ToggleProfileInfo/ToggleProfileInfo";
import photo from "../../assets/images/adminProfile.jpg"
import { useDispatch } from "react-redux";
import base from "../TestInfo/BaseUrl";
 // Import default profile photo

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState({
    userName: "",
    id: "",
    preferredLanguage: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePicture: user.profilePicture,
  });
  const [errors, setErrors] = useState({});

  const isAdmin = user.role === "Admin";

  useEffect(() => {
    setEditedUser({
      userName: user.userName,
      id: user.id,
      preferredLanguage: user.preferredLanguage,
      email: user.email,
      password: "",
      confirmPassword: "",
      profilePicture: user.profilePicture,
    });
  }, [user]);

  const handleEditProfile = () => {
    setEditMode(true);
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!editedUser.userName.trim()) {
      newErrors.userName = "Please enter your name";
      isValid = false;
    }

    if (!editedUser.email.trim()) {
      newErrors.email = "Please enter your email";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(editedUser.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (editMode) {
      if (!editedUser.password.trim()) {
        newErrors.password = "Please enter your password";
        isValid = false;
      } else if (editedUser.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters long";
        isValid = false;
      }

      if (editedUser.password !== editedUser.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (e) => {
    if (e.target.name === "profilePicture") {
      setEditedUser({
        ...editedUser,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setEditedUser({
        ...editedUser,
        [e.target.name]: e.target.value,
      });
    }
  };
  const dispatch = useDispatch();
  const handleSaveProfile = () => {
    if (!validateForm()) {
      return;
    }

    const formData = new FormData();
    formData.append("userName", editedUser.userName);
    formData.append("id", editedUser.id);
    formData.append("preferredLanguage", editedUser.preferredLanguage);
    formData.append("email", editedUser.email);
    formData.append("password", editedUser.password);
    formData.append("confirmPassword", editedUser.confirmPassword);
    formData.append("profilePicture", editedUser.profilePicture);

    axios
      .put(`${base}/auth/update-admin/64652a7b77f6da47caadb75e`, formData)
      .then((response) => {
        console.log("Profile saved successfully");
        console.log(response.data.userData);
       
        dispatch({ type: "SET__USER", payload:response.data.userData});
        setEditMode(false);
      })
      .catch((error) => {
        console.error("Error saving profile:", error);
      });
  };

  return (
    <div className={Styles.main}>
      <CommonHeader title={user && user.userName && user.userName} />
      <div className={Styles.avatar}>
        {editMode ? (
          <input
            type="file"
            accept="image/*"
            name="profilePicture"
            onChange={handleInputChange}
          />
        ) : (
          <img
            className={Styles.avatar__profile__pic}
            style={{
              height: "40px",
              width: "60px",
              objectFit: "contain",
            }}
            src={user.profilePicture} // Use default profile photo if profilePicture is not available
            alt=""
          />
        )}
      </div>
      <Container fluid className="mb-5">
        <Row>
          <Col md={4}></Col>
          <Col md={4} className="">
            <Paper className="p-4 m-3 d-flex flex-column shadow">
              <Typography className="my-3 text-primary" variant="h5">
                Profile
              </Typography>
              <Typography
                className="my-2"
                style={{ color: "gray" }}
                variant="body2"
              >
                Full name
              </Typography>
              {editMode ? (
                <>
                  <TextField
                    name="userName"
                    variant="outlined"
                    value={editedUser.userName}
                    onChange={handleInputChange}
                    error={!!errors.userName}
                    helperText={errors.userName}
                  />
                  <br />
                </>
              ) : (
                <Typography variant="body1">
                  {user && user.userName && user.userName}
                </Typography>
              )}
              {!isAdmin && (
                <>
                  <Typography
                    className="my-2"
                    style={{ color: "gray" }}
                    variant="body2"
                  >
                    Student Id
                  </Typography>
                  {editMode ? (
                    <>
                      <TextField
                        name="id"
                        variant="outlined"
                        value={editedUser.id}
                        onChange={handleInputChange}
                      />
                      <br />
                    </>
                  ) : (
                    <Typography variant="body1">
                      {user && user.id && user.id}
                    </Typography>
                  )}
                </>
              )}

              <Typography
                className="my-2"
                style={{ color: "gray" }}
                variant="body2"
              >
                Email address
              </Typography>
              {editMode ? (
                <>
                  <TextField
                    name="email"
                    variant="outlined"
                    value={editedUser.email}
                    onChange={handleInputChange}
                    error={!!errors.email}
                    helperText={errors.email}
                  />
                  <br />
                </>
              ) : (
                <Typography variant="body1">
                  {user && user.email && user.email}
                </Typography>
              )}

              {isAdmin && editMode && (
                <>
                  <Typography
                    className="my-2"
                    style={{ color: "gray" }}
                    variant="body2"
                  >
                    New Password
                  </Typography>
                  <TextField
                    name="password"
                    type="password"
                    variant="outlined"
                    value={editedUser.password}
                    onChange={handleInputChange}
                    error={!!errors.password}
                    helperText={errors.password}
                  />
                  <br />
                  <Typography
                    className="my-2"
                    style={{ color: "gray" }}
                    variant="body2"
                  >
                    Confirm Password
                  </Typography>
                  <TextField
                    name="confirmPassword"
                    type="password"
                    variant="outlined"
                    value={editedUser.confirmPassword}
                    onChange={handleInputChange}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword}
                  />
                </>
              )}

              <Typography
                className="my-2"
                style={{ color: "gray" }}
                variant="body2"
              >
                First access to site
              </Typography>
              <Typography variant="body1">
                Sunday, 14 June 2023, 8:44 AM
              </Typography>
              <br />
              <Typography
                className="my-2"
                style={{ color: "gray" }}
                variant="body2"
              >
                Last access to site
              </Typography>
              <Typography variant="body1">
                Wednesday,25 June 2023, 2:44 PM
              </Typography>
              {isAdmin && !editMode && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleEditProfile}
                >
                  Edit Profile
                </Button>
              )}
              {editMode && (
                <>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSaveProfile}
                  >
                    Save Profile
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => setEditMode(false)}
                  >
                    Cancel
                  </Button>
                </>
              )}
            </Paper>
          </Col>
          <Col md={4}></Col>
        </Row>
      </Container>
    </div>
  );
};

export default Profile;
