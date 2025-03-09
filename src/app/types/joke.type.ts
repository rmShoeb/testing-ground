export interface Joke {
    category: string;
    type: string;
    joke?: string;
    flags: {
        nsfw: boolean;
        religious: boolean;
        political: boolean;
        racist: boolean;
        sexist: boolean;
        explicit: boolean;
    };
    id: number;
    error: boolean;
    code: number;
    delivery?: string;
    lang: string;
    safe: boolean;
} 