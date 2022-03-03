//import
const cors = require('cors');
const express = require(`express`)
//implementasi
const app = express()
app.use(cors());

const PORT = 8000

let routes = [
    {prefix: `/admin`, route: require(`./routes/admin`)},
    {prefix: `/product`, route:require(`./routes/product`)},
    {prefix: `/transaksi`, route:require(`./routes/transaksi`)}
    
]

for (let i = 0; i < routes.length; i++) {
    app.use(routes[i].prefix, routes[i].route)
}

app.listen(PORT, () => {
    console.log(`Server run on port ${PORT}`)
})