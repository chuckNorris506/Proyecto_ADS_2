/**
 * It takes two parameters, req and res, and returns a 404 status code with a message
 * @param req - The request object represents the HTTP request and has properties for the request query
 * string, parameters, body, HTTP headers, and so on.
 * @param res - The response object.
 */
const notFound = (req, res) => {
res.status(404).send('<h1>Recurso no encontrado...</h1>')
}

/* Exporting the function `notFound` to be used in other files. */
module.exports = notFound