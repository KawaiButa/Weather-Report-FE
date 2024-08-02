import { Location } from "@/interfaces/location";
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
export async function fetchLocationWeather(location: string) {
    return await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}weather-today?location=${location}&detail=True`).then((value) => {
        if (value.status == 200)
            return value.data
        return null
    }).catch((error) => {
        console.log(error)
        return null
    })
}