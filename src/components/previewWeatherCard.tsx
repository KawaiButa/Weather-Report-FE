"use client";
import { Card, CardContent, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import moment from "moment";

const PreviewWeatherCard = ({ weather }: { weather: Weather }) => {
  return (
    <Card
      sx={{
        backgroundColor: grey[600],
        color: "#fff",
        maxWidth: "200px",
        "&hover": {},
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ marginBottom: 1 }}>
          ( {moment(weather.date).format("YYYY-MM-DD")})
        </Typography>
        <img src={weather.iconUrl} />
        <Typography sx={{ marginBottom: 1 }}>
          Temperature: {weather.temp}°C
        </Typography>
        <Typography sx={{ marginBottom: 1 }}>
          Wind: {weather.wind} M/S
        </Typography>
        <Typography>Humidity: {weather.humidity}%</Typography>
      </CardContent>
    </Card>
  );
};

export default PreviewWeatherCard;
