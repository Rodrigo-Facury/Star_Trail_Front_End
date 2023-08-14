import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import './StarTrailHeader.css';
import secureLocalStorage from 'react-secure-storage';
import { User } from '../../types';

function StarTrailHeader() {
  const [user, setUser] = useState<User | undefined>();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const token: string = JSON.stringify(secureLocalStorage.getItem('st_token'));
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
    const tokenUser: User = jwtDecode(token);
    
    setUser(tokenUser);
  }, [setUser]);

  return (
    <header className="star-trail-header">
      <div className="star-trail-logo">
        <h1>Star Trail</h1>
      </div>
      <div className="user-profile">
        <div className="user-avatar">
          <img src={user?.profilePicturePath || 'https://random.imagecdn.app/40/40'} alt="Avatar do Usuário" />
        </div>
        <div className="user-info">
          <h2>{user?.firstName || 'Nome do Usuário'}</h2>
          <p>Nível: {user?.level || 0}</p>
        </div>
      </div>
    </header>
  );
}

export default StarTrailHeader;
