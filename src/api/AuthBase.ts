import Gateway from 'api/types/Gateway';
import { GatewayResponse } from 'api/types/types';

export interface LoginParams {
    email: string;
    password: string;
    rememberMe?: boolean;
}

export interface LoginResponse {
    token: string;
}

export interface SignupParams {
    email: string;
    password: string;
    role: number;
}

export abstract class IAuthGateway extends Gateway {
    abstract login(params: LoginParams): GatewayResponse<LoginResponse | null>;

    abstract signup(params: SignupParams): GatewayResponse<null>;
}
