import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component';
import { selectCartTotal } from '../../redux/cart/cart.selectors';

import './payment.styles.scss';

const PaymentPage = ({ total }) => (
  <div className='payment-page'>
    <h2 className='title'>Payment</h2>
    <div className='payment-container'>
        <p>Please enter your payment details below.</p>
        <p className='total'>Total: ${total}</p>
        <StripeCheckoutButton price={total} />
    </div>
  </div>
);

const mapStateToProps = createStructuredSelector({
  total: selectCartTotal
});

export default connect(mapStateToProps)(PaymentPage);
