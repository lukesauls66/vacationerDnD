import ImageGallery from './ImageGallery';
import './LandingPage.css';

function LandingPage() {
    return (
        <div className='landing-page'>
            <h1>Welcome to WaterBnB</h1>
            <p>Escape to the magical shores of Stardew Valley. Whether you are looking for a rustic cabin by the river or a cozy beach-side retreat, we have the perfect spot for your next adventure!</p>
            <div className='landing-buttons'>
                <button onClick={() => alert('Explore more features!')}>Explore</button>
                <button onClick={() => alert('Sign up now!')}>Sign Up Now!</button>
            </div>
        </div>
    );
}

export default LandingPage;