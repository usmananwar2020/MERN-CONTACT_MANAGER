
import { STORAGE } from './const';

export const SetStorage = (data, remember = true) => {
    if (remember) {
        localStorage.setItem(STORAGE, JSON.stringify(data));
    } else {
        sessionStorage.setItem(STORAGE, JSON.stringify(data));
    }
};

export const GetStorage = () => {
    const savedCredentials = sessionStorage.getItem(STORAGE) || localStorage.getItem(STORAGE);
    let credentials = null;
    if (savedCredentials) {
        credentials = JSON.parse(savedCredentials);
    }
    return credentials;
};

// export const IsJobSeeker = () => {
//   if (IsAuthenticated()) {
//     if (GetStorage()?.userType == "jobSeeker") return true;
//     else return false;
//   }
//   return false;
// };

export const Logout = async () => {
    sessionStorage.removeItem(STORAGE);
    localStorage.removeItem(STORAGE);
    return await true;
};

export const IsLoggedIn = () => {
    const savedCredentials = sessionStorage.getItem(STORAGE) || localStorage.getItem(STORAGE);
    let credentials = null;
    if (savedCredentials) {
        credentials = JSON?.parse(savedCredentials);
    }
    return !!credentials?.isLoggedIn;
};

export const IsAuthenticated = () => {
    const savedCredentials = sessionStorage.getItem(STORAGE) || localStorage.getItem(STORAGE);
    let credentials = null;
    if (savedCredentials !== 'undefined' && savedCredentials) {
        credentials = JSON.parse(savedCredentials);
    }
    return !!credentials?.token;
};

export default { SetStorage, GetStorage, IsAuthenticated, Logout };
