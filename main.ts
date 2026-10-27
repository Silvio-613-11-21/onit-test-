import 'dotenv/config';

import app from './src/app.ts'

let port = Number(process.env.PORT) ?? 3000
let host = process.env.HOST ?? "localhost"

app.listen(port, host, () => {
    console.log(`http://${host}:${port}/api-docs`)
});
