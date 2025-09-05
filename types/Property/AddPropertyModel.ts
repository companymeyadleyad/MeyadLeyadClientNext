import { PropertyForShabatDetails } from "./PropertyForShabatDetails";

export interface AddPropertyModel {
    [key: string]: any;
    categoryType: number;
    addressCityStreet: string;
    houseNumber?: number;
    numberOfRoomsId: number;
    isPrivateHouse: boolean;
    porchCount: number;
    isThereSukaPorch: boolean;
    isThereParcking: boolean;
    isThereWarehouse: boolean;
    isThereOptions: boolean;
    isThereLandscape: boolean;
    propertySizeInMeters: number;
    floor: number;
    isTherElevator: boolean;
    price?: number;
    isThereSafeRoom: boolean;
    isFurnished: boolean;
    isMediation: boolean;
    propertyTax?: number;
    houseCommittee?: number;
    propertyTypeId?: number;
    isThereAirCondition?: boolean;
    propertyConditionId?: boolean;
    fullName?: string;
    phoneNumbers?: string;
    propertyForShabatDetails: PropertyForShabatDetails;
  }