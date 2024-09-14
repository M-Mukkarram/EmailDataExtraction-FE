/* eslint-disable @typescript-eslint/no-explicit-any */

import SPHeader from '@/components/atoms/sp-header';
import SPButton from '@/components/atoms/sp-button';
import { GoogleIcon } from '@/assets/svgs';
import SPLabel from '@/components/atoms/sp-label';
// import api from '@/service/http.service';
// import { AxiosMethodEnum } from '@/utils/enums/general.enum';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { APP_CONFIG } from '@/utils/constants/app.constant';
import { useQueryClient } from '@tanstack/react-query';
import localforage from 'localforage';
import { STORAGE_KEYS } from '@/utils/constants/storage.constant';
import { useNavigate } from 'react-router-dom';
import usePostApi from '@/hooks/usePostApi';
import { notification } from 'antd';
// import { useEffect, useState } from 'react';

// interface IUserInfo {
//   access_token: string;
//   token_type: string;
//   expires_in: number;
//   scope: string;
//   authuser: string;
//   hd: string;
//   prompt: string;
// }

/**
 * Header component for the application.
 * It includes the Google sign-in button and a dropdown menu for user settings.
 *
 * @returns {React.ReactElement} - The Header component.
 */

// let _api = new api();
export default function Header() {
  // const [notificationVisible, setNotificationVisible] =
  //   useState<boolean>(false);

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutateAsync } = usePostApi({
    url: `${APP_CONFIG.api.baseUrl}/email-content/extract`,
    showErrorMessage: true,
    showSuccessMessage: false,
    onSuccess: (response) => {
      notification.success({
        message: response?.message || 'Success',
      });
    },
  });

  const googleLogin = useGoogleLogin({
    scope:
      'https://mail.google.com/ https://www.googleapis.com/auth/gmail.modify',
    onSuccess: async (tokenResponse) => {
      const userInfoData = await axios.get(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        {
          headers: { Authorization: 'Bearer ' + tokenResponse.access_token },
        }
      );

      // const { data } = await axios.get(
      //   'https://gmail.googleapis.com/gmail/v1/users/mukkarram@nassaunationalcable.com/messages',
      //   // 'https://www.googleapis.com/gmail/v1/users/me/messages',
      //   // 'https://www.googleapis.com/gmail/v1/users/me/labels',
      //   // 'https://www.googleapis.com/oauth2/v3/userinfo',
      //   // 'https://accounts.google.com/o/oauth2/iframerpc',
      //   {
      //     headers: { Authorization: 'Bearer ' + tokenResponse.access_token },

      //     params: {
      //       // response_type: 'token',
      //       // login_hint: tokenResponse?.access_token,
      //       // client_id:
      //       //   '1089634070694-b4tv7lvak2513v6kl2t6i92juaivkkaj.apps.googleusercontent.com',
      //       // origin: 'https://explorer.apis.google.com',
      //       // scope:
      //       //   'https://mail.google.com/ https://www.googleapis.com/auth/gmail.modify',
      //       // ss_domain: 'https://explorer.apis.google.com',
      //       // include_granted_scopes: false,
      //       // auto: 1,
      //     },
      //   }
      // );

      // console.log({ data });

      // const tokenResponse = await axios.get(
      //   'https://accounts.google.com/o/oauth2/iframerpc',
      //   {
      //     params: {
      //       action: 'issueToken',
      //       response_type: 'token',
      //       login_hint: tokenResponse2?.access_token,
      //       client_id:
      //         '1089634070694-b4tv7lvak2513v6kl2t6i92juaivkkaj.apps.googleusercontent.com',
      //       // '436969206006-ie164v82nc6orrivkfu02d54dd9rhu1a.apps.googleusercontent.com',
      //       origin: 'https://explorer.apis.google.com',
      //       scope:
      //         'https://mail.google.com/ https://www.googleapis.com/auth/gmail.modify',
      //       ss_domain: 'https://explorer.apis.google.com',
      //       include_granted_scopes: false,
      //       auto: 1,
      //     },
      //   }
      // );

      // fetchEmails(tokenResponse?.access_token);
      apiHit(tokenResponse as any, userInfoData?.data?.email);
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  async function apiHit(tokenResponse: { access_token: any }, email: any) {
    if (tokenResponse) {
      mutateAsync({
        accessToken: tokenResponse.access_token,
        email: email,
      });
    } else {
      console.error('Invalid tokenResponse');
    }
  }

  // async function fetchEmails(accessToken: string) {
  //   const response = await fetch(
  //     'https://slditr9z28.execute-api.us-east-2.amazonaws.com/default/gmailAPI',
  //     {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ accessToken }),
  //     }
  //   );

  //   if (!response.ok) {
  //     throw new Error(`HTTP error! status: ${response.status}`);
  //   }

  //   const data = await response.json();
  //   console.log(data); // Handle the fetched emails
  // }

  return (
    <SPHeader
      className="flex h-16 items-center justify-end border-0  border-l-2 border-solid border-[#f5f5f5] bg-white"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div className="flex flex-row items-center justify-center gap-3">
        {/* <SPDropdown
          open={notificationVisible}
          onOpenChange={(open) => setNotificationVisible(open)}
          trigger={['click']}
          dropdownRender={() => (
            <DropdownMenu
              heading="Notifications"
              headingActions={[<SPSwitch />]}
              data={[
                {
                  message:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit and many more lksjdlk aslkdjalksd asdlkjaslkdj aslkdjsalkjdsa salkdjlsakjd sadmnasd,m salkdjlksadj salkdjlksadj askldjlksadjlksajd lksajdlksajdlksajd lkasjdlksadj aslkjdsalkdj asdlksajdlksajd salkjdlsakjdl.',
                  time: '12:00 PM',
                },
                {
                  message:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                  time: '12:00 PM',
                },
                {
                  message:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                  time: '12:00 PM',
                },
                {
                  message:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                  time: '12:00 PM',
                },
                {
                  message:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                  time: '12:00 PM',
                },
                {
                  message:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                  time: '12:00 PM',
                },
                {
                  message:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                  time: '12:00 PM',
                },
                {
                  message:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                  time: '12:00 PM',
                },
                {
                  message:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                  time: '12:00 PM',
                },
                {
                  message:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                  time: '12:00 PM',
                },
                {
                  message:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                  time: '12:00 PM',
                },
                {
                  message:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                  time: '12:00 PM',
                },
                {
                  message:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                  time: '12:00 PM',
                },
                {
                  message:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                  time: '12:00 PM',
                },
                {
                  message:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                  time: '12:00 PM',
                },
                {
                  message:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                  time: '12:00 PM',
                },
                {
                  message:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                  time: '12:00 PM',
                },
                {
                  message:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                  time: '12:00 PM',
                },
              ]}
              component={NotificationItem}
              onClose={() => setNotificationVisible(false)}
            />
          )}
        ></SPDropdown> */}
        {/* <SPDropdown menu={{ items: [] }} trigger={['click']}>
          <Link to="/settings" className="flex cursor-pointer flex-row gap-2">
            <NameAvatar
              name={`${user?.firstName} ${user?.lastName}`}
              role={_.capitalize(_.startCase(user?.accountType) ?? 'ADMIN')}
              url={`${user?.profilePicture?.path ? createAssetUrl(user?.profilePicture?.path) : Avatar}`}
            />
          </Link>
        </SPDropdown> */}

        <SPButton
          className="flex max-w-[700px] flex-row items-center"
          onClick={googleLogin as any}
        >
          <GoogleIcon className="h-5 w-5" />
          <SPLabel className="ml-2 text-base">Extract Data with Email</SPLabel>
        </SPButton>
      </div>
      <div className="ml-2 flex items-center justify-between gap-3">
        <SPButton
          onClick={async () => {
            await localforage.removeItem(STORAGE_KEYS.AUTH.AUTH_TOKEN);
            await localforage.removeItem(STORAGE_KEYS.AUTH.REFRESH_TOKEN);
            queryClient.clear();

            navigate('/auth/sign-in', { replace: true });
          }}
        >
          Logout
        </SPButton>
      </div>
    </SPHeader>
  );
}
