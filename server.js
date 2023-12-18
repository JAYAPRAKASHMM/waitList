const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 3001;
const mysql = require('mysql2');
const nodemailer = require('nodemailer');
async function sendEmail(receiver) {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'jayaprakash26v@gmail.com',
      pass: 'nxwa ilvg byrz uhmf'
    }
  });
  let mailOptions = {
    from: 'jayaprakash26v@gmail.com',
    to: receiver,
    subject: 'Congrats',
    text: 'you Won the WaitList. Here is Your Coupon code:SERTYUJHFDRTY'
  };
  let info = await transporter.sendMail(mailOptions);
  console.log('Email sent: %s', info.messageId);
}
app.use(cors());
app.use(bodyParser.json());
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'valo12345',
  database: 'waitlistapp',
});
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const [maxPosResult] = await db.promise().query('SELECT MAX(position) as maxPosition FROM waitlist');
    const currentMaxPosition = maxPosResult[0].maxPosition || 98;
    const newPosition = currentMaxPosition + 1;
    const [emailCheckResult] = await db.promise().query('SELECT * FROM waitlist WHERE email = ?', [email]);
    if (emailCheckResult.length > 0) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    const [insertResult] = await db.promise().query(
      'INSERT INTO waitlist (name, email, password, position,sposition) VALUES (?, ?, ?,?, ?)',
      [name, email, password, newPosition,newPosition]
    );
    console.log('Data inserted successfully');
    res.json({ message: 'User registered successfully', position: newPosition });
  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const [userResult] = await db.promise().query('SELECT * FROM waitlist WHERE email = ?', [email]);
    if (userResult.length === 0) {
      return res.status(401).json({ error: 'Invalid email' });
    }
    const storedPassword = userResult[0].password;
    if (password !== storedPassword) {
      return res.status(401).json({ error: 'Invalid password' });
    }
    res.status(200).json({ message: 'Login successful', user: userResult[0] });
  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/api/status', async (req, res) => {
  try {
    const email = req.query.email;
    if (!email) {
      return res.status(400).json({ error: 'Email parameter is missing' });
    }
    const [userResult] = await db.promise().query('SELECT * FROM waitlist WHERE email = ?', [email]);
    if (userResult.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    console.log(userResult);
    const Position = userResult[0].position;
    const StartingPosition = userResult[0].sposition;
    const name = userResult[0].name;
    res.json({ position: Position, starting: StartingPosition, name : name });
  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/api/help', async (req, res) => {
  console.log("hii");
  try {
    const helper = req.query.a;
    const consumer = req.query.b;
    if (!helper || !consumer) {
      return res.status(400).json({ error: 'Missing parameters' });
    }
    const updateQuery = 'UPDATE waitlist SET position = position - 1 WHERE email = ?';
    const selectIdQuery = 'SELECT id FROM waitlist WHERE email = ?';
    const [idResult] = await db.promise().query(selectIdQuery, [consumer]);
    const consumerId = idResult[0].id;
    const selectUkeysQuery = 'SELECT ukeys FROM waitlist WHERE email = ?';
    const [ukeysResult] = await db.promise().query(selectUkeysQuery, [helper]);
    const existingUkeys = ukeysResult[0]?.ukeys || '';
    if (existingUkeys.indexOf(`${consumerId}.`) !== -1)
    return res.json({ success: true, message: 'You already helped your friend' });  
    await db.promise().query(updateQuery, [consumer]);
    const concatQuery = 'UPDATE waitlist SET ukeys = CONCAT_WS(" ", ukeys, ?) WHERE email = ?';
    await db.promise().query(concatQuery, [consumerId+".", helper]);
    res.json({ success: true, message: 'Your Friend is a Step ahead'+await check(consumer), consumerId });
  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/api/admin', async (req, res) => {
  try {
    const [spacesResult] = await db.promise().query('SELECT name, position FROM waitlist ORDER BY position');
    const spaces = spacesResult.map(space => ({
      email: space.name,
      position: space.position,
    }));

    res.json({ spaces });
  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
async function check(consumer) {
  try {
    const [consumerResult] = await db.promise().query('SELECT * FROM waitlist WHERE email = ?', [consumer]);
    if (consumerResult.length === 0) {
      console.error('Consumer not found');
      return 'Consumer not found';
    }
    const consumerPosition = consumerResult[0].position;
    if (consumerPosition === 1) {
      sendEmail(consumer);
      return `Hurray! Your freind Won Iphone 15.`;
    } else {
      return `Your freind is currently at position ${consumerPosition}.`;
    }
  } catch (err) {
    console.error('Error checking consumer position:', err.message);
    return 'Error checking consumer position';
  }
}
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});