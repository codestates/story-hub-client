export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';
export const USER_SIGNUP = 'USER_SIGNUP';
export const USER_UPDATE = 'USER_UPDATE';

export const PAGE_MOVED = "PAGE_MOVED"
export const MODAL_MOVED = "MODAL_MOVED"

export const CONTENT_SAVED = "CONTENT_SAVED"
export const COMMIT_SAVED = "COMMIT_SAVED"

export const MESSAGE_OPEN = "MESSAGE_OPEN"
export const MESSAGE_CLOSE = "MESSAGE_CLOSE"

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

export const contentSaved = (text) => {
    return {
        type: CONTENT_SAVED,
        payload: text,
    }
}

export const commitSaved = (text) => {
    return {
        type: COMMIT_SAVED,
        payload: text,
    }
}

export const messageOpen = (message) => {
    return {
        type: MESSAGE_OPEN,
        payload: message,
    }
}

export const messageClose = () => {
    return {
        type: MESSAGE_CLOSE,
    }
}
