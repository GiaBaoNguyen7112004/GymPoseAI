import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, SafeAreaView, View, SafeAreaViewBase } from 'react-native'
import EntryScreen from './screens/EntryScreen'
import { QueryObserverResult, RefetchOptions, useQuery } from '@tanstack/react-query'
import { AppContext } from '@/Contexts/App.context'
import { userApi } from '@/services/rest'
import UpdateProfileNameScreen from './screens/UpdateProfileNameScreen'
import PreviewAvatarScreen from './screens/PreviewAvatarScreen'
import { AxiosResponse } from 'axios'
import { ResponseApi } from '@/types/utils.type'
import { User } from '@/types/user.type'

export type Flow = 'entry' | 'editProfile' | 'editName' | 'changeAvatar'

export type FlowProps = {
    onNavigate: (flow: Flow) => void
    onGoBack?: () => void
    refetch?: (options?: RefetchOptions) => Promise<QueryObserverResult<AxiosResponse<ResponseApi<User, any>>, Error>>
}

interface PersonalDataFlowProps {
    onClose: () => void
}
const PersonalDataFlow = ({ onClose }: PersonalDataFlowProps) => {
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
                return <EntryScreen userInfo={userInfo} onNavigate={navigateTo} onGoBack={onClose} />
            case 'editName':
                return (
                    <UpdateProfileNameScreen
                        refetch={refetch}
                        onNavigate={navigateTo}
                        onGoBack={goBack}
                        first_name={userInfo?.first_name}
                        last_name={userInfo?.last_name}
                    />
                )
            case 'changeAvatar':
                return <PreviewAvatarScreen onNavigate={navigateTo} onGoBack={goBack} />
            default:
                return null
        }
    }

    return <View style={styles.wrapper}>{renderCurrentFlow()}</View>
}

export default PersonalDataFlow

const styles = StyleSheet.create({
    wrapper: {
        flex: 1
    }
})
