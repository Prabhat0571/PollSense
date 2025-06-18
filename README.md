
```markdown
# 🗳️ Intervue.io - Live Polling App

A real-time polling web application. The platform allows **teachers** to create timed multiple-choice polls and **students** to respond in real time with live result tracking and engagement analytics.

## 🚀 Features

### 👩‍🏫 Teacher Interface
- Create and launch MCQ-based polls with a timer
- Mark one or multiple options as correct
- View real-time responses and analytics
- Access previous poll history

### 👨‍🎓 Student Interface
- Join live polls with a simple interface
- Answer within the given time window
- View real-time results and leaderboard (if applicable)

### 📊 Analytics
- Response count
- Correctness rate
- Participation percentage
- Engagement Score (based on time + accuracy)



## 🛠️ Tech Stack

| Frontend      | Backend         | Real-time Engine | Database  | Hosting     |
|---------------|------------------|------------------|-----------|-------------|
| React.js (Vite + Bootstrap) | Node.js + Express.js | Socket.IO         | MongoDB    | Render / Vercel |


### 🔧 Backend (Express + MongoDB)

```bash
cd Backend
npm install
# Set environment variables in .env (e.g. PORT, MONGO_URI)
npm run dev
````

### 🖥️ Frontend (React + Vite)

```bash
cd Frontend
npm install
npm run dev
```

> ✅ Make sure both frontend and backend are running on compatible ports and communicating over WebSocket (`socket.io`).

---

## 🌐 Live Demo

🔗 Hosted Link: [Live App](https://intervue-io-task.vercel.app/)
📁 GitHub Repo: [GitHub](https://github.com/Amanw-25/Intervue.io-Task)

---

## 📌 Assignment Requirements Checklist

* [x] Custom UI designed based on blueprint
* [x] Realtime features using `socket.io`
* [x] Timer-based question flow
* [x] Analytics and poll history
* [x] Hosted live with working link

---

## 🙋 About the Developer

👋 I'm **Aman Wairagkar**, a passionate full-stack developer with a focus on real-time web applications and modern UX.
🔗 [LinkedIn](https://linkedin.com/in/amanwairagkar) • [GitHub](https://github.com/Amanw-25)

---


