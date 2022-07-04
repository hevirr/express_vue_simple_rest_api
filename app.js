const express = require('express');
const { v4 } = require('uuid');
const path = require('path');

const app = express();

let CONTACTS = [{ id: v4(), name: 'Anton', value: '8-800-555-35-35', marked: false }];

app.use(express.json());

app.get('/api/contacts', (req, res) => {
  res.status(200).json(CONTACTS);
});

app.post('/api/contacts', (req, res) => {
  const contact = { ...req.body, id: v4(), marked: false };
  CONTACTS.push(contact);
  res.status(201).json(contact);
});

app.delete('/api/contacts/:id', (req, res) => {
  console.log(req, res);
  CONTACTS = CONTACTS.filter((c) => c.id !== req.params.id);
  res.status(200).json({ message: 'Contact has been deleted' });
});

app.use(express.static(path.resolve(__dirname, 'client')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'index.html'));
});

app.listen(3000, () => {
  console.log('server has been started');
});
