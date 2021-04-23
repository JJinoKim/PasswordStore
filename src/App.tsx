import React from 'react';

import Navigator from '~/Screen/Navigator';
import { AuthContextProvider } from '~/Context/Auth/';
import {UserDataContextProvider} from '~/Context/UserData/';

const App = () => {
  return (
    <AuthContextProvider>
        <UserDataContextProvider>
          <Navigator />
        </UserDataContextProvider>
    </AuthContextProvider>
  );
};

export default App;
