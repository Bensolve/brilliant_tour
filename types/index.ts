// types/index.ts

export type UserRole = 'traveler' | 'scout' | 'operator' | 'admin'; // Standardized to lowercase

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
  price: number;
  scout_bounty: number;
  seats_available: number;
  image_url?: string;
  operator_id: string;
}

export interface Booking {
  id: string;
  user_id: string;
  trip_id: string;
  scout_id?: string;
  status: 'pending' | 'paid' | 'cancelled';
  total_price: number;
  admin_fee: number;
  scout_earning: number;
  created_at: string;
  trips?: Trip;
}

// --- ADDED FOR PRODUCTION READINESS ---

export interface Transaction {
  id: string;
  user_id: string;
  amount: number;
  type: 'earning' | 'payout' | 'payment';
  status: 'pending' | 'success' | 'failed';
  reference?: string; // Paystack reference
  created_at: string;
}

export interface Operator {
  id: string;
  user_id: string;
  company_name: string;
  fleet_size: number;
  momo_number: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}