import styles from "./page.module.css";
import { Box, Typography } from "@mui/material";
import Link from "next/link";

export default function Home() {
  return (
    <Box
      className={styles.page}
      sx={{
        backgroundImage: `url("https://static1.srcdn.com/wordpress/wp-content/uploads/2024/08/d-d-farmer-background.jpg")`,
      }}
    >
      <Box className={styles.main}>
        <Typography
          variant="h2"
          sx={{
            fontFamily: "'Uncial Antiqua', serif", // Fantasy-style font
            color: "#D52A2A", // Optional: A bold, D&D-themed red
            textShadow: "2px 2px 4px #000000", // Optional: Adds a dramatic shadow
          }}
        >
          D&amp;D Mapper
        </Typography>
        <ol>
          <li>Get started by editing your maps.</li>
          <li>Pick an option below</li>
        </ol>

        <div className={styles.ctas}>
          <Link
            href={"/map"}
            className={styles.primary}
            rel="noopener noreferrer"
          >
            Create new map
          </Link>
          <Link
            href="/info"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondary}
          >
            Read our docs
          </Link>
        </div>
      </Box>
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          right: 0,
          padding: "1rem",
          color: "white",
        }}
      >
        <Box
          component={"a"}
          href="https://github.com/PaoloKa/dnd-mapper"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            color: "black",
          }}
        >
          <img
            aria-hidden
            src="https://img.icons8.com/?size=100&id=12599&format=png&color=000000"
            alt="Window icon"
            width={16}
            height={16}
          />
          Github
        </Box>
      </Box>
    </Box>
  );
}
