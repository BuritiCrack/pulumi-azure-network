import * as pulumi from "@pulumi/pulumi";

const config = new pulumi.Config();
const appName = "azure-network-pulumi";
const env = pulumi.getStack();
const location = config.get("azure-native:location") || "westus";
const rGroupName = config.require(`rg-${appName}-${env}-${location}`);

export const azureConfig = {
    location: location,

    resourceGroupName: rGroupName,
    
    // this vnet contain 3 subnets and has 256 IPs (/24)
    vnetName: `vnet-${appName}-${env}-${location}`,
    vnetAddressSpace: ["10.0.0.0/24"],

    // each snet has 32 IPs (/27)
    subnetName: `snet-${appName}-${env}-${location}-Frontend`,
    subnetAddressPrefix: "10.0.0.0/27",

    subnet2Name: `snet-${appName}-${env}-${location}-Backend`,
    subnet2AddressPrefix: "10.0.0.32/27",

    subnet3Name: `snet-${appName}-${env}-${location}-Database`,
    subnet3AddressPrefix: "10.0.0.64/27",

    nsgName: `nsg-${appName}-${env}-${location}`,
};