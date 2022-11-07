import React from 'react';
import axios from 'axios';
import {useState, useEffect, useReducer } from 'react';

import './app.scss';

// Let's talk about using index.js and some other name in the component folder
// There's pros and cons for each way of doing this ...
import Header from './components/header/header.jsx';
import Footer from './components/footer/footer.jsx';
import Form from './components/form/form.jsx';
import History from './components/history/history.jsx';
import Results from './components/results/results.jsx';


const initialState = {
  data: null,
  requestParams: null,
  queryHistory: [],
};

export function appReducer (state, action){
  const { payload, props } = action;
  let newState = {...state};
  newState[props] = payload;
  return newState;
}

const App = () => {

  let [state, dispatch] = useReducer(appReducer, initialState);

  const {data, requestParams, queryHistory} = state;

  const setData = (payload) => dispatch({props: 'data', payload});

  const setHistory = (payload) => {
    dispatch({props: 'queryHistory', payload: [...queryHistory, payload]});
  }



  const queryParams = (payload) => {
    dispatch ({
      props: 'requestParams', payload
    })

    callApi(payload);
  }

  const callApi = async (requestParams) => {

      if(requestParams.method === 'get'){
        getRequest(requestParams);
      }

      if(requestParams.method === 'post'){
        postRequest(requestParams);
      }

    }

  async function getRequest(params){
     await axios.get(params.url).then(res => {
      setData(res.data);
      setHistory({data: res.data.restData, params});
    })
    .catch(err => {
      let message = `${err.response.data.error}. ${err.message} ${err.code}.`;
      console.log(message);
    });
  }

  async function postRequest(params){
    await axios.post(params.url, params.body).then(res=> {
      setData([...res.data, res.data.body])
      setHistory({data: res.data, params});
    })
    .catch(err => {
      let message = `${err.response.data.error}. ${err.message} ${err.code}.`;
      console.log(message);
    });
  }
  
    return (
      <React.Fragment>
        <Header />
        <div>Request Method: {requestParams?.method}</div>
        <div>URL: {requestParams?.url}</div>
        {/* <Form/> */}
        <Form handleApiCall={queryParams} />
        <Results data={data} />
        <History queryHistory={queryHistory}/>
        <Footer />
      </React.Fragment>
    );
  
}

export default App;
