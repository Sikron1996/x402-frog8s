<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>x402ape — Pay 1 USDC (Base)</title>
  <script type="module">
    import { ethers } from "https://cdn.jsdelivr.net/npm/ethers@6.13.2/dist/ethers.esm.min.js";
    import { WalletConnectModal } from "https://cdn.jsdelivr.net/npm/@walletconnect/modal@2.6.2/dist/index.modern.js";
    import { EthereumProvider } from "https://cdn.jsdelivr.net/npm/@walletconnect/ethereum-provider@2.14.1/dist/index.modern.js";

    const WC_PROJECT_ID = "63bd4633378dbc52c202e15313227c54";
    const RECEIVER = "0xF97a410f2f0b64Cb5820baD63d878c3A967235AA";
    const USDC = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";

    const app = document.getElementById("app");
    app.innerHTML = `
      <div style="font-family: monospace; color:#00ff9d; background:#0b0f1a; height:100vh; display:flex; flex-direction:column; align-items:center; justify-content:center;">
        <h2>x402ape Payment</h2>
        <p>Pay 1 USDC on Base network</p>
        <button id="payMeta">Pay with MetaMask</button>
        <button id="payWC">Pay with WalletConnect</button>
        <div id="status" style="margin-top:15px; font-size:12px;"></div>
      </div>
    `;

    const statusEl = document.getElementById("status");

    async function ensureBase(provider) {
      const BASE = "0x2105";
      const chain = await provider.request({ method: "eth_chainId" });
      if (chain !== BASE) {
        try {
          await provider.request({ method: "wallet_switchEthereumChain", params: [{ chainId: BASE }] });
        } catch {
          await provider.request({
            method: "wallet_addEthereumChain",
            params: [{
              chainId: BASE,
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
      statusEl.textContent = "Please confirm 1 USDC transfer…";
      const tx = await usdc.transfer(RECEIVER, amount);
      statusEl.innerHTML = `Tx sent:<br><a href="https://basescan.org/tx/${tx.hash}" target="_blank">${tx.hash}</a>`;
      const rc = await tx.wait();
      statusEl.innerHTML = rc.status === 1
        ? `✅ Payment successful!<br><a href="https://basescan.org/tx/${tx.hash}" target="_blank">View on BaseScan</a>`
        : "❌ Transaction failed.";
    }

    document.getElementById("payMeta").onclick = async () => {
      if (!window.ethereum) return statusEl.textContent = "❌ MetaMask not found";
      await window.ethereum.request({ method: "eth_requestAccounts" });
      await ensureBase(window.ethereum);
      await sendUSDC(window.ethereum);
    };

    document.getElementById("payWC").onclick = async () => {
      try {
        statusEl.textContent = "Opening WalletConnect…";

        const provider = await EthereumProvider.init({
          projectId: WC_PROJECT_ID,
          chains: [8453],
          showQrModal: true
        });

        const modal = new WalletConnectModal({
          projectId: WC_PROJECT_ID,
          themeMode: "dark"
        });
        modal.openModal();

        await provider.enable();
        modal.closeModal();

        await ensureBase(provider);
        await sendUSDC(provider);
      } catch (e) {
        console.error(e);
        statusEl.textContent = "❌ " + (e?.message || e);
      }
    };
  </script>
</head>
<body>
  <div id="app"></div>
</body>
</html>
