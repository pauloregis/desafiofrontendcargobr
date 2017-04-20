import React, { Component } from 'react';
import './App.css';
import ajax from '@fdaciuk/ajax';
import calculatePrice from './utils/calculate-price';

import  Container from './Components/Container';

class App extends Component {
  constructor() {
    super();
    this.state = {
      organization: '',
      organizationMembers: null,
      isFetching: false,
      membersSelected: [],
      pagination: {
        total: 1,
        page: 1
      },
      totalPrice: 0,
      errorMessage: false
    };

    this.perPage = 6;
  }

  getGithubApiUrl( organization, { login }, page = 1 ) {
    const headUrl = 'https://api.github.com';
    const clientId = '99fae28175910cb96014';
    const clientSecret = '7bd0aac72449683ab2eac0ca324a15bb6d05864d';
    const tailUrl = `?client_id=${clientId}&client_secret=${clientSecret}&per_page=${this.perPage}&page=${page}`;

    return organization ?
      `${headUrl}/orgs/${organization}/members${tailUrl}` :
      `${headUrl}/users/${login}${tailUrl}`;
  }

  mapOrganizationMembers( members ) {
    const newMembers = this.state.organizationMembers.slice();

    members.forEach((member) => {
      ajax().get(this.getGithubApiUrl('', member))
        .then((result) => {
          newMembers.push(result);
          this.setState({
            organizationMembers: newMembers
          });
        });
    });
  }

  getOrganizationMembers( organization, page = 1 ) {
    ajax().get(this.getGithubApiUrl(organization, {}, page))
      .then((result, xhr) => {
        const linkHeader = xhr.getResponseHeader('Link') || '';
        const totalPagesMatch = linkHeader.match(/&page=(\d+)>; rel="last"/);

        this.mapOrganizationMembers(result);

        this.setState({
          pagination: {
            total: totalPagesMatch ? +totalPagesMatch[1] : this.state.pagination.total,
            page: page
          },
          organization: organization
        });
      })
      .catch(() => {
        this.setState({
          errorMessage: true
        });
      })
      .always(() => {
        this.setState({
          isFetching: false
        });
      });
  }

  handleSearch( e ) {
    const keyCode = e.which || e.keyCode;
    const ENTER = 13;
    const organization = e.target.value;

    if (ENTER === keyCode) {
      this.setState({
        isFetching: true,
        pagination: {
          total: 1,
          page: 1
        },
        organizationMembers: [],
        errorMessage: false
      });
      this.getOrganizationMembers(organization);
    }
  }

  handlePagination( page ) {
    const organization = this.state.organization;

    this.setState({ isFetching: true, organizationMembers: [] });
    this.getOrganizationMembers(organization, page)
  }

  changeMembersSelected( member ) {
    let membersSelected = this.state.membersSelected.slice();
    let totalPrice = this.state.totalPrice;

    if( !this.hasMemberInSelected(member) ) {
      membersSelected.push(member);
      totalPrice += calculatePrice(member);
    } else {
      membersSelected = membersSelected.filter((memberSelected) => {
        return member.id !== memberSelected.id;
      });
      totalPrice -= calculatePrice(member);
    }

    this.setState({ membersSelected: membersSelected, totalPrice: totalPrice });
  }

  hasMemberInSelected( member ) {
    let membersSelected = this.state.membersSelected.slice();

    return membersSelected.some((memberSelected) => {
      return member.id === memberSelected.id;
    });
  }

  render() {
    return (
      <Container
        {...this.state}
        handleSearch={(e) => this.handleSearch(e)}
        changeMembersSelected={(member) => ( this.changeMembersSelected(member) )}
        hasMemberInSelected={(member) => ( this.hasMemberInSelected(member) )}
        handlePagination={(page) => ( this.handlePagination(page) )}
      />
    );
  }
}

export default App;
