import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';

export default function App() {
  useEffect(() => {
    registerForPushNotifications();
    const subscription = Notifications.addNotificationReceivedListener(handleNotification);
    return () => subscription.remove();
  }, []);

  const registerForPushNotifications = async () => {
    try {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status === 'granted') {

        const tokenData = await Notifications.getExpoPushTokenAsync({
          projectId: 'bdcfb329-35a9-4436-b06d-9fa5259782a8',
        });
        const expoPushToken = tokenData.data;

        console.log('Expo Push Token:', expoPushToken);

        sendExpoPushTokenToServer(expoPushToken);
      } else {
        Alert.alert('Permission denied', 'You need to enable push notifications in settings.');
      }
    } catch (error) {
      console.error('Error registering for push notifications:', error);
    }
  }; 

  const sendExpoPushTokenToServer = async (expoPushToken) => {
    try {
      const response = await fetch('https://27f7-61-8-208-219.ngrok.io/send-notification', { // Important to replace the ngrok URL!
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ expoPushToken }),
      });

      const data = await response.json();
      console.log('Expo Push Token sent to server:', data);
    } catch (error) {
      console.error('Error sending Expo Push Token to server:', error);
    }
  };

  const handleButtonPress = () => {
    Alert.alert('Let\'s get started!');
  };

  const handleNotification = (notification) => {
    console.log('Received in-app notification:', notification);

    Alert.alert(notification.request.content.title, notification.request.content.body);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Helloss</Text>
      <Text style={styles.welcomeMessage}>Welcome!</Text>

      <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1584bf',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 36,
    marginBottom: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  welcomeMessage: {
    fontSize: 24,
    marginBottom: 30,
    color: '#ecf0f1',
    fontStyle: 'italic',
  },
  button: {
    backgroundColor: '#08a7cf',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
