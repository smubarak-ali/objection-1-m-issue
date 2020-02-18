export interface ApiPagingResponse extends ErrorResponse {
    total: number;
    pageSize?: number;
    pageNumber?: number;
}

export interface ApiResponse extends ErrorResponse {
    data?: any;
}

export interface ErrorResponse {
    code: string;
    message?: string;
}

