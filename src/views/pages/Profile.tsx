import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Card } from "@tremor/react";
import {
  Avatar,
  Button,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  TextField,
} from "@mui/material";
import { CardDescription, CardTitle } from "../../components/ui/card";
import { CheckCircle } from "lucide-react";
import {
  Shield,
  SupervisorAccount,
  Visibility,
  Male,
  Female,
  Transgender,
  Cancel,
} from "@mui/icons-material";
import { useLocation } from "react-router-dom";

const ITEM_HEIGHT = 48;
const options = ["Update Details", "Update Avatar"];

const Profile = ({ query }: { query: string }) => {
  const location = useLocation();
  const newUser = location.state?.newUser || {}; // Get the new user data from registration.

  // Refs for user fields
  const fullNameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const ageRef = useRef<HTMLInputElement | null>(null);
  const roleRef = useRef<HTMLSelectElement | null>(null);
  const statusRef = useRef<HTMLSelectElement | null>(null);
  const genderRef = useRef<HTMLSelectElement | null>(null);
  const [avatarText, setAvatarText] = useState(
    `${newUser.name?.charAt(0) || "F"}.${newUser.surname?.charAt(0) || "S"}.`
  );
  const [editableFields, setEditableFields] = useState({
    fullName: false, // Set to false for disabled by default
    email: false,
    age: false,
    role: false,
    status: false,
    gender: false,
  });

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const avatarSize = 75;

  const handleSubmit = () => {
    // Save changes using refs
    const updatedProfile = {
      fullName: fullNameRef.current?.value,
      email: emailRef.current?.value,
      age: Number(ageRef.current?.value),
      role: roleRef.current?.value,
      status: statusRef.current?.value,
      gender: genderRef.current?.value,
    };

    console.log("Updated Profile:", updatedProfile);

    // Disable edited fields
    setEditableFields((prev) => ({
      ...prev,
      fullName: false,
      email: false,
      age: false,
      role: false,
      status: false,
      gender: false,
    }));
  };

  const handleEditToggle = () => {
    setEditableFields((prev) => ({
      ...prev,
      fullName: true,
      email: true,
      age: true,
      role: true,
      status: true,
      gender: true,
    }));
    handleClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClick = (option: string) => {
    switch (option) {
      case "Update Details":
        handleEditToggle();
        break;
      case "Update Avatar":
        document.getElementById("avatar-upload")?.click();
        break;
      default:
        console.log("Unknown option selected");
    }
  };

  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setAvatarText(base64String); // Save the base64 image string as the avatar
      };
      reader.readAsDataURL(file); // Convert the file to base64
    }
    handleClose();
  };

  return (
    <div className="flex-1 p-10 text-lg">
      <CardTitle className="text-[34px]">My Profile</CardTitle>
      <div className="grid place-items-center h-[85vh] mb-2">
        <Card className="shadow-lg rounded-2xl">
          <div className="justify-between flex">
            <CardTitle className="text-[26px]">User Details</CardTitle>
            <IconButton
              aria-controls={open ? "long-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              aria-haspopup="true"
              aria-label="more"
              id="long-button"
            >
              ...
            </IconButton>
            <Menu
              onClose={handleClose}
              anchorEl={anchorEl}
              id="long-menu"
              MenuListProps={{
                "aria-labelledby": "long-button",
              }}
              open={open}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: "20ch",
                },
              }}
            >
              {options.map((option) => (
                <MenuItem
                  onClick={() => handleMenuClick(option)}
                  selected={option === "Update Details"}
                  key={option}
                >
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </div>
          <hr />
          <CardDescription className="mt-10">
            <div>
              <div className="flex justify-start text-center mt-11 ml-16">
                <input
                  onChange={handleAvatarChange}
                  style={{ display: "none" }}
                  id="avatar-upload"
                  accept="image/*"
                  type="file"
                />
                <Avatar
                  src={
                    avatarText.startsWith("data:image/")
                      ? avatarText
                      : undefined
                  }
                  style={{ height: avatarSize, width: avatarSize }}
                  className="bg-purple-500"
                >
                  {!avatarText.startsWith("data:image/") &&
                    `${newUser.name?.charAt(0) || "F"}.${
                      newUser.surname?.charAt(0) || "S"
                    }`}
                </Avatar>
              </div>

              <div className="flex justify-between text-center mt-4 mb-11">
                <TextField
                  inputRef={fullNameRef}
                  defaultValue={`${newUser.name || ""} ${
                    newUser.surname || ""
                  }`}
                  disabled={!editableFields.fullName}
                  className="w-[15%]"
                  variant="outlined"
                  label="Full Name"
                  id="full-name"
                  required
                />

                <TextField
                  inputRef={ageRef}
                  InputProps={{ inputProps: { min: 0 } }}
                  defaultValue={newUser.age || 0}
                  disabled={!editableFields.age}
                  className="w-[15%]"
                  variant="outlined"
                  label="Age"
                  id="age"
                  required
                />

                <TextField
                  inputRef={statusRef}
                  defaultValue={newUser.status || ""}
                  disabled={!editableFields.status}
                  className="w-[15%]"
                  variant="outlined"
                  label="Status"
                  id="status"
                  required
                  select
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {statusRef.current?.value === "active" && (
                          <CheckCircle className="text-green-500" />
                        )}
                        {statusRef.current?.value === "inactive" && (
                          <Cancel className="text-blue-500" />
                        )}
                      </InputAdornment>
                    ),
                  }}
                >
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                </TextField>
              </div>
            </div>

            <div className="flex justify-between text-center mt-4 mb-11">
              <TextField
                inputRef={emailRef}
                defaultValue={newUser.email || ""}
                disabled={!editableFields.email}
                className="w-[15%]"
                variant="outlined"
                label="Email"
                id="email"
                type="email"
                required
              />

              <TextField
                inputRef={roleRef}
                defaultValue={newUser.role || ""}
                disabled={!editableFields.role}
                className="w-[15%]"
                variant="outlined"
                label="Role"
                id="role"
                required
                select
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {roleRef.current?.value === "admin" && (
                        <SupervisorAccount className="text-blue-500" />
                      )}
                      {roleRef.current?.value === "user" && (
                        <Shield className="text-yellow-500" />
                      )}
                    </InputAdornment>
                  ),
                }}
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="user">User</MenuItem>
              </TextField>

              <TextField
                inputRef={genderRef}
                defaultValue={newUser.gender || ""}
                disabled={!editableFields.gender}
                className="w-[15%]"
                variant="outlined"
                label="Gender"
                id="gender"
                required
                select
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {genderRef.current?.value === "male" && (
                        <Male className="text-blue-500" />
                      )}
                      {genderRef.current?.value === "female" && (
                        <Female className="text-pink-500" />
                      )}
                      {genderRef.current?.value === "other" && (
                        <Transgender className="text-purple-500" />
                      )}
                    </InputAdornment>
                  ),
                }}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </TextField>
            </div>

            <Button
              onClick={handleSubmit}
              className="bg-blue-500 text-white mt-4"
              variant="contained"
            >
              Save Changes
            </Button>
          </CardDescription>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
