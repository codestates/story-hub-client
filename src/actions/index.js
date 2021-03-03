export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';
export const USER_SIGNUP = 'USER_SIGNUP';
export const USER_UPDATE = 'USER_UPDATE';

export const LOGO_CLICKED = 'LOGO_CLICKED'
export const CREATE_CLICKED = 'CREATE_CLICKED'
export const DETAIL_CLICKED = 'DETAIL_CLICKED'
export const BUTTON_CLICKED = 'BUTTON_CLICKED'
export const PAGE_MOVED = "PAGE_MOVED"

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

export const logoClicked = (isLogo) => {
    return {
        type: LOGO_CLICKED,
        payload: isLogo,
    }
}

export const createClicked = (isCreate) => {
    return {
        type: CREATE_CLICKED,
        payload: isCreate,
    }
}

export const detailClicked = () => {
    return {
        type: DETAIL_CLICKED
    }
}

export const buttonClicked = () => {
    return {
        type: BUTTON_CLICKED
    }
}

export const pageMoved = (page) => {
    return {
        type: PAGE_MOVED,
        payload: page,
    }
}