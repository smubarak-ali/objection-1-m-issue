export interface CategoryDto {
    id: number;
    name: string;
    displayName: string;
    image: string;
    thumbnail: string;
    parentId: string;
}

export interface CategoryTranslationDto {
    categoryId: number;
    nameUr: string;
    displayNameUr: string;
}

export interface CategorySaveDto {
    id?: number;
    name: string;
    displayName?: string;
    nameUr?: string;
    displayNameUr?: string;
    image?: string;
    thumbnail?: string;
    parentId?: number;
}
