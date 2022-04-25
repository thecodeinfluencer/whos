import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import ListCard from '../../fragments/ListCard';
import ListEmptyCard from '../../fragments/ListEmptyCard';
import { actionLoadList } from '../../redux/actions/dataActions';

export default function ManageResidents({ navigation }) {
  const dispatch = useDispatch();
  const state = useSelector(st => st);
  const users = state.data?.list?.users;
  const busy = state.data?.busy?.users;

  const residents = users.filter(({ role }) => role === 'resident');

  navigation.setOptions({
    headerTitle: 'Manage Residents',
  });

  useEffect(() => {
    dispatch(actionLoadList('users'));
  }, [dispatch]);

  return (
    <ScrollView>
      {residents?.map(resident => (
        <ListCard
          key={resident.id}
          title={resident.names}
          description={resident?.unitId}
          right={() => (
            <View style={styles.right}>
              <Button
                labelStyle={styles.buttonText}
                contentStyle={styles.button}
                mode='outlined'
                disabled={busy}
                onPress={() =>
                  navigation.navigate('EditResident', { ...resident })
                }
              >
                Edit Info
              </Button>
            </View>
          )}
        />
      ))}
      {!residents || (residents?.length < 1 && <ListEmptyCard />)}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  right: {
    justifyContent: 'center',
  },
  button: {
    borderColor: '#fff',
    borderWidth: 2,
  },
  buttonText: {
    color: '#fff',
  },
});