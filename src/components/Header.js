import React, { Component } from 'react';
import { Link } from 'react-router';
import HamburgerMenu from 'react-hamburger-menu';
import cssModules from 'react-css-modules';
import headerStyles from '../style/header.css';

@cssModules(headerStyles)
export default class Header extends Component {
  state = {
    open: false
  }

  toggleMenu() {
    this.setState({
      open: !this.state.open
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.refs.mobileMenuContainer) {
      setTimeout(() => {
        this.refs.mobileMenuContainer.style.left = 0;
        this.refs.overlay.style.opacity = 1;
      }, 100);
    }
  }

  render() {
    const { path, styles } = this.props;

    return (
      <div>
        {this.state.open &&
          <div>
            <div
              styleName='mobile-menu-container'
              ref='mobileMenuContainer'
            >
              <div styleName='mobile-menu-icon-inner'>
                <HamburgerMenu
                  isOpen={this.state.open}
                  menuClicked={this.toggleMenu.bind(this)}
                  width={18}
                  height={15}
                  strokeWidth={2}
                  rotate={0}
                  color='#333'
                  borderRadius={0}
                  animationDuration={0.5}
                />
              </div>

              <h2 styleName='mobile-menu-header'>Mud Dohgs</h2>

              <nav styleName='mobile-menu'>
                <ul>
                  <li>
                    <Link
                      to='/'
                      onClick={this.toggleMenu.bind(this)}
                    >
                      Schedule
                    </Link>
                  </li>
                  <li>
                    <Link
                      to='/standings'
                      onClick={this.toggleMenu.bind(this)}
                    >
                      Standings
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>

            <div
              styleName='overlay'
              ref='overlay'
              onClick={this.toggleMenu.bind(this)}
            >
            </div>
          </div>
        }

        <div className={styles.navbar}>
          <div styleName='navbar-brand'>
            <Link to='/'>
              <span styleName='navbar-team'>Mud Dohgs</span>
            </Link>

            <span styleName='navbar-section'>
              <Link
                to='/'
                styleName={path === '/' ? 'navbar-link-active' : 'navbar-link'}
              >
                Schedule
              </Link>

              <Link
                to='/standings'
                styleName={path === '/standings' ? 'navbar-link-active' : 'navbar-link'}
              >
                Standings
              </Link>
            </span>

            <div styleName='mobile-menu-icon'>
              <HamburgerMenu
                isOpen={this.state.open}
                menuClicked={this.toggleMenu.bind(this)}
                width={18}
                height={15}
                strokeWidth={2}
                rotate={0}
                color='#bbb'
                borderRadius={0}
                animationDuration={0.5}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
