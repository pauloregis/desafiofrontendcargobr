import React, { Component } from 'react';

class UserItem extends Component {
  render() {
    const { public_repos,followers, following  } = this.props.member;

    const calculatePrice = () => {
      return public_repos * 3 + followers * 5 + following * 1;
    };

    return (
      <li className="user_item" onClick={this.props.onToggle}>
        <div className="user_item__checkbox">
          <div className="checkbox">
            <input type="checkbox" checked={this.props.isChecked} onChange={this.props.onToggle}/>
            <label></label>
          </div>
        </div>
        <div className="user_item__box1">
          <div className="user_item__avatar">
            <img src={this.props.member.avatar_url} alt=""/>
          </div>
          <div className="user_item__username">{this.props.member.login}</div>
        </div>
        <div className="user_item__box2">
          <div className="user_item__more_info">
            <ul>
              <li><span className="user_item__more_info__label">Repositórios</span><span className="user_item__more_info__value"><i className="ion-cube"></i> {public_repos}</span></li>
              <li><span className="user_item__more_info__label">Seguidores</span><span className="user_item__more_info__value"><i className="ion-reply"></i> {followers}</span></li>
              <li><span className="user_item__more_info__label">Seguindo</span><span className="user_item__more_info__value"><i className="ion-forward"></i> {following}</span></li>
              <li className="user_item__price"><span className="user_item__more_info__label_price">Preço</span><span className="user_item__more_info__value_price"><i className="ion-social-octocat"></i> {calculatePrice()} octocats</span></li>
            </ul>
          </div>
        </div>
      </li>
    );
  }
}

export default UserItem;