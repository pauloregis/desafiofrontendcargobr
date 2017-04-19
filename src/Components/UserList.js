import React, { Component } from 'react';

import UserItem from './UserItem';
import Pagination from './Pagination';

class UserList extends Component {

  toggle(member) {
    this.props.usersSelectedChange(member);
  }

  hasMemberInSelected(member) {
    return this.props.hasMemberInSelected(member);
  }

  render() {
    return (
      <div>
        <ul className="user_list">
          {
            this.props.members.map(( member, index ) => (
              <UserItem member={member} key={index} onToggle={this.toggle.bind(this, member)} isChecked={this.hasMemberInSelected(member)}/>
            ))
          }
        </ul>
        {this.props.total > 1 &&
          <Pagination total={this.props.total} activePage={this.props.page} onClick={this.props.handlePagination} />
        }
      </div>
    );
  }
}

export default UserList;