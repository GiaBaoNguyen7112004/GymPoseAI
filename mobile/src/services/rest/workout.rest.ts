import http from '@/src/services/core/httpClient'
import { URL_CATEGORIES, URL_WORKOUTS } from '@env'
import { ResponseApi } from '@/src/types/utils.type'
import { Exercise } from '@/src/types/exercises.type'

const workoutApi = {
    getWorkoutByCategoryId({ id }: { id: string }) {
        return http.get<ResponseApi<Exercise[], any>>(URL_CATEGORIES + `/${id}/workouts`)
    },
    getWorkoutById({ id }: { id: string }) {
        return http.get<ResponseApi<Exercise, any>>(URL_WORKOUTS + `/${id}`)
    }
}

export default workoutApi
