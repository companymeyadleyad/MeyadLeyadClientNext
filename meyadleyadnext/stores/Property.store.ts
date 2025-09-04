import { makeAutoObservable, observable } from "mobx";
import { AddPropertyModel } from "../types/Property/AddPropertyModel";

export class PropertyStore {
  propertyToAdd: AddPropertyModel;//

  constructor() {
    this.propertyToAdd = this.getDefaultProperty();
    makeAutoObservable(this);
  }

  updateProperty(partial: Partial<AddPropertyModel>) {
    Object.assign(this.propertyToAdd, partial);
  }


  setPropertyToAdd(property: AddPropertyModel) {
    // יצירת עותק חדש כדי לשמור על עקביות
    this.propertyToAdd = { ...property };
  }

  reset() {
    this.propertyToAdd = this.getDefaultProperty();
  }

  private getDefaultProperty(): AddPropertyModel {
    return {
      categoryType: 0,
      addressCityStreet: "",
      houseNumber: undefined, // Optional field
      numberOfRoomsId: 1, // Default to 1 room
      isPrivateHouse: false,
      porchCount: 0,
      isThereSukaPorch: false,
      isThereParcking: false,
      isThereWarehouse: false,
      isThereOptions: false,
      isThereLandscape: false,
      propertySizeInMeters: 0,
      floor: 0,
      isTherElevator: false,
      price: undefined, // Optional
      isThereSafeRoom: false,
      isFurnished: false,
      isMediation: false,
      propertyTax: undefined, // Optional
      houseCommittee: undefined, // Optional
      propertyTypeId: undefined, // Optional
      isThereAirCondition: undefined, // Optional
      propertyConditionId: undefined, // Optional
      fullName: "",
      phoneNumbers: ""
    } as AddPropertyModel;
  };
}

export const propertyStore = new PropertyStore();