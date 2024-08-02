import { fetchLocationWeather } from "@/apis/locationApi";
import DetailWeatherCard from "@/components/detailWeatherCard";
import PreviewWeatherCard from "@/components/previewWeatherCard";
import { Weather } from "@/interfaces/weather";
import { Grid, Stack, Typography } from "@mui/material";
import { Suspense } from "react";

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const locationUrl = searchParams.location
  var location = null
  if(!locationUrl || !(typeof(locationUrl) === 'string'))
    return <Typography variant="h5" textAlign={'center'}>You haven't selected a location.</Typography>
  return (
    <Stack spacing={3}>
      <Suspense>
        <DetailWeatherCard location={locationUrl}/>
      </Suspense>
      <Typography variant="h4" fontWeight={500}>
        4-Day Forecast
      </Typography>
      <Grid
        container
        gridColumn={{ xs: 2, md: 4 }}
        columnSpacing={2}
        width={"fit-content"}
      >
        {Array.from(Array(4).keys()).map((element) => (
          <Grid item xs>
            {/* <PreviewWeatherCard weather={defaultWeather} /> */}
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
