import { responseCode } from "@/utils/responseCode";

export default function handler(req, res) {
    return res.status(responseCode.OK).json({
        success: true,
        message: "Server is up and running..."
    })
}