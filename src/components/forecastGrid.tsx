"use client"
import { fetchLocationForecast } from "@/apis/locationApi";
import { Grid, Typography } from "@mui/material";
import PreviewWeatherCard from "./previewWeatherCard";
import { motion } from "framer-motion";
import { ForecastDay } from "@/interfaces/forecast";
const variants = {
  hidden: { opacity: 0, x: 100, y: 0 },
  enter: { opacity: 1, x: 20, y: 0 },
};
async function ForecastGrid({ forecastDay }: { forecastDay: ForecastDay[] }) {
  console.log(forecastDay.length)
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
        spacing={2}
        width={"100%"}
      >
        {forecastDay.map((element) => (
          <PreviewWeatherCard forecastDay={element}></PreviewWeatherCard>
        ))}
      </Grid>
    </motion.div>
  );
}
export default ForecastGrid;
