const data = { name: "John", age: 30, city: "New York" };

// JSON.stringify(data) :
console.log(JSON.stringify(data));
// Netice: {"name":"John","age":30,"city":"New York"}

// JSON.stringify(data, null, 2) :
console.log(JSON.stringify(data, null, 2));
/*
Netice:
{
  "name": "John",
  "age": 30,
  "city": "New York"
}
*/


// JSON.stringify(value, replacer, space)


app.put('/:id/update', (req, res) => {
  const wordId = req.params.id
  const { word, translation } = req.body

  const object = db.list.find(item => item.id === wordId)

  if (!object) return res.status(404).send('No such item')

  const newData = db.list.map(item => {
    if (item.id == wordId) {
      item.word == word || item.word,
        item.translation == translation || item.translation
    }
    return item
  })

  try {
    fs.writeFile('db.json', JSON.stringify(newData, null, 2), (err) => {
      if (err) return res.status(500).send('Error writing to the file')
    })
    res.sendStatus(200)
  } catch (error) {
    res.status(500).send('update olmadi')
  }
})