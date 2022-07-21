const notFound = (req, res) => {
res.status(404).send('<h1>Recurso no encontrado...</h1>')
}

module.exports = notFound