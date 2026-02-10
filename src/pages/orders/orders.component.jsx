import React from 'react';
import { connect } from 'react-redux';
import { firestore } from '../../firebase/firebase.utils';

import './orders.styles.scss';

class OrdersPage extends React.Component {
  state = {
    orders: []
  };

  componentDidMount() {
    const { currentUser } = this.props;
    if (currentUser) {
      const ordersRef = firestore.collection('users').doc(currentUser.id).collection('orders');
      ordersRef.orderBy('createdAt', 'desc').get().then(snapshot => {
        const ordersList = [];
        snapshot.forEach(doc => {
          ordersList.push({ id: doc.id, ...doc.data() });
        });
        this.setState({ orders: ordersList });
      });
    }
  }

  render() {
    return (
      <div className='orders-page'>
        <h2 className='title'>Your Orders</h2>
        <div className='orders-list'>
          {this.state.orders.length ? (
            this.state.orders.map(order => (
              <div key={order.id} className='order-item'>
                <h3>Order ID: {order.id}</h3>
                <p>Date: {order.createdAt ? order.createdAt.toDate().toLocaleDateString() : ''}</p>
                <p>Total: ${order.total}</p>
                <div className='items'>
                  {order.items.map((item, index) => (
                    <span key={index}>{item.name} x {item.quantity}{index < order.items.length - 1 ? ', ' : ''}</span>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p>You have no orders yet.</p>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(OrdersPage);
