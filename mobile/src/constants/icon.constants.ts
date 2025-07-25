import type { SvgProps } from 'react-native-svg'

// Dùng require context để tự động import
const icons = {
    registerIcon: require('@/assets/Icons/registerIcon.svg').default,
    messageIcon: require('@/assets/Icons/Message.svg').default,
    lockIcon: require('@/assets/Icons/Lock.svg').default,
    loginIcon: require('@/assets/Icons/Login.svg').default,
    profileIcon: require('@/assets/Icons/Profile.svg').default,
    welcomeIcon: require('@/assets/Icons/Welcome.svg').default,
    weightScaleIcon: require('@/assets/Icons/weight-scale 1.svg').default,
    arrowRightIcon: require('@/assets/Icons/Arrow - Right 2.svg').default,
    swapIcon: require('@/assets/Icons/Swap.svg').default,
    calendarIcon: require('@/assets/Icons/Calendar.svg').default,
    twoUserIcon: require('@/assets/Icons/2 User.svg').default,
    arrowDown: require('@/assets/Icons/Arrow - Down 2.svg').default,
    movement1: require('@/assets/Icons/movement1.svg').default,
    FullBodyWorkout: require('@/assets/Icons/FullBody Workout.svg').default,
    movement3: require('@/assets/Icons/movement3.svg').default,
    fitnessX: require('@/assets/Icons/FitnessX.svg').default,
    logoX: require('@/assets/Icons/X.svg').default,
    homeIcon: require('@/assets/Icons/Home.svg').default,
    cameraIcon: require('@/assets/Icons/Camera.svg').default,
    searchIcon: require('@/assets/Icons/Search.svg').default,
    activity: require('@/assets/Icons/Activity.svg').default,
    profileLight: require('@/assets/Icons/ProfileLight.svg').default,
    homeIconFilled: require('@/assets/Icons/HomeFilled.svg').default,
    cameraIconFilled: require('@/assets/Icons/CameraFilled.svg').default,
    activityFilled: require('@/assets/Icons/ActivityFilled.svg').default,
    profileLightFilled: require('@/assets/Icons/ProfileFilled.svg').default,
    dotGradient: require('@/assets/Icons/Ellipse 63.svg').default,
    activeDotGradient: require('@/assets/Icons/activeDot.svg').default,
    notificationIcon: require('@/assets/Icons/Notification.svg').default,
    AbWorkout: require('@/assets/Icons/Ab-Workout 1.svg').default,
    loweBodyWorkout: require('@/assets/Icons/loweBody-workout 1.svg').default,
    arrowRightGradient: require('@/assets/Icons/Arrow - Right Gradient.svg').default,
    pieChart: require('@/assets/Icons/Banner--Pie-Ellipse.svg').default,
    line28Icon: require('@/assets/Icons/Line 28.svg').default,
    sleepGraph: require('@/assets/Icons/Sleep-Graph.svg').default,
    filterGradient: require('@/assets/Icons/FilterGradient.svg').default,
    filter: require('@/assets/Icons/Filter.svg').default,
    searchGray: require('@/assets/Icons/SearchGray.svg').default,
    workout3: require('@/assets/Icons/workout3.svg').default,
    arroWRightOutline: require('@/assets/Icons/Workout-Btn.svg').default,
    arrowLeft: require('@/assets/Icons/Arrow - Left 2.svg').default,
    moreIcon: require('@/assets/Icons/more-vertical 9.svg').default,
    closeSquare: require('@/assets/Icons/Close Square.svg').default,
    closeSquareBold: require('@/assets/Icons/Close Square bold.svg').default,
    bellGradientOutline: require('@/assets/Icons/bellGradientOutline.svg').default,
    profileGradientOutline: require('@/assets/Icons/ProfileGradientOutline.svg').default,
    settingGradientOutline: require('@/assets/Icons/SettingGradientOutline.svg').default,
    arrowRightGray: require('@/assets/Icons/Arrow - Right 4.svg').default,
    shieldGradientOutline: require('@/assets/Icons/ShieldGradientOutline.svg').default,
    messageGradientOutline: require('@/assets/Icons/MessageGradientOutline.svg').default,
    stepLine: require('@/assets/Icons/StepLine.svg').default,
    stepDot: require('@/assets/Icons/StepDot.svg').default,

    glassOfWater: require('@/assets/Icons/glassOfWaterIcon.svg').default,
    boots: require('@/assets/Icons/bootsIcon.svg').default,
    humanDrinking: require('@/assets/Icons/human-female-drinking.svg').default,
    LockGradientOutline: require('@/assets/Icons/LockGradientOutline.svg').default,
    NotificationFilled: require('@/assets/Icons/NotificationFilled.svg').default
}

export type IconName = keyof typeof icons
export const ICONS: { [K in IconName]: React.ComponentType<SvgProps> } = icons
