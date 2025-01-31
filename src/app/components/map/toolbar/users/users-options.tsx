"use client";
import { useState } from "react";
import {
  Button,
  TextField,
  Card,
  CardContent,
  Typography,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMapStore } from "../../../../store";

export default function UserOptions() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const { users, addUser, removeUser } = useMapStore((x) => x);

  const handleAddUser = () => {
    if (name.trim() && role.trim()) {
      addUser({ id: Date.now(), name, role });
      setName("");
      setRole("");
    }
  };

  return (
    <div
      style={{
        padding: "16px",
        width: "320px",
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Manage Users
      </Typography>
      <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          variant="outlined"
          size="small"
          fullWidth
        />
        <TextField
          label="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          variant="outlined"
          size="small"
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={handleAddUser}>
          Add
        </Button>
      </div>
      <div>
        {users.map((user) => (
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
              <Typography variant="body1">{user.name}</Typography>
              <Typography variant="body2" color="gray">
                ({user.role})
              </Typography>
            </CardContent>
            <IconButton color="secondary" onClick={() => removeUser(user.id)}>
              <DeleteIcon />
            </IconButton>
          </Card>
        ))}
      </div>
    </div>
  );
}
