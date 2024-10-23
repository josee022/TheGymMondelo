import React from 'react';
import { FaRunning, FaDumbbell } from 'react-icons/fa';
import { FiHeart, FiCheckCircle } from 'react-icons/fi';

export default function ProgIconos() {
    return (
        <div className="flex justify-center space-x-6 text-4xl text-white mt-16">
            <FaRunning />
            <FiHeart />
            <FaDumbbell />
            <FiCheckCircle />
        </div>
    );
}
