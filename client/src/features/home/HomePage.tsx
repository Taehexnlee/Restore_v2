import { Container, Box, Button, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function HomePage() {
  return (
    <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 4 }, position: "relative" }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 2,
          overflow: "hidden",
          minHeight: { xs: "64vh", md: "72vh" },
          mt: { xs: 2, md: 4 },
        }}
      >
        {/* Background Image */}
        <Box
          component="img"
          src="/images/hero1.jpg"
          alt="Ski resort scenic hero"
          sx={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        {/* Dark gradient overlay for contrast */}
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.65) 100%)",
          }}
        />

        {/* Foreground Content */}
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            textAlign: "center",
            px: { xs: 2, md: 4 },
            py: { xs: 6, md: 8 },
            maxWidth: 960,
          }}
        >
          <Typography
            component="h1"
            variant="h2"
            sx={{
              color: "common.white",
              fontWeight: 800,
              letterSpacing: -0.5,
              mb: 3,
              // 반응형 헤드라인 크기
              fontSize: { xs: "2.25rem", sm: "3rem", md: "3.5rem" },
              lineHeight: 1.1,
            }}
          >
            Welcome to Restore
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: "rgba(255,255,255,0.9)",
              fontWeight: 500,
              maxWidth: 720,
              mx: "auto",
              mb: { xs: 4, md: 6 },
            }}
          >
            Premium outdoor gear curated for performance and comfort. Explore our latest arrivals.
          </Typography>

          <Button
            component={RouterLink}
            to="/catalog"
            size="large"
            variant="contained"
            sx={{
              px: 4,
              py: 2,
              fontSize: { xs: "1rem", md: "1.125rem" },
              borderRadius: 3,
              fontWeight: 700,
              boxShadow: 3,
              // 그라데이션 버튼
              backgroundImage: "linear-gradient(90deg, #2563EB, #06B6D4)",
              backgroundColor: "transparent",
              border: "2px solid transparent",
              ":hover": {
                transform: "translateY(-1px)",
                boxShadow: 6,
              },
              transition: "all 160ms ease",
            }}
          >
            Take me to the shop
          </Button>
        </Box>
      </Box>
    </Container>
  );
}