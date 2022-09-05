import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './form.scss';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, Container, Grid, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../Iconify';
import { FormProvider, RHFTextField, RHFCheckbox } from '../hook-form';

// ----------------------------------------------------------------------

export default function Form({ textInputs, formHeader, formButton, menuItem }) {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  console.log(menuItem.items);

  const LoginSchema = Yup.object().shape({
    user: Yup.string().required('Please select a user').oneOf(menuItem.items),
    handle: Yup.string().required('Handle is Required').min(4),
    name: Yup.string().required('Name is Required').min(4),
    tagline: Yup.string().required('Tagline  is Required').min(4),
    description: Yup.string().required('description is Required').min(16),
    address: Yup.string().required('Address is Required').min(4),
  });

  const defaultValues = {
    email: '',
    password: '',
    remember: true,
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async () => {
    navigate('/dashboard', { replace: true });
  };

  const handleChange = (event) => {
    setUser(event.target.value);
  };
  const handleTextInputRendering = () => {
    if (textInputs.length !== 0) {
      return textInputs.map((textInput) => <RHFTextField name={textInput.name} label={textInput.label} />);
    }
  };
  //   const handleSubmit = () => {};

  return (
    <div className="form-container">
      <Container sx={12}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid className="form-container__flex" container item>
            <Typography variant="h3" component="h3" marginBottom="1rem">
              {formHeader}
            </Typography>
            <Stack spacing={1.5} width={'60%'}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{menuItem ? menuItem.label : null}</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={user}
                  label={`${menuItem ? menuItem.label : null}`}
                  onChange={handleChange}
                >
                  {menuItem.items.length > 0
                    ? menuItem.items.map((menuItem) => <MenuItem value={menuItem.id}>{menuItem.name}</MenuItem>)
                    : null}
                </Select>
              </FormControl>

              {handleTextInputRendering()}
              {/* <RHFTextField name="email" label="Email address" /> */}
            </Stack>

            {/* <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
            <RHFCheckbox name="remember" label="Remember me" />
            <Link variant="subtitle2" underline="hover">
              Forgot password?
            </Link>
          </Stack> */}
            <LoadingButton
              className="form__action__button"
              size="medium"
              type="submit"
              variant="contained"
              loading={isSubmitting}
              onClick={formButton ? formButton.onClick : null}
            >
              {formButton ? formButton.text : 'Confirm'}
            </LoadingButton>
          </Grid>
        </FormProvider>
      </Container>
    </div>
  );
}
