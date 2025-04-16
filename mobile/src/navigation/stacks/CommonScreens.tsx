import { createStackNavigator } from '@react-navigation/stack'
import ContactUs from '@/src/screens/Other/ContactUs'
import PrivacyPolicy from '@/src/screens/Other/PrivacyPolicy/PrivacyPolicy'
import { RootStackParamList } from '../types'

const Stack = createStackNavigator<RootStackParamList>()

function CommonScreens({ isAuthenticated }: { isAuthenticated: boolean }) {
    return (
        <Stack.Group navigationKey={isAuthenticated ? 'user' : 'guest'}>
            <Stack.Screen name='ContactUs' component={ContactUs} />
            <Stack.Screen name='PrivacyPolicy' component={PrivacyPolicy} />
        </Stack.Group>
    )
}

export default CommonScreens
