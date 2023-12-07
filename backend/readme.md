Name:Test APNs
Key ID:85V99DKPTK
Services:Apple Push Notifications service (APNs) 

1. node index.js
2. open another terminal and "ngrok http 3000"
3. open another terminal to send the notification

curl -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "expoPushToken": "ExponentPushToken[70iRCDCPh0hGI3zarMCRjq]",
    "title": "Test Notification",
    "body": "This is a test push notification."
  }' \
  http://localhost:3000/send-notification
⚠️
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "expoPushToken": "ExponentPushToken[70iRCDCPh0hGI3zarMCRjq]",
    "title": "⚠️ ALERT! ⚠️",
    "body": "Please evacute immediately!"
  }' \
  http://localhost:3000/send-notification