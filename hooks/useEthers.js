import { useEffect, useState } from "react";
import Web3 from "web3";

export default function useEthers() {
  const [web3, setWeb3] = useState({});

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      typeof window.ethereum !== "undefined"
    ) {
      // we are in the browser and metamask is running
      window.ethereum.request({ method: "eth_requestAccounts" });
      setWeb3(new Web3(window.ethereum));
    }
  }, []);

  async function addBaseNetwork() {
    try {
      await web3.currentProvider.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x2105",
            chainName: "Base",
            rpcUrls: ["https://base.llamarpc.com"],
            nativeCurrency: {
              name: "Base",
              symbol: "ETH",
              decimals: 18,
            },
            blockExplorerUrls: ["https://basescan.org"],
          },
        ],
      });
      return true;
    } catch (error) {
      console.log("Error adding network:", error);
      return false;
    }
  }

  async function switchToBaseNetwork() {
    try {
      await web3.currentProvider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x2105" }], // Base network chain ID
      });
      return true;
    } catch (error) {
      console.log("Error switching network:", error);
      return false;
    }
  }

  async function checkBaseNetwork() {
    try {
      const networkId = await web3.eth.net.getId();
      return networkId === 8453;
    } catch (error) {
      console.log("Error checking network:", error);
      return false;
    }
  }

  async function autoBaseHandler() {
    try {
      const isMumbai = await checkBaseNetwork();
      if (isMumbai) {
        // Proceed with the next action
        console.log("Connected to Base network");
        return true;
      } else {
        const switched = await switchToBaseNetwork();
        if (switched) {
          // Switch to Base network
          console.log("switched to base network");
          return true;
        } else {
          // Add Base network or show an alert to the user
          const hasAddEthereumChain = await addBaseNetwork();
          if (hasAddEthereumChain) {
            console.log("Base added");
            return true;
          } else {
            return false;
          }
        }
      }
    } catch (e) {
      window.open(`https://metamask.io/download.html`, "_blank", "noreferrer");
      return false;
    }
  }

  return {
    web3,
    addBaseNetwork,
    switchToBaseNetwork,
    autoBaseHandler,
  };
}
