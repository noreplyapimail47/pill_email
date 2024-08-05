# PILL EMAIL API

## Running the app

### 1. Install dependencies

```bash
npm install
```

### 2. Add a .env file in the root directory following the example.env file, for instance:

```bash
PORT=3000
EMAIL_USER=noreply@gmail.com
EMAIL_PASSWORD=noreply123
EMAIL_TO_SEND=addressee@gmail.com
SECOND_EMAIL_TO_SEND=addressee@gmail.com
MINUTE_TO_SEND_EMAIL=*
HOUR_TO_SEND_EMAIL=*
DAY_OF_MONTH_TO_SEND_EMAIL=*
MONTH_TO_SEND_EMAIL=*
DAY_OF_WEEK_TO_SEND_EMAIL=*
```

### 3.1. Run the app in development mode

```bash
npm run dev
```

### 3.2. Build and run the app in production mode

```bash
npm run build
```

```bash
npm run start
```

### 3.3. Build and run the app with one command

```bash
npm run build-start
```