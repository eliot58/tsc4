import { toNano } from 'ton-core';
import { Task4 } from '../wrappers/Task4';
import { compile, NetworkProvider } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider) {
    const task4 = provider.open(Task4.createFromConfig({}, await compile('Task4')));

    await task4.sendDeploy(provider.sender(), toNano('0.02'));

    await provider.waitForDeploy(task4.address);

    const res = await task4.getEncrypt();

    console.log(res.readTuple());
}
