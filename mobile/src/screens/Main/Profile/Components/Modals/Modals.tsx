import LoaderModal from '@/components/LoaderModal'
import ModalLogout from '../ModalLogout/ModalLogout'
import { memo } from 'react'

interface Props {
    isLoggingOut: boolean
    isLogoutModalVisible: boolean
    setIsLoggingOut: (val: boolean) => void
    toggleModal: (val: boolean) => void
}

const Modals = ({ isLoggingOut, isLogoutModalVisible, setIsLoggingOut, toggleModal }: Props) => (
    <>
        <ModalLogout
            isLoggingOut={isLoggingOut}
            isLogoutModalVisible={isLogoutModalVisible}
            setIsLoggingOut={setIsLoggingOut}
            toggleModal={toggleModal}
        />
        {isLoggingOut && <LoaderModal title='logging out' />}
    </>
)

export default memo(Modals)
