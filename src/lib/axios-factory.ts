import axios, {
    type AxiosInstance,
    type AxiosRequestConfig,
    type CreateAxiosDefaults
} from 'axios';
import { toast } from 'sonner';

export const createAxiosInstance = (
    baseURL: string,
    config: Omit<CreateAxiosDefaults, 'baseURL'> = {}
): AxiosInstance => {
    const instance = axios.create({ baseURL, timeout: 8000, ...config });

    instance.interceptors.response.use(
        (response) => response,
        (error) => {
            toast.error(error?.response?.statusText ?? error.code, {
                description: error?.response?.data?.message ?? error.message
            });

            return Promise.reject(error);
        }
    );
    return instance;
};

export const fetchData = async <T>(
    axiosInstance: AxiosInstance,
    endpoint: string,
    config?: AxiosRequestConfig
): Promise<T> => {
    const response = await axiosInstance.get<T>(endpoint, config);
    return response.data;
};
