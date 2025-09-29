import { Container, type ContainerProps } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";

export default function PageContainer({
  children,
  maxWidth = "lg",
  sx,
  ...rest
}: ContainerProps) {
  const baseStyles = {
    py: { xs: 4, md: 6 },
    px: { xs: 2, md: 4 },
  } as const;

  const mergedSx: SxProps<Theme> = Array.isArray(sx)
    ? [baseStyles, ...sx]
    : sx
    ? [baseStyles, sx]
    : baseStyles;

  return (
    <Container maxWidth={maxWidth} sx={mergedSx} {...rest}>
      {children}
    </Container>
  );
}
