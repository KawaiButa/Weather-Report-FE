"use client";
import { Button, Container, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LocationButton = () => {
  const [error, setError] = useState<string | null>(null);

  function handleWeatherByLocation() {
    getLocation();
  }
  const router = useRouter()
  return (
    <Container maxWidth="sm" disableGutters={true}>
      <Button
        variant="contained"
        color="secondary"
        size="large"
        fullWidth
        
        onClick={() => {
          handleWeatherByLocation();
        }}
      >
        Use Current Location
      </Button>
      {error && (
        <Typography variant="h6" color={red[500]}>
          {error}
        </Typography>
      )}
    </Container>
  );
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setError(null);
        router.replace(
          `/home?location=${position.coords.latitude},${position.coords.longitude}`
        );
      });
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }
  function showError(error: any) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        setError("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        setError("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        setError("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        setError("An unknown error occurred.");
        break;
    }
  }
};

export default LocationButton;
