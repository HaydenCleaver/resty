import { When } from "react-if";


const History = ({queryHistory}) => {
  // let {data} = props;
  return (
    <>
      <section>
        {/* <When condition={data}> */}
        <span>Query History</span>
        <pre data={queryHistory}></pre>
        {/* </When> */}
      </section>
    </>
  )
}

export default History;