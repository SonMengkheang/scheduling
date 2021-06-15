import React, { useState, useEffect, Fragment } from 'react'
import { Helmet } from 'react-helmet'
import IntlMessage from '../../../helpers/IntlMessages'

const User = () => {
    return (
        <Fragment>
            <IntlMessage id="user">
                {
                    msg => (
                        <Helmet>
                            <title>{msg}</title>
                        </Helmet>
                    )
                }
            </IntlMessage>

            <span>User</span>

        </Fragment>
    )
}

export default User