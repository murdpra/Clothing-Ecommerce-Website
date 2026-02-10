import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { clearCart } from '../../redux/cart/cart.actions';
import { createOrderDocument } from '../../firebase/firebase.utils';

const StripeCheckoutButton = ({ price, currentUser, cartItems, clearCart, history }) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_51KMAU4SJf5Z2n2n2qZ2n2n2qZ2n2n2qZ2n2n2qZ2n2n2qZ2n2n2qZ2n2n2qZ2';

  const onToken = async token => {
    try {
      if (currentUser) {
        await createOrderDocument({
          userId: currentUser.id,
          total: price,
          items: cartItems,
          token
        });
        clearCart();
        alert('Payment Successful');
        history.push('/orders');
      } else {
        alert('Please sign in to place an order.');
        history.push('/signin');
      }
    } catch (error) {
      console.log('Payment Error: ', error);
      alert('There was an issue with your payment. Please make sure you use the provided credit card.');
    }
  };

  return (
    <StripeCheckout
      label='Pay Now'
      name='CRWN Clothing Ltd.'
      billingAddress
      shippingAddress
      image='https://svgshare.com/i/CUz.svg'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  cartItems: selectCartItems
});

const mapDispatchToProps = dispatch => ({
  clearCart: () => dispatch(clearCart())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StripeCheckoutButton));
