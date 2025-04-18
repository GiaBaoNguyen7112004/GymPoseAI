import { SvgProps } from 'react-native-svg'
import registerIcon from '@/assets/Icons/registerIcon.svg'
import MessageIcon from '@/assets/Icons/Message.svg'
import LockIcon from '@/assets/Icons/Lock.svg'
import LoginIcon from '@/assets/Icons/Login.svg'
import ProfileIcon from '@/assets/Icons/Profile.svg'
import WelcomeIcon from '@/assets/Icons/Welcome.svg'
import weightScaleIcon from '@/assets/Icons/weight-scale 1.svg'
import ArrowRightIcon from '@/assets/Icons/Arrow - Right 2.svg'
import SwapIcon from '@/assets/Icons/Swap.svg'
import CalendarIcon from '@/assets/Icons/Calendar.svg'
import TwoUserIcon from '@/assets/Icons/2 User.svg'
import ArrowDown from '@/assets/Icons/Arrow - Down 2.svg'
import movement1 from '@/assets/Icons/movement1.svg'
import FullBodyWorkout from '@/assets/Icons/FullBody Workout.svg'
import movement3 from '@/assets/Icons/movement3.svg'
import FitnessX from '@/assets/Icons/FitnessX.svg'
import logoX from '@/assets/Icons/X.svg'
import homeIcon from '@/assets/Icons/Home.svg'
import cameraIcon from '@/assets/Icons/Camera.svg'
import searchIcon from '@/assets/Icons/Search.svg'
import activity from '@/assets/Icons/Activity.svg'
import ProfileLight from '@/assets/Icons/ProfileLight.svg'
import homeIconFilled from '@/assets/Icons/HomeFilled.svg'
import cameraIconFilled from '@/assets/Icons/CameraFilled.svg'
import activityFilled from '@/assets/Icons/ActivityFilled.svg'
import ProfileLightFilled from '@/assets/Icons/ProfileFilled.svg'
import dotGradient from '@/assets/Icons/Ellipse 63.svg'
import NotificationIcon from '@/assets/Icons/Notification.svg'
import AbWorkout from '@/assets/Icons/Ab-Workout 1.svg'
import loweBodyWorkout from '@/assets/Icons/loweBody-workout 1.svg'
import ArrowRightGradient from '@/assets/Icons/Arrow - Right Gradient.svg'
import pieChart from '@/assets/Icons/Banner--Pie-Ellipse.svg'
import line28Icon from '@/assets/Icons/Line 28.svg'
import sleepGraph from '@/assets/Icons/Sleep-Graph.svg'
import filterGradient from '@/assets/Icons/FilterGradient.svg'
import filter from '@/assets/Icons/Filter.svg'
import searchGray from '@/assets/Icons/SearchGray.svg'
import workout3 from '@/assets/Icons/workout3.svg'
import arroWRightOutline from '@/assets/Icons/Workout-Btn.svg'
import arrowLeft from '@/assets/Icons/Arrow - Left 2.svg'
import moreIcon from '@/assets/Icons/more-vertical 9.svg'
import closeSquare from '@/assets/Icons/Close Square.svg'
import closeSquareBold from '@/assets/Icons/Close Square bold.svg'
import bellGradientOutline from '@/assets/Icons/bellGradientOutline.svg'
import profileGradientOutline from '@/assets/Icons/ProfileGradientOutline.svg'
import settingGradientOutline from '@/assets/Icons/SettingGradientOutline.svg'
import arrowRightGray from '@/assets/Icons/Arrow - Right 4.svg'
import shieldGradientOutline from '@/assets/Icons/ShieldGradientOutline.svg'
import messageGradientOutline from '@/assets/Icons/MessageGradientOutline.svg'
import stepLine from '@/assets/Icons/StepLine.svg'
import stepDot from '@/assets/Icons/StepDot.svg'
import glassOfWater from '@/assets/Icons/glassOfWaterIcon.svg'
import boots from '@/assets/Icons/bootsIcon.svg'
import humanDrinking from '@/assets/Icons/human-female-drinking.svg'
import LockGradientOutline from '@/assets/Icons/LockGradientOutline.svg'

