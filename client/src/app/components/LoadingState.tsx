import { CircularProgress, Stack, Typography } from "@mui/material";

type Props = {
  label?: string;
};

export default function LoadingState({ label = "Loading" }: Props) {
  return (
    <Stack spacing={2} alignItems="center" justifyContent="center" minHeight={240}>
      <CircularProgress color="secondary" size={32} thickness={4} />
      <Typography color="text.secondary" variant="body1">
        {label}...
      </Typography>
    </Stack>
  );
}
