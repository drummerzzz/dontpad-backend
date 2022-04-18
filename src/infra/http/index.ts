import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { ArticleControllerFactory } from '../../domain/factories';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


app.get('/', (req: Request, res: Response) => {
  res.json({
    url: req.url,
    now: new Date().toISOString()
  })
});

app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok'
  })
});


app.get('/articles/:url', async (req: Request, res: Response) => {
  const { url } = req.params
  const factory = new ArticleControllerFactory({
    url
  })
  const article = await factory.execute()
  res.json(article)
});

app.post('/articles/:url', async (req: Request, res: Response) => {
  const { url } = req.params
  const { text } = req.body
  const factory = new ArticleControllerFactory({
    url, text
  })
  const article = await factory.execute()
  res.json(article)
  
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});