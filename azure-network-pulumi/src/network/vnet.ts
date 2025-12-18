import * as pulumi from "@pulumi/pulumi";
import * as azure from "@pulumi/azure-native";

export class VNet {
    public vnet: azure.network.VirtualNetwork;

    constructor(
        name: string,
        resourceGroupName: pulumi.Input<string>,
        location: pulumi.Input<string>,
        addressSpace: string[]
    ) {
        this.vnet = new azure.network.VirtualNetwork(name, {
            virtualNetworkName: name,
            resourceGroupName: resourceGroupName,
            location: location,
            addressSpace: {
                addressPrefixes: addressSpace
            }
        });
    }
}