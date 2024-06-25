function handler(req, res) {
    switch (req.method) {
        case "POST": {

            break;
        }
        default: {
            return res.status(responseCode["Method Not Allowed"]).json({
                success: false,
                message: "Method not allowed"
            });
        }
    }
}

export default handler