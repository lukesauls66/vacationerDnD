import './LandingPage.css';
import SpotDetails from '../SpotsDetails/SpotDetails';


function LandingPage() {
    

    return (
        <div className='landing-page'>
            <h1>Welcome to WaterBnB</h1>
            <SpotDetails />
        </div>
    );
}

export default LandingPage;