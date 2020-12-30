import React from "react";
import {IProfileRequest} from "../../api/api.types";


interface IProps {
  profileData: IProfileRequest;
}

const Profile = (props: IProps) => {
  const {
    profileData: {
      first_name,
      last_name,
      phone,
      document_number,
    },
  } = props;

  return (
    <div>
      <div>
        <h1>Профиль</h1>
      </div>
      <div>first_name - {first_name}</div>
      <div>last_name - {last_name}</div>
      <div>phone - {phone}</div>
      <div>document_number - {document_number}</div>
    </div>
  );
};

export default Profile;