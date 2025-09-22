// app/errors/ServerError.tsx
import { Container, Divider, Paper, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

type AppError = {
  statusCode?: number;
  message?: string;
  details?: string;
};

export default function ServerError() {
  const { state } = useLocation() as { state?: { error?: AppError } };
  const err = state?.error;

  return (
    <Container component={Paper} sx={{ p: 4 }}>
      {err ? (
        <>
          <Typography gutterBottom variant="h3" color="secondary">
            {err.message ?? "Server error"}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
            {err.details ?? "Internal server error"}
          </Typography>
        </>
      ) : (
        <Typography gutterBottom variant="h5">
          Server error
        </Typography>
      )}
    </Container>
  );
}