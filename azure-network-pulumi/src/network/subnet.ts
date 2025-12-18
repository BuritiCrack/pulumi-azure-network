import * as azure from "@pulumi/azure-native";
import * as pulumi from "@pulumi/pulumi";

export class Subnet {
    public subnet: azure.network.Subnet;

    constructor(
        name: string,
        resourceGroupName: pulumi.Input<string>,
        vnetName: pulumi.Input<string>,
        addressPrefix: string,
        nsgId?: pulumi.Input<string>
    ) {
        this.subnet = new azure.network.Subnet(name, {
            subnetName: name,
            resourceGroupName: resourceGroupName,
            virtualNetworkName: vnetName,
            addressPrefix: addressPrefix,
            networkSecurityGroup: nsgId ? {
                id: nsgId
            } : undefined
        });
    }
}