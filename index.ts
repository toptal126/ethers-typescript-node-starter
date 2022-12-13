import { ethers } from "ethers";
import ERC20ABI from "./abi/ABI_ERC20.json";

const provider = new ethers.providers.JsonRpcProvider(
  "https://rpc.ankr.com/fantom"
);

// 0x1a77a3bdfc146842296912cbfafb67064f2c629b
const erc20Address = "0x04068da6c83afcfa0e13ba15a6696662335d5b75";
const pairs = [
  {
    owner: "0xAFEd2Cac4b237D7212c53c59D46a1aF7B6d1edD5",
    spender: "0xd0bfE966fB51A88F35b641D7ABE6d1A983cF27b8",
  },
  {
    owner: "0xB4C93d0A04D4B7966776cC2A0Ba31b2C9Bd40d18",
    spender: "0xd0bfE966fB51A88F35b641D7ABE6d1A983cF27b8",
  },
  {
    owner: "0x85e9222092B5072e6705BDD7Fb44344135A12941",
    spender: "0xd0bfE966fB51A88F35b641D7ABE6d1A983cF27b8",
  },
  {
    owner: "0xF6E7CEc8bd7409c639dC613aA3c83cc3b32148E6",
    spender: "0xd0bfE966fB51A88F35b641D7ABE6d1A983cF27b8",
  },
  {
    owner: "0xe6e2c266543ee7a01de3a61e8517b1a164a041ef",
    spender: "0xd0bfE966fB51A88F35b641D7ABE6d1A983cF27b8",
  },
  {
    owner: "0xF4513624FBDFeAfB4Ba7877E5Ea0c35c7d53414E",
    spender: "0xd0bfE966fB51A88F35b641D7ABE6d1A983cF27b8",
  },
];

const getAllowance = async (): Promise<any> => {
  const erc20Contract = new ethers.Contract(erc20Address, ERC20ABI, provider);
  pairs.forEach(async (pair) => {
    const [allowance, balance] = await Promise.all([
      erc20Contract.allowance(pair.owner, pair.spender),
      erc20Contract.balanceOf(pair.owner),
    ]);
    console.log(
      pair.owner.slice(0, 6),
      balance.gt(0) && allowance.gt(balance),
      ` -- $${balance.toString() / 10 ** 6}`,
      " --------------- ",
      allowance.toString()
    );
  });
  return "abc";
};

getAllowance();
