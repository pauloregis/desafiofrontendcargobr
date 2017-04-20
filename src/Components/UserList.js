import React from 'react';

import UserItem from './UserItem';
import Pagination from './Pagination';

const UserList = ({ members, changeMembersSelected, hasMemberInSelected, pagination, handlePagination }) => (
  <div>
    <p className="help_info"><i className="ion-ios-help"></i><span>Selecione os membros que você deseja adquirir</span></p>
    <ul className="user_list">
      {
        members.map((member, index) => {
          const isChecked = hasMemberInSelected( member );

          return (
            <UserItem
              member={member}
              key={index}
              onToggle={changeMembersSelected}
              isChecked={isChecked}
            />
          );
        })
      }
    </ul>

    {pagination.total > 1 &&
      <Pagination total={pagination.total} activePage={pagination.page} onClick={handlePagination}/>
    }
  </div>
);

export default UserList;