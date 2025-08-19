require('dotenv').config();                           // chore: load .env
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const notificationsRoute = require('./routes/notifications');  // chore
const adminAuditRoute = require('./routes/adminAudit');        // chore
const usersRoute = require('./routes/users');   // import

const app = express();
app.use(cors());                           // chore: enable CORS for dev
app.use(express.json());                   // chore: parse JSON bodies

// feat: connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((e) => {
    console.error('MongoDB connection error', e);
    process.exit(1);
  });

// feat: mount routes
app.use('/api/notifications', notificationsRoute);
app.use('/api/admin/audit', adminAuditRoute);
app.use('/api/users', usersRoute);
// health check
app.get('/', (_req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server on :${PORT}`));
