export interface CityStreetAddressDto {
  addressDetail: string;
  addressVal: string;
}

export interface CityStreetAddressResponse {
  success: boolean;
  message: string;
  data: CityStreetAddressDto[];
}

// Export an empty object to satisfy the isolatedModules requirement
export {};
