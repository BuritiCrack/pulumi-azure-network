import * as azure from "@pulumi/azure-native";
import { VNet } from "./network/vnet";
import { Subnet } from "./network/subnet";
import { NSG } from "./network/nsg";
import { azureConfig } from "./config";

// Create Resource Group
const resourceGroup = new azure.resources.ResourceGroup("", {
    resourceGroupName: azureConfig.resourceGroupName,
    location: azureConfig.location
});

// Create NSG
const nsg = new NSG(
    azureConfig.nsgName,
    resourceGroup.name,
    azureConfig.location
);

// Create VNet
const vnet = new VNet(
    azureConfig.vnetName,
    resourceGroup.name,
    azureConfig.location,
    azureConfig.vnetAddressSpace
);

// Create Subnet with NSG associated
const subnet = new Subnet(
    azureConfig.subnetName,
    resourceGroup.name,
    vnet.vnet.name,
    azureConfig.subnetAddressPrefix,
    nsg.nsg.id
);

const subnet2 = new Subnet(
    azureConfig.subnet2Name,
    resourceGroup.name,
    vnet.vnet.name,
    azureConfig.subnet2AddressPrefix,
    nsg.nsg.id
);

const subnet3 = new Subnet(
    azureConfig.subnet3Name,
    resourceGroup.name,
    vnet.vnet.name,
    azureConfig.subnet3AddressPrefix,
    nsg.nsg.id
);

// Export the IDs of the created resources
export const resourceGroupId = resourceGroup.id;
export const vnetId = vnet.vnet.id;
export const subnetId = subnet.subnet.id;
export const subnet2Id = subnet2.subnet.id;
export const subnet3Id = subnet3.subnet.id;
export const nsgId = nsg.nsg.id;

