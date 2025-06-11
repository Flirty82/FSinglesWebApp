import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Shield, MessageCircle } from 'lucide-react';

export default function HomePage() {
    return (
        <div className="max-w-6xl mx-auto">
            <section className="text-center py-20">
                <h1 className="text-5xl font-bold text-gray-900 mb-6">
                    Find your perfect match!</h1>
                <p className="text-xl text-gray-600 mb-8">
                    Join thousands of other singles looking to meet, flirt, and connect
                </p>
                <Link
                    to-"/signup"
                className="bg-rose-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-rose-600 transition-colors"
                Start Your Journey
            </section>


            <section className="grid md:grid-cols-3 gap-8 py-16">
                <div className="text-center p-6">
                    <Heart className="w-12 h-12 text-rose-500 mx-auto mb-3" />
                    <h3 className="text-xl font-semibold mb-2">Matches</h3>
                    <p className="text-gray-600">
                        Find compatible matches based on your preferences.
                    </p>
                </div>
                <div className="text-center p-6">
                    <Shield className="w-12 h-12 text-rose-500 mx-auto mb-4" />
                    <p classname="text-gray-600">
                        Your privacy and security are our top priority!
                    </p>
                </div>
                <div className="text-center p-6">
                    <MessageCircle className="w-12 h-12 text-rose-500 mx-auto mb-4" />
                    <p classname="text-gray-600">
                        Connect with genuine people</p>
                </div>
            </section>

            <section className="py-16">
                <h2 className="text-3l font-bold text-center mb-12">Membership Plans</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-white p-8 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-4">Free</h3>
                        <p className="text-3xl font-bold mb-4">$0<HTMLSpanElement
                            className="text-lg text-gray-500">/month</HTMLSpanElement>
                        </p>
                        <ul className="space-y-2 mb-8">
                            <li> Create a profile/account</li>
                            <li>Browse other singles/profiles</li>
                            <li>Upload and share photos</li>
                            <li>24/7 Customer Support</li>
                            <li>Weekly dating tips/advice</li>
                            <li>Free online dating safety booklet</li>
                            <li>View activity feed view other posts and content shared by members limited access                            </li>
                        </ul>
                        <Link
                            to="/register"
                            className="block text-center bg-gray-100 text-gray-800 px-6 py-2 rounded-full hover:bg-gray-200">
                            Signup
                        </Link>
                    </div>

                    <div className="bg-rose-50 p-8 rounded-lg shadow-md transform scale-105">
                        <div classNmae="absolute-top-4 left-1/2 transform-translate-x-1/2">
                            <span className="bg-rose-500 text-white px-4 py-1 rounded-full text-sm">
                                Most Popular
                            </span>
                        </div>
                        <h3 className="text-xl font-semibold mb-4">Gold</h3>
                        <p className="text-3xl font-bold mb-4">$25
                            <span className="text-lg text-gray=500">/month</span>
                        </p>
                        <ul className="space-y-2 mb-8">
                            <li>Benefits from free membership</li>
                            <li>Upload and share videos</li>
                            <li>Create video profiles</li>
                            <li>Unlimited messaging</li>
                            <li>Unlocks chat rooms limited access</li>
                            <li>Send/receive Flirts Flirt with other members!</li>
                            <li>Unlocks Activity Feed limited access: create unlimited text posts</li>
                            <li>Subscribe to our monthly newsletter</li>

                        </ul>
                        <Link
                            to="/register"
                            className="block text-center bg-rose-500 text-white px-6 py-2 rounded-full hover:bg-rose-600">
                            Gold Member
                        </Link>
                    </div>

                    <div className="bg-white p-8 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-4">Platinum</h3>
                        <p className="text-3xl font-bold mb-4">$35
                            <span className="text-lg text-gray-500">/month</span>
                            <ul className="space-y-2 mb-8">
                                <li>Benefits from free and gold memberships</li>
                                <li>Send and receive Invites</li>
                                <li>Subscribe to our yearly newsletter for updates on what's new inluding
                                    new features coming soon!
                                </li>
                                <li>Unlocks music feature download and listen to your fav jamz,
                                    share them with other members, create playlists and more!
                                </li>
                                <li>Unlocks all chat rooms</li>
                                <li>Create new chat rooms and topics</li>
                                <li>All platinum and diamond members get first access to all new services,
                                    products, and features before they hit the app or website!
                                </li>
                                <li>Unlocks Activity Feed: Create unlimited posts and share unlimited
                                    photos, videos, and other content limited likes and commenting!
                                </li>
                            </ul>
                            <Link
                                to="/register"
                                className="block text-center bg-gray-100 text-gray-800 px-6 py-2 rounded-full hover:bg-gray-200">
                                Platinum Membership
                            </Link>
                        </p>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-md">
                    <h3 className="text-3xl font-bold mb-4">Diamond
                    </h3>
                    <p className="text-3xl font-bold mb-4">$55
                        <span className="text-lg text-gray-500">/month</span>
                    </p>
                    <ul className="space-y-2 mb-8">
                        <li>Benefits from free, gold, and platinum memberships</li>
                        <li>Full unlimited access to all features!</li>
                        <li>Unlocks full feedback feature watch your ideas come to life!</li>
                        <li>Unlocks virtual dating interact with others via real experience virtual
                            games/activities for couples and groups!
                        </li>
                        <li>Activity Feed: Unlimited access to the Flirting Singles Activity Feed:
                            unlimited posting, likes, commenting/replying, and so much more!!!
                        </li>
                    </ul>
                </div>
            </section>
        </div>
    );
}