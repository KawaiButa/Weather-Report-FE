"use client";
import { Forecast, ForecastDay } from "@/interfaces/forecast";
import { Card, CardContent, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import moment from "moment";

const PreviewWeatherCard = ({ forecastDay }: { forecastDay: ForecastDay }) => {
  return (
    <Card
      sx={{
        backgroundColor: grey[600],
        color: "#fff",
        maxWidth: "200px",
        "&:hover": { backgroundColor: grey[800] },
        cursor: "pointer"
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ marginBottom: 1 }}>
          ( {moment(forecastDay.date).format("YYYY-MM-DD")})
        </Typography>
        <img src={forecastDay.day.condition.icon} />
        <Typography sx={{ marginBottom: 1 }}>
          Temperature: {forecastDay.day.avgtemp_c}°C
        </Typography>
        <Typography sx={{ marginBottom: 1 }}>
          Wind: {forecastDay.day.maxwind_kph} M/S
        </Typography>
        <Typography>Humidity: {forecastDay.day.avghumidity}%</Typography>
      </CardContent>
    </Card>
  );
};

export default PreviewWeatherCard;
