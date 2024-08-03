"use client";
import { Forecast, ForecastDay } from "@/interfaces/forecast";
import { Card, CardContent, Container, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { motion } from "framer-motion";
import moment from "moment";
const variants = {
  hidden: { opacity: 0, x: 100, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
};
const PreviewWeatherCard = ({ forecastDay }: { forecastDay: ForecastDay }) => {
  return (
    <Card
      sx={{
        backgroundColor: grey[600],
        color: "#fff",
        maxWidth: "200px",
        "&:hover": { backgroundColor: grey[800] },
        cursor: "pointer",
        marginRight: 2,
        marginTop: 2,
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ marginBottom: 1 }}>
          ( {moment(forecastDay.date).format("YYYY-MM-DD")})
        </Typography>
        <Container
          disableGutters={true}
          sx={{
            display: "flex",
            width: "14rem",
            flexDirection: "column",
          }}
        >
          <img src={forecastDay.day.condition.icon} style={{ width: "5rem" }} />
          <Typography sx={{ marginBottom: 1 }}>
            Temperature: {forecastDay.day.avgtemp_c}°C
          </Typography>
          <Typography sx={{ marginBottom: 1 }}>
            Wind: {forecastDay.day.maxwind_kph} M/S
          </Typography>
          <Typography>Humidity: {forecastDay.day.avghumidity}%</Typography>
        </Container>
      </CardContent>
    </Card>
  );
};

export default PreviewWeatherCard;
