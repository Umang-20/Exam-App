import StartingPageContent from '../components/StartingPage/Welcomepage';
import {useSelector} from "react-redux";
import Loader from "../components/Loader/Loader";
import Spinner from "../components/Spinner/Spinner"

const HomePage = () => {
  const {loading} = useSelector((State=>State.user));
  // console.log("load",loading)
  return(
      <>
        {
          loading?<div style={{display:"flex",justifyContent:"center",alignItems:"center",width:"100wh",height:"80vh"}}><Loader/></div>:
              <StartingPageContent />
        }
      </>
  );
};

export default HomePage;
