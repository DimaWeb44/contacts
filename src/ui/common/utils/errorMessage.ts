import {AxiosError} from "axios"

export const errorMessage = (e: AxiosError<{ error: string }>) => {
    const error = e.response
        ? e.response.data.error
        : (e.message + ', more details in the console')
    console.log('Error: ', {...e})
    return error
}