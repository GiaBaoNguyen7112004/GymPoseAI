import { SvgProps } from 'react-native-svg'
import registerIcon from '@/src/assets/Icons/registerIcon.svg'
import MessageIcon from '@/src/assets/Icons/Message.svg'
import LockIcon from '@/src/assets/Icons/Lock.svg'
import LoginIcon from '@/src/assets/Icons/Login.svg'
import ProfileIcon from '@/src/assets/Icons/Profile.svg'
import WelcomeIcon from '@/src/assets/Icons/Welcome.svg'
import weightScaleIcon from '@/src/assets/Icons/weight-scale 1.svg'
import ArrowRightIcon from '@/src/assets/Icons/Arrow - Right 2.svg'
import SwapIcon from '@/src/assets/Icons/Swap.svg'
import CalendarIcon from '@/src/assets/Icons/Calendar.svg'
import TwoUserIcon from '@/src/assets/Icons/2 User.svg'
import ArrowDown from '@/src/assets/Icons/Arrow - Down 2.svg'
import movement1 from '@/src/assets/Icons/movement1.svg'
import FullBodyWorkout from '@/src/assets/Icons/Fullbody Workout.svg'
import movement3 from '@/src/assets/Icons/movement3.svg'
import FitnessX from '@/src/assets/Icons/FitnessX.svg'
import logoX from '@/src/assets/Icons/X.svg'
import homeIcon from '@/src/assets/Icons/Home.svg'
import cameraIcon from '@/src/assets/Icons/Camera.svg'
import searchIcon from '@/src/assets/Icons/Search.svg'
import activity from '@/src/assets/Icons/Activity.svg'
import ProfileLight from '@/src/assets/Icons/ProfileLight.svg'
import homeIconFilled from '@/src/assets/Icons/HomeFilled.svg'
import cameraIconFilled from '@/src/assets/Icons/CameraFilled.svg'
import activityFilled from '@/src/assets/Icons/ActivityFilled.svg'
import ProfileLightFilled from '@/src/assets/Icons/ProfileFilled.svg'
import dotGradient from '@/src/assets/Icons/Ellipse 63.svg'
import NotificationIcon from '@/src/assets/Icons/Notification.svg'
import AbWorkout from '@/src/assets/Icons/Ab-Workout 1.svg'
import loweBodyWorkout from '@/src/assets/Icons/lowebody-workout 1.svg'
import ArrowRightGradient from '@/src/assets/Icons/Arrow - Right Gradient.svg'
import pieChart from '@/src/assets/Icons/Banner--Pie-Ellipse.svg'
import line28Icon from '@/src/assets/Icons/Line 28.svg'
import sleepGraph from '@/src/assets/Icons/Sleep-Graph.svg'
import filterGradient from '@/src/assets/Icons/FilterGradient.svg'
import filter from '@/src/assets/Icons/Filter.svg'
import searchGray from '@/src/assets/Icons/SearchGray.svg'
import workout3 from '@/src/assets/Icons/workout3.svg'
import arroWRightOutline from '@/src/assets/Icons/Workout-Btn.svg'
import arrowLeft from '@/src/assets/Icons/Arrow - Left 2.svg'
import moreIcon from '@/src/assets/Icons/more-vertical 9.svg'
import closeSquare from '@/src/assets/Icons/Close Square.svg'
import closeSquareBold from '@/src/assets/Icons/Close Square bold.svg'
import bellGradientOline from '@/src/assets/Icons/bellGradientOutline.svg'
import profileGradientOuline from '@/src/assets/Icons/ProfilegradientOutline.svg'
import settingGradientOuline from '@/src/assets/Icons/SettingGradientOuline.svg'
import arrowRightGray from '@/src/assets/Icons/Arrow - Right 4.svg'
import shieldGradientOuline from '@/src/assets/Icons/ShieldGradientOuline.svg'
import messageGradientOuline from '@/src/assets/Icons/MessageGradientOuline.svg'
import stepLine from '@/src/assets/Icons/StepLine.svg'
import stepDot from '@/src/assets/Icons/StepDot.svg'

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
    | 'bellGradientOline'
    | 'profileGradientOuline'
    | 'settingGradientOuline'
    | 'arrowRightGray'
    | 'shieldGradientOuline'
    | 'messageGradientOuline'
    | 'stepLine'
    | 'stepDot'

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
    bellGradientOline: bellGradientOline,
    profileGradientOuline: profileGradientOuline,
    settingGradientOuline: settingGradientOuline,
    arrowRightGray: arrowRightGray,
    shieldGradientOuline: shieldGradientOuline,
    messageGradientOuline: messageGradientOuline,
    stepLine: stepLine,
    stepDot: stepDot
} as const
