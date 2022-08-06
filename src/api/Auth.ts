import { ApiResponse } from 'apisauce';

import { GatewayResponse } from 'api/types/types';

import { LoginParams, LoginResponse, IAuthGateway, SignupParams } from './AuthBase';

export default class AuthGateway extends IAuthGateway {
    async login(params: LoginParams): GatewayResponse<LoginResponse> {
        const response: ApiResponse<LoginResponse> = await this.api.post('rea/auth/login', params);
        return this.process(response);
    }

    async signup(params: SignupParams): GatewayResponse<null> {
        const response: ApiResponse<null> = await this.api.post('rea/auth/signUp', params);
        return this.process(response);
    }
}
