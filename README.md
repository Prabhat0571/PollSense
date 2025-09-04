# PollSense

A full-stack live polling system for teachers and students, built with React (Vite), Node.js/Express, Socket.io, and MongoDB (Atlas). Teachers can create live polls, students can participate and see results in real-time.

---

## Features
- Teacher and student login
- Teachers can create live polls with multiple options
- Students can answer polls and see real-time results
- Real-time chat and participant management
- Poll history for teachers
- Responsive, modern UI

---

## Tech Stack
- **Frontend:** React (Vite), Bootstrap, Socket.io-client
- **Backend:** Node.js, Express, Socket.io, Mongoose
- **Database:** MongoDB Atlas
- **Deployment:** Render.com

---

## Project Structure
```
├── Backend/
│   ├── src/
│   ├── package.json
│   └── ...
├── Frontend/
│   ├── src/
│   ├── package.json
│   └── ...
└── README.md
```

---

## Local Development Setup

### 1. **Clone the repository**
```sh
git clone <your-repo-url>
cd <repo-folder>
```

### 2. **Setup Backend**
```sh
cd Backend
npm install
```
- Create a `.env` file in `Backend/`:
  ```
  MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/<dbname>?retryWrites=true&w=majority
  ```
- Start the backend:
  ```sh
  npm start
  # or
  nodemon src/app.js
  ```

### 3. **Setup Frontend**
```sh
cd ../Frontend
npm install
```
- Create a `.env` file in `Frontend/`:
  ```
  VITE_API_BASE_URL=http://localhost:3000
  ```
- Start the frontend:
  ```sh
  npm run dev
  ```
- Visit [http://localhost:5173](http://localhost:5173)

---

## Deployment on Render

### **Backend**
- Deploy `Backend/` as a **Web Service** on Render.
- Set environment variable `MONGODB_URI` to your MongoDB Atlas connection string.
- Ensure your server listens on `0.0.0.0` and uses `process.env.PORT`.

### **Frontend**
- Deploy `Frontend/` as a **Static Site** on Render.
- Set environment variable `VITE_API_BASE_URL` to your backend Render URL (e.g., `https://pollsense-backend-xxaf.onrender.com`).
- Build command: `npm install && npm run build`
- Publish directory: `dist`

---

## Environment Variables

### **Backend**
- `MONGODB_URI` — MongoDB Atlas connection string

### **Frontend**
- `VITE_API_BASE_URL` — URL of your deployed backend

---

## Usage
1. Open the frontend URL in your browser.
2. Choose your role (Teacher/Student).
3. Teachers can create polls; students can join and answer.
4. See real-time results and chat with participants.

---

## License
MIT
