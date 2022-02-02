import StartingPageContent from '../components/StartingPage/Welcomepage';
import {useSelector} from "react-redux";
import Spinner from "../components/Spinner/Spinner";

const HomePage = () => {
  const {loading} = useSelector((State=>State.user));
  console.log("load",loading)
  return(
      <>
        {
          loading?<Spinner/>:
              <StartingPageContent />
        }
      </>
  );
};

export default HomePage;
