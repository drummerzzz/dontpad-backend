import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import { ArticleControllerFactory } from '../../domain/factories';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;
const allowedOrigins = ['http://localhost:8080'];

const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins
};

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors(corsOptions))

app.get('/', cors(), (req: Request, res: Response) => {
  res.json({
    url: req.url,
    now: new Date().toISOString()
  })
});

app.get('/health', cors(), (req: Request, res: Response) => {
  res.json({
    status: 'ok'
  })
});


app.get('/articles/:url', cors(), async (req: Request, res: Response) => {
  const { url } = req.params
  const factory = new ArticleControllerFactory({
    url
  })
  const article = await factory.execute()
  res.json(article)
});

app.post('/articles/:url', cors(), async (req: Request, res: Response) => {
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