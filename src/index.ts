import { Hono } from 'hono'
import { getAllusers } from './tables'

const app = new Hono()

app.get('/', async (c) => {
    const users = getAllusers()
    c.json({ users })
})

export default app