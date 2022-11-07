import './results.scss';

const Results = (props) => {
  let {data} = props;
    return (
      <section>
        <pre data-testid='data'>{data ? JSON.stringify(data, undefined, 2) : null}</pre>
      </section>
    );
  }

export default Results;
