import React, { useState, useEffect, Fragment } from 'react'
import { Helmet } from 'react-helmet'
import IntlMessage from '../../../../helpers/IntlMessages'

const Role = () => {
    return (
        <Fragment>
            <IntlMessage id="role">
                {
                    msg => (
                        <Helmet>
                            <title>{msg}</title>
                        </Helmet>
                    )
                }
            </IntlMessage>

            <span>Role</span>

        </Fragment>
    )
}

export default Role