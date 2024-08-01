"use client";
import { Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import moment from "moment";
import { Suspense } from "react";

const DetailWeatherCard = ({ weather }: { weather: Weather }) => {
  return (
    <Card sx={{ backgroundColor: "#4263eb", color: "#fff", padding: "1vw" }}>
      <CardContent sx={{ position: "relative" }}>
        <Grid container gridColumn={2} alignItems="stretch">
          <Grid item xs={10}>
            <Stack spacing={2}>
              <Suspense>
                <Typography variant="h6">
                  {weather.location} (
                  {moment(weather.date).format("YYYY-MM-DD")})
                </Typography>
              </Suspense>
              <Typography>Temperature: {weather.temp}°C</Typography>
              <Typography>Wind: {weather.wind} M/S - Moderate</Typography>
              <Typography>Humidity: {weather.humidity}%</Typography>
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
              src={weather.iconUrl}
              alt="Weather Icon"
              style={{
                objectFit: "fill",
                width: "70%",
              }}
            />
            <Typography variant="h6" textAlign={"center"}>
              {weather.weatherDescription}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
export default DetailWeatherCard;
