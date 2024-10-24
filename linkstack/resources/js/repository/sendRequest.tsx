import { useEffect, useState } from "react"
import axios from "axios"

const baseURL = process.env.MIX_SERVICE_ENDPOINT;
const apiURL = `${baseURL || window.location.origin}`;

type methodType = "get" | "post" | "patch" | "delete";

export default function useFetch(
    method: methodType,
    url: string | { base: string; path: string; contentType: string },
    body?: any,
    params?: any,
    config?: any
){
    const [data, setData] = useState({})
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        (
            async function(){
                try{
                    setLoading(true)
                    const response = await axios({
                        method,
                        url: `${apiURL}/${url}`,
                        data: body,
                        // timeout: 3 * 60 * 1000,
                        params,
                        headers: {
                          "Content-Type": "application/json; charset=utf-8",
                          "Access-Control-Allow-Origin": "*",
                          "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
                        },
                      })
                    setData(response.data)
                }catch(err :any){
                    setError(err)
                }finally{
                    setLoading(false)
                }
            }
        )()
    }, [url])

    return { data, error, loading }

}