const responseCode = {
    "OK": 200,
    "Created": 201,
    "No Content": 204,
    "Moved Permanently": 301,
    "Found": 302,
    "Not Modified": 304,
    "Bad Request": 400,
    "Unauthorized": 401,
    "Forbidden": 403,
    "Not Found": 404,
    "Method Not Allowed": 405,
    "Request Timeout": 408,
    "Conflict": 409,
    "Gone": 410,
    "Payload Too Large": 413,
    "Unsupported Media Type": 415,
    "Too Many Requests": 429,
    "Internal Server Error": 500,
    "Not Implemented": 501,
    "Bad Gateway": 502,
    "Service Unavailable": 503,
    "Gateway Timeout": 504,
    "HTTP Version Not Supported": 505
}

module.exports = {
    responseCode
}