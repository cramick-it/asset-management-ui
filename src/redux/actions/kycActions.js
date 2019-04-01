import { axiosInstance } from "../helpers/axiosHelper";

export const fetchKyc = (id) => {
    return {
        type: 'FETCH_KYC',
        payload: axiosInstance.get('/kyc', {
            id
        })
    }
}

export const updateKyc = (data) => {
    return {
        type: 'UPDATE_KYC',
        payload: axiosInstance.put(
            'kyc', {
                data
            }
        )
    }
}

export const addKyc = (data) => {
    return {
        type: 'ADD_KYC',
        payload: axiosInstance.post(
            'kyc', {
                data
            }
        )
    }
}

export const updateKycData = (data) => {
    return {
        type: 'UPDATE_KYC_DATA',
        payload: data
    }
}