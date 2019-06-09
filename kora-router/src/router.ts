import './types'
import { Kora } from '@ironbay/kora'
import Dynamic from '@ironbay/dynamic'
import './types'
import Dispatcher from '@ironbay/kora/lib/dispatcher'
import * as QS from 'query-string'

export default class Router {
    private kora: Kora
    constructor(kora: Kora) {
        this.kora = kora
        kora.before_mutation(['router'], async (_path, mut) => {
            const { url } = mut.merge
            if (!url) return
            const old = kora.query_path(['router', 'url'])
            const parsed = new URL(url)
            const parts = this.split(parsed.pathname)
            const route = {
                parts,
                query: QS.parse(parsed.search),
            } as Route
            await kora.local_merge(['router'], route)
        })
        this.set(location.toString())
        window.addEventListener('popstate', () => this.set(location.toString()))
    }

    public match_prefix(input: string) {
        const path = this.split(input)
        const parts = this.parts()
        return path.filter((part, index) => {
            const value = parts[index]
            return (value === part) || (value && part === '+')
        }).length === path.length
    }

    public match_exact(input: string) {
        const path = this.split(input)
        const parts = this.parts()
        if (parts.length !== path.length) return false
        return path.filter((part, index) => {
            const value = parts[index]
            return (value === part) || (value && part === '+')
        }).length === parts.length
    }

    public parts() {
        return this.kora.local_values<string>(['router', 'parts']) || []
    }

    public url() {
        return this.kora.local_path<string>(['router', 'url'])
    }

    public query() {
        return this.kora.local_path<string>(['router', 'query']) || {}
    }

    public async push(path: string) {
        history.pushState({}, null, path)
        await this.set(location.toString())
    }

    private async set(url: string) {
        return await this.kora.local_merge(['router', 'url'], url)
    }

    private append(path: string) {
        return new URL(path, location.toString())
    }

    public split(path: string) {
        return path.split('/').filter(item => item)
    }
}