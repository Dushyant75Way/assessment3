import { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Avatar,
  Divider,
} from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import PersonIcon from "@mui/icons-material/Person";

interface LeaderboardEntry {
  username: string;
  score: number;
  title: string;
}

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    const storedLeaderboard = JSON.parse(
      localStorage.getItem("leaderboard") || "[]"
    );
    setLeaderboard(storedLeaderboard);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #1e3c72 30%, #2a5298 90%)",
        color: "#fff",
        padding: 3,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: "100%",
          maxWidth: 600,
          padding: 4,
          borderRadius: 3,
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          boxShadow: "0px 8px 20px rgba(0,0,0,0.3)",
        }}
      >
        <Toolbar />
        <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
          <EmojiEventsIcon sx={{ fontSize: 40, color: "#ffd700", mr: 1 }} />
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: "#fff" }}
          >
            Leaderboard
          </Typography>
        </Box>

        <List>
          {leaderboard
            .sort((a, b) => b.score - a.score) // Sort by highest score
            .map((entry, index) => (
              <Box key={index}>
                <ListItem
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    py: 2,
                    px: 3,
                    borderRadius: 2,
                    background:
                      index === 0 ? "#ffd700" : "rgba(255,255,255,0.1)",
                    color: index === 0 ? "#000" : "#fff",
                    boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
                  }}
                >
                  <Avatar
                    sx={{ bgcolor: index === 0 ? "#ffeb3b" : "#3f51b5", mr: 2 }}
                  >
                    <PersonIcon />
                  </Avatar>
                  <ListItemText
                    primary={
                      <Typography variant="h6" fontWeight="bold">
                        {entry.username}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography component="span" variant="body2">
                          <strong>Score:</strong> {entry.score}
                        </Typography>
                        <br />
                        <Typography
                          component="span"
                          variant="body2"
                          color="textSecondary"
                        >
                          <strong>Attempted Quiz:</strong> {entry.title}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
                {index < leaderboard.length - 1 && (
                  <Divider sx={{ backgroundColor: "rgba(255,255,255,0.3)" }} />
                )}
              </Box>
            ))}
        </List>
      </Paper>
    </Box>
  );
};

export default Leaderboard;
