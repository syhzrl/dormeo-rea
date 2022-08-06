import { ApiResponse } from 'apisauce';

import { GatewayResponse } from 'api/types/types';

import { IREAUser } from '@dm/types';

import { IUserGateway, GetUserInfoParams, UpdateUserInfoParams, GetRENUploadUrlParams, UploadRENDocumentParams } from './UserBase';

const getHeaders = (authToken: string) => ({
    headers: {
        Authorization: `Bearer ${authToken}`,
    },
});

export default class UserGateway extends IUserGateway {
    async getUserInfo(params: GetUserInfoParams): GatewayResponse<IREAUser> {
        const response: ApiResponse<IREAUser> = await this.api.get('rea/user/getUserInfo', {}, getHeaders(params.authToken));
        return this.process(response);
    }

    async updateUserInfo(params: UpdateUserInfoParams): GatewayResponse<null> {
        const response: ApiResponse<null> = await this.api.put('/rea/user/updateUserInfo', params.data, getHeaders(params.authToken));
        return this.process(response);
    }

    async getRENUploadUrl(params: GetRENUploadUrlParams): GatewayResponse<string> {
        const { category, id, name, extension } = params;
        const response: ApiResponse<string> = await this.api.get('/upload/url', { category, id, name, extension }, getHeaders(params.authToken));
        return this.process(response);
    }

    async uploadRENDocument(params: UploadRENDocumentParams): GatewayResponse<null> {
        const response: ApiResponse<null> = await this.api.put(params.url, params.doc);
        return this.process(response);
    }
}
