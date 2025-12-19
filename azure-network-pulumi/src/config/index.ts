import * as pulumi from "@pulumi/pulumi";

const config = new pulumi.Config();

export const azureConfig = {
    location: config.get("azure-native:location") || "westus",
    
    resourceGroupName: config.require("resourceGroupName"),
    
    // myVNet queda con 16 IPs 
    vnetName: "myVNet",
    vnetAddressSpace: ["10.0.0.0/28"],

    // cada subnet queda con 8 ips y azure se reserta 5 ips
    subnetName: "Backend",
    subnetAddressPrefix: "10.0.0.0/29",

    subnet2Name: "Frontend",
    subnet2AddressPrefix: "10.0.0.8/29",

    nsgName: "myNSG"
};