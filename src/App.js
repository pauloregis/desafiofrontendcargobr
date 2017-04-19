import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ajax from '@fdaciuk/ajax';

import Search from './Components/Search';
import UserList from './Components/UserList';

class App extends Component {
  constructor() {
    super();
    this.state = {
      organizationMembers: null,
      isFetching: false,
      itemsSelected: [],
      pagination: {
        total: 1,
        page: 1
      },
      organization: '',
      totalPrice: 0
    };

    this.perPage = 6;
  }

  getGithubApiUrl( organization, page = 1 ) {
    return `https://api.github.com/orgs/${organization}/members?client_id=99fae28175910cb96014&client_secret=7bd0aac72449683ab2eac0ca324a15bb6d05864d&per_page=${this.perPage}&page=${page}`;
  }

  getMembers( members ) {
    members.forEach((member) => {
      ajax().get(`https://api.github.com/users/${member.login}?client_id=99fae28175910cb96014&client_secret=7bd0aac72449683ab2eac0ca324a15bb6d05864d`)
        .then((result) => {
          let newMembers = this.state.organizationMembers;
          newMembers.push(result);

          this.setState({
            organizationMembers: newMembers
          });

        });
    });
  }

  handleSearch(e, page = 1) {
    const keyCode = e.which || e.keyCode;
    const ENTER = 13;
    const organization = e.target.value;

    if (ENTER === keyCode) {
      this.setState({
        isFetching: true,
        pagination: {
          total: 1,
          page: 1
        }
      });
      ajax().get(this.getGithubApiUrl(organization, page))
        .then((result, xhr) => {
          const linkHeader = xhr.getResponseHeader('Link') || '';
          const totalPagesMatch = linkHeader.match(/&page=(\d+)>; rel="last"/);

          this.setState({
            organizationMembers: [],
            pagination: {
              total: totalPagesMatch ? +totalPagesMatch[1] : this.state.pagination.total,
              page: page
            },
            organization: organization
          });
          this.getMembers(result);
        })
        .always(() => {
          this.setState({
            isFetching: false
          });
        });

    }
  }

  calculatePrice( { public_repos, followers, following } ) {
    return public_repos * 3 + followers * 5 + following * 1;
  }

  usersSelectedChange( member ) {
    let membersSelected = this.state.itemsSelected.slice();
    let totalPrice = this.state.totalPrice;

    if( !this.hasMemberInSelected(member) ) {
      membersSelected.push(member);
      totalPrice += this.calculatePrice(member);
    } else {
      membersSelected = membersSelected.filter((memberSelected) => {
        return member.id !== memberSelected.id;
      });
      totalPrice -= this.calculatePrice(member);
    }

    this.setState({ itemsSelected: membersSelected, totalPrice: totalPrice });
  }

  hasMemberInSelected( member ) {
    let membersSelected = this.state.itemsSelected.slice();

    return membersSelected.some((memberSelected) => {
      return member.id === memberSelected.id;
    });
  }

  handlePagination(page) {
    this.setState({
      isFetching: true
    });
    ajax().get(this.getGithubApiUrl(this.state.organization, page))
      .then((result, xhr) => {
        const linkHeader = xhr.getResponseHeader('Link') || '';
        const totalPagesMatch = linkHeader.match(/&page=(\d+)>; rel="last"/);

        this.setState({
          organizationMembers: [],
          pagination: {
            total: totalPagesMatch ? +totalPagesMatch[1] : this.state.pagination.total,
            page: page
          }
        });
        this.getMembers(result);
      })
      .always(() => {
        this.setState({
          isFetching: false
        });
      });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>DevShop</h2>
        </div>
        <div className="content">
          <Search handleSearch={(e) => this.handleSearch(e)}/>
          {!!this.state.organizationMembers &&
            <div>
              <p className="help_info"><i className="ion-ios-help"></i><span>Selecione os membros que você deseja adquirir</span></p>
              <UserList
                members={this.state.organizationMembers}
                usersSelectedChange={this.usersSelectedChange.bind(this)}
                hasMemberInSelected={this.hasMemberInSelected.bind(this)}
                total={this.state.pagination.total}
                page={this.state.pagination.page}
                handlePagination={(page) => ( this.handlePagination(page) )}
              />
            </div>
          }

          {!this.state.organizationMembers &&
            <div className="help">
              <i className="ion-ios-help-outline"></i>
              <p>Para iniciar as compras, você precisa buscar por alguma organização presente no Github.</p>
            </div>
          }

          {!!this.state.itemsSelected.length &&
            <div className="selected_items">
              <div className="selected_item__count">
                <div>
                  <span>{this.state.itemsSelected.length}</span>
                  <span>Membros Selecionados</span>
                </div>
                <div>
                  {
                    this.state.itemsSelected.map((member, index) => (
                      <span className="selected_items__avatar" key={index}><img src={member.avatar_url} alt=""/></span>
                    ))
                  }
                </div>

              </div>
              <div className="selected_items__action">
                <span>total: <strong><i className="ion-social-octocat"></i> {this.state.totalPrice} octacats</strong></span>
                <button>Comprar usuários</button>
              </div>
            </div>
          }

        </div>
      </div>
    );
  }
}

export default App;
