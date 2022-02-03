import React from 'react';
import Header from './Component/Header/Header';
import Progressbar from './Component/Progressbar/progressbar';
import Info from './Component/Info/Info';
import SelectQuestion from './Component/SelectQuestion/SelectQuestion';
import ShowQuestion from './Component/ShowQuestion/ShowQuestion';

function Dashboard() {
    return <>
        <Header/>
        <Progressbar/>
        <div className="restbody">
            <Info/>
            <div className="bodypart">
                <SelectQuestion/>
                <ShowQuestion/>
            </div>
        </div>
    </>
}

export default Dashboard;
