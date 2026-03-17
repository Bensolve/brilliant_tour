// types/index.ts

export type UserRole = 'TRAVELER' | 'SCOUT' | 'OPERATOR' | 'ADMIN';

export interface UserProfile {
  id: string;
  full_name?: string;
  phone?: string;
  email?: string;
  avatar_url?: string;
  role: UserRole;
  wallet_balance: number;
  referral_code?: string;
}

export interface Trip {
  id: string;
  title: string;
  from_place: string;
  to_place: string;
  departure_date: string;
  price: number;            // What the traveler pays
  scout_bounty: number;     // What the operator offers as a reward
  seats_available: number;
  image_url?: string;
  operator_id: string;      // Link to the user who created the trip
}

export interface Booking {
  id: string;
  user_id: string;
  trip_id: string;
  scout_id?: string;        // ID of the person who shared the link
  status: 'pending' | 'paid' | 'cancelled';
  total_price: number;
  admin_fee: number;        // Your 15% cut of the bounty
  scout_earning: number;    // Scout's 85% cut of the bounty
  created_at: string;
  trips?: Trip;
}