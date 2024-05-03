interface ApiInit extends RequestInit {
    params?: Record<string, string>
    data?: Record<string, any>
}

interface Api {
    request: (endpoint: string, settings: ApiInit) => Record<string, any>
}

export const parseJson = (response: Response): Record<string, any> =>
    response.json()

export const parseUrl = (url: string, params?: Record<string, string>): string => {
    const baseUrl = process.env.REACT_APP_API_URL
    const querystring = params ? `?${new URLSearchParams(params).toString()}` : ''
    // return `${baseUrl}${url}${querystring}`
    return `${url}${querystring}`
}

export const prepareRequestSignature = ({
    method,
    data,
}: {
    method?: string
    data?: Record<string, any>
}): Record<string, any> => {
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }

    return {
        body: data ? JSON.stringify(data) : undefined,
        method,
        headers,
    }
}

export const checkStatus = (response: Response): Response => {
    if (response.ok) {
        return response
    }

    throw new Error(`${response.status} ${response.statusText}`)
}

const apiImpl = {
    request: (
        endpoint: string,
        { params, method, data }: ApiInit
    ): Record<string, any> =>
        fetch(
            parseUrl(endpoint, params),
            prepareRequestSignature({ method, data })
        )
            .then(checkStatus)
            .then(parseJson),
}

export default apiImpl as Api
