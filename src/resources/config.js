import dotenv from 'dotenv';

dotenv.config();

console.log(JSON.stringify(process.env));

export const config = {
    baseurl : process.env.REACT_APP_BASE_URL,
    NODE_ENV : process.env.NODE_ENV
}