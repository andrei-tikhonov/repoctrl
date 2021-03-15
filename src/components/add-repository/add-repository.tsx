import React, { FunctionComponent } from 'react';
import { useForm } from 'react-hook-form';

type FormInputs = { name: string };
interface AddRepositoryProps {
  add: (name: string) => Promise<void>;
}

export const AddRepository: FunctionComponent<AddRepositoryProps> = ({
  add,
}) => {
  const { register, handleSubmit, errors } = useForm<FormInputs>();
  const onSubmit = ({ name }: FormInputs) => add(name);

  return (
    <div>
      <h2>Add repository</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input name="name" ref={register({ required: true })} />
        {errors.name && <span>This field is required</span>}
        <input type="submit" />
      </form>
    </div>
  );
};
