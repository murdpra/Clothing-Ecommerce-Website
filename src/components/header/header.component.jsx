import React from 'react';
import './header.styles.scss';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { Link, useHistory } from 'react-router-dom';

import { auth } from '../../firebase/firebase.utils';
import { connect } from 'react-redux';
import { clearCart } from '../../redux/cart/cart.actions';

import { useContext } from 'react';
import { ThemeContext } from '../../contexts/theme.context';

const Header = ({ currentUser, hidden, clearCart }) => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const history = useHistory();

    const handleSignOut = async () => {
        clearCart();
        await auth.signOut();
        history.push('/');
    };
    
    return (
    <div className='header'>
        <Link className='logo-container' to='/'>
            <div className='logo-text'>
                <span className='brand-name'>P.M. Signature</span>
                <span className='tagline'>Wear Your Confidence</span>
            </div>
        </Link>
    <div className='options'>
        <Link className='option' to='/shop'>
            SHOP
        </Link>
        <Link className='option' to='/contact'>
            CONTACT
        </Link>
        {
            currentUser ?
            (<div className='option' onClick={handleSignOut}>
                SIGN OUT
            </div>)
            :
            (<Link className='option' to='/signin'>
                SIGN IN
            </Link>)
        }
        {
            currentUser ?
            (<Link className='option' to='/orders'>
                ORDERS
            </Link>)
            : null
        }
        {
            currentUser ?
            (<Link className='option' to='/profile'>
                PROFILE
            </Link>)
            : null
        }
        <div className='option' onClick={toggleTheme} style={{cursor: 'pointer'}}>
            {theme === 'light' ? '🌙 DARK' : '☀️ LIGHT'}
        </div>
        <CartIcon />
    </div>
    {hidden ? null : <CartDropdown />}
  </div>
)};

const mapStateToProps = ({user : { currentUser}, cart: { hidden }}) => ({
    currentUser,
    hidden
});

const mapDispatchToProps = dispatch => ({
    clearCart: () => dispatch(clearCart())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);