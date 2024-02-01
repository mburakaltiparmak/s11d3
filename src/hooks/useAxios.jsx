import { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

/*export const METHODS = {
  POST: 'post',
  GET: 'get',
  PUT: 'put',
  DELETE: 'delete',
};*/
const baseURL = 'https://nextgen-project.onrender.com/api/s11d3';
export const REQ_TYPES = Object.freeze({
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete',
});
const instance = axios.create({
  baseURL,
  timeout: 5000,
  // headers: {'authentication': 'foobar'}
});

export default function useAxios(initialData) {
  const [data, setData] = useState(initialData);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const doRequest = ({ endpoint, reqType, payload }) => {
    setLoading(true);

    const req = reqType ? reqType : REQ_TYPES.GET;

    return instance[req](endpoint, payload)
      .then(function (response) {
        // handle success
        console.log(response);
        setData(response.data);
        return response;
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        setError(error);
      })
      .finally(function () {
        setLoading(false);
        // always executed
      });
  };
  /*
  const history = useHistory();


  const sendRequest = ({
    url,
    method,
    data = null,
    redirect = null,
    callbackSuccess = null,
    callbackError = null,
  }) => {
    setLoading(true);
    console.log(
      'sendRequest starts: ',
      'url: ',
      url,
      'method:  ',
      method,
      'data: ',
      data,
      'sendRequest: ',
      loading
    );
    instance[method](url, data === null ? null : data)
      .then(function (response) {
        setData(response.data);
        setLoading(false);
        setError(null);
        callbackSuccess && callbackSuccess();
        redirect && history.push(redirect);
        console.log('sendRequest response: ', response, 'loadding: ', loading);
      })
      .catch(function (error) {
        console.log('sendRequest error: ', error);
        callbackError && callbackError();
        setError(error.message);
        setLoading(false);
      });
  };
*/
  return { data, REQ_TYPES, setData, error, loading, doRequest };
}
