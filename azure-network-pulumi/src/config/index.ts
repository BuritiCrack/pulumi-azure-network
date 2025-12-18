import * as pulumi from "@pulumi/pulumi";

const config = new pulumi.Config();

export const azureConfig = {
    location: config.get("azure-native:location") || "westus",
    
    resourceGroupName: config.require("resourceGroupName"),
    
    vnetName: "myVNet",
    vnetAddressSpace: ["10.0.0.0/16"],

    subnetName: "invitados",
    subnetAddressPrefix: "10.0.1.0/24",

    subnet2Name: "servidores",
    subnet2AddressPrefix: "10.0.2.0/24",

    subnet3Name: "bd",
    subnet3AddressPrefix: "10.0.3.0/24",

    nsgName: "myNSG"
};