import React, { useState, useEffect, Fragment } from 'react'
import { Helmet } from 'react-helmet'
import IntlMessage from '../../../../helpers/IntlMessages'

const General = () => {
    return (
        <Fragment>
            <IntlMessage id="general">
                {
                    msg => (
                        <Helmet>
                            <title>{msg}</title>
                        </Helmet>
                    )
                }
            </IntlMessage>

            <span>General</span>

        </Fragment>
    )
}

export default General