import React, { useState, useEffect, Fragment } from 'react'
import { Helmet } from 'react-helmet'
import IntlMessage from '../../../helpers/IntlMessages'

const Subject = () => {
    return (
        <Fragment>
            <IntlMessage id="subject">
                {
                    msg => (
                        <Helmet>
                            <title>{msg}</title>
                        </Helmet>
                    )
                }
            </IntlMessage>

            <span>Subject</span>

        </Fragment>
    )
}

export default Subject