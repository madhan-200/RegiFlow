import React from 'react';
import Lottie from 'lottie-react';

const LottieAnimation = ({ animationData, url, className }) => {
    const [animation, setAnimation] = React.useState(null);

    React.useEffect(() => {
        if (url) {
            fetch(url)
                .then(response => response.json())
                .then(data => setAnimation(data))
                .catch(err => console.error("Error loading Lottie animation:", err));
        } else if (animationData) {
            setAnimation(animationData);
        }
    }, [url, animationData]);

    if (!animation) return <div className={`animate-pulse bg-gray-200 rounded ${className}`}></div>;

    return <Lottie animationData={animation} className={className} loop={true} />;
};

export default LottieAnimation;
