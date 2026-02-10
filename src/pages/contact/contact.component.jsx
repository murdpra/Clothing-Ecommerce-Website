import React from 'react';

import './contact.styles.scss';

const ContactPage = () => (
  <div className='contact-page'>
    <h2 className='title'>Contact Us</h2>
    <div className='contact-details'>
      <p>Have questions? We'd love to hear from you.</p>
      <div className='info-group'>
        <h3>Email</h3>
        <p>support@clothing.com</p>
      </div>
      <div className='info-group'>
        <h3>Phone</h3>
        <p>+1 (123) 123-4567</p>
      </div>
      <div className='info-group'>
        <h3>Address</h3>
        <p>123 Fashion Street,<br/>New York, NY 10001</p>
      </div>
    </div>
  </div>
);

export default ContactPage;
