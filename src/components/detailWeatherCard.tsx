"use client";
import { fetchLocationWeather } from "@/apis/locationApi";
import { ForecastDay } from "@/interfaces/forecast";
import { Location } from "@/interfaces/location";
import { Current, Weather } from "@/interfaces/weather";
import NextNProgress from "nextjs-progressbar";

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
import HourWeatherWidget from "./hourWeatherWidget";
import { motion } from "framer-motion";
const variants = {
  hidden: { opacity: 0, x: 100, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
};
const DetailWeatherCard = ({
  location,
  current,
  forecast,
}: {
  location: Partial<Location>;
  current: Current;
  forecast?: ForecastDay;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="enter"
      transition={{ ease: "easeInOut", duration: 0.75 }}
    >
      <Card
        sx={{
          backgroundColor: "#4263eb",
          color: "#fff",
          padding: "1vw",
          "&:hover": {
            backgroundColor: "#3753C2",
          },
          cursor: "pointer",
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <CardContent sx={{ position: "relative" }}>
          <Grid
            container
            gridColumn={2}
            alignItems="stretch"
            sx={{
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <Grid item xs={8}>
              <Stack spacing={2}>
                <Suspense>
                  <Typography variant="h6">
                    {location.name} (
                    {moment(current.last_updated).format("YYYY-MM-DD")})
                  </Typography>
                </Suspense>
                <Typography>Temperature: {current.temp_c}°C</Typography>
                <Typography>
                  Wind: {current.gust_kph} KM/H - Moderate
                </Typography>
                <Typography>Humidity: {current.humidity}%</Typography>
              </Stack>
            </Grid>
            <Grid
              item
              xs={4}
              alignItems={"center"}
              display={"flex"}
              flexDirection={"column"}
              sx={{
                width: "100%",
                maxWidth: "1000px",
              }}
            >
              <img
                src={current.condition.icon}
                alt="Weather Icon"
                style={{
                  objectFit: "fill",
                }}
              />
              <Typography variant="h6" textAlign={"center"}>
                {current.condition.text}
              </Typography>
            </Grid>
          </Grid>
          <div className={`${isOpen ? "open" : "hidden"} animate-container`}>
            <Grid
              container
              direction={"row"}
              sx={{
                flexWrap: { xs: "wrap", sm: "no-wrap" },
                justifyContent: "center"
              }}
              marginTop={2}
            >
              {forecast &&
                forecast.hour
                  .slice(new Date().getHours() + 1)
                  .map((element) => (
                    <Grid item>
                      {" "}
                      <HourWeatherWidget hour={element} />
                    </Grid>
                  ))}
            </Grid>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
export default DetailWeatherCard;
