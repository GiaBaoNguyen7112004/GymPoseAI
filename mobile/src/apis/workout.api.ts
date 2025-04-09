import http from '@/src/utils/https.util'
import { URL_CATEGORIES, URL_WORKOUTS } from '@env'
import { ResponseApi } from '@/src/types/utils.type'
import { Exercise } from '../types/exercises.type'
import { get } from 'lodash'

const workoutApi = {
    getWorkoutByCategoryId({ id }: { id: string }) {
        return http.get<ResponseApi<Exercise[], any>>(URL_CATEGORIES + `/${id}/workouts`)
    },
    getWorkoutById({ id }: { id: string }) {
        return http.get<ResponseApi<Exercise, any>>(URL_WORKOUTS + `/${id}`)
    }
}

export default workoutApi
