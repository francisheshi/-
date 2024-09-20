import { useState } from "react";
import { Card } from "@tremor/react";
import {
  Avatar,
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

const ITEM_HEIGHT = 48;
const options = ["Update Details", "Update Avatar"];

const Profile = ({ query }: { query: string }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [avatarText, setAvatarText] = useState("F.Sh.");
  const [editable, setEditable] = useState(false);
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("");
  const [fullName, setFullName] = useState("Write your name...");
  const [email, setEmail] = useState("Type in your email...");
  const [role, setRole] = useState("");
  const [age, setAge] = useState<number | string>(0);
  const open = Boolean(anchorEl);
  const avatarSize = 75;

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRole(event.target.value);
  };

  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGender(event.target.value);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value);
  };

  const handleAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setAge(value === "" ? "" : Number(value)); // Convert to number or keep as empty string
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditToggle = () => {
    setEditable(!editable);
    handleClose();
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

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
                  accept="image/*"
                  style={{ display: "none" }}
                  id="avatar-upload"
                  type="file"
                  onChange={handleAvatarChange}
                />
                <Avatar
                  src={
                    avatarText.startsWith("data:image/")
                      ? avatarText
                      : undefined
                  }
                  className="bg-purple-500"
                  style={{ height: avatarSize, width: avatarSize }}
                >
                  {!avatarText.startsWith("data:image/") && "F.Sh."}
                </Avatar>
              </div>

              <div className="flex justify-between text-center mt-4 mb-11">
                <TextField
                  id="full-name"
                  onChange={handleNameChange}
                  disabled={!editable}
                  variant="outlined"
                  className="w-[15%]"
                  label="Full Name"
                  value={fullName}
                  required
                />

                <TextField
                  id="age"
                  InputProps={{ inputProps: { min: 0 } }}
                  onChange={handleAgeChange}
                  disabled={!editable}
                  variant="outlined"
                  className="w-[15%]"
                  type="number"
                  label="Age"
                  value={age}
                  required
                />

                <TextField
                  id="status"
                  onChange={handleStatusChange}
                  disabled={!editable}
                  variant="outlined"
                  className="w-[15%]"
                  label="Status"
                  value={status}
                  required
                  select
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {status === "active" && (
                          <CheckCircle className="text-green-500" />
                        )}
                        {status === "inactive" && (
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
                id="email"
                onChange={handleEmailChange}
                disabled={!editable}
                defaultValue="Enter email"
                variant="outlined"
                className="w-[15%]"
                label="Email"
                value={email}
                type="email"
                required
              />

              <TextField
                id="gender"
                onChange={handleGenderChange}
                disabled={!editable}
                variant="outlined"
                className="w-[15%]"
                label="Gender"
                value={gender}
                required
                select
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {gender === "male" && <Male className="text-blue-500" />}
                      {gender === "female" && (
                        <Female className="text-pink-500" />
                      )}
                      {gender === "other" && (
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

              <TextField
                id="role"
                onChange={handleRoleChange}
                disabled={!editable}
                variant="outlined"
                className="w-[15%]"
                label="Roles"
                value={role}
                required
                select
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {role === "admin" && (
                        <Shield className="text-green-500" />
                      )}
                      {role === "editor" && (
                        <SupervisorAccount className="text-blue-500" />
                      )}
                      {role === "viewer" && (
                        <Visibility className="text-gray-500" />
                      )}
                    </InputAdornment>
                  ),
                }}
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="editor">Editor</MenuItem>
                <MenuItem value="viewer">Viewer</MenuItem>
              </TextField>
            </div>
          </CardDescription>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
