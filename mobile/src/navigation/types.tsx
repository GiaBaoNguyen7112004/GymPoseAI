// navigation/types.ts
import type { CompositeScreenProps } from '@react-navigation/native'
import type { StackScreenProps } from '@react-navigation/stack'
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { Category } from '../types/exercises.type'

export type RootStackParamList = {
    Login: undefined
    CreateAccount: undefined
    CompleteProfile: undefined
    ConfirmYourGoal: undefined
    ForgotPassword: undefined
    Welcome: undefined
    MainTab: undefined
    Notification: undefined
    ContactUs: undefined
    PrivacyPolicy: undefined
    WorkoutHistoryCenter: undefined
    WorkoutHistoryDetail: { workout_id: string }
    CategoryDetail: { category: Category }
    WorkoutDetail: { workout_id: string }
    ActivityTracker: undefined
}

export type RootStackScreenProps<T extends keyof RootStackParamList> = StackScreenProps<RootStackParamList, T>

export type MainTabParamList = {
    Home: undefined
    WorkoutTracker: undefined
    Search: undefined
    StoryTaker: undefined
    Profile: undefined
}

export type ProfileStackParamList = {
    ManageProfile: undefined
    Privacy: undefined
    ActivityHistory: undefined
    Setting: undefined
}

export type HomeTabScreenProps<T extends keyof MainTabParamList> = CompositeScreenProps<
    BottomTabScreenProps<MainTabParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
>

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}
