import { Position } from '../types/types';
import { useState, useEffect } from 'react';

const useLocation = () => {
    const [position, setPosition] = useState<Position>();
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        const geo = window.navigator.geolocation;

        const onChange = (pos: any) => {
            setPosition({x: pos.coords.latitude, y: pos.coords.longitude})
        }

        const onError = () => {
            setError(true)
        }
        
        if (!geo) {
            setError(true)
            return;
        }

        const watcher = geo.watchPosition(onChange, onError);

        return () => geo.clearWatch(watcher)
    }, []);

    return { ...position, error };
}

export { useLocation }