import CityButton from "@/components/cityButton";
import LocationButton from "@/components/locationButton";
import {
  AppBar,
  Container,
  Divider,
  Grid,
  IconButton,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { Suspense } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <AppBar
        position="static"
        sx={{
          height: "5vw",
          maxHeight: "400px",
        }}
      >
        <Suspense>
          <Toolbar
            variant="dense"
            sx={{
              margin: "auto auto",
            }}
          >
            <Typography
              variant="h3"
              color="inherit"
              component="div"
              fontWeight={"500"}
            >
              WEATHER DASHBOARD
            </Typography>
          </Toolbar>
        </Suspense>
      </AppBar>
      <Container
        maxWidth={false}
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "row",
          padding: { xs: "10px", md: "2.5vw" },
          height: "100%",
        }}
      >
        <Stack
          spacing={2}
          sx={{
            width: "30%",
            height: "100%",
          }}
        >
          <Typography variant="h6">Enter a City name</Typography>
          <Suspense>
            <TextField
              placeholder="E.g., New York, London, Tokyo"
              variant="outlined"
              color="secondary"
              sx={{
                backgroundColor: "white",
                width: "100%",
              }}
            />
          </Suspense>
          <CityButton />
          <Divider>or</Divider>
          <LocationButton />
        </Stack>
        <Container
          sx={{
            width: "70%",
            height: "100%",
            padding: { xs: "20px", md: "2vw" },
          }}
        >
          {children}
        </Container>
      </Container>
    </section>
  );
}