export type IconName =
    | 'registerIcon'
    | 'lockIcon'
    | 'messageIcon'
    | 'loginIcon'
    | 'profileIcon'
    | 'welcomeIcon'
    | 'weightScaleIcon'
    | 'arrowRightIcon'
    | 'swapIcon'
    | 'calendarIcon'
    | 'twoUserIcon'
    | 'arrowDown'
    | 'movement1'
    | 'FullBodyWorkout'
    | 'movement3'
    | 'fitnessX'
    | 'logoX'
    | 'homeIcon'
    | 'cameraIcon'
    | 'searchIcon'
    | 'activity'
    | 'profileLight'
    | 'homeIconFilled'
    | 'cameraIconFilled'
    | 'activityFilled'
    | 'profileLightFilled'
    | 'dotGradient'
    | 'notificationIcon'
    | 'AbWorkout'
    | 'loweBodyWorkout'
    | 'arrowRightGradient'
    | 'pieChart'
    | 'line28Icon'
    | 'sleepGraph'
    | 'filterGradient'
    | 'filter'
    | 'searchGray'
    | 'workout3'
    | 'arroWRightOutline'
    | 'arrowLeft'
    | 'moreIcon'
    | 'closeSquare'
    | 'closeSquareBold'
    | 'bellGradientOutline'
    | 'profileGradientOutline'
    | 'settingGradientOutline'
    | 'arrowRightGray'
    | 'shieldGradientOutline'
    | 'messageGradientOutline'
    | 'stepLine'
    | 'stepDot'
    | 'boots'
    | 'glassOfWater'
    | 'humanDrinking'
    | 'LockGradientOutline'

export const ICONS: { [key in IconName]: React.ComponentType<SvgProps> } = {
    registerIcon: registerIcon,
    lockIcon: LockIcon,
    messageIcon: MessageIcon,
    loginIcon: LoginIcon,
    profileIcon: ProfileIcon,
    welcomeIcon: WelcomeIcon,
    weightScaleIcon: weightScaleIcon,
    arrowRightIcon: ArrowRightIcon,
    swapIcon: SwapIcon,
    calendarIcon: CalendarIcon,
    twoUserIcon: TwoUserIcon,
    arrowDown: ArrowDown,
    movement1: movement1,
    FullBodyWorkout: FullBodyWorkout,
    movement3: movement3,
    fitnessX: FitnessX,
    logoX: logoX,
    homeIcon: homeIcon,
    cameraIcon: cameraIcon,
    searchIcon: searchIcon,
    activity: activity,
    profileLight: ProfileLight,
    homeIconFilled: homeIconFilled,
    cameraIconFilled: cameraIconFilled,
    activityFilled: activityFilled,
    profileLightFilled: ProfileLightFilled,
    dotGradient: dotGradient,
    notificationIcon: NotificationIcon,
    AbWorkout: AbWorkout,
    loweBodyWorkout: loweBodyWorkout,
    arrowRightGradient: ArrowRightGradient,
    pieChart: pieChart,
    line28Icon: line28Icon,
    sleepGraph: sleepGraph,
    filterGradient: filterGradient,
    filter: filter,
    searchGray: searchGray,
    workout3: workout3,
    arroWRightOutline: arroWRightOutline,
    arrowLeft: arrowLeft,
    moreIcon: moreIcon,
    closeSquare: closeSquare,
    closeSquareBold: closeSquareBold,
    bellGradientOutline: bellGradientOutline,
    profileGradientOutline: profileGradientOutline,
    settingGradientOutline: settingGradientOutline,
    arrowRightGray: arrowRightGray,
    shieldGradientOutline: shieldGradientOutline,
    messageGradientOutline: messageGradientOutline,
    stepLine: stepLine,
    stepDot: stepDot,
    boots: boots,
    glassOfWater: glassOfWater,
    humanDrinking: humanDrinking,
    LockGradientOutline: LockGradientOutline
} as const
