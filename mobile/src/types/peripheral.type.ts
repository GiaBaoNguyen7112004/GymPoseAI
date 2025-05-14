export interface PeripheralType {
    id: string
    name: string
    ip_address: string
    config: DeviceConfig
}
export interface DeviceConfig {
    mute?: boolean
}
