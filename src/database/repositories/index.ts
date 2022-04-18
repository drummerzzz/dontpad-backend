import { IdbRepository } from "../../domain/interfaces/IdbRepository";

import { prisma } from '../../database';
import { Article } from '../../../node_modules/.prisma/client';


export class ArticleDBRepository implements IdbRepository {


    async all(): Promise<Article[]> {
        return await prisma.article.findMany()
    }
    async filter(url: string): Promise<Article[]> {
        return await prisma.article.findMany({
            where: {
                url: url
            }
        })
    }
    async save(model: Article): Promise<Article> {
        const updatedArticle =  model.text ? { text: model.text } : {}
        return await prisma.article.upsert({
            where: {
                url: model.url
            },
            create: {
                url: model.url,
                text: model?.text || '',
            },
            update: updatedArticle,

        })
    }
      

}