import dotenv from "dotenv";

dotenv.config();

export const env = {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    accessTokenSecret : process.env.ACCESS_TOKEN_SECRET,
    refreshTokenSecret : process.env.REFRESH_TOKEN_SECRET,
    accessTokenExpiry : process.env.ACCESS_TOKEN_EXPIRY,
    refreshTokenExpiry : process.env.REFRESH_TOKEN_EXPIRY
}
