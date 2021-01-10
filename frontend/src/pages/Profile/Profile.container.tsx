import React from "react";
import Profile from "./Profile";
import { requestUser } from "../../api/api";
import { IProfileRequest } from "../../api/api.types";


interface IState {
  profileData: IProfileRequest | null;
}

const ProfileContainer = () => {
  const [state, setState] = React.useState<IState>({
    profileData: null,
  });
  const {
    profileData,
  } = state;

  React.useEffect(() => {
    const token = localStorage.getItem('token');

    setUserData(token || '');
  }, []);

  const setUserData = async (token: string) => {
    try {
      const response = await requestUser(token);

      setState({
        profileData: response.data,
      });
    } catch (e) {
      console.log('e', e);
    }
  };

  return (
    <>
      {profileData ? <Profile profileData={profileData} /> : <b>Вы не авторизованы</b>}

    </>
  );
};

export default ProfileContainer;