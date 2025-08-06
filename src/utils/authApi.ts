import axiosInstance from '../utils/axiosInstance';


export async function loginUser({Email, Password}: {Email: string; Password: string;}): Promise<{token:string}> {
    const res = await axiosInstance.post('/api/users/login', {Email, Password});
    return res.data;
}

export async function registerUser({Email, FullName, Password}: {Email: string; FullName: string; Password: string;}){
    const res = await axiosInstance.post('/api/users/register', {Email, FullName, Password});
    return res.data;
}