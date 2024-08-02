import axios from "axios";

export async function verifyEmail(key: string, expire: number): Promise<string | null> {
    return axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}email/verify`, JSON.stringify({ key: key, expire: expire }), {
        headers: {
            'Content-Type': 'application/json',
        }
    }).then((value) => value.data).catch((error) => {
        console.log(error)
        return null
    })
}

export async function subscribe(email: string): Promise<string> {
    return await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}email/subscribe`, JSON.stringify({ email: email }), {
        headers: {
            'Content-Type': 'application/json',
        }
    }).then((value) => value.data).catch((error) => {
        console.log(error)
        throw new Error(error.response.data)
    })
}
export async function unSubscribe(email: string): Promise<string> {

    return await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}email/unsubscribe`, JSON.stringify({ email: email }), {
        headers: {
            'Content-Type': 'application/json',
        }
    }).then((value) => value.data).catch((error) => {
        console.log(error)
        throw new Error( error.response.data)
    })
}