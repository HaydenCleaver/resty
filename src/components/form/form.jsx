import {useState} from 'react';
import './form.scss';

const Form = (props) => {

  let {handleApiCall} = props;

  const [restMethod, setRestMethod] = useState('');
  const [queryUrl, setQueryUrl] = useState('');
  const [obj, setObj] = useState({});

  const handleSubmit = e =>{
    e.preventDefault();
    const formData = {
      method: restMethod,
      url: queryUrl,
      obj: obj,
      // https://pokeapi.co/api/v2/pokemon
    };
    handleApiCall(formData);
  }

  const handleRestMethod = e => {
    e.preventDefault();
    setRestMethod(e.target.id);
 
    }

    return (
      <>
        <form onSubmit={handleSubmit}>
          <label >
            <span>URL: </span>
            <input name='url' type='text' onChange={(e) => setQueryUrl(e.target.value)}/>
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
            restMethod === 'post' || restMethod === 'put'?
            <textarea name='json-field' onChange={(e) => setObj(e.target.value)}/> : null
            }
          </label>
        </form>
      </>
    );
  }

export default Form;
