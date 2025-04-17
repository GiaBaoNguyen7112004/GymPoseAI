import http from '@/services/core/httpClient'
import { URL_CATEGORIES, URL_WORKOUTS } from '@env'
import { ResponseApi } from '@/types/utils.type'
import { Exercise } from '@/types/exercises.type'

const workoutApi = {
    getWorkoutByCategoryId({ id }: { id: string }) {
        return http.get<ResponseApi<Exercise[], any>>(URL_CATEGORIES + `/${id}/workouts`)
    },
    getWorkoutById({ id }: { id: string }) {
        return http.get<ResponseApi<Exercise, any>>(URL_WORKOUTS + `/${id}`)
    }
}

export default workoutApi
