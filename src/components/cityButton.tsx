"use client";
import { Location } from "@/interfaces/location";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

const CityButton = () => {
  const router = useRouter();

  function getLocationWeather() {
    const selectedLocation = localStorage.getItem("location");
    if (selectedLocation)
      window.location.replace(
        `/home?location=${(JSON.parse(selectedLocation) as Location).url}`
      );
  }

  return (
    <Button
      variant="contained"
      size="large"
      onClick={(event) => {
        event.preventDefault();
        getLocationWeather();
      }}
    >
      Search
    </Button>
  );
};

export default CityButton;
