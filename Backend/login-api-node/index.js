const express = require('express');
const cors = require('cors');

const app = express();

app.use(
  cors({
    origin: '*',
    methods: '*',
    allowedHeaders: '*',
  })
);

app.use(express.json());



// login API
app.post('/api/login', (req, res) => {
  debugger;
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email & password required' });
  }

  if (email === 'pavitragouda123@gmail.com' && password === 'Pavitra123') {
    return res.json({ message: 'Login success' });
  }

  return res.status(401).json({ message: 'Invalid credentials' });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
