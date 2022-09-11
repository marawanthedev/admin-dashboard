// import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import './form.scss';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import {
  Stack,
  Container,
  Grid,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../Iconify';
import { FormProvider, RHFTextField, RHFCheckbox } from '../hook-form';

// ----------------------------------------------------------------------

export default function Form({
  textInputs,
  formHeader,
  formButton,
  menuItems,
  schema,
  defaultValues,
  onFormSubmission,
}) {
  const navigate = useNavigate();

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    register,
    setValue,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = async (formValues) => {
    onFormSubmission({ ...formValues });
  };

  const handleTextInputRendering = () => {
    if (textInputs.length !== 0) {
      return textInputs.map((textInput) => <RHFTextField name={textInput.name} label={textInput.label} />);
    }
  };

  const handleMenuItemRendering = () => {
    if (menuItems !== undefined && menuItems !== null) {
      return menuItems.map((menuItem) => (
        <div className="input-row">
          {console.log(menuItem.name)}
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">{menuItem?.label}</InputLabel>
            <Select
              {...register(`${menuItem.name}`)}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label={`${menuItem?.label}`}
              error={errors.select && errors.select.message}
              onChange={(e) => setValue('select', e.target.value, { shouldValidate: true })}
            >
              {menuItem.items.length > 0
                ? menuItem.items.map((menuItem) => <MenuItem value={menuItem.id}>{menuItem.name}</MenuItem>)
                : null}
            </Select>
            {/* eslint no-restricted-globals: ["error", "event"] */}

            {menuItem.to ? (
              <Link to={menuItem.to} className="input-row__icon-button">
                <Iconify icon={'carbon:add-filled'} sx={{ width: 32, height: 32 }} />
              </Link>
            ) : null}
          </FormControl>
        </div>
      ));
    }
  };

  return (
    <div className="form-container">
      <Container>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid className="form-container__flex" container item>
            <Typography variant="h3" component="h3" marginBottom="1rem">
              {formHeader}
            </Typography>
            <Stack spacing={1.5} width={'60%'}>
              {handleMenuItemRendering()}
              {handleTextInputRendering()}
            </Stack>

            <LoadingButton
              className="form__action__button"
              size="medium"
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              {formButton ? formButton.text : 'Submit'}
            </LoadingButton>
          </Grid>
        </FormProvider>
      </Container>
    </div>
  );
}
