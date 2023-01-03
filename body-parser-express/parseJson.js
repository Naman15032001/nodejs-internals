module.exports = function parseJson(req, res, next) {

    req.body = {}

    console.log(req.headers)
    if (req.headers['content-type'] === 'application/json') {

        let data = '';

        req.on('data', chunk => {
            data += chunk
        })

        req.on('end', () => {

            try {
                req.body = JSON.parse(data);
            } catch (e) {} 
            finally {
                next()
            }

        })

    } else {
        next();
    }
}