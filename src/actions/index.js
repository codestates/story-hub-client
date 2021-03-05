export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';
export const USER_SIGNUP = 'USER_SIGNUP';
export const USER_UPDATE = 'USER_UPDATE';

export const PAGE_MOVED = "PAGE_MOVED"
export const MODAL_MOVED = "MODAL_MOVED"

export const userLogin = (userInfo) => {
    return {
        type: USER_LOGIN,
        payload: userInfo,
    };
};

export const userLogout = () => {
    return {
        type: USER_LOGOUT,
    };
};

export const userSignup = (signupInfo) => {
    return {
        type: USER_SIGNUP,
        payload: signupInfo,
    };
};

export const userUpdate = (nickName) => {
    return {
        type: USER_UPDATE,
        payload: nickName,
    };
};

export const pageMoved = (page) => {
    return {
        type: PAGE_MOVED,
        payload: page,
    }
}

export const modalMoved = (page) => {
    return {
        type: MODAL_MOVED,
        payload: page,
    }
}