"use client";
import { fetchLocationWeather } from "@/apis/locationApi";
import { ForecastDay } from "@/interfaces/forecast";
import { Location } from "@/interfaces/location";
import { Current, Weather } from "@/interfaces/weather";
import { LineChart } from "@mui/x-charts/LineChart";

import {
  Card,
  CardContent,
  CircularProgress,
  Grid,
  List,
  ListItem,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import moment, { duration } from "moment";
import { Suspense, useEffect, useState } from "react";
import HourWeatherWidget from "./hourWeatherWidget";
import { motion } from "framer-motion";
import theme from "@/themes/themes";
import { AnchorX } from "@mui/x-charts/ChartsLegend/legend.types";
const keyToLabel: { [key: string]: string } = {
  temp_c: "Temperature (C)",
  wind_kph: "Wind speed (km/h)",
  humidity: "Humidity(%)",
};

const colors: { [key: string]: string } = {
  temp_c: "red",
  wind_kph: "green",
  humidity: "blue",
};

const variants = {
  hidden: { opacity: 0, x: 100, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
};
const detailVariants = {
  open: { maxHeight: "100rem", display: "block" },
  close: { maxHeight: "0rem", display: "none" },
};
function getColorMap(key: string) {
  switch (key) {
    case "temp_c":
      return {
        type: "continuous",
        min: 0,
        max: 50,
        color: ["lightBlue", "deepOrange"],
      };
    case "wind_kph":
      return {
        type: "continuous",
        min: 0,
        max: 50,
        color: ["lightGreen", "lightGreen"],
      };
    case "humidity":
      return {
        type: "continuous",
        min: 0,
        max: 100,
        color: ["amber", "cyan"],
      };
  }
}
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
  const smallToMid = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const lessThanSmall = useMediaQuery(theme.breakpoints.down("sm"));
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
            <Grid item sm={12} md={8}>
              <Stack spacing={2} width={"100%"}>
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
              md={4}
              alignItems={"center"}
              display={"flex"}
              flexDirection={"column"}
              sx={{
                width: "100%",
                maxWidth: "1000px",
                height: "10rem",
              }}
            >
              <img
                src={current.condition.icon}
                alt="Weather Icon"
                style={{
                  objectFit: "contain",
                  height: "100%",
                }}
              />
              <Typography variant="h6" textAlign={"center"}>
                {current.condition.text}
              </Typography>
            </Grid>
          </Grid>
          <motion.div
            variants={detailVariants}
            initial={detailVariants.close}
            animate={isOpen ? "open" : "close"}
            transition={{
              ease: "linear",
              duration: 1.2,
              // display: { duration: 0 },
            }}
          >
            <List
              sx={{
                display: "flex",
                flexDirection: "row",
                padding: "0 2rem",
                overflow: "hidden",
              }}
            >
              {forecast &&
                forecast.hour
                  .slice(new Date().getHours() + 1)
                  .map((element) => (
                    <ListItem>
                      {" "}
                      <HourWeatherWidget hour={element} />
                    </ListItem>
                  ))}
            </List>
            {!lessThanSmall && (
              <LineChart
                slotProps={{
                  legend: {
                    direction: smallToMid ? "column" : "row",
                    position: {
                      vertical: "top",
                      horizontal: (smallToMid ? "right" : "center") as AnchorX,
                    },
                    padding: 10,
                  },
                }}
                xAxis={[
                  {
                    dataKey: "hour",
                    valueFormatter: (value) => value.toString() + ":00",
                  },
                ]}
                series={Object.keys(keyToLabel).map((key) => ({
                  dataKey: key,
                  label: keyToLabel[key],
                  colorMap: getColorMap(key),
                  showMark: false,
                }))}
                dataset={(forecast?.hour ?? []).map((element) => {
                  return {
                    hour: moment(element.time).get("hour"),
                    temp_c: element.temp_c,
                    wind_kph: element.wind_kph,
                    humidity: element.humidity,
                  };
                })}
                sx={{
                  width: "100%",
                  backgroundColor: "#FFFF",
                  justifySelf: "center",
                  marginTop: 2,
                  borderRadius: 3
                }}
                height={300}
              />
            )}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
export default DetailWeatherCard;
