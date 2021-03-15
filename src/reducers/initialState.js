export const userState = {
  users: [],
  isLogin: false,
  accessToken: '',
};

export const pageState = {
  page: 'Cover',
  modalPage: '',
  boardIndex: 0,
  boardTitle: '',
  storyDetail: '',
  myPageProps: {},
  commitDetail: '',
  commitDetailIndex: 0,
  commitDetailTitle: '',
  commitDetailNickname: '',
  commitDetailCreated: '',
  commitDetailIsMerged: 0,
  commitMaxDepth: 0,
};

export const textState = {
  content: '',
  commit: '',
  title: '',
  searchList: [],
  contentTitle: '',
  commitTitle: '',
};

export const messageState = {
  message: '',
  isOpen: false,
};

export const infoState = {
  category: '',
  comment: '',
  commitBy: '',
  max: 0,
  min: 0,
  etc: '',
};
