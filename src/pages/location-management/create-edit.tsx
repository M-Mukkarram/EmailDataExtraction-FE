import { Form } from 'antd';
import { useParams } from 'react-router-dom';

import SPContainer from '@/components/atoms/sp-container';
import SPLabel from '@/components/atoms/sp-label';
import DashboardPage from '@/components/layouts/dashboard-page';
import ActionButton from '@/components/molecules/action-button';
import useCreateOrEditLocationContainer from './containers/useCreateOrEditLocationContainer';
import FormLabelInput from '@/components/molecules/form-label-input';
import { nameValidationRules } from '@/validations/location';

export default function CreateOrEditLocation() {
  const params = useParams();

  const { locationId = null } = params;

  const { form, onCancel } = useCreateOrEditLocationContainer(locationId);

  return (
    <DashboardPage
      allowBack
      className="space-y-5"
      heading={!locationId ? 'Add Location' : 'Edit Location'}
    >
      <Form
        form={form}
        // onFinish={onSubmit}
        scrollToFirstError={{ behavior: 'smooth' }}
      >
        <SPContainer className={'grid grid-cols-1 gap-5'}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormLabelInput
              name={'name'}
              rules={nameValidationRules}
              label="Name"
              placeholder="Name"
            />
          </div>

          <div className="my-4 flex items-end justify-end">
            <div className="flex flex-1 gap-4 md:flex-initial  md:items-center md:justify-center">
              <ActionButton onClick={onCancel}>
                <SPLabel className="font-bold">Cancel</SPLabel>
              </ActionButton>
            </div>
          </div>
        </SPContainer>
      </Form>
    </DashboardPage>
  );
}
