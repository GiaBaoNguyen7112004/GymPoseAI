# 📱 GymPoseAI – Mobile App

This is the official **React Native (Expo)** mobile application for **GymPoseAI**, a smart AI-powered workout assistant designed to help users train effectively from home using real-time posture analysis and feedback.


![App UI Preview](../docs/images/mobile-preview.png)
---

## 🚀 Features

- 🤖 **Real-time Pose Feedback** using AI and external camera.
- 📊 **Workout History Tracking**: includes type, duration, repetitions, and performance scores.
- 📈 **Progress Visualization**: view progress across weekly, monthly, and yearly charts.
- 🎯 **Goal Setting & Reminders**: set training goals and get hydration/calorie reminders.
- 🔔 **Push Notifications** via Firebase Cloud Messaging (FCM).
- 🔐 **Secure Login** through OAuth 2.0 (Facebook supported).

---

## ⚙️ Tech Stack

| Feature           | Technology                  |
| ----------------- | --------------------------- |
| Language          | TypeScript / JavaScript     |
| Framework         | React Native + Expo SDK     |
| State Management  | React Context + React Query |
| Local Storage     | AsyncStorage                |
| API Communication | Axios + WebSocket           |
| Video Streaming   | WebRTC                      |
| Notifications     | Firebase Cloud Messaging    |

---

## 📲 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Dangtruong-DUT/GymPoseAI-
cd gymposeAI/mobile
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the App with Expo

```bash
npm run dev --clear
```

### 4. Build with EAS (Expo Application Services)

```bash
eas build --profile development --platform android
```

---

## ⚠️ Platform Limitations

> **Currently supported platform**: Android only.

iOS is temporarily unsupported due to constraints in:

- Camera permission handling
- Facebook SDK compatibility
- WebRTC integration

We’re actively working on adding iOS support in future releases.

---

## 🔐 Facebook OAuth Setup

This app uses `react-native-fbsdk-next` for Facebook login. To enable:

1. Set up your Facebook App in the [Facebook Developer Console](https://developers.facebook.com/).
2. Configure the following:

    - `android/app/src/main/AndroidManifest.xml`
    - `android/app/src/main/res/values/strings.xml`

3. Provide your Facebook App ID and Client Token.
4. Follow the official [react-native-fbsdk-next Android setup guide](https://github.com/thebergamo/react-native-fbsdk-next).

---

## 🔔 Firebase Cloud Messaging (FCM) Setup

Push notifications use Expo Push Tokens combined with FCM:

- Ensure your Firebase project is correctly configured and linked to Expo.
- Add your FCM server key to Expo's notification settings.
- The app automatically retrieves the Expo Push Token at launch.
- Users must allow notification permissions on first launch.

More information: [Expo Notifications Docs](https://docs.expo.dev/versions/latest/sdk/notifications/)

---

## 🗺️ Mobile App + IoT Device Architecture

You can insert a visual diagram or flowchart image here to explain the connection between the mobile app and the IoT device.

### 📌 Suggested Section Structure:

- **App ↔️ WebSocket Server**: Real-time messaging for posture analysis.
- **WebSocket Server ↔️ IoT Device (Raspberry Pi etc.)**: Sends sensor data to server.
- **Mobile App**: Displays AI feedback, training progress, and push notifications.

Insert image below:

![Mobile App to IoT Device Flow](../docs/images/flow_connect_to_IOT.png)

---

## 📸 Screens & Map

Add a visual preview of key screens and navigation map for easier understanding.

![App UI Preview](../docs/images/screen_map_mobile.png)

---

## 🧑‍💻 Contributions & Support

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

If you encounter any issues, feel free to submit an issue on the [GitHub repo](https://github.com/Dangtruong-DUT/GymPoseAI-).

---

## 📄 License

This project is licensed under the MIT License.
