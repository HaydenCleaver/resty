import React from 'react';
import axios from 'axios';
import {useState, useEffect, useReducer } from 'react';

import './app.scss';

// Let's talk about using index.js and some other name in the component folder
// There's pros and cons for each way of doing this ...
import Header from './components/header/header.jsx';
import Footer from './components/footer/footer.jsx';
import Form from './components/form/form.jsx';
import Results from './components/results/results.jsx';


const initialState = {};

const queryReducer = (queryHistory, action) => {
  return {...queryHistory, query: [...queryHistory, action.payload]}
}

const App = (props) => {

  let [data, setData] = useState(null);
  const [requestParams, setRequestParams] = useState({});

  let [queryHistory, dispatch] = useReducer(queryReducer, initialState);

  const addQuery = () => {
    let action = {
      method: data.method,
      url: data.url,
      body: data.body,
    }
    dispatch(action);
  }

  useEffect(() => {
    if(requestParams.method === 'get'){
      getRequest(requestParams);
      addQuery();
      console.log(queryHistory);
    }
    if(requestParams.method === 'post'){
      postRequest(requestParams);
      addQuery();
      console.log(queryHistory);
    }
    // if(requestParams.method === 'put'){
    //   putRequest(requestParams);
    // }
    // if(requestParams.method === 'delete'){
    //   deleteRequest(requestParams);
    // }
  },[requestParams]);

  const callApi = (requestParams) => {

      console.log(requestParams.body);
      setRequestParams(requestParams);

    }

  async function getRequest(params){
     await axios.get(params.url).then(res => {
      setData(res.data);
    })
    .catch(err => {
      let message = `${err.response.data.error}. ${err.message} ${err.code}.`;
      console.log(message);
    });
  }

  async function postRequest(params){
    await axios.post(params.url, params.body).then(res=> {
      setData([...res.data, res.data.body])
      console.log(data);
    })
    .catch(err => {
      let message = `${err.response.data.error}. ${err.message} ${err.code}.`;
      console.log(message);
    });
  }
  
  // function putRequest(params){

  // }

  // function deleteRequest(params){

  // }

    return (
      <React.Fragment>
        <Header />
        <div>Request Method: {requestParams.method}</div>
        <div>URL: {requestParams.url}</div>
        {/* <Form/> */}
        <Form handleApiCall={callApi} />
        <Results data={data} />
        <Footer />
      </React.Fragment>
    );
  
}

export default App;
