export default interface ProjectModel {
    id: string;
    name: string;
    description: string;
    url: string;
    pricing: number;
    thumbnail: string;
    bestSeller: boolean;
    complexity: string;
    categories: string[];
    slug: string;
}