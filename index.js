const functions = require('firebase-functions');
const fetch = require('node-fetch');

exports.ai = functions.https.onRequest(async (req, res) => {
  try {
    if (req.method !== 'POST') {
      res.status(405).send('Method Not Allowed');
      return;
    }
    const { message } = req.body;
    if (!message) {
      res.status(400).json({ error: 'No message provided' });
      return;
    }

    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${functions.config().openai.key}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: message }],
        max_tokens: 700
      })
    });

    const json = await openaiRes.json();
    const reply = json?.choices?.[0]?.message?.content || 'Sorry, no response from AI.';
    res.json({ reply });
  } catch (err) {
    console.error('Function error', err);
    res.status(500).json({ error: err.message });
  }
});
