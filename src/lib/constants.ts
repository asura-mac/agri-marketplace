/**
 * Shared constants used across the application
 */

/**
 * List of all Indian States and Union Territories
 * Used in onboarding and listing forms for consistent state selection
 */
export const INDIAN_STATES_AND_UTS = [
  "Andhra Pradesh",
  "Arunachal Pradesh", 
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry"
] as const;

/**
 * Type for Indian state/UT values
 */
export type IndianState = typeof INDIAN_STATES_AND_UTS[number];

/**
 * Check if a string is a valid Indian state/UT
 */
export function isValidIndianState(state: string): state is IndianState {
  return INDIAN_STATES_AND_UTS.includes(state as IndianState);
}

/**
 * Get state options for dropdown components
 */
export function getStateOptions() {
  return INDIAN_STATES_AND_UTS.map(state => ({
    value: state,
    label: state
  }));
}
