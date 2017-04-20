import React from 'react';

import Header from './Header';
import Search from './Search';
import UserList from './UserList';
import InfoMessage from './InfoMessage';
import MembersSelected from './MembersSelected';

const Container = ({
   changeMembersSelected,
   handleSearch,
   hasMemberInSelected,
   handlePagination,
   organizationMembers,
   errorMessage,
   pagination,
   membersSelected,
   totalPrice,
   isFetching
}) => (

  <div className="App">

    <Header/>

    <div className="content">
      <Search handleSearch={handleSearch}/>

      {isFetching && <div className="loader"></div>}

      {(!!organizationMembers && !errorMessage && !isFetching) &&
        <UserList
          members={organizationMembers}
          changeMembersSelected={(member) => ( changeMembersSelected(member) )}
          hasMemberInSelected={(member) => ( hasMemberInSelected(member) )}
          pagination={pagination}
          handlePagination={(page) => ( handlePagination(page) )}
        />
      }

      {(!organizationMembers && !errorMessage && !isFetching)  &&
        <InfoMessage icon="ion-ios-help-outline">Para iniciar as compras, você precisa buscar por alguma organização presente no Github.</InfoMessage>
      }

      {(!!errorMessage && !isFetching) &&
        <InfoMessage icon="ion-close-circled">Ops aconteceu algum erro! Por favor, verifique se o nome da organização é válido!</InfoMessage>
      }

      {!!membersSelected.length &&
        <MembersSelected members={membersSelected} totalPrice={totalPrice}/>
      }
    </div>

  </div>

);

export default Container;

