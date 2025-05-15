import { useEmailPasswordLogin } from './useEmailPasswordLogin'
import { useFacebookLogin } from './useFacebookLogin'

function useAuth() {
    const emailPassword = useEmailPasswordLogin()
    const facebook = useFacebookLogin()

    return { emailPassword, facebook }
}

export default useAuth
