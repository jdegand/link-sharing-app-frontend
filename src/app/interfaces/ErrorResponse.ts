export interface ErrorResponse {
    headers: Headers
    status: number
    statusText: string
    url: string
    ok: boolean
    name: string
    message: string
    error: Error
}

interface Headers {
    normalizedNames: NormalizedNames
    lazyUpdate: any
}

interface NormalizedNames { }

interface Error {
    type: string
    title: string
    status: number
    detail: string
    instance: string
    access_denied_reason: string
}