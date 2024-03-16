## Backend
```
cd backend
```
Then install package required, i recommended using python 3.11
```
pip install -r requirements.txt
```
If installation success, then start the program by:
```
python app.py
```
Note your localhost port open to place in frontend and mobile

## Frontend
```
cd frontend
npm install
```
If npm install done, before run the app
```
npm start
```

## Mobile

1. Its same run **Kotlin Multiplatform Project**, you must open this project with newest **Intellij Idea**, minimum java is 17.2
2. In android you only can connection with Secure HTTP, alternatively you can use ngrok for tunnel backend port, then place the ngrok url at ![here](https://github.com/caksun05/google-solution-challenge2024/edit/main/mobile/composeApp/src/commonMain/kotlin/repositories/MessageRepository.kt)
```kotlin
 private val baseUrl: String = "<your-ngrok-url>"
```

then enjoy
