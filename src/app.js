import React from 'react';
import axios from 'axios';
import {useState} from 'react';

import './app.scss';

// Let's talk about using index.js and some other name in the component folder
// There's pros and cons for each way of doing this ...
import Header from './components/header/header.jsx';
import Footer from './components/footer/footer.jsx';
import Form from './components/form/form.jsx';
import Results from './components/results/results.jsx';

const App = (props) => {

  let [data, setData] = useState(null);
  const [requestParams, setRequestParams] = useState({});

  const callApi = (requestParams) => {

    if(requestParams.method === 'get'){
      getRequest(requestParams);
    }
    if(requestParams.method === 'post'){
      postRequest(requestParams);
    }
    // if(requestParams.method === 'put'){
    //   putRequest(requestParams);
    // }
    // if(requestParams.method === 'delete'){
    //   deleteRequest(requestParams);
    // }
      console.log(requestParams.url);
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
    await axios.post(params.url, params.obj).then(res=> {
      setData([...res.data, res.data.obj])
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
        <Form handleApiCall={callApi} />
        <Results data={data} />
        <Footer />
      </React.Fragment>
    );
  
}

export default App;
