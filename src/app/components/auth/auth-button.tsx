// components/AuthButton.tsx
"use client";

import { Login, Logout } from "@mui/icons-material";
import { Button } from "@mui/material";
import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <Button
        sx={{
          flexGrow: 1,
          fontFamily: "'Uncial Antiqua', serif", // Fantasy-style font
          color: "#D52A2A", // Bold, D&D-themed red
          textShadow: "2px 2px 4px #000000", // Adds a dramatic shadow
        }}
        startIcon={<Logout />}
        onClick={() => signOut()}
      >
        Sign out
      </Button>
    );
  }

  return (
    <Button
      startIcon={<Login />}
      sx={{
        flexGrow: 1,
        fontFamily: "'Uncial Antiqua', serif", // Fantasy-style font
        color: "#D52A2A", // Bold, D&D-themed red
        textShadow: "2px 2px 4px #000000", // Adds a dramatic shadow
      }}
      onClick={() => signIn("google")}
    >
      Sign in
    </Button>
  );
}
