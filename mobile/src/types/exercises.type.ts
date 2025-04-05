export interface Exercise {
    id: string
    name: string
    description: string
    media_url: string
    category: Category
    met?: number
    steps: Step[]
}

export interface Category {
    id: string
    name: string
}

export interface Step {
    id: string
    title: string
    description: string
    step_number: number
}
