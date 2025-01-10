import { AxiosInstance } from 'axios';
import Lodash from 'lodash';

declare global {
    interface Window {
        _: Lodash;
        axios: AxiosInstance;
    }
}