
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';

interface MetaMaskContextType {
  isAvailable: boolean;
  isConnected: boolean;
  account: string | null;
  connectWallet: () => Promise<void>;
  chainId: string | null;
  isConnecting: boolean;
  isMetaMaskInstalled: boolean;
}

const MetaMaskContext = createContext<MetaMaskContextType>({
  isAvailable: false,
  isConnected: false,
  account: null,
  connectWallet: async () => {},
  chainId: null,
  isConnecting: false,
  isMetaMaskInstalled: false,
});

export const useMetaMask = () => useContext(MetaMaskContext);

interface MetaMaskProviderProps {
  children: ReactNode;
}

export const MetaMaskProvider: React.FC<MetaMaskProviderProps> = ({ children }) => {
  const [isAvailable, setIsAvailable] = useState<boolean>(false);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [account, setAccount] = useState<string | null>(null);
  const [chainId, setChainId] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState<boolean>(false);
  const { toast } = useToast();

  // Check if MetaMask is available
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const { ethereum } = window as any;
      const isInstalled = !!ethereum && !!ethereum.isMetaMask;
      setIsAvailable(isInstalled);
      setIsMetaMaskInstalled(isInstalled);
    }
  }, []);

  // Check if already connected
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const { ethereum } = window as any;
        if (ethereum && ethereum.isMetaMask) {
          const accounts = await ethereum.request({ method: 'eth_accounts' });
          if (accounts && accounts.length > 0) {
            setAccount(accounts[0]);
            setIsConnected(true);
            const chainId = await ethereum.request({ method: 'eth_chainId' });
            setChainId(chainId);
          }
        }
      } catch (error) {
        console.error('Error checking connection:', error);
      }
    };

    checkConnection();
  }, []);

  // Listen for account and chain changes
  useEffect(() => {
    const { ethereum } = window as any;
    if (ethereum && ethereum.isMetaMask) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          setIsConnected(false);
          setAccount(null);
          toast({
            title: "Disconnected",
            description: "Wallet has been disconnected",
          });
        } else {
          setAccount(accounts[0]);
          setIsConnected(true);
        }
      };

      const handleChainChanged = (chainId: string) => {
        setChainId(chainId);
        window.location.reload();
      };

      ethereum.on('accountsChanged', handleAccountsChanged);
      ethereum.on('chainChanged', handleChainChanged);

      return () => {
        ethereum.removeListener('accountsChanged', handleAccountsChanged);
        ethereum.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, [toast]);

  const connectWallet = async () => {
    try {
      setIsConnecting(true);
      const { ethereum } = window as any;
      if (!ethereum) {
        toast({
          title: "MetaMask not installed",
          description: "Please install MetaMask to connect your wallet",
          variant: "destructive",
        });
        return;
      }

      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        setIsConnected(true);
        const chainId = await ethereum.request({ method: 'eth_chainId' });
        setChainId(chainId);
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      throw error;
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <MetaMaskContext.Provider
      value={{
        isAvailable,
        isConnected,
        account,
        connectWallet,
        chainId,
        isConnecting,
        isMetaMaskInstalled,
      }}
    >
      {children}
    </MetaMaskContext.Provider>
  );
};
