import React, { useContext, useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import EntryScreen from './screens/EntryScreen'
import NameFormScreen from './screens/NameFormScreen'
import { useQuery } from '@tanstack/react-query'
import { AppContext } from '@/Contexts/App.context'
import { userApi } from '@/services/rest'

export type Flow = 'entry' | 'editProfile' | 'editName' | 'changeAvatar'

export type FlowProps = {
    onNavigate: (flow: Flow) => void
    onGoBack?: () => void
}

const PersonalDataFlow = () => {
    const [flowStack, setFlowStack] = useState<Flow[]>(['entry'])

    const currentFlow = flowStack[flowStack.length - 1]

    const navigateTo = (flow: Flow) => {
        setFlowStack((prev) => [...prev, flow])
    }

    const goBack = () => {
        if (flowStack.length > 1) {
            setFlowStack((prev) => prev.slice(0, prev.length - 1))
        }
    }

    const { profile, setProfile } = useContext(AppContext)

    const { data, refetch } = useQuery({
        queryKey: ['profile_user', profile?.id],
        queryFn: () => userApi.getProfile({ id: profile?.id as string }),
        enabled: !!profile?.id
    })

    const userInfo = data?.data.data || profile

    useEffect(() => {
        if (data?.data.data) {
            setProfile({ ...profile, ...data.data.data })
        }
    }, [data])
    const renderCurrentFlow = () => {
        switch (currentFlow) {
            case 'entry':
                return <EntryScreen userInfo={userInfo} onNavigate={navigateTo} />
            case 'editName':
                return (
                    <NameFormScreen
                        refetch={refetch}
                        onNavigate={navigateTo}
                        onGoBack={goBack}
                        first_name={userInfo?.first_name}
                        last_name={userInfo?.last_name}
                    />
                )
            default:
                return null
        }
    }

    return <View style={styles.wrapper}>{renderCurrentFlow()}</View>
}

export default PersonalDataFlow

const styles = StyleSheet.create({
    wrapper: {
        paddingHorizontal: 20,
        flex: 1
    }
})
