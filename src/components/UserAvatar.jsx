import React, { useEffect, useState } from "react";
import { Avatar } from "flowbite-react";
import useAuth from "../hooks/useAuth";
import * as userServices from "../services/userServices";

const UserAvatar = () => {
  const { auth } = useAuth();
  const [user, setUser] = useState("");

  useEffect(() => {
    const username = auth?.username;
    const accessToken = auth?.accessToken;

    const getUserInformation = async () => {
      try {
        const response = await userServices.getUserInformation(
          accessToken,
          username
        );
        setUser(response?.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUserInformation();
  }, []);

  return (
    <div className="flex flex-wrap">
      <Avatar alt="avatar of user" img={user?.img} rounded size="xs" />
    </div>
  );
};

export default UserAvatar;
