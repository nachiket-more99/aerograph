# AeroGraph

A full-stack flight data analytics dashboard built with React and Node.js, visualizing 10,000+ US domestic flights across interactive maps, delay charts, and route distributions.

**Live Demo:** https://aerograph-xi.vercel.app

## Tech Stack

- **Frontend:** React, React Router, Framer Motion, react-simple-maps, react-google-charts, Material UI
- **Backend:** Node.js, Express.js, MongoDB Atlas, Mongoose
- **Deployment:** Vercel (frontend), Render (backend)

## Features

- **Airlines Dashboard** - Pie chart of flight distribution by airline, stacked bar chart of departure/arrival delays, historical performance line chart per airline
- **Airports Dashboard** - Interactive US map with airport markers by state, pie chart of busiest airports by traffic, searchable airport directory
- **Flights Dashboard** - Live flight route map with origin/destination lines, stat cards for total flights, origins and destinations, filterable routes table

## Run Locally

**Clone the repo:**
```bash
git clone https://github.com/nachiket-more99/aerograph.git
```

**Backend:**
```bash
cd aerograph/backend-app
npm install
```

Create a `.env` file in `backend-app/`:
```
PORT=5000
DB_USER=nachiket
DB_PASSWORD=aerographnachiket
DB_NAME=flights_data
```
```bash
npm start
```

**Frontend:**
```bash
cd aerograph/frontend-app
npm install
```

Create a `.env` file in `frontend-app/`:
```
REACT_APP_API_URL=http://localhost:5000
```
```bash
npm start
```

Dashboard runs at `http://localhost:3000`

## Project Structure
```
aerograph/
├── frontend-app/        # React app
│   └── src/
│       ├── components/  # Airlines, Airports, Flights, Navbar, Landing
│       └── context/     # DataContext for global state
└── backend-app/         # Express API
    └── src/
        └── routes/      # airlines, airports, flights routes
```

## Data

US DOT 2015 Airline On-Time Statistics - 10,000 flight records across 13 airlines and 300+ airports.