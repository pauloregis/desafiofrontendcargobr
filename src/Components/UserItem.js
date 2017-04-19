import React from 'react';

const calculatePrice = ({ public_repos, followers, following }) => {
  return public_repos * 3 + followers * 5 + following * 1;
};

const UserItem = ({ member, onToggle, isChecked }) => (
  <li className="user_item" onClick={onToggle}>
    <div className="user_item__checkbox">
      <div className="checkbox">
        <input type="checkbox" checked={isChecked} onChange={onToggle}/>
        <label></label>
      </div>
    </div>
    <div className="user_item__box1">
      <div className="user_item__avatar">
        <img src={member.avatar_url} alt=""/>
      </div>
      <div className="user_item__username">{member.login}</div>
    </div>
    <div className="user_item__box2">
      <div className="user_item__more_info">
        <ul>
          <li><span className="user_item__more_info__label">Repositórios</span><span className="user_item__more_info__value"><i className="ion-cube"></i> {member.public_repos}</span></li>
          <li><span className="user_item__more_info__label">Seguidores</span><span className="user_item__more_info__value"><i className="ion-reply"></i> {member.followers}</span></li>
          <li><span className="user_item__more_info__label">Seguindo</span><span className="user_item__more_info__value"><i className="ion-forward"></i> {member.following}</span></li>
          <li className="user_item__price"><span className="user_item__more_info__label_price">Preço</span><span className="user_item__more_info__value_price"><i className="ion-social-octocat"></i> {calculatePrice(member)} octocats</span></li>
        </ul>
      </div>
    </div>
  </li>
);

export default UserItem;