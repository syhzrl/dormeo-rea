import Gateway from 'api/types/Gateway';
import { GatewayResponse } from 'api/types/types';
import { Category, IREAUser, IUpdateREAUserInfo } from '@dm/types';

export interface GetUserInfoParams {
    authToken: string;
}

export interface UpdateUserInfoParams {
    authToken: string;
    data: IUpdateREAUserInfo;
}

export interface GetRENUploadUrlParams {
    authToken: string;
    category: Category;
    id: string; // REA user _id
    name: string;
    extension: string;
}

export interface UploadRENDocumentParams {
    url: string;
    doc: FormData;
}

export abstract class IUserGateway extends Gateway {
    abstract getUserInfo(params: GetUserInfoParams): GatewayResponse<IREAUser>;

    abstract updateUserInfo(params: UpdateUserInfoParams): GatewayResponse<null>;

    abstract getRENUploadUrl(params: GetRENUploadUrlParams): GatewayResponse<string>;

    abstract uploadRENDocument(params: UploadRENDocumentParams): GatewayResponse<null>;
}
