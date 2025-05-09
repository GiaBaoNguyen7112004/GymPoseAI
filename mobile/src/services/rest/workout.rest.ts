import http from '@/services/core/http'
import { ResponseApi } from '@/types/utils.type'
import { Exercise } from '@/types/exercises.type'

const workoutApi = {
    getWorkoutByCategoryId({ id }: { id: string }) {
        return http.get<ResponseApi<Exercise[], any>>(`${process.env.EXPO_PUBLIC_URL_CATEGORIES}/${id}/exercises`)
    },
    getWorkoutById({ id }: { id: string }) {
        return http.get<ResponseApi<Exercise, any>>(`${process.env.EXPO_PUBLIC_URL_WORKOUTS}/${id}`)
    }
}

export default workoutApi
