import { v4 } from "uuid"

export const createVerificationCode = () => {
    return Buffer.from(v4()).toString('base64')
}