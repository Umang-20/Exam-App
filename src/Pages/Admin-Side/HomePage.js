import StartingPageContent from '../../Components/Admin-Side/StartingPage/Welcomepage';
import {useSelector} from "react-redux";
import Loader from "../../Components/Common-Component/Loader/Loader";

const HomePage = () => {
  const {loading} = useSelector((State=>State.user));

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
