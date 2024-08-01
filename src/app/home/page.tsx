import DetailWeatherCard from "@/components/detailWeatherCard";
import PreviewWeatherCard from "@/components/previewWeatherCard";
import { Grid, Stack, Typography } from "@mui/material";
import { Suspense } from "react";

const defaultWeather: Weather = {
  location: "London",
  date: new Date(1,8,2024),
  wind: 4.31,
  temp: 18.71,
  humidity: 0.76,
  weatherDescription: "Moderate rain",
  iconUrl: "//cdn.weatherapi.com/weather/64x64/day/116.png",
};
export default function Page() {
  return (
    <Stack spacing={3}>
      <Suspense>
        <DetailWeatherCard weather={defaultWeather} />
      </Suspense>
      <Typography variant="h4" fontWeight={500}>
        4-Day Forecast
      </Typography>
      <Grid container gridColumn={{ xs: 2, md: 4 }} columnSpacing={2} width={"fit-content"}>
        {Array.from(Array(4).keys()).map((element) => (
          <Grid item xs>
            <PreviewWeatherCard weather={defaultWeather} />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
