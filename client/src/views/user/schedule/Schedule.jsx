import React, { useState, useEffect, Fragment } from 'react'
import { Helmet } from 'react-helmet'
import IntlMessage from '../../../helpers/IntlMessages'

const Schedule = () => {
    return (
        <Fragment>
            <IntlMessage id="schedule">
                {
                    msg => (
                        <Helmet>
                            <title>{msg}</title>
                        </Helmet>
                    )
                }
            </IntlMessage>

            <span>Schedule</span>

        </Fragment>
    )
}

export default Schedule