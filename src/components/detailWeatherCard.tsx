"use client";
import { fetchLocationWeather } from "@/apis/locationApi";
import { Weather } from "@/interfaces/weather";
import {
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import moment from "moment";
import { Suspense, useEffect, useState } from "react";

const DetailWeatherCard = ({ location }: { location: string }) => {
  const [weather, setWeather] = useState<Weather | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchLocationWeather(location).then((value) => {
      console.log(value)
      setWeather(value);
      setLoading(false);
    });
  }, []);
  if (loading) return <CircularProgress />;
  if (weather == undefined)
    return (
      <Typography variant="h5" textAlign={"center"}>
        {" "}
        Unable to retrieve data
      </Typography>
    );
  return (
    <Card sx={{ backgroundColor: "#4263eb", color: "#fff", padding: "1vw" }}>
      <CardContent sx={{ position: "relative" }}>
        <Grid container gridColumn={2} alignItems="stretch">
          <Grid item xs={10}>
            <Stack spacing={2}>
              <Suspense>
                <Typography variant="h6">
                  {weather.location.name} (
                  {moment(weather.current.last_updated).format("YYYY-MM-DD")})
                </Typography>
              </Suspense>
              <Typography>Temperature: {weather.current.temp_c}°C</Typography>
              <Typography>Wind: {weather.current.gust_kph} KM/H - Moderate</Typography>
              <Typography>Humidity: {weather.current.humidity}%</Typography>
            </Stack>
          </Grid>
          <Grid
            item
            xs={2}
            alignItems={"center"}
            display={"flex"}
            flexDirection={"column"}
          >
            <img
              src={weather.current.condition.icon}
              alt="Weather Icon"
              style={{
                objectFit: "fill",
                width: "70%",
              }}
            />
            <Typography variant="h6" textAlign={"center"}>
              {weather.current.condition.text}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
export default DetailWeatherCard;
