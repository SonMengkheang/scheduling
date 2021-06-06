import React, { useState, useEffect, Fragment } from 'react'
import { Helmet } from 'react-helmet'
import IntlMessage from '../../../helpers/IntlMessages'

const Year = () => {
    return (
        <Fragment>
            <IntlMessage id="year">
                {
                    msg => (
                        <Helmet>
                            <title>{msg}</title>
                        </Helmet>
                    )
                }
            </IntlMessage>

            <span>Year</span>

        </Fragment>
    )
}

export default Year