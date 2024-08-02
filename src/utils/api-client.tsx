import axios from 'axios'

const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
})

const setAuthorization = (tokenType: string, token: string) => {
    apiClient.defaults.headers.common['Authorization'] = `${tokenType} ${token}`
}

export {apiClient, setAuthorization}
