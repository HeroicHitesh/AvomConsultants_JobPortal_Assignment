export const server = "http://localhost:3060";

const apiList = {
  login: `${server}/auth/login`,
  signup: `${server}/auth/signup`,
  uploadResume: `${server}/upload/resume`,
  user: `${server}/api/user`,
  resume: `${server}/api/resume`,
};

export default apiList;
