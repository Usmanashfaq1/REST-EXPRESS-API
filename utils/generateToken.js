import crypto from "crypto";


export default function generateRestToken()
{
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    return {resetToken,hashedToken};
    //returning an object

}
