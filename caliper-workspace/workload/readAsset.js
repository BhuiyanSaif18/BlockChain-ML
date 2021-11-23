'use strict';

const { WorkloadModuleBase } = require('@hyperledger/caliper-core');

class MyWorkload extends WorkloadModuleBase {
    constructor() {
        super();
    }
    
    async initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext) {
        await super.initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext);

        // for (let i=0; i<this.roundArguments.assets; i++) {
        //     const assetID = `${this.workerIndex}_${i}`;
        //     console.log(`Worker ${this.workerIndex}: Creating asset ${assetID}`);
        //     const request = {
        //         contractId: this.roundArguments.contractId,
        //         contractFunction: 'CreateCar',
        //         invokerIdentity: 'User1',
        //         contractArguments: ["Toyota", "Prius", "blue", "Tomoko"],
        //         readOnly: false
        //     };
        //     await this.sutAdapter.sendRequests(request);
        // }
    }
    
    async submitTransaction() {
        const randomId = Math.floor(Math.random()*this.roundArguments.assets);
        const myArgs = {
            contractId: this.roundArguments.contractId,
            contractFunction: 'CreateCar',
            invokerIdentity: 'User1',
            contractArguments: [`CAR_${randomId}`, "Toyota", "Prius", "blue", "Tomoko"],
            readOnly: true
        };

        await this.sutAdapter.sendRequests(myArgs);
    }
    
    async cleanupWorkloadModule() {
        
    }
}

function createWorkloadModule() {
    return new MyWorkload();
}

module.exports.createWorkloadModule = createWorkloadModule;