import { useState, useEffect } from "react"

const useFetchingData = ({ api, method, url, data = null, config = null }) => {
    const [response, setResponse] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    let dataCenter = {}

    useEffect(() => {
        (async () => {
            try {
                api[method](url, JSON.parse(config), JSON.parse(data))
                    .then(res => {
                        setResponse(res.data)
                        setIsLoading(true)
                    })
            } catch (err) {
                setError(err.message)
            } finally {
                setIsLoading(false)
            }
        })();
    }, [api, method, url, data, config])

    dataCenter = { response, error, isLoading }
    return dataCenter
}

export default useFetchingData
