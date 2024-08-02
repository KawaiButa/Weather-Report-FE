import { Forecast } from "@/interfaces/forecast";
import { Location } from "@/interfaces/location";
import { Weather } from "@/interfaces/weather";
import axios from "axios";

export async function fetchLocationData(param: string): Promise<Location[]> {
    return await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}city?param=${param}`).then((value) => {
        if (value.status == 200)
            return value.data as Location[]
        return [] as Location[]

    }).catch((error) => {
        console.log(error)
        return [] as Location[]
    })
}
export async function fetchLocationWeather(location: string): Promise<Weather> {
    return await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}weather-today?location=${location}&detail=True`).then((value) => {
        if (value.status == 200)
            return value.data
        return null
    }).catch((error) => {
        console.log(error)
        return null
    })
}
export async function fetchLocationForecast(location: string, day: number): Promise<Weather & {forecast: Forecast} | null> {
    return await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}weather-forecast?location=${location}&days=${day}`).then((value) => {
        if (value.status)
            return value.data as Weather & {forecast: Forecast}
        return null
    }).catch((error) => {
        console.log(error)
        return null
    })
}