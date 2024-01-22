import { config } from 'dotenv'
import { connectToDB } from './connect.js'

config()
await connectToDB(process.env.DB_URI)