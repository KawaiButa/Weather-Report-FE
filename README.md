## Weather Report Application
A Weather Report application built with Next.js that fetches and displays weather data for different cities.
We deploy the project on vercel for a demo.

Demo: [here](https://weather-report-dv3vf44qv-nmphaps-projects.vercel.app/)

# Note:
- As the demo backend is host on Render, it will takes 50-70s for the backend server to start running. Therefore, the first time request to the backend will take longer than normal.
- The FE is using NextJS Server-side rendering. Despite being fast in normal situations than Client-side rendering (the template is pre-built and the API call could be cached in the FE server), the FE client will look like it being frozen when the BE server is starting up,. However this is an issue of NextJS when it is not compatible with exist animation and results in just waiting for the BE before reload the UI. 

# Table of Contents
1. Features
2. Prerequisites
3. Installation
4. Configuration
5. Running the Application
6. Building the Application
7.Technologies Used
# Features
- Display current weather information for selected cities
- Responsive design
- Subscription and email verification
# Prerequisites
Before you begin, ensure you have met the following requirements:

- Node.js (v12.x or later)
- npm (v6.x or later) or yarn (v1.x or later)
# Installation
Clone the repository:

```
git clone https://github.com/KawaiButa/Weather-Report-FE.git
cd Weather-Report-FE
```

# Install the dependencies:

```
npm install
```
or
```
yarn install
```
# Configuration
Create a .env.local file in the root of the project.

Add your backend base URL for the weather API in the .env.local file. For example:
```
NEXT_PUBLIC_BACKEND_URL = your_backend_url_here
```

# Running the Application
To run the application locally, use the following command:

```
npm run dev
```
# or
```
yarn dev
```
The application will be accessible at http://localhost:3000.

# Building the Application
To create an optimized production build of the application, use the following command:

```
npm run build
```
or
```
yarn build
```
You can then start the production server:

```
npm start
```
or
```
yarn start
```
The application will be accessible at http://localhost:3000.

# Technologies Used
- [Next.js](https://nextjs.org/)
- [Material-UI (MUI)](https://mui.com/)
- [Weather API](https://www.weatherapi.com/)
