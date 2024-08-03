import { fetchLocationForecast } from "@/apis/locationApi";
import DetailWeatherCard from "@/components/detailWeatherCard";
import ForecastGrid from "@/components/forecastGrid";
import {
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const locationUrl = searchParams.location;
  const day = Number.parseInt(searchParams.days as string);
  const loadMoreUrl = `/home?location=${searchParams.location}&days=${
    isNaN(day) ? 8 : day + 4 < 15 ? day + 4 : 15
  }`;
  if (!locationUrl || !(typeof locationUrl === "string"))
    return (
      <Typography variant="h5" textAlign={"center"}>
        You haven't selected a location.
      </Typography>
    );
  const forecast = await fetchLocationForecast(
    locationUrl,
    isNaN(day) ? 5 : day
  );
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
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" fontWeight={500}>
          4-Day Forecast
        </Typography>
        <Link href={loadMoreUrl}> Load more</Link>
      </Container>
      <ForecastGrid forecastDay={forecast.forecast.forecastday.slice(1)} />
    </Stack>
  );
}
