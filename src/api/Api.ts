/* eslint-disable */
/* tslint:disable */

/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface HandlerAccountContractResponse {
    description?: string;
    fee?: number;
    id?: number;
    imageUrl?: string;
    isMain?: boolean;
    name?: string;
    type?: string;
}

export interface HandlerAccountResponse {
    count?: number;
    id?: number;
}

export interface HandlerAuthenticateUserRequest {
    login: string;
    password: string;
}

export interface HandlerAuthenticateUserResponse {
    accessToken?: string;
    expiresAt?: string;
    isModerator?: boolean;
    login?: string;
}

export interface HandlerCompleteAccountRequest {
    id?: number;
    status?: string;
}

export interface HandlerContractResponse {
    description?: string;
    fee?: number;
    id?: number;
    imageUrl?: string;
    name?: string;
    type?: string;
}

export interface HandlerCreateRequest {
    description?: string;
    fee?: number;
    name?: string;
    type?: string;
}

export interface HandlerCreateResponse {
    id?: number;
}

export interface HandlerCreateUserRequest {
    login: string;
    password: string;
}

export interface HandlerErrorResponse {
    error?: string;
}

export interface HandlerGetAccountListResponse {
    accounts?: HandlerGetAccountsListAccount[];
}

export interface HandlerGetAccountResponse {
    contracts?: HandlerAccountContractResponse[];
    createdAt?: string;
    creator?: number;
    finishedAt?: string;
    id?: number;
    moderator?: number;
    number?: string;
    requestedAt?: string;
    status?: string;
    totalFee?: number;
}

export interface HandlerGetAccountsListAccount {
    createdAt?: string;
    creator?: number;
    finishedAt?: string;
    id?: number;
    moderator?: number;
    number?: string;
    requestedAt?: string;
    status?: string;
    totalFee?: number;
}

export interface HandlerGetListOfContractsResponse {
    account?: HandlerAccountResponse;
    contracts?: HandlerContractResponse[];
}

export interface HandlerUpdateAccountRequest {
    id?: number;
    number?: string;
}

export interface HandlerUpdateRequest {
    description?: string;
    fee?: number;
    id?: number;
    name?: string;
    type?: string;
}

export interface HandlerUpdateUserRequest {
    password?: string;
}

import type {AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType} from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
    /** set parameter to `true` for call `securityWorker` for this request */
    secure?: boolean;
    /** request path */
    path: string;
    /** content type of request body */
    type?: ContentType;
    /** query params */
    query?: QueryParamsType;
    /** format of response (i.e. response.json() -> format: "json") */
    format?: ResponseType;
    /** request body */
    body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
    securityWorker?: (
        securityData: SecurityDataType | null,
    ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
    secure?: boolean;
    format?: ResponseType;
}

export enum ContentType {
    Json = "application/json",
    FormData = "multipart/form-data",
    UrlEncoded = "application/x-www-form-urlencoded",
    Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
    public instance: AxiosInstance;
    private securityData: SecurityDataType | null = null;
    private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
    private secure?: boolean;
    private format?: ResponseType;

    constructor({securityWorker, secure, format, ...axiosConfig}: ApiConfig<SecurityDataType> = {}) {
        this.instance = axios.create({...axiosConfig, baseURL: axiosConfig.baseURL || ""});
        this.secure = secure;
        this.format = format;
        this.securityWorker = securityWorker;
    }

    public setSecurityData = (data: SecurityDataType | null) => {
        this.securityData = data;
    };

    public request = async <T = any, _E = any>({
                                                   secure,
                                                   path,
                                                   type,
                                                   query,
                                                   format,
                                                   body,
                                                   ...params
                                               }: FullRequestParams): Promise<AxiosResponse<T>> => {
        const secureParams =
            ((typeof secure === "boolean" ? secure : this.secure) &&
                this.securityWorker &&
                (await this.securityWorker(this.securityData))) ||
            {};
        const requestParams = this.mergeRequestParams(params, secureParams);
        const responseFormat = format || this.format || undefined;

        if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
            body = this.createFormData(body as Record<string, unknown>);
        }

        if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
            body = JSON.stringify(body);
        }

        return this.instance.request({
            ...requestParams,
            headers: {
                ...(requestParams.headers || {}),
                ...(type ? {"Content-Type": type} : {}),
            },
            params: query,
            responseType: responseFormat,
            data: body,
            url: path,
        });
    };

    protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
        const method = params1.method || (params2 && params2.method);

        return {
            ...this.instance.defaults,
            ...params1,
            ...(params2 || {}),
            headers: {
                ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
                ...(params1.headers || {}),
                ...((params2 && params2.headers) || {}),
            },
        };
    }

    protected stringifyFormItem(formItem: unknown) {
        if (typeof formItem === "object" && formItem !== null) {
            return JSON.stringify(formItem);
        } else {
            return `${formItem}`;
        }
    }

    protected createFormData(input: Record<string, unknown>): FormData {
        if (input instanceof FormData) {
            return input;
        }
        return Object.keys(input || {}).reduce((formData, key) => {
            const property = input[key];
            const propertyContent: any[] = property instanceof Array ? property : [property];

            for (const formItem of propertyContent) {
                const isFileType = formItem instanceof Blob || formItem instanceof File;
                formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
            }

            return formData;
        }, new FormData());
    }
}

