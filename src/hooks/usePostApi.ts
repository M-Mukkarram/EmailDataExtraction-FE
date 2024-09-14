import {
  MutationFunction,
  UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosMethodEnum } from '@/utils/enums/general.enum';
import api from '@/service/http.service';
import { AxiosError } from 'axios';
import { notification } from 'antd';

const _api = new api();

interface UseCallApiProps<D, R> {
  url?: string;
  onSuccess?: (data: R & { totalCount?: number; message?: string }) => void;
  onError?: (data: string) => void;
  showErrorMessage?: boolean;
  showSuccessMessage?: boolean;
  successMessage?: string;
  customMutationFn?:
    | MutationFunction<
        R & {
          totalCount?: number | undefined;
          message?: string | undefined;
        },
        D | undefined
      >
    | undefined;
  method?: AxiosMethodEnum;
  invalidate?: string[][];
  query?: { [key in string]: string | number | boolean };
  queryParam?: { [key in string]: string | number | boolean };
}

export default function usePostApi<D, R>({
  url = '',
  showErrorMessage = true,
  showSuccessMessage,
  successMessage,
  customMutationFn,
  onSuccess,
  query,
  onError,
  invalidate,
  method = AxiosMethodEnum.POST,
  ...options
}: UseCallApiProps<D, R>): UseMutationResult<
  R & { totalCount?: number; message?: string },
  AxiosError,
  D | undefined
> {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: customMutationFn
      ? async (data) => customMutationFn(data)
      : async (data?: D) => {
          try {
            const response = await _api.call<
              D,
              R & { totalCount?: number; message?: string }
            >({ url, method, body: data, query });

            if (response.data) return response.data;
            else return Promise.reject(response);
          } catch (error) {
            return Promise.reject(error);
          }
        },
    onError: (err: AxiosError<{ message: string }>) => {
      showErrorMessage &&
        notification.error({
          message: 'Error',
          description: err?.response?.data?.message ?? 'Something went wrong',
          placement: 'bottomRight',
        });
      onError && onError('err');
    },
    onSuccess: (data) => {
      showSuccessMessage || successMessage
        ? notification.success({
            message: 'Success',
            description: successMessage || data?.message || 'Success',
            placement: 'bottomRight',
          })
        : null;

      invalidate?.length &&
        invalidate.forEach((query) =>
          queryClient.invalidateQueries({ queryKey: query })
        );
      onSuccess && onSuccess(data);
    },
    // mutationKey: [url],
    ...options,
  });
}
