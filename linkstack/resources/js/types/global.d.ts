import { AxiosInstance } from 'axios';

declare global {
    interface Window {
        _: any;
        axios: AxiosInstance;
    }
}