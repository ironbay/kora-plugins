import './types';
import { Kora } from '@ironbay/kora';
import './types';
export default class Router {
    private kora;
    constructor(kora: Kora);
    match_prefix(input: string): boolean;
    match_exact(input: string): boolean;
    parts(): string[];
    url(): string;
    query(): {};
    push(path: string): Promise<void>;
    private set(url);
    private append(path);
    split(path: string): string[];
}
