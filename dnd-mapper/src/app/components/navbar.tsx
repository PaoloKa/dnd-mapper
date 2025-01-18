"use client";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import Link from "next/link";
import { Home as HomeIcon } from "@mui/icons-material";

export const NavBar = () => {
  return (
    <AppBar
      sx={{
        backgroundColor: "black",
        boxShadow: 4,
        height: "70px",
        zIndex: 1201, // Ensure the AppBar stays above content
      }}
    >
      <Toolbar sx={{ padding: "0 20px" }}>
        {/* Title/Logo with D&D font style */}
        <Typography
          variant="h2"
          sx={{
            flexGrow: 1,
            fontFamily: "'Uncial Antiqua', serif", // Fantasy-style font
            color: "#D52A2A", // Bold, D&D-themed red
            textShadow: "2px 2px 4px #000000", // Adds a dramatic shadow
            letterSpacing: "3px", // Slight letter spacing for a more ancient feel
          }}
        >
          D&amp;D Mapper
        </Typography>

        {/* Navigation buttons */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Link href="/" passHref>
            <Button
              color="inherit"
              startIcon={<HomeIcon />}
              sx={{
                flexGrow: 1,
                fontFamily: "'Uncial Antiqua', serif", // Fantasy-style font
                color: "#D52A2A", // Bold, D&D-themed red
                textShadow: "2px 2px 4px #000000", // Adds a dramatic shadow
              }}
            >
              Home
            </Button>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
