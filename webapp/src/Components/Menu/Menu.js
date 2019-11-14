import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { InputGroup, InputGroupAddon, Button } from 'reactstrap';
import BurgerButton from './BurgerButton';
import InfoHeader from './InfoHeader';
import SearchBar from './SearchBar';
import Channel from '../Channel';
import {
  MenuListElements,
  CreateChannelForm,
  GlobalInput,
  LeftNavbar,
  Navbar,
  RouteLink,
  NavbarLinks,
} from '../StyledComponents/Menu.style';

class Menu extends React.Component {
  // On créer un état qui (ici) est un booléen false pour le moment car un état doit changer par la suite
  state = {
    isOpenMenu: false,
    channels: [],
    nameChannels: '',
    shouldRefreshChannels: false,
    channelId: '',
  };

  componentDidMount() {
    this.getChannels();
  }

  componentDidUpdate() {
    if (this.state.shouldRefreshChannels) {
      this.getChannels();
    }
  }

  getNameChannels = e => {
    this.setState({
      nameChannels: [e.target.value],
    });
  };

  // On créer une fonction fléchée qui aura pour objectif à son déclenchement de configuré l'état déclaré plus tôt
  toggleIsOpenMenu = () => {
    this.setState({
      // On configure l'état isOpen pour qu'il passe de false à true et de true à false. On fait de lui un toggle
      isOpenMenu: !this.state.isOpenMenu,
    });
  };

  // Fonction qui récupère le nom des channels pour les passer en props au composant Channel
  getChanName = idChan => {
    const res = this.state.channels.map(chan => {
      if (chan.id === parseInt(idChan)) {
        return chan.name;
      }
    });
    return res;
  };

  // Fonction qui récupère les datas des channels
  getChannels = async () => {
    const response = await fetch('/api/channels');
    const { channels } = await response.json();
    this.setState({ channels, shouldRefreshChannels: false });
  };

  postChannels = e => {
    fetch('/api/channels', {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({
        nameChannels: this.state.nameChannels[0],
      }),
    });
    e.preventDefault();
    this.setState({ shouldRefreshChannels: true, nameChannels: '' });
  };

  deleteChannels = channelId => {
    fetch(`/api/channels/${channelId}/`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'DELETE',
    });
    this.setState({ shouldRefreshChannels: true });
  };

  render() {
    //   On créer une constante burgerButton qui vérifie si isOpenMenu est il est égal à true (on set la classe de la balise à 'burger_button open_burger' ) ou si égal à false (on set la classe de la balise à 'burger_button' )
    const burgerButton = this.state.isOpenMenu;

    return (
      <div>
        <Navbar role="navigation">
          {/* On appel le composant BurgerButton et on lui fais passer en paramètre la fonction toggleIsOpenMenu et burgerButton */}
          <BurgerButton
            fonction={this.toggleIsOpenMenu}
            burgerButton={burgerButton}
          />
          {/* si isOpenMenu est égal à true on set la classe à 'is-visible-in-mobile' */}
          <LeftNavbar isOpenMenu={this.state.isOpenMenu}>
            <MenuListElements>
              <InfoHeader />
            </MenuListElements>
            <MenuListElements>
              <SearchBar />
            </MenuListElements>
            <MenuListElements>
              <NavbarLinks href="#">Home</NavbarLinks>
            </MenuListElements>
            <MenuListElements>
              <ul>
                <li>
                  <CreateChannelForm onSubmit={this.postChannels}>
                    <InputGroup>
                      <GlobalInput
                        placeholder="Create channel"
                        type="text"
                        value={this.state.nameChannels}
                        onChange={this.getNameChannels}
                      />
                      <InputGroupAddon addonType="append">
                        <Button className="submit-button" type="submit">
                          Create
                        </Button>
                      </InputGroupAddon>
                    </InputGroup>
                  </CreateChannelForm>
                </li>
                {this.state.channels.map(channel => (
                  <li key={channel.id}>
                    <RouteLink to={`/channels/${channel.id}/messages`}>
                      {channel.name}
                    </RouteLink>
                    <div onClick={() => this.deleteChannels(channel.id)}>X</div>
                  </li>
                ))}
              </ul>
            </MenuListElements>

            <MenuListElements>
              <NavbarLinks href="#">Private messages</NavbarLinks>
            </MenuListElements>
          </LeftNavbar>
        </Navbar>
        <Switch>
          <Route
            path="/channels/:channelId/messages"
            render={props => (
              <Channel
                channelId={props.match.params.channelId}
                chanName={this.getChanName(props.match.params.channelId)}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default Menu;
