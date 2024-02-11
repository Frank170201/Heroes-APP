import 'dotenv/config';

import {get} from 'env-var'

export const envs = {

    //Puerto del servidor
    PORT: get('PORT').required().asPortNumber(),
    //Ruta de la carpeta publica
    PUBLIC_PATH: get('PUBLIC_PATH').default('public').asString(),
}