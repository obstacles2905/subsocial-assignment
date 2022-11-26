export type ID = string | number | any;

export interface PaginationResponse<T> {
    list: T;
    total: number;
    page: number;
    perPage: number;
}

export interface PaginationInputDTO {
    page: number;
    perPage: number;
}

export enum OrderByEnum {
    ASC = "ASC",
    DESC = "DESC",
}

export interface OrderBy {
    [key: string]: OrderByEnum;
}

export interface TestCases<I, O> {
    input: I;
    result: O;
}
