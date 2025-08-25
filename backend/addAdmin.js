const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const readline = require('readline');
const User = require('./models/User');

dotenv.config(); // Load .env

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI missing in .env');
  process.exit(1);
}

// Connect to MongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => {
    console.error('❌ MongoDB error:', err);
    process.exit(1);
  });

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Ask for details
rl.question('Enter admin name: ', (name) => {
  rl.question('Enter admin email: ', (email) => {
    rl.question('Enter admin password: ', async (password) => {
      try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          console.log('❌ Email already exists. Cannot create admin.');
          process.exit(1);
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const admin = new User({ name, email, password: hashedPassword, role: 'admin' });
        await admin.save();
        console.log(`✅ Admin created successfully: ${email}`);
        process.exit(0);
      } catch (error) {
        console.error('❌ Error creating admin:', error);
        process.exit(1);
      }
    });
  });
});
