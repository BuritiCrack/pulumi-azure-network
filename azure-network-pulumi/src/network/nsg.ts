import * as azure from "@pulumi/azure-native";
import * as pulumi from "@pulumi/pulumi";

export class NSG {
    public nsg: azure.network.NetworkSecurityGroup;

    constructor(
        name: string,
        resourceGroupName: pulumi.Input<string>,
        location: pulumi.Input<string>,
        rules?: azure.types.input.network.SecurityRuleArgs[]
    ) {
        this.nsg = new azure.network.NetworkSecurityGroup(name, {
            networkSecurityGroupName: name,
            resourceGroupName: resourceGroupName,
            location: location,
            securityRules: rules || [
                {
                    name: "allow-ssh",
                    priority: 1000,
                    direction: "Inbound",
                    access: "Allow",
                    protocol: "Tcp",
                    sourcePortRange: "*",
                    destinationPortRange: "22",
                    sourceAddressPrefix: "*",
                    destinationAddressPrefix: "*"
                },
                {
                    name: "allow-http",
                    priority: 1001,
                    direction: "Inbound",
                    access: "Allow",
                    protocol: "Tcp",
                    sourcePortRange: "*",
                    destinationPortRange: "80",
                    sourceAddressPrefix: "*",
                    destinationAddressPrefix: "*"
                }
            ]
        });
    }
}