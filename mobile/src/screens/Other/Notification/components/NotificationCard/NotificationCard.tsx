// import { GestureResponderEvent, StyleSheet, TouchableOpacity, View } from 'react-native'
// import MyIcon from '@/src/components/Icon'
// import { Notification } from '@/src/types/notification.type'

// interface NotificationCardProps<T> {
//     itemData: Notification<T>
//     onPress?: (event: GestureResponderEvent) => void
//     onBtnMorePress?: (event: GestureResponderEvent) => void
// }

// function NotificationCard<T>({ itemData, onBtnMorePress, onPress }: NotificationCardProps<T>) {
//     return (
//         <TouchableOpacity onPress={onPress} style={[styles.notiItem, !itemData.read && styles.unread]}>
//             <View style={[styles.notiItem__avatar, { backgroundColor: itemData.randomColor![0] }]}>
//                 <MyIcon name={item.randomIcon!} size={25} />
//             </View>
//             <View style={styles.notiItem__content}>
//                 <Text numberOfLines={1} ellipsizeMode='tail' style={styles.notiItem__title}>
//                     {itemData.title}
//                 </Text>
//                 <Text style={styles.notiItem__time}>{itemData.time}</Text>
//             </View>
//             <TouchableOpacity onPress={onBtnMorePress}>
//                 <MyIcon name='moreIcon' size={14} style={styles.moreIcon} />
//             </TouchableOpacity>
//         </TouchableOpacity>
//     )
// }

// export default NotificationCard

// const styles = StyleSheet.create({
//     notiItem: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         paddingVertical: 15,
//         borderBottomWidth: 1,
//         borderBottomColor: '#EEE',
//         paddingHorizontal: 10
//     },
//     notiItem__avatar: {
//         width: 40,
//         height: 40,
//         borderRadius: 999,
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginRight: 10
//     },
//     notiItem__content: {
//         flex: 1,
//         marginLeft: 10
//     },
//     notiItem__title: {
//         fontSize: 12,
//         fontWeight: '500',
//         lineHeight: 18,
//         color: '#1D1617'
//     },
//     notiItem__time: {
//         fontSize: 10,
//         fontWeight: '400',
//         lineHeight: 15,
//         color: '#7B6F72',
//         marginTop: 5
//     },
//     moreIcon: {
//         marginHorizontal: 17,
//         padding: 10
//     }
// })
