"use client";
import { fetchLocationForecast } from "@/apis/locationApi";
import { Grid, Typography } from "@mui/material";
import PreviewWeatherCard from "./previewWeatherCard";
import { motion } from "framer-motion";
import { ForecastDay } from "@/interfaces/forecast";
import { useState } from "react";
const variants = {
  hidden: { opacity: 0, x: 100, y: 0 },
  enter: { opacity: 1, x: 20, y: 0 },
};
async function ForecastGrid({ forecastDay }: { forecastDay: ForecastDay[] }) {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="enter"
      transition={{ ease: "easeInOut", duration: 0.75 }}
    >
      
      <Grid container columns={{ xs: 4, sm: 8, md: 12 }} spacing={2} width={"100%"} justifyContent={{sm: 'center', md: "start"}}>
        {forecastDay.map((element, index) => (
          <PreviewWeatherCard forecastDay={element}></PreviewWeatherCard>
        ))}
      </Grid>
    </motion.div>
  );
}
export default ForecastGrid;
