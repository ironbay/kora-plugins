interface Route {
    url: URL
    parts: string[]
    query: { [key: string]: any },
    params: { [key: string]: any },
}