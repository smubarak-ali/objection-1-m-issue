import { ContentRepository } from "../repositories";

export class ContentService {
    private readonly contentRepository: ContentRepository;

    constructor() {
        this.contentRepository = new ContentRepository();
    }

    public async getContent(category: string) {
        const list = await this.contentRepository.getContent(category);
        return list;
    }
}
