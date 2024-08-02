"use client"
import { fetchLocationForecast } from "@/apis/locationApi";
import { Grid, Typography } from "@mui/material";
import PreviewWeatherCard from "./previewWeatherCard";
import { motion } from "framer-motion";
const variants = {
  hidden: { opacity: 0, x: 100, y: 0 },
  enter: { opacity: 1, x: 20, y: 0 },
};
async function ForecastGrid({ location }: { location: string }) {
  const forecast = await fetchLocationForecast(location, 4);
  if (!forecast)
    return (
      <Typography variant="h5" textAlign={"center"}>
        Can't get the the forecasted weather of the selected location.
      </Typography>
    );
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="enter"
      transition={{ ease: "easeInOut", duration: 0.75 }}
    >
      <Grid
        container
        gridColumn={{ xs: 2, md: 4 }}
        columnSpacing={2}
        width={"fit-content"}
      >
        {forecast.forecast.forecastday.map((element) => (
          <PreviewWeatherCard forecastDay={element} />
        ))}
      </Grid>
    </motion.div>
  );
}
export default ForecastGrid;
