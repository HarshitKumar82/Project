/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  ShoppingBag, 
  MapPin, 
  Star, 
  Clock, 
  ChevronRight, 
  Menu, 
  X,
  Utensils,
  Truck,
  ShieldCheck,
  Smartphone,
  Instagram,
  Phone,
  Mail,
  Facebook,
  Twitter,
  LayoutDashboard,
  Package,
  Users,
  Store,
  Settings,
  LogOut,
  Bell,
  CreditCard,
  History,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  DollarSign,
  Plus,
  Edit,
  Trash2,
  Eye,
  ChevronDown,
  ArrowLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
interface Dish {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

interface Restaurant {
  id: number;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  image: string;
  isFeatured?: boolean;
  costForTwo: number;
  dishes?: Dish[];
}

interface Category {
  id: number;
  name: string;
  icon: string;
}

interface CartItem {
  id: string;
  restaurantId: number;
  restaurantName: string;
  itemName: string;
  price: number;
  quantity: number;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'delivery' | 'admin' | 'restaurant';
  avatar?: string;
}

// --- Constants ---
const EXCHANGE_RATE = 83;

const formatPrice = (usd: number) => {
  const inr = usd * EXCHANGE_RATE;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(inr);
};

// --- Components ---

const Navbar = ({ 
  onSignInClick, 
  onHomeClick, 
  onContactClick,
  onDashboardClick,
  cartCount,
  onCartClick,
  currentLocation,
  onDetectLocation,
  isDetecting,
  onSearchClick,
  onRestaurantsClick,
  user,
  onLogout,
  onProfileClick
}: { 
  onSignInClick: () => void, 
  onHomeClick: () => void,
  onContactClick: () => void,
  onDashboardClick: () => void,
  cartCount: number,
  onCartClick: () => void,
  currentLocation: string,
  onDetectLocation: () => void,
  isDetecting: boolean,
  onSearchClick: () => void,
  onRestaurantsClick: () => void,
  user: User | null,
  onLogout: () => void,
  onProfileClick: () => void
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 cursor-pointer" onClick={onHomeClick}>
            <div className="bg-orange-500 p-2 rounded-lg">
              <Utensils className="text-white w-6 h-6" />
            </div>
            <span className={`text-2xl font-bold tracking-tight ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
              FastFeast
            </span>
          </div>

          {/* Location Indicator */}
          <div 
            onClick={onDetectLocation}
            className={`hidden lg:flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer transition-all border ${isScrolled ? 'border-gray-200 text-gray-600 hover:bg-gray-50' : 'border-white/20 text-white hover:bg-white/10'}`}
          >
            <MapPin className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-medium truncate max-w-[150px]">
              {isDetecting ? 'Detecting...' : (currentLocation || 'Detect Location')}
            </span>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <button onClick={onHomeClick} className={`font-medium hover:text-orange-500 transition-colors ${isScrolled ? 'text-gray-600' : 'text-white'}`}>Home</button>
          <button onClick={onRestaurantsClick} className={`font-medium hover:text-orange-500 transition-colors ${isScrolled ? 'text-gray-600' : 'text-white'}`}>Restaurants</button>
          <button onClick={onContactClick} className={`font-medium hover:text-orange-500 transition-colors ${isScrolled ? 'text-gray-600' : 'text-white'}`}>Contact</button>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={onSearchClick}
            className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${isScrolled ? 'text-gray-600' : 'text-white'}`}
          >
            <Search className="w-5 h-5" />
          </button>
          <div className="relative">
            <button 
              onClick={onCartClick}
              className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${isScrolled ? 'text-gray-600' : 'text-white'}`}
            >
              <ShoppingBag className="w-5 h-5" />
            </button>
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </div>
          
          {user ? (
            <div className="relative">
              <button 
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center gap-2 p-1 rounded-full border border-gray-200 hover:border-orange-500 transition-all bg-white"
              >
                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-sm">
                  {user.name.charAt(0)}
                </div>
              </button>
              
              <AnimatePresence>
                {isProfileMenuOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50"
                  >
                    <div className="px-4 py-2 border-b border-gray-50 mb-2">
                      <p className="text-sm font-bold text-gray-900 truncate">{user.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    <button 
                      onClick={() => { onDashboardClick(); setIsProfileMenuOpen(false); }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors flex items-center gap-2"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      Dashboard
                    </button>
                    <button 
                      onClick={() => { onProfileClick(); setIsProfileMenuOpen(false); }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors flex items-center gap-2"
                    >
                      <Users className="w-4 h-4" />
                      My Profile
                    </button>
                    <button 
                      onClick={() => { onLogout(); setIsProfileMenuOpen(false); }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <button 
              onClick={onSignInClick}
              className="hidden sm:block bg-orange-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/30"
            >
              Sign In
            </button>
          )}

          <button 
            className="md:hidden p-2 text-gray-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className={`w-6 h-6 ${isScrolled ? 'text-gray-900' : 'text-white'}`} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              <button onClick={() => { onHomeClick(); setIsMobileMenuOpen(false); }} className="block text-lg font-medium text-gray-900 w-full text-left">Home</button>
              <button onClick={() => { onRestaurantsClick(); setIsMobileMenuOpen(false); }} className="block text-lg font-medium text-gray-900 w-full text-left">Restaurants</button>
              <button onClick={() => { onContactClick(); setIsMobileMenuOpen(false); }} className="block text-lg font-medium text-gray-900 w-full text-left">Contact</button>
              {user ? (
                <>
                  <button onClick={() => { onProfileClick(); setIsMobileMenuOpen(false); }} className="block text-lg font-medium text-gray-900 w-full text-left">My Profile</button>
                  <button onClick={() => { onLogout(); setIsMobileMenuOpen(false); }} className="block text-lg font-medium text-red-600 w-full text-left">Sign Out</button>
                </>
              ) : (
                <button 
                  onClick={() => { onSignInClick(); setIsMobileMenuOpen(false); }}
                  className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold"
                >
                  Sign In
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ address, setAddress, onDetectLocation, isDetecting }: { address: string, setAddress: (a: string) => void, onDetectLocation: () => void, isDetecting: boolean }) => {
  const handleFindFood = () => {
    if (!address) {
      alert('Please enter an address first!');
      return;
    }
    const element = document.getElementById('restaurants');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-[90vh] min-h-[600px] flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=2000" 
          alt="Hero Background" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <span className="inline-block bg-orange-500/20 text-orange-400 px-4 py-1 rounded-full text-sm font-bold tracking-wider uppercase mb-6 backdrop-blur-sm border border-orange-500/30">
            Fastest Delivery in Town
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
            Delicious Food <br />
            <span className="text-orange-500">Delivered</span> to Your Door
          </h1>
          <p className="text-gray-300 text-lg md:text-xl mb-10 leading-relaxed">
            Choose from thousands of restaurants and get your favorite meals delivered fast. Fresh, hot, and ready to eat.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="text" 
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your delivery address" 
                className="w-full bg-white/10 backdrop-blur-md border border-white/20 text-white pl-12 pr-12 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all placeholder:text-gray-400"
              />
              <button 
                onClick={onDetectLocation}
                disabled={isDetecting}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-orange-500 hover:text-orange-400 transition-colors disabled:opacity-50"
                title="Detect my location"
              >
                {isDetecting ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-orange-500"></div>
                ) : (
                  <Truck className="w-5 h-5" />
                )}
              </button>
            </div>
            <button 
              onClick={handleFindFood}
              className="bg-orange-500 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/40 whitespace-nowrap"
            >
              Explore
            </button>
          </div>

          <div className="mt-12 flex items-center gap-8">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <img 
                  key={i}
                  src={`https://i.pravatar.cc/100?img=${i + 10}`} 
                  alt="User" 
                  className="w-10 h-10 rounded-full border-2 border-black"
                  referrerPolicy="no-referrer"
                />
              ))}
            </div>
            <p className="text-white/80 text-sm">
              <span className="font-bold text-white">10k+</span> Happy customers in your area
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Categories = ({ categories }: { categories: Category[] }) => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Popular Categories</h2>
            <p className="text-gray-500">Explore our most ordered food types</p>
          </div>
          <button 
            onClick={() => {
              const element = document.getElementById('restaurants');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="text-orange-500 font-bold flex items-center gap-1 hover:gap-2 transition-all"
          >
            View All <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((category) => (
            <motion.div 
              key={category.id}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-3 cursor-pointer hover:shadow-md transition-all group"
            >
              <span className="text-4xl group-hover:scale-110 transition-transform">{category.icon}</span>
              <span className="font-semibold text-gray-700">{category.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

interface RestaurantCardProps {
  restaurant: Restaurant;
  onAddToCart: (restaurant: Restaurant) => void;
  onViewMenu: (restaurant: Restaurant) => void;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant, onAddToCart, onViewMenu }) => {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      onClick={() => onViewMenu(restaurant)}
      className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 group cursor-pointer hover:shadow-xl transition-all"
    >
      <div className="relative h-52">
        <img 
          src={restaurant.image} 
          alt={restaurant.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        {restaurant.isFeatured && (
          <div className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Featured
          </div>
        )}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(restaurant);
          }}
          className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
        >
          <ShoppingBag className="w-4 h-4 text-gray-700" />
        </button>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-900">{restaurant.name}</h3>
          <div className="flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded-lg text-sm font-bold">
            <Star className="w-4 h-4 fill-green-700" />
            {restaurant.rating}
          </div>
        </div>
        <div className="flex items-center justify-between mb-1">
          <p className="text-gray-500 text-sm">{restaurant.cuisine}</p>
          <p className="text-sm font-bold text-gray-700">{formatPrice(restaurant.costForTwo)} for two</p>
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-gray-50">
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium">{restaurant.deliveryTime}</span>
          </div>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(restaurant);
            }}
            className="flex items-center gap-1 text-orange-500 font-bold text-sm hover:text-orange-600 transition-colors"
          >
            Order Now <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const FeaturedRestaurants = ({ 
  restaurants, 
  onAddToCart, 
  currentLocation,
  onViewMenu
}: { 
  restaurants: Restaurant[], 
  onAddToCart: (restaurant: Restaurant) => void, 
  currentLocation: string,
  onViewMenu: (restaurant: Restaurant) => void
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'near' | 'popular'>('all');

  const filteredRestaurants = useMemo(() => {
    switch (activeFilter) {
      case 'popular':
        return [...restaurants].sort((a, b) => b.rating - a.rating).slice(0, 6);
      case 'near':
        // Simulating "Near Me" by showing a slightly different set or just all if location is set
        return restaurants.filter(r => r.rating > 4.2);
      default:
        return restaurants;
    }
  }, [restaurants, activeFilter]);

  return (
    <section className="py-20" id="restaurants">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {activeFilter === 'near' ? `Popular Near ${currentLocation || 'You'}` : 
               activeFilter === 'popular' ? 'Most Popular Picks' : 
               'Top Rated Restaurants'}
            </h2>
            <p className="text-gray-500 max-w-xl">
              {activeFilter === 'near' 
                ? `Discover the best flavors currently trending in ${currentLocation || 'your area'}.`
                : "We've partnered with the best local restaurants to bring you high-quality food, delivered with care."}
            </p>
          </div>
          <div className="flex gap-2 bg-gray-100 p-1.5 rounded-full">
            <button 
              onClick={() => setActiveFilter('all')}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${activeFilter === 'all' ? 'bg-orange-500 text-white shadow-lg' : 'text-gray-600 hover:bg-gray-200'}`}
            >
              All
            </button>
            <button 
              onClick={() => setActiveFilter('near')}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${activeFilter === 'near' ? 'bg-orange-500 text-white shadow-lg' : 'text-gray-600 hover:bg-gray-200'}`}
            >
              Near Me
            </button>
            <button 
              onClick={() => setActiveFilter('popular')}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${activeFilter === 'popular' ? 'bg-orange-500 text-white shadow-lg' : 'text-gray-600 hover:bg-gray-200'}`}
            >
              Popular
            </button>
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredRestaurants.map((restaurant) => (
              <motion.div
                key={restaurant.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <RestaurantCard 
                  restaurant={restaurant} 
                  onAddToCart={onAddToCart} 
                  onViewMenu={onViewMenu}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-16 text-center">
          <button 
            onClick={() => {
              setActiveFilter('all');
              const element = document.getElementById('restaurants');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="border-2 border-orange-500 text-orange-500 px-10 py-4 rounded-2xl font-bold hover:bg-orange-500 hover:text-white transition-all"
          >
            Explore All Restaurants
          </button>
        </div>
      </div>
    </section>
  );
};

const MenuModal = ({ 
  isOpen, 
  onClose, 
  restaurant, 
  onAddToCart 
}: { 
  isOpen: boolean, 
  onClose: () => void, 
  restaurant: Restaurant,
  onAddToCart: (dish: Dish, restaurant: Restaurant) => void
}) => {
  if (!restaurant) return null;

  const allDishes = [
    ...(restaurant.dishes || []),
    // Default dishes if none added
    { id: 'd1', name: 'Signature Platter', price: restaurant.costForTwo / 2, description: 'Our chef\'s special selection of the day.', image: `https://picsum.photos/seed/${restaurant.id}/200/200`, category: 'Main' }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white rounded-[2.5rem] w-full max-w-2xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
          >
            <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-white sticky top-0 z-10">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-md">
                  <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{restaurant.name}</h3>
                  <p className="text-sm text-gray-500">{restaurant.cuisine} • {restaurant.rating} ⭐</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-6">Menu Items</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {allDishes.map((dish) => (
                    <div key={dish.id} className="bg-gray-50 rounded-3xl p-4 flex flex-col gap-4 border border-gray-100 hover:border-orange-200 transition-all group">
                      <div className="h-40 rounded-2xl overflow-hidden relative">
                        <img src={dish.image} alt={dish.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                        <div className="absolute top-3 right-3">
                          <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-gray-900 shadow-sm">
                            {formatPrice(dish.price)}
                          </span>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <h5 className="font-bold text-gray-900">{dish.name}</h5>
                          <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">{dish.category}</span>
                        </div>
                        <p className="text-xs text-gray-500 line-clamp-2 mb-4">{dish.description}</p>
                        <button 
                          onClick={() => onAddToCart(dish, restaurant)}
                          className="w-full bg-white border border-gray-200 text-gray-900 font-bold py-2 rounded-xl hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all flex items-center justify-center gap-2"
                        >
                          <Plus className="w-4 h-4" />
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const HowItWorks = () => {
  const steps = [
    {
      icon: <MapPin className="w-8 h-8 text-orange-500" />,
      title: "Set Your Location",
      desc: "Tell us where you are and we'll show you restaurants that deliver to you."
    },
    {
      icon: <Utensils className="w-8 h-8 text-orange-500" />,
      title: "Choose Your Meal",
      desc: "Browse menus from thousands of restaurants and pick your favorite dishes."
    },
    {
      icon: <Truck className="w-8 h-8 text-orange-500" />,
      title: "Fast Delivery",
      desc: "Our delivery partners will bring your food to your doorstep in no time."
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-orange-500" />,
      title: "Enjoy Your Food",
      desc: "Fresh, hot, and delicious food ready for you to enjoy at home."
    }
  ];

  return (
    <section className="py-24 bg-gray-900 text-white overflow-hidden relative">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold mb-4">How FastFeast Works</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Getting your favorite food has never been easier. Just four simple steps to a delicious meal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {steps.map((step, index) => (
            <div key={index} className="text-center group">
              <div className="bg-gray-800 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:bg-orange-500 transition-all duration-300 transform group-hover:rotate-12">
                <div className="group-hover:text-white transition-colors">
                  {step.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4">{step.title}</h3>
              <p className="text-gray-400 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SearchModal = ({ isOpen, onClose, onAddToCart }: { isOpen: boolean, onClose: () => void, onAddToCart: (r: Restaurant) => void }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Restaurant[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (query.trim()) {
        setIsLoading(true);
        try {
          const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
          const data = await response.json();
          setResults(data);
        } catch (error) {
          console.error('Search error:', error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
      >
        <div className="p-6 border-b border-gray-100 flex items-center gap-4">
          <Search className="w-6 h-6 text-gray-400" />
          <input 
            autoFocus
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for restaurants or cuisines..." 
            className="flex-1 text-xl outline-none placeholder:text-gray-300"
          />
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>
        <div className="max-h-[60vh] overflow-y-auto p-6">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-orange-500"></div>
            </div>
          ) : results.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {results.map((restaurant) => (
                <div 
                  key={restaurant.id}
                  onClick={() => {
                    onAddToCart(restaurant);
                    onClose();
                  }}
                  className="flex items-center gap-4 p-3 rounded-2xl hover:bg-gray-50 cursor-pointer transition-colors group"
                >
                  <img 
                    src={restaurant.image} 
                    alt={restaurant.name} 
                    className="w-16 h-16 rounded-xl object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900 group-hover:text-orange-500 transition-colors">{restaurant.name}</h4>
                    <p className="text-sm text-gray-500">{restaurant.cuisine}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <div className="flex items-center gap-1 text-xs font-bold text-green-600">
                        <Star className="w-3 h-3 fill-green-600" />
                        {restaurant.rating}
                      </div>
                      <span className="text-xs font-bold text-gray-700">{formatPrice(restaurant.costForTwo)} for two</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : query.trim() ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No restaurants found for "{query}"</p>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400">Start typing to search for your favorite food...</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer id="footer" className="bg-white pt-20 pb-10 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-orange-500 p-2 rounded-lg">
                <Utensils className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-gray-900">
                FastFeast
              </span>
            </div>
            <p className="text-gray-500 leading-relaxed mb-6">
              The best food delivery service in your city. We bring your favorite meals right to your doorstep, fast and fresh.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-orange-500 hover:text-white transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-orange-500 hover:text-white transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/fast_feastfood/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-orange-500 hover:text-white transition-all">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold text-gray-900 mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-500 hover:text-orange-500 transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-500 hover:text-orange-500 transition-colors">Our Services</a></li>
              <li><a href="#" className="text-gray-500 hover:text-orange-500 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-500 hover:text-orange-500 transition-colors">Terms & Conditions</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold text-gray-900 mb-6">Support</h4>
            <ul className="space-y-4">
              <li>
                <a href="tel:7466968665" className="flex items-center gap-2 text-gray-500 hover:text-orange-500 transition-colors">
                  <Phone className="w-4 h-4" />
                  7466968665
                </a>
              </li>
              <li>
                <a href="mailto:support@fastfeast.com" className="flex items-center gap-2 text-gray-500 hover:text-orange-500 transition-colors">
                  <Mail className="w-4 h-4" />
                  Contact Us
                </a>
              </li>
              <li><a href="#" className="text-gray-500 hover:text-orange-500 transition-colors">FAQs</a></li>
              <li><a href="#" className="text-gray-500 hover:text-orange-500 transition-colors">Live Chat</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold text-gray-900 mb-6">Newsletter</h4>
            <p className="text-gray-500 mb-6">Subscribe to get the latest offers and news.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Your email" 
                className="flex-1 bg-gray-100 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 outline-none"
              />
              <button className="bg-orange-500 text-white p-3 rounded-xl hover:bg-orange-600 transition-all">
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © 2024 FastFeast. All rights reserved.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-gray-500 text-sm hover:text-orange-500 transition-colors">Privacy</a>
            <a href="#" className="text-gray-500 text-sm hover:text-orange-500 transition-colors">Terms</a>
            <a href="#" className="text-gray-500 text-sm hover:text-orange-500 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SignIn = ({ onBack, onLogin, onSignUpClick, message }: { onBack: () => void, onLogin: (user: User) => void, onSignUpClick: () => void, message?: string }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<User['role']>('customer');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    // Mock authentication logic
    setTimeout(() => {
      setIsSubmitting(false);
      if (password.length < 6) {
        setError('Password must be at least 6 characters');
        return;
      }
      
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
        email: email,
        role: role
      };
      
      onLogin(mockUser);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100"
      >
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-orange-500 p-3 rounded-2xl shadow-lg shadow-orange-500/30">
              <Utensils className="text-white w-8 h-8" />
            </div>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900">Welcome Back</h2>
          <p className="mt-2 text-sm text-gray-600">
            {message || 'Sign in to your FastFeast account'}
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-100">
              {error}
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-xl focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm bg-gray-50"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-xl focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm bg-gray-50"
                placeholder="••••••••"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Account Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                {['customer', 'delivery', 'admin', 'restaurant'].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r as User['role'])}
                    className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all capitalize ${
                      role === r 
                        ? 'bg-orange-500 text-white border-orange-500 shadow-md' 
                        : 'bg-white text-gray-500 border-gray-200 hover:border-orange-200'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-orange-600 hover:text-orange-500">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all shadow-lg shadow-orange-500/30 disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
              ) : (
                'Sign In'
              )}
            </button>
          </div>
        </form>
        <div className="text-center space-y-4">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <button 
              onClick={onSignUpClick}
              className="font-bold text-orange-600 hover:text-orange-500"
            >
              Sign Up
            </button>
          </p>
          <button 
            onClick={onBack}
            className="text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
          >
            ← Back to Home
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const SignUp = ({ onBack, onLogin, onSignInClick, message }: { onBack: () => void, onLogin: (user: User) => void, onSignInClick: () => void, message?: string }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<User['role']>('customer');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    setTimeout(() => {
      setIsSubmitting(false);
      if (password.length < 6) {
        setError('Password must be at least 6 characters');
        return;
      }
      
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: name,
        email: email,
        role: role
      };
      
      onLogin(mockUser);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100"
      >
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-orange-500 p-3 rounded-2xl shadow-lg shadow-orange-500/30">
              <Utensils className="text-white w-8 h-8" />
            </div>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900">Create Account</h2>
          <p className="mt-2 text-sm text-gray-600">
            {message || 'Join FastFeast today'}
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-100">
              {error}
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label htmlFor="full-name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                id="full-name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-xl focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm bg-gray-50"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-xl focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm bg-gray-50"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label htmlFor="password-signup" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password-signup"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-xl focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm bg-gray-50"
                placeholder="••••••••"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Join As
              </label>
              <div className="grid grid-cols-2 gap-2">
                {['customer', 'delivery', 'admin', 'restaurant'].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r as User['role'])}
                    className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all capitalize ${
                      role === r 
                        ? 'bg-orange-500 text-white border-orange-500 shadow-md' 
                        : 'bg-white text-gray-500 border-gray-200 hover:border-orange-200'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all shadow-lg shadow-orange-500/30 disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
              ) : (
                'Create Account'
              )}
            </button>
          </div>
        </form>
        <div className="text-center space-y-4">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <button 
              onClick={onSignInClick}
              className="font-bold text-orange-600 hover:text-orange-500"
            >
              Sign In
            </button>
          </p>
          <button 
            onClick={onBack}
            className="text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
          >
            ← Back to Home
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const Profile = ({ user, onBack }: { user: User, onBack: () => void }) => {
  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden"
        >
          <div className="bg-orange-500 h-32 relative">
            <div className="absolute -bottom-12 left-10">
              <div className="w-24 h-24 rounded-3xl bg-white p-1 shadow-lg">
                <div className="w-full h-full rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600 text-4xl font-bold">
                  {user.name.charAt(0)}
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-16 pb-10 px-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
                <p className="text-gray-500">{user.email}</p>
              </div>
              <button className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all">
                Edit Profile
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                <p className="text-sm text-gray-500 mb-1">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                <p className="text-sm text-gray-500 mb-1">Saved Places</p>
                <p className="text-2xl font-bold text-gray-900">4</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                <p className="text-sm text-gray-500 mb-1">FastFeast Points</p>
                <p className="text-2xl font-bold text-orange-500">450</p>
              </div>
            </div>

            <div className="mt-12">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Orders</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((order) => (
                  <div key={order} className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl hover:shadow-md transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center">
                        <ShoppingBag className="text-orange-500 w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">Burger King</p>
                        <p className="text-xs text-gray-500">March 20, 2024 • {formatPrice(24.50)}</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-green-50 text-green-600 text-xs font-bold rounded-full">Delivered</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
        
        <div className="mt-8 text-center">
          <button 
            onClick={onBack}
            className="text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Dashboard Components ---

const DashboardLayout = ({ 
  title, 
  user, 
  sidebarItems, 
  children,
  onBack
}: { 
  title: string, 
  user: User, 
  sidebarItems: { icon: any, label: string, id: string }[],
  children: React.ReactNode,
  onBack: () => void
}) => {
  const [activeTab, setActiveTab] = useState(sidebarItems[0].id);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 hidden lg:flex flex-col">
        <div className="p-6 border-b border-gray-50">
          <div className="flex items-center gap-2">
            <div className="bg-orange-500 p-2 rounded-lg">
              <Utensils className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900">
              FastFeast
            </span>
          </div>
          <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mt-4">
            {user.role} Panel
          </p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === item.id 
                  ? 'bg-orange-50 text-orange-600 font-bold' 
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-50">
          <button 
            onClick={onBack}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">Exit Dashboard</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8">
          <h2 className="text-lg font-bold text-gray-900">{title}</h2>
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-gray-600 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-gray-100">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-gray-900">{user.name}</p>
                <p className="text-[10px] text-gray-500 uppercase font-bold">{user.role}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold">
                {user.name.charAt(0)}
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

const CustomerDashboard = ({ user, onBack }: { user: User, onBack: () => void }) => {
  const sidebarItems = [
    { icon: LayoutDashboard, label: 'Overview', id: 'overview' },
    { icon: History, label: 'Order History', id: 'orders' },
    { icon: Star, label: 'My Reviews', id: 'reviews' },
    { icon: CreditCard, label: 'Payments', id: 'payments' },
    { icon: Settings, label: 'Settings', id: 'settings' },
  ];

  return (
    <DashboardLayout title="Customer Dashboard" user={user} sidebarItems={sidebarItems} onBack={onBack}>
      <div className="mb-6">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-orange-500 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Home
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center mb-4">
            <Package className="text-orange-500 w-6 h-6" />
          </div>
          <p className="text-sm text-gray-500 font-medium">Active Orders</p>
          <h3 className="text-2xl font-bold text-gray-900">2</h3>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center mb-4">
            <CheckCircle className="text-green-500 w-6 h-6" />
          </div>
          <p className="text-sm text-gray-500 font-medium">Completed Orders</p>
          <h3 className="text-2xl font-bold text-gray-900">48</h3>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-4">
            <Star className="text-blue-500 w-6 h-6" />
          </div>
          <p className="text-sm text-gray-500 font-medium">Reward Points</p>
          <h3 className="text-2xl font-bold text-gray-900">1,250</h3>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex items-center justify-between">
          <h3 className="font-bold text-gray-900">Recent Activity</h3>
          <button className="text-sm text-orange-500 font-bold hover:text-orange-600">View All</button>
        </div>
        <div className="divide-y divide-gray-50">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                  <Utensils className="text-gray-400 w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">Order from Pizza Hut</p>
                  <p className="text-xs text-gray-500">March 22, 2024 • {formatPrice(15.99)}</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-orange-50 text-orange-600 text-[10px] font-bold rounded-full uppercase tracking-wider">In Transit</span>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

const DeliveryDashboard = ({ user, onBack }: { user: User, onBack: () => void }) => {
  const sidebarItems = [
    { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
    { icon: Package, label: 'Available Tasks', id: 'tasks' },
    { icon: TrendingUp, label: 'Earnings', id: 'earnings' },
    { icon: History, label: 'Delivery History', id: 'history' },
    { icon: Settings, label: 'Account', id: 'settings' },
  ];

  return (
    <DashboardLayout title="Delivery Partner Panel" user={user} sidebarItems={sidebarItems} onBack={onBack}>
      <div className="mb-6">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-orange-500 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Home
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2">Today's Earnings</p>
          <h3 className="text-2xl font-bold text-gray-900">{formatPrice(45.50)}</h3>
          <div className="mt-2 flex items-center gap-1 text-green-500 text-xs font-bold">
            <TrendingUp className="w-3 h-3" />
            +12% from yesterday
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2">Deliveries</p>
          <h3 className="text-2xl font-bold text-gray-900">12</h3>
          <p className="text-xs text-gray-500 mt-2">Target: 15</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2">Rating</p>
          <h3 className="text-2xl font-bold text-gray-900">4.9</h3>
          <div className="mt-2 flex gap-0.5">
            {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-3 h-3 fill-orange-500 text-orange-500" />)}
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2">Online Hours</p>
          <h3 className="text-2xl font-bold text-gray-900">6.5h</h3>
          <p className="text-xs text-green-500 mt-2 font-bold">Active Now</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex items-center justify-between">
            <h3 className="font-bold text-gray-900">Active Task</h3>
            <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-full uppercase tracking-wider">Pick Up</span>
          </div>
          <div className="p-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                <Store className="text-orange-600 w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Restaurant</p>
                <p className="font-bold text-gray-900">The Burger House</p>
                <p className="text-sm text-gray-500">123 Main St, Downtown</p>
              </div>
            </div>
            <div className="flex items-start gap-4 mb-8">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <MapPin className="text-blue-600 w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Customer</p>
                <p className="font-bold text-gray-900">John Doe</p>
                <p className="text-sm text-gray-500">456 Oak Lane, Apartment 4B</p>
              </div>
            </div>
            <button className="w-full bg-orange-500 text-white font-bold py-4 rounded-2xl hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20">
              Confirm Pick Up
            </button>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50">
            <h3 className="font-bold text-gray-900">Available Near You</h3>
          </div>
          <div className="divide-y divide-gray-50">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-6 flex items-center justify-between">
                <div>
                  <p className="font-bold text-gray-900">Order #FF-294{i}</p>
                  <p className="text-xs text-gray-500">2.4 km away • {formatPrice(4.50)} delivery fee</p>
                </div>
                <button className="px-4 py-2 border border-orange-500 text-orange-500 text-xs font-bold rounded-xl hover:bg-orange-500 hover:text-white transition-all">
                  Accept
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

const AdminDashboard = ({ user, onBack }: { user: User, onBack: () => void }) => {
  const sidebarItems = [
    { icon: LayoutDashboard, label: 'Overview', id: 'overview' },
    { icon: Users, label: 'Users', id: 'users' },
    { icon: Store, label: 'Restaurants', id: 'restaurants' },
    { icon: Truck, label: 'Delivery Fleet', id: 'fleet' },
    { icon: TrendingUp, label: 'Revenue', id: 'revenue' },
    { icon: AlertCircle, label: 'Complaints', id: 'complaints' },
    { icon: Settings, label: 'System Settings', id: 'settings' },
  ];

  return (
    <DashboardLayout title="Administration Panel" user={user} sidebarItems={sidebarItems} onBack={onBack}>
      <div className="mb-6">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-orange-500 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Home
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
              <TrendingUp className="text-orange-500 w-5 h-5" />
            </div>
            <span className="text-green-500 text-xs font-bold">+14%</span>
          </div>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Total Revenue</p>
          <h3 className="text-2xl font-bold text-gray-900">{formatPrice(124500)}</h3>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
              <Users className="text-blue-500 w-5 h-5" />
            </div>
            <span className="text-green-500 text-xs font-bold">+5%</span>
          </div>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Active Users</p>
          <h3 className="text-2xl font-bold text-gray-900">12,450</h3>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
              <Store className="text-purple-500 w-5 h-5" />
            </div>
            <span className="text-red-500 text-xs font-bold">-2</span>
          </div>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Restaurants</p>
          <h3 className="text-2xl font-bold text-gray-900">482</h3>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
              <Package className="text-green-500 w-5 h-5" />
            </div>
            <span className="text-green-500 text-xs font-bold">+22%</span>
          </div>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Orders Today</p>
          <h3 className="text-2xl font-bold text-gray-900">1,842</h3>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex items-center justify-between">
          <h3 className="font-bold text-gray-900">Recent Transactions</h3>
          <div className="flex gap-2">
            <button className="p-2 border border-gray-100 rounded-lg hover:bg-gray-50"><Search className="w-4 h-4 text-gray-400" /></button>
            <button className="px-4 py-2 bg-orange-500 text-white text-xs font-bold rounded-lg hover:bg-orange-600">Export CSV</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-[10px] uppercase tracking-widest font-bold text-gray-400">
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Restaurant</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-bold text-gray-900">#FF-8492{i}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">JD</div>
                      <span className="text-sm text-gray-600">Jane Doe</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">Subway</td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-900">{formatPrice(18.50)}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-green-50 text-green-600 text-[10px] font-bold rounded-full uppercase tracking-wider">Success</span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="p-2 text-gray-400 hover:text-orange-500"><Eye className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

const RestaurantDashboard = ({ 
  user, 
  onBack,
  dishes,
  onAddDish,
  onDeleteDish
}: { 
  user: User, 
  onBack: () => void,
  dishes: Dish[],
  onAddDish: (dish: Dish) => void,
  onDeleteDish: (id: string) => void
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isAddDishModalOpen, setIsAddDishModalOpen] = useState(false);

  const [newDish, setNewDish] = useState({
    name: '',
    price: '',
    description: '',
    category: 'Burgers',
    image: ''
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewDish({ ...newDish, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddDish = (e: React.FormEvent) => {
    e.preventDefault();
    const dish: Dish = {
      id: Math.random().toString(36).substr(2, 9),
      name: newDish.name,
      price: parseFloat(newDish.price),
      description: newDish.description,
      category: newDish.category,
      image: newDish.image || `https://picsum.photos/seed/${newDish.name}/100/100`
    };
    onAddDish(dish);
    setIsAddDishModalOpen(false);
    setNewDish({ name: '', price: '', description: '', category: 'Burgers', image: '' });
  };

  const sidebarItems = [
    { icon: LayoutDashboard, label: 'Overview', id: 'overview' },
    { icon: Package, label: 'Live Orders', id: 'orders' },
    { icon: Utensils, label: 'Menu Management', id: 'menu' },
    { icon: TrendingUp, label: 'Analytics', id: 'analytics' },
    { icon: Star, label: 'Customer Reviews', id: 'reviews' },
    { icon: Settings, label: 'Restaurant Settings', id: 'settings' },
  ];

  return (
    <DashboardLayout title="Restaurant Manager" user={user} sidebarItems={sidebarItems} onBack={onBack}>
      <div className="mb-6">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-orange-500 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Home
        </button>
      </div>
      {/* Add Dish Modal */}
      <AnimatePresence>
        {isAddDishModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-[2.5rem] w-full max-w-md overflow-hidden shadow-2xl"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold text-gray-900">Add New Dish</h3>
                  <button 
                    onClick={() => setIsAddDishModalOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6 text-gray-400" />
                  </button>
                </div>

                <form onSubmit={handleAddDish} className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Dish Image</label>
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden group relative">
                        {newDish.image ? (
                          <>
                            <img src={newDish.image} alt="Preview" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <Plus className="text-white w-6 h-6" />
                            </div>
                          </>
                        ) : (
                          <Plus className="text-gray-300 w-8 h-8" />
                        )}
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 mb-1">Upload a high-quality photo of your dish.</p>
                        <p className="text-[10px] text-gray-400 uppercase font-bold">JPG, PNG up to 5MB</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Dish Name</label>
                    <input 
                      type="text" 
                      required
                      value={newDish.name}
                      onChange={(e) => setNewDish({...newDish, name: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                      placeholder="e.g. Truffle Mushroom Pasta"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Price ($)</label>
                      <input 
                        type="number" 
                        step="0.01"
                        required
                        value={newDish.price}
                        onChange={(e) => setNewDish({...newDish, price: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                        placeholder="12.99"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                      <select 
                        value={newDish.category}
                        onChange={(e) => setNewDish({...newDish, category: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all bg-white"
                      >
                        <option>Burgers</option>
                        <option>Pizza</option>
                        <option>Pasta</option>
                        <option>Salads</option>
                        <option>Desserts</option>
                        <option>Drinks</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                    <textarea 
                      rows={3}
                      value={newDish.description}
                      onChange={(e) => setNewDish({...newDish, description: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all resize-none"
                      placeholder="Describe your delicious dish..."
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-orange-500 text-white font-bold py-4 rounded-2xl hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20"
                  >
                    Add to Menu
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-xs text-gray-400 font-bold uppercase tracking-wider">Orders Today</h4>
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          </div>
          <h3 className="text-3xl font-bold text-gray-900">24</h3>
          <p className="text-xs text-gray-500 mt-2">8 orders in preparation</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <h4 className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-4">Daily Revenue</h4>
          <h3 className="text-3xl font-bold text-gray-900">{formatPrice(842.00)}</h3>
          <p className="text-xs text-green-500 mt-2 font-bold">+18% from yesterday</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <h4 className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-4">Avg. Prep Time</h4>
          <h3 className="text-3xl font-bold text-gray-900">18 min</h3>
          <p className="text-xs text-gray-500 mt-2">Target: 15 min</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex items-center justify-between">
            <h3 className="font-bold text-gray-900">Live Orders</h3>
            <button className="text-xs font-bold text-orange-500">View All</button>
          </div>
          <div className="divide-y divide-gray-50">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-bold text-gray-900">Order #FF-102{i}</p>
                    <p className="text-xs text-gray-500">2x Chicken Burger, 1x Large Fries</p>
                  </div>
                  <span className="px-3 py-1 bg-orange-50 text-orange-600 text-[10px] font-bold rounded-full uppercase tracking-wider">Preparing</span>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 py-2 bg-green-500 text-white text-xs font-bold rounded-xl hover:bg-green-600 transition-all">Ready for Pickup</button>
                  <button className="px-4 py-2 border border-gray-100 text-gray-400 rounded-xl hover:bg-gray-50"><Eye className="w-4 h-4" /></button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex items-center justify-between">
            <h3 className="font-bold text-gray-900">Menu Items</h3>
            <button 
              onClick={() => setIsAddDishModalOpen(true)}
              className="p-2 text-gray-400 hover:text-orange-500 transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          <div className="divide-y divide-gray-50">
            {dishes.map((dish) => (
              <div key={dish.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-100 overflow-hidden">
                    <img src={dish.image} alt={dish.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{dish.name}</p>
                    <p className="text-xs text-gray-500">{dish.category} • {dish.description.substring(0, 30)}...</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">{formatPrice(dish.price)}</p>
                  <div className="flex gap-2 mt-1">
                    <button className="text-[10px] font-bold text-orange-500 uppercase tracking-wider hover:text-orange-600">Edit</button>
                    <button 
                      onClick={() => onDeleteDish(dish.id)}
                      className="text-[10px] font-bold text-red-500 uppercase tracking-wider hover:text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

const CartDrawer = ({ 
  isOpen, 
  onClose, 
  items, 
  onRemove, 
  onUpdateQuantity,
  onCheckout
}: { 
  isOpen: boolean, 
  onClose: () => void, 
  items: CartItem[],
  onRemove: (id: string) => void,
  onUpdateQuantity: (id: string, delta: number) => void,
  onCheckout: () => void
}) => {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-[70] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <ShoppingBag className="w-6 h-6 text-orange-500" />
                Your Cart
              </h2>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="bg-gray-50 p-8 rounded-full">
                    <ShoppingBag className="w-12 h-12 text-gray-300" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Your cart is empty</h3>
                    <p className="text-gray-500">Add some delicious food to get started!</p>
                  </div>
                  <button 
                    onClick={onClose}
                    className="bg-orange-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-600 transition-all"
                  >
                    Browse Restaurants
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="w-20 h-20 bg-gray-100 rounded-2xl flex-shrink-0 flex items-center justify-center overflow-hidden">
                      <Utensils className="w-8 h-8 text-gray-300" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <h4 className="font-bold text-gray-900">{item.itemName}</h4>
                        <span className="font-bold text-orange-500">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                      <p className="text-sm text-gray-500 mb-3">{item.restaurantName}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="px-3 py-1 hover:bg-gray-50 text-gray-600 font-bold"
                          >
                            -
                          </button>
                          <span className="px-3 py-1 font-bold text-gray-900 border-x border-gray-200 min-w-[40px] text-center">
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="px-3 py-1 hover:bg-gray-50 text-gray-600 font-bold"
                          >
                            +
                          </button>
                        </div>
                        <button 
                          onClick={() => onRemove(item.id)}
                          className="text-sm font-medium text-red-500 hover:text-red-600"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-gray-100 bg-gray-50 space-y-4">
                <div className="flex justify-between items-center text-lg">
                  <span className="text-gray-600 font-medium">Subtotal</span>
                  <span className="text-2xl font-bold text-gray-900">{formatPrice(total)}</span>
                </div>
                <button 
                  onClick={onCheckout}
                  className="w-full bg-orange-500 text-white py-4 rounded-2xl font-bold text-lg hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/30"
                >
                  Checkout Now
                </button>
                <p className="text-center text-xs text-gray-400">
                  Taxes and delivery fees calculated at checkout
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// --- Main App ---

const CheckoutPage = ({ 
  items, 
  onBack, 
  onOrderSuccess 
}: { 
  items: CartItem[], 
  onBack: () => void, 
  onOrderSuccess: (orderId: number) => void 
}) => {
  const [isPlacing, setIsPlacing] = useState(false);
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 0.60; // Approx ₹50
  const tax = total * 0.05; // 5% GST

  const handlePlaceOrder = async () => {
    if (!address) {
      alert('Please enter a delivery address');
      return;
    }
    setIsPlacing(true);
    try {
      const response = await fetch('/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: items.map(item => ({ name: item.itemName, price: item.price, quantity: item.quantity })),
          address,
          restaurantId: items[0]?.restaurantId
        }),
      });
      const data = await response.json();
      onOrderSuccess(data.orderId);
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsPlacing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-orange-500 font-bold mb-8 transition-colors"
        >
          <ChevronRight className="w-5 h-5 rotate-180" />
          Back to Menu
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            {/* Delivery Address */}
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <MapPin className="w-6 h-6 text-orange-500" />
                Delivery Address
              </h2>
              <textarea 
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your full delivery address..."
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 focus:ring-2 focus:ring-orange-500 outline-none h-32 resize-none"
              />
            </div>

            {/* Payment Method */}
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-orange-500" />
                Payment Method
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {['card', 'cash', 'paypal'].map((method) => (
                  <button 
                    key={method}
                    onClick={() => setPaymentMethod(method)}
                    className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 capitalize font-bold ${paymentMethod === method ? 'border-orange-500 bg-orange-50 text-orange-500' : 'border-gray-100 hover:border-gray-200 text-gray-500'}`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${paymentMethod === method ? 'bg-orange-500 text-white' : 'bg-gray-100'}`}>
                      {method === 'card' && <Smartphone className="w-5 h-5" />}
                      {method === 'cash' && <Truck className="w-5 h-5" />}
                      {method === 'paypal' && <Utensils className="w-5 h-5" />}
                    </div>
                    {method}
                  </button>
                ))}
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between py-4 border-b border-gray-50 last:border-0">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-500 font-bold">
                        {item.quantity}x
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">{item.itemName}</h4>
                        <p className="text-sm text-gray-500">{item.restaurantName}</p>
                      </div>
                    </div>
                    <span className="font-bold text-gray-900">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Price Details</h3>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-gray-600">
                  <span>Cart Total</span>
                  <span className="font-bold text-gray-900">{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span className="font-bold text-gray-900">{formatPrice(deliveryFee)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax & GST (5%)</span>
                  <span className="font-bold text-gray-900">{formatPrice(tax)}</span>
                </div>
                <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Total Amount</span>
                  <span className="text-3xl font-bold text-orange-500">{formatPrice(total + deliveryFee + tax)}</span>
                </div>
              </div>
              <button 
                onClick={handlePlaceOrder}
                disabled={isPlacing}
                className="w-full bg-orange-500 text-white py-4 rounded-2xl font-bold text-lg hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/40 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isPlacing ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
                ) : (
                  <>Place Order <ChevronRight className="w-5 h-5" /></>
                )}
              </button>
              <p className="text-center text-xs text-gray-400 mt-4">
                By placing the order, you agree to our Terms of Service
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SuccessModal = ({ 
  isOpen, 
  onClose, 
  orderId 
}: { 
  isOpen: boolean, 
  onClose: () => void, 
  orderId: number | null 
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100]"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed inset-0 m-auto w-full max-w-md h-fit bg-white z-[110] rounded-[3rem] p-10 shadow-2xl text-center overflow-hidden"
          >
            {/* Decorative Background */}
            <div className="absolute top-0 left-0 w-full h-2 bg-orange-500"></div>
            
            <div className="relative">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8"
              >
                <ShieldCheck className="w-12 h-12 text-green-600" />
              </motion.div>

              <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">
                ORDER <span className="text-orange-500">Successful!</span>
              </h2>
              
              <p className="text-gray-500 text-lg mb-8 leading-relaxed">
                Your delicious meal is being prepared. <br />
                Order ID: <span className="font-bold text-gray-900">#{orderId}</span>
              </p>

              <div className="space-y-4">
                <button 
                  onClick={onClose}
                  className="w-full bg-orange-500 text-white py-4 rounded-2xl font-bold text-lg hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/30"
                >
                  Track My Order
                </button>
                <button 
                  onClick={onClose}
                  className="w-full bg-gray-50 text-gray-600 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all"
                >
                  Back to Home
                </button>
              </div>
            </div>

            {/* Confetti-like elements */}
            <div className="absolute top-10 left-10 w-3 h-3 bg-orange-500 rounded-full animate-ping"></div>
            <div className="absolute bottom-10 right-10 w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

type View = 'home' | 'signin' | 'signup' | 'profile' | 'checkout' | 'dashboard-customer' | 'dashboard-delivery' | 'dashboard-admin' | 'dashboard-restaurant';

export default function App() {
  const [view, setView] = useState<View>('home');
  const [categories, setCategories] = useState<Category[]>([]);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('fastfeast_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [lastOrderId, setLastOrderId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState('');
  const [isDetecting, setIsDetecting] = useState(false);
  const [redirectAfterLogin, setRedirectAfterLogin] = useState<View | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [customDishes, setCustomDishes] = useState<Record<number, Dish[]>>(() => {
    const saved = localStorage.getItem('fastfeast_custom_dishes');
    return saved ? JSON.parse(saved) : {};
  });
  const [selectedRestaurantForMenu, setSelectedRestaurantForMenu] = useState<Restaurant | null>(null);

  useEffect(() => {
    localStorage.setItem('fastfeast_custom_dishes', JSON.stringify(customDishes));
  }, [customDishes]);

  const restaurantsWithDishes = useMemo(() => {
    return restaurants.map(r => ({
      ...r,
      dishes: customDishes[r.id] || []
    }));
  }, [restaurants, customDishes]);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('fastfeast_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const navigateTo = (newView: View) => {
    setView(newView);
    if (newView !== 'signin' && newView !== 'signup' && newView !== 'checkout') {
      setRedirectAfterLogin(null);
    }
  };

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('fastfeast_user', JSON.stringify(userData));
    if (redirectAfterLogin) {
      setView(redirectAfterLogin);
      setRedirectAfterLogin(null);
    } else {
      setView('home');
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('fastfeast_user');
    navigateTo('home');
  };

  const scrollToSection = (id: string) => {
    navigateTo('home');
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    setIsDetecting(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
          );
          const data = await response.json();
          const city = data.address.city || data.address.town || data.address.village || data.address.suburb || 'Mathura';
          const fullAddress = data.display_name || `${city}, India`;
          setAddress(fullAddress);
        } catch (error) {
          console.error('Error reverse geocoding:', error);
          setAddress(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
        } finally {
          setIsDetecting(false);
        }
      },
      (error) => {
        console.error('Geolocation error:', error);
        alert('Unable to retrieve your location. Please enter it manually.');
        setIsDetecting(false);
      }
    );
  };

  useEffect(() => {
    localStorage.setItem('fastfeast_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, restRes] = await Promise.all([
          fetch('/api/categories'),
          fetch('/api/restaurants')
        ]);
        const catData = await catRes.json();
        const restData = await restRes.json();
        setCategories(catData);
        setRestaurants(restData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const addToCart = (restaurant: Restaurant) => {
    const newItem: CartItem = {
      id: Math.random().toString(36).substr(2, 9),
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
      itemName: 'Standard Meal Box',
      price: restaurant.costForTwo / 2, // Price per person
      quantity: 1
    };

    setCart(prev => {
      const existing = prev.find(item => item.restaurantId === restaurant.id && item.itemName === 'Standard Meal Box');
      if (existing) {
        return prev.map(item => 
          (item.restaurantId === restaurant.id && item.itemName === 'Standard Meal Box')
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, newItem];
    });
    setIsCartOpen(true);
  };

  const addDishToCart = (dish: Dish, restaurant: Restaurant) => {
    const newItem: CartItem = {
      id: Math.random().toString(36).substr(2, 9),
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
      itemName: dish.name,
      price: dish.price,
      quantity: 1
    };

    setCart(prev => {
      const existing = prev.find(item => item.restaurantId === restaurant.id && item.itemName === dish.name);
      if (existing) {
        return prev.map(item => 
          (item.restaurantId === restaurant.id && item.itemName === dish.name)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, newItem];
    });
    setIsCartOpen(true);
  };

  const handleAddDish = (dish: Dish) => {
    // For demo, we'll associate custom dishes with the first restaurant if user is a restaurant
    // In a real app, user would have a restaurantId
    const restaurantId = 1; 
    setCustomDishes(prev => ({
      ...prev,
      [restaurantId]: [dish, ...(prev[restaurantId] || [])]
    }));
  };

  const handleDeleteDish = (dishId: string) => {
    const restaurantId = 1;
    setCustomDishes(prev => ({
      ...prev,
      [restaurantId]: (prev[restaurantId] || []).filter(d => d.id !== dishId)
    }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    if (!user) {
      setRedirectAfterLogin('checkout');
      navigateTo('signin');
      return;
    }
    navigateTo('checkout');
  };

  const handleOrderSuccess = (orderId: number) => {
    setLastOrderId(orderId);
    setCart([]);
    setView('home');
    setIsSuccessModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  const handleDashboardNavigation = () => {
    if (!user) {
      navigateTo('signin');
      return;
    }
    
    switch (user.role) {
      case 'customer':
        navigateTo('dashboard-customer');
        break;
      case 'delivery':
        navigateTo('dashboard-delivery');
        break;
      case 'admin':
        navigateTo('dashboard-admin');
        break;
      case 'restaurant':
        navigateTo('dashboard-restaurant');
        break;
      default:
        navigateTo('dashboard-customer');
    }
  };

  if (view === 'dashboard-customer' && user) {
    return <CustomerDashboard user={user} onBack={() => navigateTo('home')} />;
  }

  if (view === 'dashboard-delivery' && user) {
    return <DeliveryDashboard user={user} onBack={() => navigateTo('home')} />;
  }

  if (view === 'dashboard-admin' && user) {
    return <AdminDashboard user={user} onBack={() => navigateTo('home')} />;
  }

  if (view === 'dashboard-restaurant' && user) {
    return (
      <RestaurantDashboard 
        user={user} 
        onBack={() => navigateTo('home')} 
        dishes={customDishes[1] || []}
        onAddDish={handleAddDish}
        onDeleteDish={handleDeleteDish}
      />
    );
  }

  if (view === 'signin') {
    return (
      <SignIn 
        onBack={() => navigateTo('home')} 
        onLogin={handleLogin}
        onSignUpClick={() => navigateTo('signup')}
        message={redirectAfterLogin === 'checkout' ? 'Please sign in to complete your order' : undefined}
      />
    );
  }

  if (view === 'signup') {
    return (
      <SignUp 
        onBack={() => navigateTo('home')} 
        onLogin={handleLogin}
        onSignInClick={() => navigateTo('signin')}
        message={redirectAfterLogin === 'checkout' ? 'Please create an account to complete your order' : undefined}
      />
    );
  }

  if (view === 'profile' && user) {
    return (
      <>
        <Navbar 
          onSignInClick={() => navigateTo('signin')} 
          onHomeClick={() => {
            if (view === 'home') {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
              navigateTo('home');
            }
          }}
          onContactClick={() => scrollToSection('footer')}
          cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
          onCartClick={() => setIsCartOpen(true)}
          currentLocation={address}
          onDetectLocation={handleDetectLocation}
          isDetecting={isDetecting}
          onSearchClick={() => setIsSearchOpen(true)}
          onRestaurantsClick={() => scrollToSection('restaurants')}
          user={user}
          onLogout={handleLogout}
          onProfileClick={() => navigateTo('profile')}
          onDashboardClick={handleDashboardNavigation}
        />
        <Profile 
          user={user} 
          onBack={() => navigateTo('home')} 
        />
        <Footer />
      </>
    );
  }

  if (view === 'checkout') {
    return (
      <>
        <Navbar 
          onSignInClick={() => navigateTo('signin')} 
          onHomeClick={() => {
            if (view === 'home') {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
              navigateTo('home');
            }
          }}
          onContactClick={() => scrollToSection('footer')}
          cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
          onCartClick={() => setIsCartOpen(true)}
          currentLocation={address}
          onDetectLocation={handleDetectLocation}
          isDetecting={isDetecting}
          onSearchClick={() => setIsSearchOpen(true)}
          onRestaurantsClick={() => scrollToSection('restaurants')}
          user={user}
          onLogout={handleLogout}
          onProfileClick={() => navigateTo('profile')}
          onDashboardClick={handleDashboardNavigation}
        />
        <CheckoutPage 
          items={cart} 
          onBack={() => navigateTo('home')} 
          onOrderSuccess={handleOrderSuccess} 
        />
        <Footer />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-orange-500 selection:text-white">
      <Navbar 
        onSignInClick={() => {
          setRedirectAfterLogin(null);
          navigateTo('signin');
        }} 
        onHomeClick={() => {
          if (view === 'home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            navigateTo('home');
          }
        }}
        onContactClick={() => scrollToSection('footer')}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
        currentLocation={address}
        onDetectLocation={handleDetectLocation}
        isDetecting={isDetecting}
        onSearchClick={() => setIsSearchOpen(true)}
        onRestaurantsClick={() => scrollToSection('restaurants')}
        user={user}
        onLogout={handleLogout}
        onProfileClick={() => navigateTo('profile')}
        onDashboardClick={handleDashboardNavigation}
      />
      <main>
        <Hero 
          address={address} 
          setAddress={setAddress} 
          onDetectLocation={handleDetectLocation} 
          isDetecting={isDetecting} 
        />
        <Categories categories={categories} />
        <FeaturedRestaurants 
          restaurants={restaurantsWithDishes} 
          onAddToCart={addToCart} 
          currentLocation={address}
          onViewMenu={(restaurant) => setSelectedRestaurantForMenu(restaurant)}
        />
        <HowItWorks />
      </main>
      <Footer />

      <MenuModal 
        isOpen={!!selectedRestaurantForMenu}
        onClose={() => setSelectedRestaurantForMenu(null)}
        restaurant={selectedRestaurantForMenu!}
        onAddToCart={addDishToCart}
      />

      <AnimatePresence>
        {isSearchOpen && (
          <SearchModal 
            isOpen={isSearchOpen} 
            onClose={() => setIsSearchOpen(false)} 
            onAddToCart={addToCart}
          />
        )}
      </AnimatePresence>
      
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
        onCheckout={handleCheckout}
      />

      <SuccessModal 
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        orderId={lastOrderId}
      />
    </div>
  );
}
