import { AppContext } from '@/Contexts/App.context'
import { useContext } from 'react'

const useAppContext = () => {
    const context = useContext(AppContext)
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider')
    }
    return context
}

export default useAppContext
