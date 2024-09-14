import { useForm } from 'antd/es/form/Form';
import { useNavigate } from 'react-router-dom';

export default function useCreateOrEditLocationContainer(
  locationId?: string | null
) {
  const [form] = useForm();
  const navigate = useNavigate();

  console.log({ locationId });
  function onCancel() {
    navigate(-1);
  }
  return {
    form,
    onCancel,
  };
}
