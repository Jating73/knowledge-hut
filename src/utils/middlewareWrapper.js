export default function applyMiddleware(middlewares, handler) {
    return async (req, res) => {
        for (let middleware of middlewares) {
            await new Promise((resolve, reject) => {
                middleware(req, res, (result) => {
                    if (result instanceof Error) {
                        return reject(result);
                    }
                    return resolve(result)
                });
            });
        }
        return handler(req, res)
    }
}