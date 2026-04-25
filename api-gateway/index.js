const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route to each microservice
app.use('/api/v1/livre',        createProxyMiddleware({ target: 'http://localhost:3001', changeOrigin: true }));
app.use('/api/v1/emprunt',      createProxyMiddleware({ target: 'http://localhost:3002', changeOrigin: true }));
app.use('/api/v1/client',       createProxyMiddleware({ target: 'http://localhost:3003', changeOrigin: true }));
app.use('/api/v1/notification', createProxyMiddleware({ target: 'http://localhost:3004', changeOrigin: true }));
app.use('/api/v1/paiement',     createProxyMiddleware({ target: 'http://localhost:3005', changeOrigin: true }));

// Serve static view LAST
app.use('/', express.static(path.join(__dirname, '../service-view')));

app.listen(3000, () => console.log('✅ API Gateway running on port 3000'));