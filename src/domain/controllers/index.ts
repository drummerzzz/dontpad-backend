import { IdbRepository, IArticleControllerDTO } from "../interfaces";


export async function articleController(dto: IArticleControllerDTO, dbRepository: IdbRepository) {
    const article = await dbRepository.save(dto)
    return article
}