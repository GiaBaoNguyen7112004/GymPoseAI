import storage from '@/utils/StorageManager.util'
import { EventRegister } from 'react-native-event-listeners'

export function logoutGlobally() {
    storage.clearStorage()
    // Emit logout event using EventRegister instead of web Event
    EventRegister.emit('logout', true)
}
