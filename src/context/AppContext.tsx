/* oxlint-disable react/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'user' | 'admin';
  emergencyName?: string;
  emergencyRelation?: string;
  emergencyPhone?: string;
  bloodGroup?: string;
  allergies?: string;
  medicalConditions?: string;
}

export interface Booking {
  id: string;
  userId: string;
  userEmail: string;
  trekId: string;
  trekName: string;
  batch: string;
  groupSize: number;
  offloadBackpack: boolean;
  totalCost: number;
  status: 'Inquiry' | 'Approved' | 'Paid' | 'Completed' | 'Cancelled';
  paymentId?: string;
  createdAt: string;
}

import type { AestheticTheme } from '../components/ThemeSelector';

interface AppContextType {
  currentUser: User | null;
  bookings: Booking[];
  wishlist: string[];
  theme: AestheticTheme;
  setTheme: (newTheme: AestheticTheme) => void;
  login: (email: string, password?: string) => Promise<boolean>;
  register: (name: string, email: string, password?: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  logout: () => void;
  updateProfile: (updatedData: Partial<User>) => void;
  addBooking: (bookingData: Omit<Booking, 'id' | 'userId' | 'userEmail' | 'createdAt' | 'status'>) => Promise<Booking>;
  updateBookingStatus: (bookingId: string, status: Booking['status'], paymentId?: string) => void;
  toggleWishlist: (trekId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppContextProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [usersDb, setUsersDb] = useState<User[]>([]);
  const [theme, setThemeState] = useState<AestheticTheme>(() => {
    const saved = localStorage.getItem('dnt_theme_setting');
    return (saved as AestheticTheme) || 'emerald';
  });

  const setTheme = (newTheme: AestheticTheme) => {
    setThemeState(newTheme);
    localStorage.setItem('dnt_theme_setting', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // 1. Initialize local persistent database from localStorage on mount
  useEffect(() => {
    const savedUsers = localStorage.getItem('dnt_users_db');
    const savedBookings = localStorage.getItem('dnt_bookings_db');
    const savedSession = localStorage.getItem('dnt_active_session');

    // Prepopulate seed accounts if database doesn't exist
    if (savedUsers) {
      setUsersDb(JSON.parse(savedUsers));
    } else {
      const seedUsers: User[] = [
        {
          id: 'admin-1',
          name: 'Trails Admin',
          email: 'admin@desinomadtrails.in',
          role: 'admin'
        },
        {
          id: 'user-1',
          name: 'Suraj Raftaar',
          email: 'nomad@desinomadtrails.in',
          phone: '9450551538',
          role: 'user',
          emergencyName: 'Ramesh Raftaar',
          emergencyRelation: 'Father',
          emergencyPhone: '9450551539',
          bloodGroup: 'O+',
          allergies: 'None',
          medicalConditions: 'None'
        }
      ];
      localStorage.setItem('dnt_users_db', JSON.stringify(seedUsers));
      setUsersDb(seedUsers);
    }

    if (savedBookings) {
      setBookings(JSON.parse(savedBookings));
    } else {
      const seedBookings: Booking[] = [
        {
          id: 'BKG-9921',
          userId: 'user-1',
          userEmail: 'nomad@desinomadtrails.in',
          trekId: 'beas-kund',
          trekName: 'Beas Kund Expedition',
          batch: 'Aug 08 - Aug 15 (Filling Fast)',
          groupSize: 2,
          offloadBackpack: false,
          totalCost: 19800,
          status: 'Inquiry',
          createdAt: new Date().toISOString()
        }
      ];
      localStorage.setItem('dnt_bookings_db', JSON.stringify(seedBookings));
      setBookings(seedBookings);
    }

    if (savedSession) {
      const active = JSON.parse(savedSession);
      setCurrentUser(active);
      const savedWish = localStorage.getItem(`dnt_wishlist_${active.id}`);
      if (savedWish) {
        setWishlist(JSON.parse(savedWish));
      }
    }
  }, []);

  // Sync state modifications to Local Storage
  const syncUsersDb = (newDb: User[]) => {
    setUsersDb(newDb);
    localStorage.setItem('dnt_users_db', JSON.stringify(newDb));
  };

  const syncBookingsDb = (newBookings: Booking[]) => {
    setBookings(newBookings);
    localStorage.setItem('dnt_bookings_db', JSON.stringify(newBookings));
  };

  const login = async (email: string, _password?: string): Promise<boolean> => {
    const match = usersDb.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (match) {
      setCurrentUser(match);
      localStorage.setItem('dnt_active_session', JSON.stringify(match));
      const savedWish = localStorage.getItem(`dnt_wishlist_${match.id}`);
      setWishlist(savedWish ? JSON.parse(savedWish) : []);
      return true;
    }
    return false;
  };

  const register = async (name: string, email: string, _password?: string): Promise<boolean> => {
    const exists = usersDb.some(u => u.email.toLowerCase() === email.toLowerCase());
    if (exists) return false;

    const newUser: User = {
      id: `usr-${Date.now()}`,
      name,
      email,
      role: 'user'
    };

    const newDb = [...usersDb, newUser];
    syncUsersDb(newDb);
    setCurrentUser(newUser);
    localStorage.setItem('dnt_active_session', JSON.stringify(newUser));
    setWishlist([]);
    return true;
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    // Simulating instant Google SSO login
    const match = usersDb.find(u => u.email === 'nomad@desinomadtrails.in') || usersDb[0];
    setCurrentUser(match);
    localStorage.setItem('dnt_active_session', JSON.stringify(match));
    const savedWish = localStorage.getItem(`dnt_wishlist_${match.id}`);
    setWishlist(savedWish ? JSON.parse(savedWish) : []);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    setWishlist([]);
    localStorage.removeItem('dnt_active_session');
  };

  const updateProfile = (updatedData: Partial<User>) => {
    if (!currentUser) return;
    const updatedUser = { ...currentUser, ...updatedData };
    setCurrentUser(updatedUser);
    localStorage.setItem('dnt_active_session', JSON.stringify(updatedUser));

    const updatedDb = usersDb.map(u => u.id === currentUser.id ? updatedUser : u);
    syncUsersDb(updatedDb);
  };

  const addBooking = async (bookingData: Omit<Booking, 'id' | 'userId' | 'userEmail' | 'createdAt' | 'status'>): Promise<Booking> => {
    const userId = currentUser ? currentUser.id : 'anonymous';
    const userEmail = currentUser ? currentUser.email : 'guest@desinomadtrails.in';
    const newBooking: Booking = {
      ...bookingData,
      id: `BKG-${Math.floor(1000 + Math.random() * 9000)}`,
      userId,
      userEmail,
      status: 'Inquiry',
      createdAt: new Date().toISOString()
    };

    const newDb = [newBooking, ...bookings];
    syncBookingsDb(newDb);
    return newBooking;
  };

  const updateBookingStatus = (bookingId: string, status: Booking['status'], paymentId?: string) => {
    const updated = bookings.map(b => {
      if (b.id === bookingId) {
        return { ...b, status, ...(paymentId ? { paymentId } : {}) };
      }
      return b;
    });
    syncBookingsDb(updated);
  };

  const toggleWishlist = (trekId: string) => {
    if (!currentUser) return;
    let newWish: string[];
    if (wishlist.includes(trekId)) {
      newWish = wishlist.filter(id => id !== trekId);
    } else {
      newWish = [...wishlist, trekId];
    }
    setWishlist(newWish);
    localStorage.setItem(`dnt_wishlist_${currentUser.id}`, JSON.stringify(newWish));
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      bookings,
      wishlist,
      theme,
      setTheme,
      login,
      register,
      loginWithGoogle,
      logout,
      updateProfile,
      addBooking,
      updateBookingStatus,
      toggleWishlist
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppContextProvider');
  }
  return context;
}
