export const YOUTUBE = 'YOUTUBE';
export const ANDROID = 'ANDROID';
export const IOS = 'IOS';
export const WEB = 'WEB';
export const OPTION_CATEGORIES = [
  { name: 'all', code: 'ALL' },
  { name: 'web', code: 'WEB' },
  { name: 'app', code: 'APP' },
  { name: 'unity', code: 'UNITY' },
  { name: 'vr-ar-mr', code: 'VR' },
  { name: 'ai-blockchain', code: 'AI' },
];
export const OPTION_TECHNOLOGIES = [
  {
    type: 'Framework',
    options: [
      { name: 'ios', type: 'app' },
      { name: 'unity', type: 'Framework' },
      { name: 'Android (Java)', type: '' },
      { name: 'Objective C', type: '' },
      { type: '', name: 'C#' },
      { type: 'framework', name: 'SmartAR' },
      { type: 'framework', name: 'Holotoolkit' },
      { type: '', name: 'Nodejs' },
      { type: 'framework', name: 'ARCore' },
      { type: '', name: 'Js' },
      { type: '', name: 'Html5' },
      { type: '', name: 'Css' },
      { type: 'framework', name: 'Reactjs' },
      { type: 'framework', name: 'Redux-saga' },
      { type: 'Axios', name: '0.19.0' },
      { type: 'Bulma', name: '0.7.5' },
      { type: 'framework', name: 'chai-enzyme' },
      { type: 'dev', name: 'web-pack' },
      { type: '', name: 'Php' },
      { type: 'framework', name: 'Laravel' },
      { type: 'database', name: 'mysql' },
      { type: 'framework', name: 'Jquery' },
      { type: 'framework', name: 'cloud watch' },
      { type: 'Cloud Deploy', name: 'AWS' },
      { type: 'Server', name: 'Nginx' },
      { type: 'database', name: 'Mongodb' },
      { type: 'framework', name: 'Paper Dashboard' },
      { type: 'Mysql', name: '5.6.7' },
    ],
  },
];
export const OPTION_LINKS = [
  { name: 'YOUTUBE', type: 'YOUTUBE' },
  { name: 'ANDROID', type: 'ANDROID' },
  { name: 'IOS', type: 'IOS' },
  { name: 'WEB', type: 'WEB' },
];
export const OPTION_TIME = [
  { name: '8.30', type: '8.30' },
  { name: '13.30', type: '13.30' },
];
export const OPTION_GENDER = [
  { name: 'Male', type: 'MALE' },
  { name: 'Female', type: 'FEMALE' },
  { name: 'Other', type: 'OTHER' },
];

export const OPTION_LEVEL_2 = [
  { name: 'Fulltime', type: 'FULLTIME' },
  { name: 'Parttime', type: 'PARTTIME' },
  { name: 'Freelancer', type: 'FREELANCER' },
];
export const OPTION_LEVEL_1 = [
  { name: 'Fresher', type: 'FRESHER' },
  { name: 'Dev', type: 'DEV' },
  { name: 'Intern', type: 'INTERN' },
  { name: 'Tester', type: 'TESTER' },
  { name: 'Sale', type: 'SALE' },
];
export const OPTION_SUPPORT = [
  { name: 'lunch', code: 'LUNCH' },
  { name: 'parking', code: 'PARKING' },
];
export const SALARY_BY_FULLTIME = { FRESHER: 400, INTERN: 200, DEV: 1000, TESTER: 500, SELL: 800 };
export const SALARY_BY_PARTTIME = { FRESHER: 200, INTERN: 100, DEV: 500, TESTER: 300, SELL: 400 };
export const SALARY_BY_FREELANCER = { FRESHER: 110, INTERN: 50, DEV: 300, TESTER: 200, SELL: 400 };
export const SALARY_SUPPORT = { LUNCH: 30, PARKING: 40 };
