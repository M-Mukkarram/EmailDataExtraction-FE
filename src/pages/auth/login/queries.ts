import usePostApi from '@/hooks/usePostApi';
import { useBoundStore } from '@/store';
import { API_ROUTES } from '@/utils/constants/api-route.constant';
import { STORAGE_KEYS } from '@/utils/constants/storage.constant';
import localforage from 'localforage';
import { useNavigate } from 'react-router-dom';

/**
 * A custom React hook for handling user sign-in functionality.
 * This hook integrates with the API for user authentication and navigation.
 *
 * @returns An object containing the signIn function and signInLoading flag.
 * - signIn: A function to initiate the sign-in process. It sends a POST request to the login API endpoint.
 * - signInLoading: A boolean flag indicating whether the sign-in process is currently pending.
 */

export function useSignIn() {
  const { setUser } = useBoundStore((state) => state);
  const navigate = useNavigate();

  const { mutateAsync: signIn, isPending } = usePostApi({
    url: API_ROUTES.auth.login,
    showErrorMessage: true,
    showSuccessMessage: true,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess: async (data: any) => {
      console.log({ data });
      await localforage.setItem(
        STORAGE_KEYS.AUTH.AUTH_TOKEN,
        data?.accessToken
      );
      await localforage.setItem(
        STORAGE_KEYS.AUTH.REFRESH_TOKEN,
        data?.refreshToken
      );

      setUser?.(data.data);

      navigate('/dashboard');
    },
  });

  return {
    signIn,
    signInLoading: isPending,
  };
}
