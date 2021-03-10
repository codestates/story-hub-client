export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';
export const USER_SIGNUP = 'USER_SIGNUP';
export const USER_UPDATE = 'USER_UPDATE';

export const PAGE_MOVED = "PAGE_MOVED";
export const MODAL_MOVED = "MODAL_MOVED";

export const CONTENT_SAVED = "CONTENT_SAVED";
export const COMMIT_SAVED = "COMMIT_SAVED";
export const SEARCH_TITLE = 'SEARCH_TITLE';
export const SEARCH_LIST = 'SEARCH_LIST';

export const MESSAGE_OPEN = "MESSAGE_OPEN";
export const MESSAGE_CLOSE = "MESSAGE_CLOSE";

export const CONTENT_TITLE = "CONTENT_TITLE";
export const COMMIT_TITLE = "COMMIT_TITLE";

export const CATEGORY_SAVED = "CATEGORY_SAVED";
export const COMMENT_SAVED = "COMMENT_SAVED";
export const COMMITBY_SAVED = "COMMITBY_SAVED";
export const MAX_SAVED = "MAX_SAVED";
export const MIN_SAVED = "MIN_SAVED";
export const ETC_SAVED = "ETC_SAVED";


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










export const contentTitleSaved = (title) => {
    return {
        type: CONTENT_TITLE,
        payload: title,
    }
}

export const commitTitleSaved = (title) => {
    return {
        type: COMMIT_TITLE,
        payload: title,
    }
}

export const categorySaved = (choose) => {
    return {
        type: CATEGORY_SAVED,
        payload: choose,
    }
}

export const commentSaved = (text) => {
    return {
        type: COMMENT_SAVED,
        payload: text,
    }
}

export const commitbySaved = (choose) => {
    return {
        type: COMMITBY_SAVED,
        payload: choose,
    }
}

export const maxSaved = (number) => {
    return {
        type: MAX_SAVED,
        payload: number,
    }
}

export const minSaved = (number) => {
    return {
        type: MIN_SAVED,
        payload: number,
    }
}

export const etcSaved = (text) => {
    return {
        type: ETC_SAVED,
        payload: text,
    }
}