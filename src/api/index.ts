import config from 'config';

import AuthGateway from './Auth';
import UserGateway from './User';

const baseUrl = config.baseUrl as string;

const auth = new AuthGateway(baseUrl);
const user = new UserGateway(baseUrl);

export default {
    auth,
    user,
};
