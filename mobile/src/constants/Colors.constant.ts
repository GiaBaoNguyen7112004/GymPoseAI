/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

export const Colors = {
    light: {
        text: '#1D1617',
        background: '#FFFFFF',
        tint: ['#92A3FD', '#9DCEFF'], // Brand Color (Gradient)
        icon: '#7B6F72',
        tabIconDefault: '#ADA4A5',
        tabIconSelected: ['#92A3FD', '#9DCEFF'],
        secondary: ['#C58BF2', '#EEA4CE'], // Secondary Color (Gradient)
        border: '#F7F8F8'
    },
    dark: {
        text: '#ECEDEE',
        background: '#151718',
        tint: ['#92A3FD', '#9DCEFF'],
        icon: '#ADA4A5',
        tabIconDefault: '#D9D9D9',
        tabIconSelected: ['#92A3FD', '#9DCEFF'],
        secondary: ['#C58BF2', '#EEA4CE'],
        border: '#7B6F72'
    }
}
