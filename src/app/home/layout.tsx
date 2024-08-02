import CityButton from "@/components/cityButton";
import CityTextField from "@/components/cityTextField";
import LocationButton from "@/components/locationButton";
import SubscriptionForm from "@/components/subscriptionForm";
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
          height: { xs: "300", md: "5vw" },
          maxHeight: "400px",
        }}
      >
        <Toolbar
          variant="dense"
          sx={{
            margin: "auto auto",
          }}
        >
          <Typography variant="h4" fontWeight={"500"} sx={{
            fontSize:{xs: "1.25rem", md: "2rem"}
          }}>
            WEATHER DASHBOARD
          </Typography>
        </Toolbar>
      </AppBar>
      <Container
        maxWidth={false}
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: { xs: "column", md: "row" },
          padding: { xs: "10px", md: "2.5vw" },
          height: "100%",
        }}
      >
        <Stack
          spacing={2}
          sx={{
            width: { xs: "100%", md: "30%" },
            height: "100%",
          }}
        >
          <Typography variant="h6">Enter a City name</Typography>
          <Suspense>
            <CityTextField />
          </Suspense>
          <CityButton />
          <Divider>or</Divider>
          <LocationButton />
          <SubscriptionForm />
        </Stack>
        <Container
          sx={{
            width: { xs: "100%", md: "70%" },

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
