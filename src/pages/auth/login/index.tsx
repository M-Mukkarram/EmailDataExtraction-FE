import { Form } from 'antd';
import { useForm } from 'antd/es/form/Form';

import { NNC } from '@/assets/images';
// import { GoogleIcon } from '@/assets/svgs';
import { ILoginForm } from '@/types/auth.types';
import { useSignIn } from './queries';

import SPButton from '@/components/atoms/sp-button';
import SPContainer from '@/components/atoms/sp-container';
import SPLabel from '@/components/atoms/sp-label';
// import FormCheckbox from '@/components/molecules/form-checkbox';
import FormLabelInput from '@/components/molecules/form-label-input';
// import SocialButton from '@/components/molecules/social-button';

/**
 * The Login component is responsible for rendering the login form and handling user authentication.
 * It uses Ant Design's Form component and custom components like SPButton, SPContainer, SPLabel, FormLabelInput, and SocialButton.
 *
 * @returns {React.ReactElement} - The rendered Login component.
 */

export default function Login() {
  const [form] = useForm<ILoginForm>();
  const { signIn, signInLoading } = useSignIn();

  async function onSubmit(values: ILoginForm) {
    await signIn(values);
  }
  return (
    <div className="flex h-full flex-1 flex-col items-center justify-center">
      <SPContainer className="w-96 p-20 ">
        <div className="flex flex-1 items-center justify-center">
          <img src={NNC} alt="nnc_logo" className="mx-auto mb-5 w-40" />
        </div>
        <div className="flex flex-col items-start py-5">
          <h1 className="text-xl font-bold text-primary">Welcome to NNC</h1>
          <p className="text-sm text-secondary opacity-80">Login to continue</p>
        </div>
        <Form
          form={form}
          onFinish={onSubmit}
          scrollToFirstError={{ behavior: 'smooth' }}
          layout="vertical"
          className="grid grid-cols-1 gap-2"
        >
          <FormLabelInput
            name={'login'}
            rules={[
              {
                required: true,
                message: 'Please enter your username',
              },
            ]}
            placeholder="Please enter your username"
            label="Username"
          />

          <FormLabelInput.Password
            name={'password'}
            rules={[
              {
                required: true,
                message: 'Please enter your password',
              },
            ]}
            label="Password"
            placeholder="********"
          />
          <div className="flex justify-between">
            <div className="flex flex-[0.5] items-center justify-start">
              {/* <FormCheckbox name={'rememberMe'}>
                <SPLabel className="text-md font-medium text-primary">
                  Remember me
                </SPLabel>
              </FormCheckbox> */}
            </div>
            {/* <Form.Item>
              <Link
                to="/"
                // to="/auth/forgot-password"
                className="text-md font-medium text-primary hover:text-primary hover:opacity-90"
              >
                Forgot Password
              </Link>
            </Form.Item> */}
          </div>
          <SPButton
            loading={signInLoading}
            type="primary"
            className="w-full"
            htmlType="submit"
          >
            <SPLabel className="font-bold text-white">Login</SPLabel>
          </SPButton>
        </Form>
        {/* <div className="flex flex-col items-center justify-center gap-4 pt-5 text-primary">
          <p>Or login with</p>
          <div className="flex gap-5">
            <div className="flex justify-center space-x-4">
              <SocialButton icon={<GoogleIcon className="h-6 w-6" />} />
            </div>
          </div>
        </div> */}
      </SPContainer>
    </div>
  );
}
