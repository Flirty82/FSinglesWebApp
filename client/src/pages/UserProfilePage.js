import React from 'react';
import SideNav from '../components/public/stylesheets/SideNav';
import { User, Camera, Settings, Heart, Users, MessageCircle, MapPin, Calendar, Mail, Phone, Edit3, Save, X, Uplaod, Trash2, Eye, EyeOff, Lock, Bell, Shield, CreditCard } from 'lucide-react';

const Userprofile = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState({
        firstName: 'Autumn',
        lastName: 'Smith',
        email: 'flirtingsingles@gmail.com',
        phone: '+1(501)803-6579',
        dateOfBirth: '1983-01-06',
        location: 'New York, NY',
        bio: 'Coffe enthusiast and cooking',

    })

}