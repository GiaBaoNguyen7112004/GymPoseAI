import { useQuery } from '@tanstack/react-query'
import { targetApi } from '@/services/rest'

export interface waterLogIntake {
    id: number
    value: number
    time: string
    start: string
    end: string
}

export const useWaterIntakeData = () => {
    const { data } = useQuery({
        queryKey: ['waterIntake'],
        queryFn: targetApi.getDailyWaterTarget
    })

    const waterIntake = data?.data.data.intakes || []
    const progress = data?.data.data.progress || 0
    const target = data?.data.data.target || 0

    const transformedIntakes: waterLogIntake[] = waterIntake.map((intake, index) => ({
        id: index + 1,
        value: intake.amountMl,
        time: intake.label,
        start: intake.start,
        end: intake.end
    }))

    return { progress, transformedIntakes, target }
}
