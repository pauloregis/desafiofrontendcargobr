import React from 'react';

const MembersSelected = ({ members, totalPrice }) => (
  <div className="selected_items">
    <div className="selected_item__count">
      <div>
        <span>{members.length}</span>
        <span>Membros Selecionados</span>
      </div>
      <div>
        {
          members.map((member, index) => (
            <span className="selected_items__avatar" key={index}><img src={member.avatar_url} alt=""/></span>
          ))
        }
      </div>

    </div>
    <div className="selected_items__action">
      <span>total: <strong><i className="ion-social-octocat"></i> {totalPrice} octacats</strong></span>
      <button>Comprar usuários</button>
    </div>
  </div>
);

export default MembersSelected;