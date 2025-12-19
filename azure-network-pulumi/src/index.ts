import * as azure from "@pulumi/azure-native";
import { VNet } from "./network/vnet";
import { Subnet } from "./network/subnet";
import { NSG } from "./network/nsg";
import { azureConfig } from "./config";

// Crear Resource Group
const resourceGroup = new azure.resources.ResourceGroup("rg", {
    resourceGroupName: azureConfig.resourceGroupName,
    location: azureConfig.location
});

// Crear NSG
const nsg = new NSG(
    azureConfig.nsgName,
    resourceGroup.name,
    azureConfig.location
);

// Crear VNet
const vnet = new VNet(
    azureConfig.vnetName,
    resourceGroup.name,
    azureConfig.location,
    azureConfig.vnetAddressSpace
);

// Crear Subnet con NSG asociado
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

// Exportar los IDs de los recursos creados
export const resourceGroupId = resourceGroup.id;
export const vnetId = vnet.vnet.id;
export const subnetId = subnet.subnet.id;
export const subnet2Id = subnet2.subnet.id;
export const nsgId = nsg.nsg.id;

