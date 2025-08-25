const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
<<<<<<< HEAD
=======
const authRoutes = require('./routes/auth'); // Import auth routes
>>>>>>> 9cafba1 (commit 1)

// Load environment variables from .env in root directory
dotenv.config({ path: '../.env' });

const app = express();
app.use(express.json());
app.use(cors());

// Build connection URI from components if provided, otherwise use MONGODB_URI
const {
  MONGODB_URI,
  MONGODB_USER,
  MONGODB_PASS,
  MONGODB_HOST,
  MONGODB_DB,
} = process.env;

function buildUri() {
  if (MONGODB_URI && MONGODB_URI.length) return MONGODB_URI;
  if (MONGODB_USER && MONGODB_PASS && MONGODB_HOST && MONGODB_DB) {
    // encode password to handle special characters
    const user = encodeURIComponent(MONGODB_USER);
    const pass = encodeURIComponent(MONGODB_PASS);
    return `mongodb+srv://${user}:${pass}@${MONGODB_HOST}/${MONGODB_DB}?retryWrites=true&w=majority`;
  }
  return null;
}

function maskUri(uri) {
  // mask credentials between '//' and '@'
  return uri.replace(/(\/\/)(.*?@)/, (m, p1) => p1 + '***@');
}

const uri = buildUri();
if (!uri) {
  console.error('No MongoDB connection info found. Set MONGODB_URI or MONGODB_USER/MONGODB_PASS/MONGODB_HOST/MONGODB_DB in .env');
  process.exit(1);
}

const connectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

async function tryConnect(connectionUri) {
  try {
    console.log('Attempting MongoDB connection to', maskUri(connectionUri));
    await mongoose.connect(connectionUri, connectOptions);
    console.log('Connected to MongoDB Atlas');
    return true;
  } catch (err) {
    console.error('MongoDB connection error:', err.message || err);
    return false;
  }
}

(async () => {
  // First attempt with the constructed URI
  let ok = await tryConnect(uri);
  if (!ok) {
    // If auth failed, try adding authSource=admin (common Atlas fallback)
    if (!uri.includes('authSource=admin')) {
      const sep = uri.includes('?') ? '&' : '?';
      const fallback = uri + sep + 'authSource=admin';
      console.log('Retrying with authSource=admin...');
      ok = await tryConnect(fallback);
    }
  }

  if (!ok) {
    console.error('\nAuthentication failed. Check the following:\n' +
      '- Ensure the username and password in .env are correct.\n' +
      '- If your password contains special characters, it will be URL-encoded automatically (we encode it when building the URI).\n' +
      '- Ensure the MongoDB user exists in your Atlas project and has access to the specified database.\n' +
      '- Ensure your current IP is whitelisted in Atlas network access (or allow access from anywhere for testing).\n' +
      'If you still see "bad auth", confirm credentials by logging into Atlas and recreating the user/password.\n');
    process.exit(1);
  }
})();

// Example route
app.get('/', (req, res) => {
  res.send('Express backend is running!');
});

<<<<<<< HEAD
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
=======
// Use auth routes
app.use('/api/auth', authRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
>>>>>>> 9cafba1 (commit 1)
