import { ethers } from "ethers";
import { Web3Modal } from "@web3modal/html";

const WC_PROJECT_ID = "63bd4633378dbc52c202e15313227c54";
const RECEIVER = "0xF97a410f2f0b64Cb5820baD63d878c3A967235AA";
const USDC = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";

const app = document.getElementById("app");
app.innerHTML = `
  <div style="font-family: monospace; color: #00ff9d; background:#0b0f1a; height:100vh; display:flex; flex-direction:column; align-items:center; justify-content:center;">
    <h2>x402ape Payment</h2>
    <p>Pay 1 USDC on Base network</p>
    <button id="payMeta">Pay with MetaMask</button>
    <button id="payWC">Pay with WalletConnect</button>
    <div id="status" style="margin-top:15px; font-size:12px;"></div>
  </div>
`;

const statusEl = document.getElementById("status");

async function ensureBaseNetwork(provider) {
  const BASE_CHAIN_ID = "0x2105";
  const chainId = await provider.request({ method: "eth_chainId" });
  if (chainId !== BASE_CHAIN_ID) {
    try {
      await provider.request({ method: "wallet_switchEthereumChain", params: [{ chainId: BASE_CHAIN_ID }] });
    } catch {
      await provider.request({
        method: "wallet_addEthereumChain",
        params: [{
          chainId: BASE_CHAIN_ID,
          chainName: "Base",
          nativeCurrency: { name: "Base ETH", symbol: "ETH", decimals: 18 },
          rpcUrls: ["https://mainnet.base.org"],
          blockExplorerUrls: ["https://basescan.org"]
        }]
      });
    }
  }
}

async function sendUSDC(provider) {
  const ethersProvider = new ethers.BrowserProvider(provider);
  const signer = await ethersProvider.getSigner();
  const usdc = new ethers.Contract(USDC, ["function transfer(address to,uint256 amount) returns (bool)"], signer);
  const amount = ethers.parseUnits("1", 6);
  statusEl.textContent = "Please confirm 1 USDC transfer...";
  const tx = await usdc.transfer(RECEIVER, amount);
  statusEl.innerHTML = `Tx sent: <a href="https://basescan.org/tx/${tx.hash}" target="_blank">${tx.hash}</a>`;
  const receipt = await tx.wait();
  statusEl.innerHTML = receipt.status === 1
    ? `✅ Payment successful! <a href="https://basescan.org/tx/${tx.hash}" target="_blank">View on BaseScan</a>`
    : "❌ Transaction failed.";
}

document.getElementById("payMeta").onclick = async () => {
  if (!window.ethereum) {
    statusEl.textContent = "MetaMask not found";
    return;
  }
  await window.ethereum.request({ method: "eth_requestAccounts" });
  await ensureBaseNetwork(window.ethereum);
  await sendUSDC(window.ethereum);
};

document.getElementById("payWC").onclick = async () => {
  try {
    const modal = new Web3Modal({ projectId: WC_PROJECT_ID });
    const provider = await modal.connectWalletConnect();
    await ensureBaseNetwork(provider);
    await sendUSDC(provider);
  } catch (e) {
    statusEl.textContent = "❌ " + (e.message || e);
  }
};
