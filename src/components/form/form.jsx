import {useReducer} from 'react';
import './form.scss';

import { appReducer } from '../../app';

const initialState = {
  restData: {
    method: '',
    url: '',
    body: {},

  }
}

const Form = ({handleApiCall}) => {

  let [state, dispatch] = useReducer(appReducer, initialState);

  const { restData } = state;

  const setRestData = (payload) => dispatch ({props: 'restData', payload});

  const handleSubmit = e =>{
    e.preventDefault();
    handleApiCall(restData);
  }

  const handleRestMethod = e => {
    e.preventDefault();
    setRestData({...restData, method: e.target.id});
 
    }

  const handleOnChange = (e) => {
    e.preventDefault();
    setRestData({...restData, url: e.target.value, data: e.target?.data?.value})
  } 

    return (
      <>
        <form onSubmit={handleSubmit}>
          <label >
            <span>URL: </span>
            <input name='url' type='text' onChange={handleOnChange}/>
            <button type="submit">GO!</button>
          </label>
          <label className="methods">
            <span id="get" onClick={handleRestMethod}>GET</span>
            <span id="post" onClick={handleRestMethod}>POST</span>
            <span id="put" onClick={handleRestMethod}>PUT</span>
            <span id="delete" onClick={handleRestMethod}>DELETE</span>
          </label>
          <label>
            {
            restData.method === 'post' || restData.method === 'put'?
            <textarea name='json-field' /> : null
            }
          </label>
        </form>
      </>
    );
  }

export default Form;
