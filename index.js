const express = require('express')
const router= express.Router()
const axios = require('axios')
const app = express()

app.use(express.json())

const BASE_URL = 'https://663e1e74e1913c4767969661.mockapi.io/blogs'

app.get('/blogs', async (req, res) => {
    const response = await axios.get(BASE_URL)
    res.json(response.data)
})

// req.params URL-dəki dinamik parametrləri əldə etmək üçün istifadə olunur.
// req.body sorğu body-deki məlumatları əldə etmək üçün istifadə olunur (adətən POST, PUT və ya PATCH sorğularında).


app.get('/blog/:id', async (req, res) => {
    const response = await axios.get(`${BASE_URL}/${req.params.id}`)
    res.json(response.data)
})


app.post('/blog', async (req, res) => {
    const response = await axios.post(BASE_URL, req.body)

    res.status(201).json({
        message: "Blog created successfully",
        data: response.data
    })
})


app.delete('/blog/:id', async (req, res) => {
    const response = await axios.delete(`${BASE_URL}/${req.params.id}`)
    res.status(response.status).json({
        message: "Blog deleted successfully"
    })
})



app.put('/blog/:id', async (req, res) => {
    const updatedBlog = req.body
    const response = await axios.put(`${BASE_URL}/${req.params.id}`, updatedBlog)
    res.status(response.status).json({
        message: "Blog updated successfully",
        data: response.data
    })


})


const port = 8080

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})