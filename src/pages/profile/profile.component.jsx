import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { Redirect } from 'react-router-dom';

import './profile.styles.scss';

const ProfilePage = ({ currentUser }) => {
    if (!currentUser) {
        return <Redirect to='/signin' />;
    }

    const { displayName, email, createdAt } = currentUser;

    return (
        <div className='profile-page'>
            <h2 className='title'>My Profile</h2>
            <div className='profile-details'>
                <div className='detail-group'>
                    <span className='label'>Name:</span>
                    <span className='value'>{displayName}</span>
                </div>
                <div className='detail-group'>
                    <span className='label'>Email:</span>
                    <span className='value'>{email}</span>
                </div>
                {createdAt && (
                    <div className='detail-group'>
                        <span className='label'>Member Since:</span>
                        <span className='value'>{new Date(createdAt.seconds * 1000).toLocaleDateString()}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
});

export default connect(mapStateToProps)(ProfilePage);
