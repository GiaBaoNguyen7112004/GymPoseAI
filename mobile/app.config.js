const IS_DEV = process.env.APP_VARIANT === 'development';

export default {
  scheme: IS_DEV ? 'gymposeai-dev' : 'gymposeai',
  name: IS_DEV ? 'GymPoseAI (Development)' : 'GymPoseAI',
  slug: 'GymPoseAI',
  version: '1.0.2',
  orientation: 'portrait',
  icon: './src/assets/images/logo.png',
  userInterfaceStyle: 'automatic',
  newArchEnabled: true,
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.taplamit.GymPoseAI',
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
      NSCameraUsageDescription: 'This app uses the camera to scan barcodes on event tickets.',
    },
    usesAppleSignIn: false,
  },
  android: {
    blockedPermissions: [
      'android.permission.RECORD_AUDIO',
      'android.permission.RECORD_AUDIO',
      'NOTIFICATIONS',
    ],
    adaptiveIcon: {
      foregroundImage: './src/assets/images/logo.png',
      backgroundColor: '#ffffff',
    },
    permissions: [
      'android.permission.READ_EXTERNAL_STORAGE',
      'android.permission.WRITE_EXTERNAL_STORAGE',
      'android.permission.CAMERA',
      'android.permission.RECORD_AUDIO',
      'android.permission.MODIFY_AUDIO_SETTINGS',
      'android.permission.BLUETOOTH',
      'android.permission.BLUETOOTH_ADMIN',
      'android.permission.BLUETOOTH_CONNECT',
    ],
    package: 'com.taplamit.GymPoseAI',
    googleServicesFile: "./google-services.json"
  },
  web: {
    bundler: 'metro',
    output: 'static',
    favicon: './src/assets/images/logo.png',
  },
  plugins: [
    [
      'expo-splash-screen',
      {
        image: './src/assets/images/icon.png',
        imageWidth: 200,
        resizeMode: 'cover',
        backgroundColor: '#ffffff',
      },
    ],
    [
      'expo-media-library',
      {
        photosPermission: 'Allow $(PRODUCT_NAME) to access your photos.',
        savePhotosPermission: 'Allow $(PRODUCT_NAME) to save photos.',
      },
    ],
    [
      'expo-av',
      {
        microphonePermission: 'Allow $(PRODUCT_NAME) to access your microphone.',
      },
    ],
    [
      'react-native-ble-plx',
      {
        isBackgroundEnabled: true,
        modes: ['peripheral', 'central'],
        bluetoothAlwaysPermission: 'Allow $(PRODUCT_NAME) to connect to bluetooth devices',
      },
    ],
    ['expo-image-picker'],
    [
      'expo-dev-client',
      {
        addGeneratedScheme: !!IS_DEV,
      },
    ],
    ["react-native-fbsdk-next", {
      appID: '1852106532214043',
      clientId: "37b622f6e337065117c580be5f6b4862",
      displayName: "GymPoseAI",
      scheme: 'fb1852106532214043',
      advertiserIDCollectionEnabled: false,
      autoLogAppEventsEnabled: false,
      isAutoInitEnabled: true,
      iosUserTrackingPermission: "This identifier will be used to deliver personalized ads to you."
    }
    ]],
  extra: {
    eas: {
      projectId: '237cb4c2-14e4-427d-867a-bcfcbce60d21',
    },
  },
  doctor: {
    reactNativeDirectoryCheck: {
      exclude: ['react-native-chart-kit', 'react-native-element-dropdown'],
      listUnknownPackages: false,
    },
  },
};

