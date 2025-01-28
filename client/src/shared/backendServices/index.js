import axios from 'axios';
import { GetStorage } from '../guards/credentialsService';

export const backendCall = async ({
    url,
    method = 'POST',
    data,
    source,
    isNavigate = true,
    isShowErrorMessage = true,
    contentType = 'application/json',
    dataModel,
}) => {
    const storageData = await GetStorage();
    const _headers = {
        'Content-Type': contentType,
        Authorization: 'Bearer ' + storageData?.token || '',
    };

    let _response = '';
    await axios(import.meta.env.VITE_REACT_API_URL + url, {
        method: method,
        data: data,
        headers: _headers,
        cancelToken: source?.token,
    })
        .then((response) => {
            _response = response.data;
            if (dataModel) {
                let dataSet = dataModel.adapt(_response?.data);
                _response.data = dataSet;
            }
        })
        .catch((error) => {
            let _responseData = error.response?.data;
            if (isShowErrorMessage) {
                // handleToastMessage("error", _responseData.message);
                console.log('error ==', _responseData?.message);
            }
            _response = _responseData;
            if (error.response?.status === 401 && isNavigate) {
                // window.location.replace("/");
                // localStorage.clear();
            }
        });

    return _response;
};

