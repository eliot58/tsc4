import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from 'ton-core';

export type Task2Config = {};

export function task2ConfigToCell(config: Task2Config): Cell {
    return beginCell().endCell();
}

export class Task2 implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new Task2(address);
    }

    static createFromConfig(config: Task2Config, code: Cell, workchain = 0) {
        const data = task2ConfigToCell(config);
        const init = { code, data };
        return new Task2(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }

    async getMatrix(provider: ContractProvider){
        const result = await provider.get("matrix_multiplier", [{ type: 'tuple', items: [{ type: 'tuple', items: [{ type: 'int', value: BigInt(1) },{ type: 'int', value: BigInt(2) },{ type: 'int', value: BigInt(2) }] }, { type: 'tuple', items: [{ type: 'int', value: BigInt(3) },{ type: 'int', value: BigInt(1) },{ type: 'int', value: BigInt(1) }] }]}, { type: 'tuple', items: [{ type: 'tuple', items: [{ type: 'int', value: BigInt(4) },{ type: 'int', value: BigInt(2) }] }, { type: 'tuple', items: [{ type: 'int', value: BigInt(3) },{ type: 'int', value: BigInt(1) }] }, { type: 'tuple', items: [{ type: 'int', value: BigInt(1) },{ type: 'int', value: BigInt(5) }] }]}])
        return result.stack.readTuple();
    }
}
