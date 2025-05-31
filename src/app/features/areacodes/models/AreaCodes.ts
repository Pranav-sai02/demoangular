export interface AreaCodes {
  AreaCodeId: number;
  AreaCode: string;
  Description: string;
  Type: 'Landline' | 'Mobile' | 'International';
  IsActive: boolean;
  view: string;
  isDeleted?: boolean;
}
