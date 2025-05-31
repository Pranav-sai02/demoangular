export interface ServiceProviders {
  id: number;
  name: string;
  address: string;
  manager: string;
  townCity: string;
  province: string;
  accredited: boolean;
  isActive: boolean;
  view: string;
  isDeleted?: boolean;
}

export interface ServiceProvidersPopup {
  id?: number;
  name: string;
  officeAddress: string;
  storageAddress: string;
  vatNumber: string;
  branch: string;
  townCity: string;
  province: string;
  email: string;
  mobileNumber: string;
  telephone: string;
  fax: string;
  manager: string;
  designationNumber: string;
  canEditAddress: boolean;
  isVerified: boolean;
  isAccredited: boolean;
  isActive: boolean;
  isDeleted?: boolean;
}
