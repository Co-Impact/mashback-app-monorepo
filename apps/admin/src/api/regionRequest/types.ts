
export enum AwsRegion {
  us_east_1 = 'us_east_1',
  us_west_2 = 'us_west_2',
  ap_south_1 = 'ap_south_1',
  ap_southeast_2 = 'ap_southeast_2',
  ap_southeast_1 = 'ap_southeast_1',
  me_central_1 = 'me_central_1',
  il_central_1 = 'il_central_1',
  eu_west_1 = 'eu_west_1',
  sa_east_1 = 'sa_east_1',
  af_south_1 = 'af_south_1',
}

export enum AzureRegion {
  eastus = 'eastus',
  westus2 = 'westus2',
  centralindia = 'centralindia',
  australiacentral = 'australiacentral',
  southeastasia = 'southeastasia',
  uaenorth = 'uaenorth',
  israelcentral = 'israelcentral',
  westeurope = 'westeurope',
  southcentralus = 'southcentralus',
  southafricanorth = 'southafricanorth',
}

export enum CloudProvider {
  AWS = 'AWS',
  AZURE = 'AZURE',
}

export enum LabServiceType {
  CTF = 'CTF',
  LAB = 'LAB',
}

export interface IFilterRegion {
  type?: LabServiceType;
  cloudProvider?: CloudProvider;
  awsRegion?: AwsRegion;
  azureRegion?: AzureRegion;
}
