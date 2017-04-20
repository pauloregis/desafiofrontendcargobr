import React from 'react';
import calculatePrice from './../utils/calculate-price';

const UserItem = ({ member, isChecked, onToggle }) => {

  const handleChange = () => {
    onToggle( member );
  };

  return (
    <li className="user_item" onClick={handleChange}>
      <div className="user_item__checkbox">
        <div className="checkbox">
          <input type="checkbox" checked={isChecked} onChange={handleChange}/>
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
            <li>
              <span className="user_item__more_info__label">Repositórios</span>
              <span className="user_item__more_info__value"><i className="ion-cube"></i> {member.public_repos}</span>
            </li>
            <li>
              <span className="user_item__more_info__label">Seguidores</span>
              <span className="user_item__more_info__value"><i className="ion-reply"></i> {member.followers}</span></li>
            <li>
              <span className="user_item__more_info__label">Seguindo</span>
              <span className="user_item__more_info__value"><i className="ion-forward"></i> {member.following}</span></li>
            <li className="user_item__price">
              <span className="user_item__more_info__label_price">Preço</span>
              <span className="user_item__more_info__value_price"><i className="ion-social-octocat"></i> {calculatePrice(member)} octocats</span></li>
          </ul>
        </div>
      </div>
    </li>
  );
};

export default UserItem;