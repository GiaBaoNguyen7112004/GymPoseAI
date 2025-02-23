import * as React from 'react'
import { StackActions, NavigationContainerRef, NavigationAction } from '@react-navigation/native'
import { HomeTabParamList } from '../navigations/HomeTab'
import { AuthStackParamList } from '../navigations/AuthStack'
import { RegisterStackParamList } from '../navigations/RegisterStack'
import { WelcomeStackParamList } from '../navigations/WelcomeStack'
import { rootStackParamList } from '../navigations/RootTab'

type commonParamList = AuthStackParamList &
    HomeTabParamList &
    rootStackParamList &
    RegisterStackParamList &
    WelcomeStackParamList

export const navigationRef: React.RefObject<NavigationContainerRef<commonParamList>> = React.createRef()

export function navigate<RouteName extends keyof commonParamList>(
    name: RouteName,
    params?: commonParamList[RouteName]
): void {
    navigationRef.current?.navigate(name, params)
}

export function dispatch(action: NavigationAction): void {
    navigationRef.current?.dispatch(action)
}

export function replace<RouteName extends keyof commonParamList>(
    name: RouteName,
    params?: commonParamList[RouteName]
): void {
    navigationRef.current?.dispatch(StackActions.replace(name, params))
}

export function push<RouteName extends keyof commonParamList>(
    name: RouteName,
    params?: commonParamList[RouteName]
): void {
    navigationRef.current?.dispatch(StackActions.push(name, params))
}

export function goBack(): void {
    navigationRef.current?.goBack()
}

export const navigation = {
    navigate,
    dispatch,
    replace,
    push,
    goBack
}
