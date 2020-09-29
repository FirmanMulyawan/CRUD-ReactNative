import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Axios from 'axios';

const Item = ({name, email, bidang, onPress, onDelete}) => {
  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={onPress}>
        <Image
          source={{
            uri: `https://api.adorable.io/avatars/150/${email}.png`,
          }}
          style={styles.avatar}
        />
      </TouchableOpacity>
      <View style={styles.desc}>
        <Text style={styles.descNama}>{name}</Text>
        <Text style={styles.descEmail}>{email}</Text>
        <Text style={styles.descBidang}>{bidang}</Text>
      </View>
      <TouchableOpacity onPress={onDelete}>
        <Text style={styles.delete}>X</Text>
      </TouchableOpacity>
    </View>
  );
};

const Index = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bidang, setBidang] = useState('');
  const [users, setUsers] = useState([]);
  const [button, setButton] = useState('Simpan');
  const [selectedUser, setSelectedUser] = useState({});
  useEffect(() => {
    getData();
  }, []);

  const submit = () => {
    const data = {
      name: name,
      email: email,
      bidang: bidang,
    };
    // console.log('data before send: ', data);
    if (button === 'Simpan') {
      Axios.post('http://127.0.0.1:3004/users', data)
        .then(result => {
          console.log('resnya bapak: ', result);
          setName('');
          setEmail('');
          setBidang('');
          getData();
        })
        .catch(err => console.log('error dongg: ', err));
    } else if (button === 'Update') {
      Axios.put(`http://127.0.0.1:3004/users/${selectedUser.id}`, data).then(
        res => {
          console.log('res update', res);
          setName('');
          setEmail('');
          setBidang('');
          getData();
          setButton('Simpan');
        },
      );
    }
  };

  const getData = () => {
    Axios.get('http://127.0.0.1:3004/users').then(res => {
      console.log('res getData: ', res);
      setUsers(res.data);
    });
  };

  const selectItem = item => {
    console.log('selected item', item);
    setSelectedUser(item);
    setName(item.name);
    setEmail(item.email);
    setBidang(item.bidang);
    setButton('Update');
  };
  const deleteItem = item => {
    console.log(item);
    Axios.delete(`http://127.0.0.1:3004/users/${item.id}`).then(res => {
      console.log('res delete: ', res);
      getData();
    });
  };
  return (
    <View style={styles.wrapper}>
      <TextInput
        placeholder="Nama Lengkap"
        style={styles.input}
        value={name}
        onChangeText={value => setName(value)}
      />
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={value => setEmail(value)}
      />
      <TextInput
        placeholder="Bidang"
        style={styles.input}
        value={bidang}
        onChangeText={value => setBidang(value)}
      />
      <Button title={button} onPress={submit} />
      <View style={styles.line} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {users.map(user => {
          return (
            <Item
              key={user.id}
              name={user.name}
              email={user.email}
              bidang={user.bidang}
              onPress={() => selectItem(user)}
              onDelete={() =>
                Alert.alert('Peringatan', 'Anda yakin?', [
                  {
                    text: 'Tidak',
                    onPress: () => console.log('button tidak'),
                  },
                  {
                    text: 'Hapus lahh',
                    onPress: () => deleteItem(user),
                  },
                ])
              }
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginHorizontal: 30,
    marginTop: 50,
  },
  input: {
    borderWidth: 1,
    marginBottom: 12,
    borderRadius: 25,
    paddingHorizontal: 12,
  },
  line: {
    height: 2,
    backgroundColor: 'red',
    marginVertical: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 80,
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  desc: {
    marginLeft: 18,
    flex: 1,
  },
  descNama: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  descEmail: {
    fontSize: 16,
  },
  descBidang: {
    fontSize: 12,
    marginTop: 8,
  },
  delete: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
  },
});
export default Index;
