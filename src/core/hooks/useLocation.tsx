import { Position } from '../types/types';
import { useState, useEffect } from 'react';

const useLocation = () => {
    const [position, setPosition] = useState<Position>();
    const [error, setError] = useState<string>();

    useEffect(() => {
        const geo = window.navigator.geolocation;

        const onChange = (pos: any) => {
            setPosition({x: pos.coords.latitude, y: pos.coords.longitude})
        }

        const onError = () => {
            setError('Error in getting geolocation')
        }
        
        if (!geo) {
            setError('Geolocation is not supported by browser')
            return;
        }

        const watcher = geo.watchPosition(onChange, onError);

        return () => geo.clearWatch(watcher)
    }, []);

    return { ...position, error };
}

export { useLocation }