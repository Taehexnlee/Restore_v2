import { Box, Paper, Typography } from "@mui/material";
import type { ReactNode } from "react";

type Props = {
  title: string;
  description?: string;
  children?: ReactNode;
};

export default function EmptyState({ title, description, children }: Props) {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 4,
        py: 8,
        px: { xs: 3, md: 6 },
        textAlign: "center",
        border: theme => `1px dashed ${theme.palette.divider}`,
        backgroundColor: theme => theme.palette.background.paper,
      }}
    >
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
      {description && (
        <Typography color="text.secondary">{description}</Typography>
      )}
      {children && <Box mt={4}>{children}</Box>}
    </Paper>
  );
}
