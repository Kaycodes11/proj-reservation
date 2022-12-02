import React from "react";
import axios from 'axios';

export default function useFetch(url) {
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);

    React.useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const result = await axios.get(url);
                setData(result.data);
            } catch (e) {
                setError(true);
            }
            // by now it came here "either try and catch block" has done so loading should be false now
            setLoading(false);
        };
        fetchData(url);
    }, [url]);

    const reFetch = async () => {
        setLoading(true);
        try {
            const res = await axios.get(url);
            setData(res.data);
        } catch (err) {
            setError(err);
        }
        setLoading(false);
    };

    return {data, loading, error, reFetch}
}