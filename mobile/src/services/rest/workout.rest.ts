import http from '@/services/core/httpClient'
import { ResponseApi } from '@/types/utils.type'
import { Exercise } from '@/types/exercises.type'

const workoutApi = {
    getWorkoutByCategoryId({ id }: { id: string }) {
        return http.get<ResponseApi<Exercise[], any>>(`${process.env.EXPO_PUBLIC_URL_CATEGORIES}/${id}/workouts`)
    },
    getWorkoutById({ id }: { id: string }) {
        return http.get<ResponseApi<Exercise, any>>(`${process.env.EXPO_PUBLIC_URL_WORKOUTS}/${id}`)
    }
}

export default workoutApi
