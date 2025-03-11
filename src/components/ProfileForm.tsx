import { useAuthStore } from '@/state/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Card, Input, Typography } from '@material-tailwind/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useCurrentUserQuery } from '../state/user';
import { useUpdateUserMutation } from '../state/user/mutations';

const schema = yup.object({
  email: yup.string(),
  name: yup.string().required('Name is required'),
});

type FormValues = yup.InferType<typeof schema>;

export function ProfileForm() {
  const { data } = useCurrentUserQuery();
  const { mutate, isPending } = useUpdateUserMutation({
    onSuccess: () => {
      router.push('/dashboard');
    },
  });
  const currentUserId = useAuthStore.use.currentUserId();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: data?.email,
      name: data?.name,
    },
    disabled: isPending,
  });

  const onSubmit = (data: FormValues) => {
    mutate({
      id: currentUserId ?? '',
      name: data.name,
    });
  };

  const handleCancelClick = () => {
    router.push('/dashboard');
  };

  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Profile
      </Typography>
      <form
        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Your Name
          </Typography>
          <div>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: 'before:content-none after:content-none',
              }}
              error={!!errors.name}
              {...register('name')}
              disabled={isPending}
            />
            {errors?.name && <p className="text-sm text-red-500 mt-2">{errors.name?.message}</p>}
          </div>

          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Your Email
          </Typography>
          <Input
            size="lg"
            placeholder="name@mail.com"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: 'before:content-none after:content-none',
            }}
            {...register('email', { disabled: true })}
          />
        </div>
        <div className="flex gap-4">
          <Button
            className="mt-6"
            fullWidth
            variant="outlined"
            onClick={handleCancelClick}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button className="mt-6" fullWidth type="submit" loading={isPending} disabled={isPending}>
            Save
          </Button>
        </div>
      </form>
    </Card>
  );
}
