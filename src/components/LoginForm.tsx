import * as yup from 'yup';

import {
  Button,
  Input,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from '@material-tailwind/react';

import { useForm } from 'react-hook-form';
import { useLoginMutation } from '../state/auth';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object({
  email: yup.string().email('Invalid email address').required('Email is required'),
  password: yup
    .string()
    .min(4, 'Password must be at least 4 characters long')
    .required('Password is required'),
});

type FormValues = yup.InferType<typeof schema>;

export const LoginForm = () => {
  const { mutate, isPending, error } = useLoginMutation();
  const apiErrorData: any = error?.response?.data;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: 'johndoe@example.com',
      password: 'Summertime2025',
    },
  });

  const onSubmit = (data: FormValues) => {
    mutate({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="false">
      <Card className="w-96">
        <CardHeader variant="gradient" color="gray" className="mb-4 grid h-28 place-items-center">
          <Typography variant="h3" color="white">
            Login In
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          {apiErrorData?.errorMessage && (
            <p className="text-sm text-red-500 mb-2">{apiErrorData?.errorMessage}</p>
          )}
          <div>
            <Input
              type="email"
              label="Email"
              className="mb-4"
              error={!!errors.email}
              {...register('email')}
              disabled={isPending}
            />
            {errors?.email && <p className="text-sm text-red-500 mt-2">{errors.email?.message}</p>}
          </div>
          <div>
            <Input
              type="password"
              label="Password"
              className="mb-4"
              error={!!errors.password}
              {...register('password')}
              disabled={isPending}
            />
            {errors?.password && (
              <p className="text-sm text-red-500 mt-2">{errors.password?.message}</p>
            )}
          </div>
        </CardBody>
        <CardFooter className="pt-0">
          <Button variant="gradient" fullWidth type="submit" loading={isPending}>
            Login In
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};
