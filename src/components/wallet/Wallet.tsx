
import React from 'react';
import { useMetaMask } from '@/hooks/use-metamask';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Loader2, ExternalLink, AlertCircle, CheckCircle2 } from 'lucide-react';

const Wallet = () => {
  const { account, connectWallet, isConnecting, isConnected, isMetaMaskInstalled, chainId } = useMetaMask();

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  const getNetworkName = (chainId: string | null) => {
    if (!chainId) return 'Unknown Network';
    
    const networks: Record<string, string> = {
      '0x1': 'Ethereum Mainnet',
      '0x3': 'Ropsten Testnet',
      '0x4': 'Rinkeby Testnet',
      '0x5': 'Goerli Testnet',
      '0x2a': 'Kovan Testnet',
      '0x89': 'Polygon Mainnet',
      '0x13881': 'Mumbai Testnet'
    };
    
    return networks[chainId] || `Chain ID: ${parseInt(chainId, 16)}`;
  };

  if (!isMetaMaskInstalled) {
    return (
      <Card className="w-full max-w-md mx-auto border-destructive/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertCircle size={18} /> MetaMask Not Detected
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            To use TransacShield's blockchain features, you'll need to install the MetaMask extension.
          </p>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full" 
            onClick={() => window.open('https://metamask.io/download.html', '_blank')}
          >
            Install MetaMask <ExternalLink size={16} className="ml-2" />
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Blockchain Wallet</span>
          {isConnected && (
            <span className="text-xs flex items-center gap-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 py-1 px-2 rounded-full">
              <CheckCircle2 size={12} /> Connected
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isConnected && account ? (
          <>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Network</span>
                <span className="font-medium">{getNetworkName(chainId)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Address</span>
                <span className="font-medium">{formatAddress(account)}</span>
              </div>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Status</span>
              <span className="inline-flex items-center gap-1 text-green-600 text-sm font-medium">
                <span className="h-2 w-2 rounded-full bg-green-500"></span> Active
              </span>
            </div>
          </>
        ) : (
          <div className="text-center py-3">
            <p className="text-muted-foreground mb-4">
              Connect your MetaMask wallet to start secure transactions with TransacShield
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        {!isConnected ? (
          <Button 
            className="w-full" 
            onClick={connectWallet} 
            disabled={isConnecting}
          >
            {isConnecting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Connecting...
              </>
            ) : (
              'Connect Wallet'
            )}
          </Button>
        ) : (
          <div className="grid grid-cols-2 gap-2 w-full">
            <Button variant="outline" onClick={() => window.open(`https://etherscan.io/address/${account}`, '_blank')}>
              View on Explorer <ExternalLink size={14} className="ml-1" />
            </Button>
            <Button>Create Transaction</Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default Wallet;
