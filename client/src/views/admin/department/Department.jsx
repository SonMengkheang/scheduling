import React, { useState, useEffect, Fragment } from 'react'
import { Helmet } from 'react-helmet'
import IntlMessage from '../../../helpers/IntlMessages'

const Department = () => {
    return (
        <Fragment>
            <IntlMessage id="department">
                {
                    msg => (
                        <Helmet>
                            <title>{msg}</title>
                        </Helmet>
                    )
                }
            </IntlMessage>

            <span>Department</span>

        </Fragment>
    )
}

export default Department