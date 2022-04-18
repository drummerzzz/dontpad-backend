import { ArticleDBRepository } from "../../database/repositories";
import { articleController } from "../controllers";
import { IArticleControllerDTO } from "../interfaces";

export class ArticleControllerFactory {
    private dto: IArticleControllerDTO;

    constructor (article: IArticleControllerDTO) {
        this.dto = article
    }

    async execute () {
        const repository = new ArticleDBRepository()
        return await articleController(this.dto, repository)
    }
}

