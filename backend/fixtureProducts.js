// TEST FIXTURE ONLY: fictional, process-local products. Never production storage.
module.exports = function registerFixtureProducts(app) {
  const products = new Map([[1, { id: 1, name: 'Fictional notebook' }]]);
  let nextId = 2;
  const valid = body => body && typeof body.name === 'string' &&
    body.name.trim().length > 0 && body.name.trim().length <= 80;
  const id = req => /^[1-9][0-9]*$/.test(req.params.id) ? Number(req.params.id) : NaN;
  app.get('/api/fixture-products', (req, res) => res.json([...products.values()]));
  app.get('/api/fixture-products/:id', (req, res) => {
    const item = products.get(id(req));
    return item ? res.json(item) : res.status(404).json({ error: 'Not found' });
  });
  app.post('/api/fixture-products', (req, res) => {
    if (!valid(req.body)) return res.status(400).json({ error: 'Name required (1-80 characters)' });
    const item = { id: nextId++, name: req.body.name.trim() };
    products.set(item.id, item); return res.status(201).json(item);
  });
  app.patch('/api/fixture-products/:id', (req, res) => {
    const item = products.get(id(req));
    if (!item) return res.status(404).json({ error: 'Not found' });
    if (!valid(req.body)) return res.status(400).json({ error: 'Name required (1-80 characters)' });
    item.name = req.body.name.trim(); return res.json(item);
  });
  app.delete('/api/fixture-products/:id', (req, res) => {
    if (!products.delete(id(req))) return res.status(404).json({ error: 'Not found' });
    return res.status(204).end();
  });
};