/**
 * @title BMSTU Web Backend
 * @version 1.0
 * @contact
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
    account = {
        /**
         * @description Завершает заявку на счёт, обновляя её статус по ID заявки.
         *
         * @tags accounts
         * @name CompleteCreate
         * @summary Завершение заявки на счёт
         * @request POST:/account/{accountId}/complete
         * @secure
         */
        completeCreate: (accountId: number, request: HandlerCompleteAccountRequest, params: RequestParams = {}) =>
            this.request<void, HandlerErrorResponse>({
                path: `/account/${accountId}/complete`,
                method: "POST",
                body: request,
                secure: true,
                type: ContentType.Json,
                ...params,
            }),
    };
    accounts = {
        /**
         * @description Возвращает список всех заявок на счёт с возможностью фильтрации по статусу и дате.
         *
         * @tags accounts
         * @name AccountsList
         * @summary Получение списка заявок на счёт
         * @request GET:/accounts
         * @secure
         */
        accountsList: (
            query?: {
                /** Фильтр по статуса */
                status?: string;
                /** Фильтр по дате */
                from?: string;
                to?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<HandlerGetAccountListResponse, HandlerErrorResponse>({
                path: `/accounts`,
                method: "GET",
                query: query,
                secure: true,
                type: ContentType.Json,
                format: "json",
                ...params,
            }),

        /**
         * @description Возвращает подробную информацию о конкретной заявке на счёт по её ID, включая связанные договоры.
         *
         * @tags accounts
         * @name AccountsDetail
         * @summary Получение информации о заявке на счёт
         * @request GET:/accounts/{accountId}
         * @secure
         */
        accountsDetail: (accountId: number, params: RequestParams = {}) =>
            this.request<HandlerGetAccountResponse, HandlerErrorResponse>({
                path: `/accounts/${accountId}`,
                method: "GET",
                secure: true,
                type: ContentType.Json,
                format: "json",
                ...params,
            }),

        /**
         * @description Обновляет номер заявки на счёт по её ID.
         *
         * @tags accounts
         * @name AccountsUpdate
         * @summary Обновление информации о заявке на счёт
         * @request PUT:/accounts/{accountId}
         * @secure
         */
        accountsUpdate: (accountId: number, request: HandlerUpdateAccountRequest, params: RequestParams = {}) =>
            this.request<void, HandlerErrorResponse>({
                path: `/accounts/${accountId}`,
                method: "PUT",
                body: request,
                secure: true,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * @description Удаляет заявку на счёт по её ID.
         *
         * @tags accounts
         * @name AccountsDelete
         * @summary Удаление заявки на счёт
         * @request DELETE:/accounts/{accountId}
         * @secure
         */
        accountsDelete: (accountId: number, params: RequestParams = {}) =>
            this.request<void, HandlerErrorResponse>({
                path: `/accounts/${accountId}`,
                method: "DELETE",
                secure: true,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * @description Удаляет указанный договор из заявки на счёт по их ID.
         *
         * @tags account-contracts
         * @name ContractDelete
         * @summary Удаление договора из заявки на счёт
         * @request DELETE:/accounts/{accountId}/contract/{contractId}
         * @secure
         */
        contractDelete: (accountId: number, contractId: number, params: RequestParams = {}) =>
            this.request<void, HandlerErrorResponse>({
                path: `/accounts/${accountId}/contract/${contractId}`,
                method: "DELETE",
                secure: true,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * @description Устанавливает указанный договор в качестве основного для заявки на счёт по их ID.
         *
         * @tags account-contracts
         * @name ContractMainUpdate
         * @summary Установить договор основным в заявке на счёт
         * @request PUT:/accounts/{accountId}/contract/{contractId}/main
         * @secure
         */
        contractMainUpdate: (accountId: number, contractId: number, params: RequestParams = {}) =>
            this.request<void, HandlerErrorResponse>({
                path: `/accounts/${accountId}/contract/${contractId}/main`,
                method: "PUT",
                secure: true,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * @description Отправляет заявку на счёт по её ID для дальнейшей обработки.
         *
         * @tags accounts
         * @name SubmitUpdate
         * @summary Отправка заявки на счёт
         * @request PUT:/accounts/{accountId}/submit
         * @secure
         */
        submitUpdate: (accountId: number, params: RequestParams = {}) =>
            this.request<HandlerGetAccountResponse, HandlerErrorResponse>({
                path: `/accounts/${accountId}/submit`,
                method: "PUT",
                secure: true,
                type: ContentType.Json,
                format: "json",
                ...params,
            }),
    };
    contracts = {
        /**
         * @description Возвращает список договоров с возможностью фильтрации по названию и типу договора
         *
         * @tags contracts
         * @name ContractsList
         * @summary Получение списка договоров
         * @request GET:/contracts
         */
        contractsList: (
            query?: {
                /** Фильтр по названию договора */
                contractName?: string;
                /** Фильтр по типу договора */
                contractType?: string;
            },
            params: RequestParams = {},
        ) =>
            this.request<HandlerGetListOfContractsResponse, HandlerErrorResponse>({
                path: `/contracts`,
                method: "GET",
                query: query,
                type: ContentType.Json,
                format: "json",
                ...params,
            }),

        /**
         * @description Создает новый договор с указанными данными.
         *
         * @tags contracts
         * @name ContractsCreate
         * @summary Создание нового договора
         * @request POST:/contracts
         * @secure
         */
        contractsCreate: (request: HandlerCreateRequest, params: RequestParams = {}) =>
            this.request<HandlerCreateResponse, HandlerErrorResponse>({
                path: `/contracts`,
                method: "POST",
                body: request,
                secure: true,
                type: ContentType.Json,
                format: "json",
                ...params,
            }),

        /**
         * @description Возвращает информацию о договоре по его ID.
         *
         * @tags contracts
         * @name ContractsDetail
         * @summary Получение информации о договоре
         * @request GET:/contracts/{id}
         */
        contractsDetail: (id: number, params: RequestParams = {}) =>
            this.request<HandlerContractResponse, HandlerErrorResponse>({
                path: `/contracts/${id}`,
                method: "GET",
                type: ContentType.Json,
                format: "json",
                ...params,
            }),

        /**
         * @description Обновляет данные существующего договора по его ID.
         *
         * @tags contracts
         * @name ContractsUpdate
         * @summary Обновление данных договора
         * @request PUT:/contracts/{id}
         * @secure
         */
        contractsUpdate: (id: number, request: HandlerUpdateRequest, params: RequestParams = {}) =>
            this.request<void, HandlerErrorResponse>({
                path: `/contracts/${id}`,
                method: "PUT",
                body: request,
                secure: true,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * @description Удаляет существующий договор по его ID.
         *
         * @tags contracts
         * @name ContractsDelete
         * @summary Удаление договора
         * @request DELETE:/contracts/{id}
         * @secure
         */
        contractsDelete: (id: number, params: RequestParams = {}) =>
            this.request<void, HandlerErrorResponse>({
                path: `/contracts/${id}`,
                method: "DELETE",
                secure: true,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * @description Добавляет существующий договор в текущую заявку на счёт по его ID.
         *
         * @tags contracts
         * @name DraftCreate
         * @summary Добавление договора в заявку на счёт
         * @request POST:/contracts/{id}/draft
         * @secure
         */
        draftCreate: (id: number, params: RequestParams = {}) =>
            this.request<void, HandlerErrorResponse>({
                path: `/contracts/${id}/draft`,
                method: "POST",
                secure: true,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * @description Обновляет изображение для договора по его ID
         *
         * @tags contracts
         * @name ImageUpdate
         * @summary Обновление изображения договора
         * @request PUT:/contracts/{id}/image
         * @secure
         */
        imageUpdate: (
            id: number,
            data: {
                /** Файл изображения для загрузки */
                image: File;
            },
            params: RequestParams = {},
        ) =>
            this.request<void, HandlerErrorResponse>({
                path: `/contracts/${id}/image`,
                method: "PUT",
                body: data,
                secure: true,
                type: ContentType.FormData,
                ...params,
            }),
    };
    users = {
        /**
         * @description Обновляет имя и/или пароль текущего пользователя.
         *
         * @tags users
         * @name UsersUpdate
         * @summary Обновление данных текущего пользователя
         * @request PUT:/users
         * @secure
         */
        usersUpdate: (request: HandlerUpdateUserRequest, params: RequestParams = {}) =>
            this.request<void, HandlerErrorResponse>({
                path: `/users`,
                method: "PUT",
                body: request,
                secure: true,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * @description Создает нового пользователя с указанными именем, электронной почтой и паролем.
         *
         * @tags users
         * @name UsersCreate
         * @summary Создание нового пользователя
         * @request POST:/users
         */
        usersCreate: (request: HandlerCreateUserRequest, params: RequestParams = {}) =>
            this.request<void, HandlerErrorResponse>({
                path: `/users`,
                method: "POST",
                body: request,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * @description Аутентифицирует пользователя по электронной почте и паролю и возвращает токен доступа.
         *
         * @tags users
         * @name LoginCreate
         * @summary Аутентификация пользователя
         * @request POST:/users/login
         */
        loginCreate: (request: HandlerAuthenticateUserRequest, params: RequestParams = {}) =>
            this.request<HandlerAuthenticateUserResponse, HandlerErrorResponse>({
                path: `/users/login`,
                method: "POST",
                body: request,
                type: ContentType.Json,
                format: "json",
                ...params,
            }),

        /**
         * @description Завершает сеанс пользователя, аннулируя токен доступа.
         *
         * @tags users
         * @name LogoutCreate
         * @summary Выход пользователя
         * @request POST:/users/logout
         * @secure
         */
        logoutCreate: (params: RequestParams = {}) =>
            this.request<void, HandlerErrorResponse>({
                path: `/users/logout`,
                method: "POST",
                secure: true,
                type: ContentType.Json,
                ...params,
            }),
    };
}
