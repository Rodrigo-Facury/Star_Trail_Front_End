import { useParams } from 'react-router-dom';
import StarTrailFooter from '../../Components/StarTrailFooter';
import StarTrailHeader from '../../Components/StarTrailHeader';
import './Profile.css';
import { useEffect, useState } from 'react';
import { User } from '../../../types';
import { Flex, Heading, Image, Text, Button, Input, FormLabel } from '@chakra-ui/react';
import secureLocalStorage from 'react-secure-storage';
import jwtDecode from 'jwt-decode';

function Profile() {
  const [user, setUser] = useState<User | undefined>();
  const [me, setMe] = useState<User | undefined>();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<User>({ id: 0, firstName: '', lastName: '', username: '', profilePicturePath: '', level: 0 });
  const [newProfilePicture, setNewProfilePicture] = useState<File | null>(null);

  const { username } = useParams();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const token: string | number | boolean | object | null = secureLocalStorage.getItem('st_token')

    if (token && typeof token === 'string') {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
      const tokenUser: User = jwtDecode(token)

      setMe(tokenUser)
    }
  }, [setMe])

  useEffect(() => {
    if (username) {
      fetch(`${typeof import.meta.env.VITE_API_BASE_URL === 'string' ? import.meta.env.VITE_API_BASE_URL : ''}/user/username/${username}`)
        .then((res) => res.json())
        .then(({ users }: { users: User[] }) => {
          setUser(users[0]);
          setEditedUser(users[0]);
        })
        .catch((err) => console.error(err));
    }
  }, [username]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditedUser((prevUser: User) => ({
      ...prevUser,
      [name]: value,
    }));
  };


  const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];
    setNewProfilePicture(selectedFile);
  };

  const handleSaveChanges = () => {
    if (editedUser) {
      const formData = new FormData();
      formData.append('firstName', editedUser.firstName || '');
      formData.append('lastName', editedUser.lastName || '');

      if (newProfilePicture) {
        formData.append('profilePicture', newProfilePicture);
      }

      // Envie a formData para a rota de atualização do usuário
    }

    setIsEditing(false);
  };

  return (
    <main id='profile-page'>
      <StarTrailHeader />
      <Flex alignItems='center' flexDirection='column' alignSelf='flex-start' flexGrow='1' marginTop='25px'>
        {
          user
          &&
          (
            isEditing
              ?
              <FormLabel htmlFor="profile-picture-input">
                <Image
                  src={user?.profilePicturePath}
                  objectFit="cover"
                  boxSize="150px"
                  borderRadius="50%"
                  cursor="pointer"
                />
                <Input
                  id="profile-picture-input"
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleProfilePictureChange}
                />
              </FormLabel>
              :
              <Image
                src={user?.profilePicturePath}
                objectFit="cover"
                boxSize="150px"
                borderRadius="50%"
              />
          )
        }
        {
          user
          &&
          <Flex color='whiteAlpha.900' flexDirection='column' marginLeft='15px'>
            {
              isEditing
                ?
                <Flex flexDirection='column'>
                  <FormLabel htmlFor='firstName'>
                    Nome
                    <Input id='firstName' name='firstName' value={editedUser?.firstName} onChange={handleInputChange} />
                  </FormLabel>
                  <FormLabel htmlFor='lastName'>
                    Sobrenome
                    <Input id='lastname' name='lastname' value={editedUser?.lastName} onChange={handleInputChange} />
                  </FormLabel>
                </Flex>
                :
                <Heading fontSize='3xl' marginTop='8px'>{user?.firstName} {user?.lastName}</Heading>
            }
            <Text fontSize='20px' marginBottom='5px'>{user?.username}</Text>
            {
              user.username === me?.username
                ?
                isEditing
                  ?
                  (
                    <Flex marginTop='25px' alignSelf='flex-end'>
                      <Button colorScheme='gray' onClick={handleEditToggle}>Cancelar</Button>
                      <Button colorScheme='whatsapp' marginLeft='10px' onClick={handleSaveChanges}>Salvar</Button>
                    </Flex>
                  )
                  :
                  <Button colorScheme='purple' onClick={handleEditToggle}>Editar</Button>
                :
                null
            }
          </Flex>
        }
      </Flex>
      <StarTrailFooter />
    </main>
  );
}

export default Profile;
