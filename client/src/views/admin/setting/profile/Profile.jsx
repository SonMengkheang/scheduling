import React, { useState, useEffect, Fragment } from 'react'
import { Helmet } from 'react-helmet'
import IntlMessage from '../../../../helpers/IntlMessages'

const Profile = () => {
    return (
        <Fragment>
            <IntlMessage id="profile">
                {
                    msg => (
                        <Helmet>
                            <title>{msg}</title>
                        </Helmet>
                    )
                }
            </IntlMessage>

            <span>Profile</span>

        </Fragment>
    )
}

export default Profile