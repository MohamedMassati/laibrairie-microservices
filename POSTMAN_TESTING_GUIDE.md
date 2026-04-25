# 📮 Complete Postman Testing Guide - Librairie Microservices

## 🎯 Overview

This guide walks you through testing all 6 microservices using Postman with real data and all HTTP methods (GET, POST, PUT, DELETE).

---

## 📥 STEP 1 — Import the Postman Collection

1. **Download the JSON file**: `Librairie_Microservices.postman_collection.json`
2. Open **Postman** (download from https://www.postman.com/downloads/ if needed)
3. Click **File** → **Import**
4. Select the JSON file
5. You should see a new collection with all services ✅

---

## 🚀 STEP 2 — Make sure all services are running

Before testing, verify all 6 services are running:

```bash
# Terminal 1
cd service-livre && node index.js

# Terminal 2
cd service-emprunt && node index.js

# Terminal 3
cd service-client && node index.js

# Terminal 4
cd service-notification && node index.js

# Terminal 5
cd service-paiement && node index.js

# Terminal 6
cd api-gateway && node index.js
```

Also make sure **MongoDB is running**:
```bash
mongod
```

---

## 📚 COMPLETE TESTING FLOW

Follow this order to test everything correctly:

---

### **1️⃣ SERVICE LIVRE (Port 3001) - Books Management**

#### Test 1: POST add book
```
Method: POST
URL: http://localhost:3001/api/v1/livre
Header: Content-Type: application/json

Body:
{
  "titre": "Clean Code",
  "auteur": "Robert Martin",
  "stock": 5
}
```
**Expected Response**: ✅ 200 OK with book ID
```json
{
  "_id": "65a1234567890abcdef12345",
  "titre": "Clean Code",
  "auteur": "Robert Martin",
  "stock": 5,
  "__v": 0
}
```

#### Test 2: POST add another book
```
Method: POST
URL: http://localhost:3001/api/v1/livre

Body:
{
  "titre": "Design Patterns",
  "auteur": "Gang of Four",
  "stock": 3
}
```

#### Test 3: POST add third book
```
Method: POST
URL: http://localhost:3001/api/v1/livre

Body:
{
  "titre": "Refactoring",
  "auteur": "Martin Fowler",
  "stock": 2
}
```

#### Test 4: GET all books
```
Method: GET
URL: http://localhost:3001/api/v1/livre
```
**Expected Response**: Array of 3 books

#### Test 5: GET book by ID
```
Method: GET
URL: http://localhost:3001/api/v1/livre/65a1234567890abcdef12345
```
**Expected Response**: Single book object

#### Test 6: PUT update book stock
```
Method: PUT
URL: http://localhost:3001/api/v1/livre/65a1234567890abcdef12345

Body:
{
  "stock": 10
}
```
**Expected Response**: Updated book with stock = 10

#### Test 7: DELETE book (optional)
```
Method: DELETE
URL: http://localhost:3001/api/v1/livre/65a1234567890abcdef12345
```

---

### **2️⃣ SERVICE CLIENT (Port 3003) - Customer Management**

#### Test 1: POST add client
```
Method: POST
URL: http://localhost:3003/api/v1/client

Body:
{
  "nom": "Ali Ben Mohamed",
  "email": "ali@example.com",
  "tel": "0600000001"
}
```
**Expected Response**: ✅ 200 OK with client ID
```json
{
  "_id": "65a2345678901bcdef123456",
  "nom": "Ali Ben Mohamed",
  "email": "ali@example.com",
  "tel": "0600000001"
}
```

#### Test 2: POST add second client
```
Method: POST
URL: http://localhost:3003/api/v1/client

Body:
{
  "nom": "Fatima El Idrissi",
  "email": "fatima@example.com",
  "tel": "0600000002"
}
```

#### Test 3: POST add third client
```
Method: POST
URL: http://localhost:3003/api/v1/client

Body:
{
  "nom": "Mohammed Karim",
  "email": "mohammed@example.com",
  "tel": "0600000003"
}
```

#### Test 4: GET all clients
```
Method: GET
URL: http://localhost:3003/api/v1/client
```
**Expected Response**: Array of 3 clients

#### Test 5: GET client by ID
```
Method: GET
URL: http://localhost:3003/api/v1/client/65a2345678901bcdef123456
```

#### Test 6: DELETE client (optional)
```
Method: DELETE
URL: http://localhost:3003/api/v1/client/65a2345678901bcdef123456
```

---

### **3️⃣ SERVICE EMPRUNT (Port 3002) - Borrow Management**

⚠️ **Use the real IDs from previous tests!**

#### Test 1: POST add borrow
```
Method: POST
URL: http://localhost:3002/api/v1/emprunt

Body:
{
  "idClient": "65a2345678901bcdef123456",  ← Use real client ID
  "idLivre": "65a1234567890abcdef12345"     ← Use real book ID
}
```
**Expected Response**: ✅ 200 OK with borrow ID
```json
{
  "_id": "65a3456789012cdef1234567",
  "idClient": "65a2345678901bcdef123456",
  "idLivre": "65a1234567890abcdef12345",
  "dateEmprunt": "2024-01-15T10:30:00.000Z",
  "retourne": false
}
```

#### Test 2: POST add another borrow
```
Method: POST
URL: http://localhost:3002/api/v1/emprunt

Body:
{
  "idClient": "65a2345678901bcdef123457",  ← Different client
  "idLivre": "65a1234567890abcdef12346"     ← Different book
}
```

#### Test 3: GET all borrows
```
Method: GET
URL: http://localhost:3002/api/v1/emprunt
```
**Expected Response**: Array of 2 borrows

#### Test 4: GET borrows by client
```
Method: GET
URL: http://localhost:3002/api/v1/emprunt/65a2345678901bcdef123456
```
**Expected Response**: Array of this client's borrows

#### Test 5: POST return book
```
Method: POST
URL: http://localhost:3002/api/v1/emprunt/retour

Body:
{
  "id": "65a3456789012cdef1234567"  ← Borrow ID
}
```
**Expected Response**: Book marked as returned
```json
{
  "message": "Livre retourné",
  "emprunt": {
    "_id": "65a3456789012cdef1234567",
    "retourne": true,
    "dateRetour": "2024-01-15T11:30:00.000Z"
  }
}
```

---

### **4️⃣ SERVICE NOTIFICATION (Port 3004) - Async Notifications**

#### Test 1: POST send notification
```
Method: POST
URL: http://localhost:3004/api/v1/notification

Body:
{
  "clientEmail": "ali@example.com",
  "message": "Votre livre 'Clean Code' est disponible!"
}
```
**Expected Response**: ✅ 200 OK (async processing starts)
```json
{
  "message": "Notification en cours d'envoi",
  "notif": {
    "_id": "65a4567890123def12345678",
    "clientEmail": "ali@example.com",
    "message": "Votre livre 'Clean Code' est disponible!",
    "envoye": false
  }
}
```
⏳ **After 2 seconds**: The notification's `envoye` field becomes `true`

#### Test 2: POST send notification 2
```
Method: POST
URL: http://localhost:3004/api/v1/notification

Body:
{
  "clientEmail": "fatima@example.com",
  "message": "Rappel: votre emprunt expire demain!"
}
```

#### Test 3: POST send notification 3
```
Method: POST
URL: http://localhost:3004/api/v1/notification

Body:
{
  "clientEmail": "mohammed@example.com",
  "message": "Bienvenue à la librairie!"
}
```

#### Test 4: GET all notifications
```
Method: GET
URL: http://localhost:3004/api/v1/notification
```
**Expected Response**: Array of 3 notifications with `envoye: true` (after 2 seconds)

---

### **5️⃣ SERVICE PAIEMENT (Port 3005) - Payment Processing**

⚠️ **Use the real client IDs from Service Client tests!**

#### Test 1: POST make payment
```
Method: POST
URL: http://localhost:3005/api/v1/paiement

Body:
{
  "idClient": "65a2345678901bcdef123456",  ← Real client ID
  "montant": 150.00
}
```
**Expected Response**: ✅ 200 OK (async processing starts)
```json
{
  "message": "Paiement en traitement",
  "paiement": {
    "_id": "65a5678901234ef123456789",
    "idClient": "65a2345678901bcdef123456",
    "montant": 150,
    "statut": "en_attente"
  }
}
```
⏳ **After 3 seconds**: The payment's `statut` becomes `traite`

#### Test 2: POST make payment 2
```
Method: POST
URL: http://localhost:3005/api/v1/paiement

Body:
{
  "idClient": "65a2345678901bcdef123457",
  "montant": 250.00
}
```

#### Test 3: POST make payment 3
```
Method: POST
URL: http://localhost:3005/api/v1/paiement

Body:
{
  "idClient": "65a2345678901bcdef123458",
  "montant": 75.50
}
```

#### Test 4: GET all payments
```
Method: GET
URL: http://localhost:3005/api/v1/paiement
```
**Expected Response**: Array of 3 payments with `statut: traite` (after 3 seconds)

---

## 📊 Complete Test Scenario Summary

| Service | Operation | Method | Expected Status |
|---|---|---|---|
| **Livre** | Add book | POST | 200 ✅ |
| **Livre** | Get all | GET | 200 ✅ |
| **Livre** | Update stock | PUT | 200 ✅ |
| **Livre** | Delete | DELETE | 200 ✅ |
| **Client** | Add client | POST | 200 ✅ |
| **Client** | Get all | GET | 200 ✅ |
| **Client** | Get by ID | GET | 200 ✅ |
| **Client** | Delete | DELETE | 200 ✅ |
| **Emprunt** | Add borrow | POST | 200 ✅ |
| **Emprunt** | Return book | POST | 200 ✅ |
| **Emprunt** | Get all | GET | 200 ✅ |
| **Emprunt** | By client | GET | 200 ✅ |
| **Notification** | Send | POST | 200 ✅ |
| **Notification** | Get all | GET | 200 ✅ |
| **Paiement** | Make payment | POST | 200 ✅ |
| **Paiement** | Get all | GET | 200 ✅ |

---

## 🔍 Verifying Data in MongoDB

To verify data was actually saved:

```bash
# Open MongoDB shell
mongosh

# List all databases
show databases

# Use library databases
use librairie_livres
use librairie_clients
use librairie_emprunts
use librairie_notifications
use librairie_paiements

# View all documents
db.livres.find()
db.clients.find()
db.emprunts.find()
db.notifications.find()
db.paiements.find()

# Count documents
db.livres.countDocuments()
```

---

## 🐛 Common Issues & Solutions

### ❌ "Cannot POST /"
**Solution**: Make sure API Gateway is running on port 3000 

### ❌ "MongooseError: Cannot connect to MongoDB"
**Solution**: Start MongoDB with `mongod`

### ❌ "Cannot connect to localhost:3001"
**Solution**: Make sure all 6 services are running in separate terminals

### ❌ Returns empty array
**Solution**: Add test data first using POST requests

### ❌ "EADDRINUSE: address already in use"
**Solution**: Kill the port: `netstat -ano | findstr :3000` (Windows) then `taskkill /PID <PID> /F`

---

## ✨ Tips for Postman

1. **Save responses**: Click "Save Response" to save example responses
2. **Use variables**: Create environment variables for IDs
3. **Run collections**: Click the arrow next to collection name → Run
4. **View assertions**: Look at Tests tab to verify responses
5. **Check timeline**: Click "Timeline" to see network timing

---

## 🎓 Learning Outcomes

After completing these tests, you will have verified:

✅ All 6 microservices are working  
✅ API Gateway routing all requests correctly  
✅ Each service has its own MongoDB database  
✅ CRUD operations (Create, Read, Update, Delete)  
✅ Synchronous (REST) communication  
✅ Asynchronous (Queue) processing  
✅ Service independence (one failure doesn't break others)

---

**Happy Testing! 🚀**
