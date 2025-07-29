import React, { useState } from 'react';
import { calculateAg, calculateDistance } from '../../utils/helpers';

const UserCard = ({ user, onLike, onPass, onSuperLike, currentUser }) => {
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    const [showDetails, setShowDetails] = useState(false);
};

    const age = calculateAge(user.profile.age);
    const distance = calculateDistance(
        currentUser.profile.location.coordinates,
        user.profile.location.coordinates
    );

    const nextPhoto = () => {
        setCurrentPhotoIndex((prev) => prev === user.profile.photos.length - 1 ? 0 : prev + 1);
    };

    const prevPhoto = () => {
        setCurrentPhotoIndex((prev) => 
        prev === 0 ? user.profile.photos.length - 1 : prev - 1);
    };