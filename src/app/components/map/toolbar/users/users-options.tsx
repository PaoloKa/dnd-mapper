"use client";
import { useState } from "react";
import {
  Button,
  Box,
  TextField,
  Card,
  CardContent,
  Typography,
  IconButton,
  Slider,
  Select,
  MenuItem,
  Avatar,
  Collapse,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMapStore } from "../../../../store";
import {
  Character,
  DndRace,
  DndRole,
  dndRoles,
  races,
} from "../../../../types";

export default function UserOptions() {
  const [name, setName] = useState("");
  const [role, setRole] = useState<DndRole | "">("");
  const [race, setRace] = useState<DndRace | "">("");
  const [lifepoints, setLifepoints] = useState(100);
  const [avatar, setAvatar] = useState("");
  const [armorClass, setArmorClass] = useState(10);
  const [movementSpeed, setMovementSpeed] = useState(30);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<Character | null>(null);
  const { users, addUser, removeUser } = useMapStore();

  const handleSaveUser = () => {
    if (name.trim() && role && race) {
      if (editingUser) {
        removeUser(editingUser.id);
      }
      addUser({
        id: editingUser?.id || Date.now(),
        name,
        role,
        race,
        lifepoints,
        avatar,
        armorClass,
        movementSpeed,
      });
      resetForm();
    }
  };

  const resetForm = () => {
    setName("");
    setRole("");
    setRace("");
    setLifepoints(100);
    setAvatar("");
    setArmorClass(10);
    setMovementSpeed(30);
    setEditingUser(null);
    setIsFormOpen(false);
  };

  const handleEditUser = (user: Character) => {
    setName(user.name);
    setRole(user.role);
    setRace(user.race);
    setLifepoints(user.lifepoints);
    setAvatar(user.avatar);
    setArmorClass(user.armorClass);
    setMovementSpeed(user.movementSpeed);
    setEditingUser(user);
    setIsFormOpen(true);
  };

  return (
    <div
      style={{
        padding: "16px",
        width: "400px",
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Manage Users
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setIsFormOpen(!isFormOpen)}
      >
        {isFormOpen ? "Close" : "New Character"}
      </Button>
      <Collapse in={isFormOpen}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            marginBottom: "16px",
            marginTop: "8px",
          }}
        >
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
            size="small"
            fullWidth
          />
          <Select
            value={role}
            onChange={(e) => setRole(e.target.value as DndRole)}
            displayEmpty
            fullWidth
          >
            <MenuItem value="" disabled>
              Select Role
            </MenuItem>
            {dndRoles.map((r) => (
              <MenuItem key={r} value={r}>
                {r}
              </MenuItem>
            ))}
          </Select>
          <Select
            value={race}
            onChange={(e) => setRace(e.target.value as DndRace)}
            displayEmpty
            fullWidth
          >
            <MenuItem value="" disabled>
              Select Race
            </MenuItem>
            {races.map((r) => (
              <MenuItem key={r} value={r}>
                {r}
              </MenuItem>
            ))}
          </Select>
          <TextField
            label="Avatar URL"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            variant="outlined"
            size="small"
            fullWidth
          />
          <Typography>Life Points: {lifepoints}</Typography>
          <Slider
            value={lifepoints}
            onChange={(e, val) => setLifepoints(val as number)}
            min={0}
            max={100}
            step={1}
          />
          <TextField
            label="Armor Class"
            type="number"
            value={armorClass}
            onChange={(e) => setArmorClass(Number(e.target.value))}
            fullWidth
          />
          <TextField
            label="Movement Speed"
            type="number"
            value={movementSpeed}
            onChange={(e) => setMovementSpeed(Number(e.target.value))}
            fullWidth
          />
          <Button variant="contained" color="primary" onClick={handleSaveUser}>
            {editingUser ? "Save Changes" : "Add"}
          </Button>
        </div>
      </Collapse>
      <Box sx={{ m: 2 }}>
        {users.map((user: Character) => (
          <Card
            key={user.id}
            style={{
              backgroundColor: "white",
              marginBottom: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "8px",
            }}
          >
            <CardContent
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              {user.avatar && <Avatar src={user.avatar} alt={user.name} />}
              <div>
                <Typography variant="body1">
                  {user.name} ({user.race})
                </Typography>
                <Typography variant="body2" color="gray">
                  {user.role} - AC: {user.armorClass}, Speed:{" "}
                  {user.movementSpeed}
                </Typography>
                <Typography variant="body2">
                  Life Points: {user.lifepoints}
                </Typography>
              </div>
            </CardContent>
            <div>
              <IconButton color="primary" onClick={() => handleEditUser(user)}>
                ✎
              </IconButton>
              <IconButton color="primary" onClick={() => removeUser(user.id)}>
                <DeleteIcon />
              </IconButton>
            </div>
          </Card>
        ))}
      </Box>
    </div>
  );
}
