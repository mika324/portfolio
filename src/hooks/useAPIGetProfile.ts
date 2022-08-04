import { UserInfoType } from 'types/index';

export const useAPIGetUserInfo = (): Partial<UserInfoType> => {
  // Mock
  const res = {
    data: {
      id: 1,
      lastName: '実香',
      firstName: '鈴木',
      age: 27,
      email: 'hoge@hoge.com',
      birthday: '1990/01/01',
      birthplace: '茨城',
      engineerCareer: '4年半',
    },
  };
  return res.data;
};
