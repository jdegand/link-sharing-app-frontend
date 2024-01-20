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
    errors: Errors
}

interface Errors {
    username: string[]
}