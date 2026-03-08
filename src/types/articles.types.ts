export interface Article {
    id: number;
    title: string;
    body: string;
    category: string | null;
    submitted_by: number;
    created_at: Date;
}