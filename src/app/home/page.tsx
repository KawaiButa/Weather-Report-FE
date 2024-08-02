import { fetchLocationForecast } from "@/apis/locationApi";
import DetailWeatherCard from "@/components/detailWeatherCard";
import ForecastGrid from "@/components/forecastGrid";
import { CircularProgress, Grid, Stack, Typography } from "@mui/material";
import { Suspense } from "react";

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const locationUrl = searchParams.location;
  var location = null;
  if (!locationUrl || !(typeof locationUrl === "string"))
    return (
      <Typography variant="h5" textAlign={"center"}>
        You haven't selected a location.
      </Typography>
    );
  const forecast = await fetchLocationForecast(locationUrl, 4);
  if (!forecast)
    return (
      <Typography variant="h5" textAlign={"center"}>
        Cannot retrieve data for this location.
      </Typography>
    );
  return (
    <Stack spacing={3}>
      <DetailWeatherCard
        location={forecast.location}
        current={forecast?.current}
        forecast={forecast.forecast.forecastday[0]}
      />
      <Typography variant="h4" fontWeight={500}>
        4-Day Forecast
      </Typography>
      <ForecastGrid location={locationUrl} />
    </Stack>
  );
}
