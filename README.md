# 🧠 MediSafe AI  
## 💊 AI Powered Drug Interaction Detection & Warning System

MediSafe AI is an intelligent healthcare web application that helps users detect potentially dangerous drug combinations before consumption.

It analyzes user-provided medication lists and provides real-time interaction severity levels, possible side effects, and medical consultation warnings using an AI-driven decision support engine.

---

## 🚨 Problem Statement

Patients often consume multiple medications without knowing possible drug-drug interactions, which can lead to serious health risks such as:

- Internal Bleeding  
- Organ Damage  
- Liver Failure  
- Respiratory Depression  
- Life-threatening complications  

MediSafe AI provides an early warning system by detecting harmful medicine combinations before consumption.

---

## 💡 Solution

MediSafe AI allows users to:

1. Enter a list of medicines they are currently taking  
2. Analyze possible drug-drug interactions  
3. Identify severity levels of interactions  
4. Receive warnings for high-risk combinations  
5. Get medical consultation recommendations  

---

## ✨ Key Features

### 🔍 Drug Interaction Detection
Detects potentially dangerous combinations of medicines using a pharmaceutical interaction dataset.

---

### ⚠️ Severity Level Prediction

Classifies interactions into:

- 🟢 Safe  
- 🟡 Mild  
- 🟠 Moderate  
- 🔴 Severe  

Based on clinical documentation.

---

### 🧬 Side Effects Analysis
Provides information about possible risks such as:

- Internal Bleeding  
- Liver Damage  
- Kidney Issues  
- Respiratory Depression  
- Muscle Toxicity  

---

### 🤖 AI Chatbot Assistant

Users can ask in natural language:

Can I take Dolo 650 with Augmentin?


The chatbot extracts medicine names and returns:

- Interaction status  
- Severity level  
- Risk warning  

---

### 📄 Prescription Upload

Upload prescriptions in:

- PDF  
- JPG  
- PNG  

for medicine extraction and automated safety analysis.

---

### 🌙 Dark Medical Dashboard UI

Clean and professional healthcare themed dark interface for:

- Better readability  
- Clinical style decision support  
- Improved user experience  

---

## 🛠️ Tech Stack

| Layer      | Technology   |
|------------|--------------|
| Frontend   | React.js     |
| Backend    | FastAPI      |
| Styling    | Tailwind CSS |
| AI Logic   | CSV Dataset  |
| Routing    | React Router |
| API        | REST API     |
| File Upload| PDF/JPG/PNG  |

---

## 🧩 System Architecture

User Input
↓
Frontend (React UI)
↓
FastAPI Backend
↓
Drug Interaction Engine
↓
Severity Prediction
↓
Warning Output


---

## 🚀 How to Run Locally

1️⃣ Clone Repository

git clone <your-repo-link>
cd project-folder

2️⃣ Run Backend

cd backend
uvicorn main:app --reload


3️⃣ Run Frontend

cd frontend
npm install
npm run dev


📌 Future Enhancements

Machine Learning based interaction prediction

Real-time pharmaceutical database integration

Multi-language chatbot support

Mobile app version

Cloud deployment

🏥 Use Cases

Hospitals

Pharmacies

Telemedicine Platforms

Elderly Patients

Chronic Disease Patients

📜 Disclaimer

This project is intended for educational and research purposes only and should not replace professional medical advice.
