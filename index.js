import express from 'express'
import routes from './routes/index.js'
import bodyParser from 'body-parser'
const app = express()

import admin from 'firebase-admin'

var serviceAccount = {
    "type": "service_account",
    "project_id": "makeitdone-e8ef2",
    "private_key_id": "1476b4f7ec650eafcb94a1bac0e7bf19e6659762",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQClRiUtdObi8RfX\nDGJZMrvkpJH6v/KMRllI7R1JnlFUP44wAAYQIUUELuNmdXWVMc08vFfTlvc0aYTU\nFGUf2v+AeGFp9JT93DnKNtQWwnb5TT/SS5HrACYnTpasBhmKxlG49+lOe9Lodbwu\nVvuTl4zPDOGk0ZfHlvKv6K+vIIcQswluAYY7HJR4b9yisOjmd5HXOW8UGtQfbNNg\n5yg0NdHk/FHW4a5M/94Q09kJLi+VpBNwkalQUejJYxjtVZHoudRWhqJq5puWWC8Y\nyvctk2m62N4HQqtZi4gZDBb5xBZcIaia9TwztmJjcc/JMSnL2vunFXeRy77xUG0I\nNhsWPl+pAgMBAAECggEAInNtunz8x9+TpZsKQSenLPD1EPzD9WOQpvfuO/NJZrNc\n0zqeCOy2cznG4wum9/OKoZdtA0kbvIwmSQL7VVmUGtZ9D9YQ3J30Wed17Eya+jqV\nDCP+harhSR5DoBYhauEOFe1vb5G2FAi+sjYleM2FZ3965Z1e8xbO/cYWIP45yUwC\nbMoD5Xuy0U9Wd1z2FqW5eCph4rJzCjeBVhUHuXhTDexFaQfLx2ZeQP9CinKybr7I\nZfmex12jdeuwg7PPX+S2k/Gf14UZlKo9r6QogPZXbDb2Ef/8oWdQkdIwRB/FUa8A\nIWuq1RUO9r1HFKV/A2a0YtHh4EeLXTMAhTR9c29ABQKBgQDljj39MXHhXlqmm/Hy\nyxVZxvOUmcZPWXhz0cH4S2GpjBobp/hy8P3/WrUA199dVS2gLyiKSNjzhvGk1d+A\nfi3yMoRaiq+lBDdQ1U8gOr1phQlYvHWnktZ+O4j4opK5eFJxc7b4qWsU37hOoXlD\ndkQwI9PMWOTtAzaHgWAnOcVprwKBgQC4UDFCxiy+9ry/BH07yaVEQ9jAUOjdgs0C\nkBgXhSJBAPOweK88nHyx6s5nkuYNFeHv6kDCz/7uCMw4J8vDINLcE1O1MwG9vQbB\n7oWZpkTzNpv2iRvIoIkwTCLG+KbGrzhw61FyxLUHse6AzO77P+ASADTRupb1hWpj\nTVyQj+iaJwKBgAX5v+9ZXCeLtzxjDtdNJg8iOLEDl7/1CkepjC0UeURam0thAfyr\n/VCqYc/VzsC1OOzUjW+cGdmtB5lM3/aOUk/dtMhOl+fpxi7afqbOIKQgjG+86Csm\njWLX1ebzBHLDiRHe+0JZ1qnCcR/K4Ec7Sucd56OIJN1umfrJCWG8BUGNAoGAbB+v\nJkr3iPdZ9nz9sosyhn9+siNE2F2ZQr2hRHr3g0a5rna95kKu6/ihKSWGC3sg1guH\n/kDifmVu2CqQYGHrEOvNmWjYxqQTSMVSXrapkDwi9leskt+KW2jupebMf5Xe+G8z\nkq5OvLrm/Ww7be0k16qDUd2yHUotBSAnAy9I9tUCgYEA3ti7GjtoPklYq8LN4Q7k\n/U72FHjR0E2kUfzE38YJaEk67VwrrsgGXtRm8+RcVneQFVBj2aBT6yEL6WGQimzI\nE7XsDvYyhe1ZcpWqWR9zmSejFJbs0j45x0Tjjqb7JvdZN06iPhyB4KVprO0RbnrM\n6GEF83m5nJoTL5UgxUfbxWM=\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-b73fv@makeitdone-e8ef2.iam.gserviceaccount.com",
    "client_id": "107701203851947972752",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-b73fv%40makeitdone-e8ef2.iam.gserviceaccount.com"
  }
  

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

app.use(bodyParser.json())
app.use('/auth', routes.auth)
app.use('/offer', routes.offer)
app.use('/task', routes.task)

app.listen(3000, () => {
    console.log('started live at 80')
})