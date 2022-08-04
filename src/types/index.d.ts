declare module '*.jpg';
declare module '*.png';

export interface UserInfoType {
  id: number;
  lastName: string;
  firstName: string;
  age: number;
  email: string;
  birthday: string;
  birthplace: string;
  engineerCareer: string;
}
