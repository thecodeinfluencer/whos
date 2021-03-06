import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import FormikButton from '../../formik/FormikButton';
import FormikForm from '../../formik/FormikForm';
import FormikInput from '../../formik/FormikInput';
import AppAlert from '../../fragments/AppAlert';
import AppButton from '../../paper/AppButton';
import ListItem from '../../paper/ListItem';
import {
  actionLoadList,
  actionSetList,
  actionUpdateListItem,
} from '../../redux/actions/dataActions';

const validation = Yup.object().shape({
  value: Yup.string().required().label('House Unit'),
});

export default function ManageUnits() {
  const dispatch = useDispatch();
  const state = useSelector(st => st);
  const busy = state.auth?.busy?.units;
  const error = state.auth?.error?.units;
  const units = state.data?.list?.units;

  useEffect(() => {
    dispatch(actionLoadList('units'));
  }, [dispatch]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <FormikForm
          validationSchema={validation}
          initialValues={{
            value: '',
            description: '',
          }}
          onSubmit={({ value, description }, { resetForm }) => {
            dispatch(
              actionSetList('units', {
                value,
                description,
                label: value?.toUpperCase(),
              })
            );

            resetForm();
          }}
        >
          <FormikInput
            label='Unit Name'
            placeholder='A1'
            name='value'
            mode='outlined'
          />
          <FormikInput
            label='Description'
            placeholder='Optional'
            name='description'
            mode='outlined'
            multiline
            numberOfLines={3}
          />
          {error && <AppAlert label={error} />}
          <FormikButton disabled={busy} mode='contained'>
            Add Unit
          </FormikButton>
        </FormikForm>
      </View>

      <View style={styles.container2}>
        {units?.map(unit => (
          <ListItem
            key={unit?.id}
            title={unit.label}
            // description={unit.service || unit.unitID || null}
            right={() => (
              <View style={styles.right}>
                <AppButton
                  small
                  labelStyle={styles.buttonText}
                  style={styles.button}
                  mode='outlined'
                  // disabled={busy}
                  onPress={() =>
                    dispatch(
                      actionUpdateListItem(
                        'units',
                        {
                          description: null,
                          label: null,
                          value: null,
                          id: null,
                        },
                        unit?.id
                      )
                    )
                  }
                >
                  Delete
                </AppButton>
              </View>
            )}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 36,
  },
  container2: {
    padding: 8,
  },
  right: {
    justifyContent: 'center',
  },
  button: {
    borderColor: '#fff',
  },
  buttonText: {
    color: '#fff',
  },
});
