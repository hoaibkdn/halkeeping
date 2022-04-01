import React, { useEffect, useState } from "react";
import {
  setFbAsyncInit,
  addEvent,
  loadSDKAsynchronously,
} from "./fbCustomChat";
import styled from "styled-components";

import zalo from "../../assets/icons/zalo.png";

const Zalo = styled.span`
  width: 58px;
  height: 58px;
  position: fixed;
  bottom: 100px;
  right: 30px;
  z-index: 103;

  & > img {
    width: 100%;
    height: 100%;
    object-fix: cover;
  }
`;

const Chatboxes = ({
  fbPageId = "2520030718061642",
  zaloNumber = "0785359038",
}) => {
  const [fbLoaded, setFBLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    const msgScript = document.createElement("script");

    msgScript.id = "facebook-ssdk";
    msgScript.src =
      "https://connect.facebook.net/vi_VN/sdk/xfbml.customerchat.js";
    msgScript.async = true;
    msgScript.defer = true;

    script.src =
      "https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v10.0";
    script.async = true;
    script.defer = true;

    document.body.appendChild(script);
    document.body.appendChild(msgScript);
    setFbAsyncInit();

    fbPageId && setFBLoaded(true);

    loadSDKAsynchronously();
  }, [fbPageId]);

  if (fbLoaded) {
    addEvent();
  }

  const createMarkup = () => {
    return {
      __html: `<div
        class="fb-customerchat"
        origin=""
        attribution="page_inbox"
        page_id=${fbPageId}
        theme_color="#ffffff"
        user_ref=""
        logged_in_greeting="Hi! How can we help you?"
        logged_out_greeting="Greeting message"
        allow_login="true"
        size="large"
      ></div>`,
    };
  };

  return (
    <>
      {fbPageId && (
        <div key={Date()} dangerouslySetInnerHTML={createMarkup()} />
      )}
      <a
        href={`https://zalo.me/${zaloNumber}`}
        target="_blank"
        style={{ zIndex: "103" }}
      >
        <Zalo>
          <img src={zalo} />
        </Zalo>
      </a>
    </>
  );
};

export default Chatboxes;
