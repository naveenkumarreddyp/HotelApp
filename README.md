
Front End Built on React + Vite
Project setup commands
- npm install
- npm run dev

Back End with Node Js
Commands
- Navigate to "backend" folder
- create .env file as below
  MONGODB_URI=mongodb://localhost:27017/hotel-booking
  JWT_SECRET=your-secret-key-here
  PORT=3000  (Please use port 3000 as i have integrated same api port in frontend react app)
- npm run dev

Screens and work flow
- when backend got started, few hotels automatically gets added in to the hotels collection.
- Login and Registration page - Register using any dummy email and password - login using email and password.
- once login, JWT token gets generated and return backed to the api, which will store in local storage manager in the browser.
- Home Page - show list of past bookings and Hotels page navigation
- Hotels Page - show list of hotels cards with view more button to show hotel details for hotel booking
- Hotel booking page - individual hotel page to book hotel with based on selection of from date and to date.
- on successful booking redirects to home page
- if hotel not available on selected dates throws error as toaster
