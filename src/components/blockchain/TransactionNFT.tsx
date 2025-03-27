
import React, { useState } from 'react';
import { useMetaMask } from '@/hooks/use-metamask';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Check, Award, FileCheck, Loader2 } from 'lucide-react';

interface TransactionNFTProps {
  transactionId: string;
  amount: number;
  currency: string;
  counterparty: string;
  date: string;
}

const TransactionNFT = ({ transactionId, amount, currency, counterparty, date }: TransactionNFTProps) => {
  const { isConnected, account } = useMetaMask();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isMinted, setIsMinted] = useState(false);

  const truncateAddress = (address: string | null) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  const handleMintNFT = async () => {
    if (!isConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to mint transaction NFT",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simulate NFT minting
    setTimeout(() => {
      setIsLoading(false);
      setIsMinted(true);
      toast({
        title: "NFT Minted Successfully",
        description: `Transaction proof NFT for ID: ${transactionId} has been minted to your wallet`,
      });
    }, 2000);
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">Transaction Proof NFT</CardTitle>
            <CardDescription>Immutable blockchain record of transaction completion</CardDescription>
          </div>
          {isMinted && (
            <Badge className="bg-green-600 hover:bg-green-700">
              <Check className="mr-1 h-3 w-3" /> Minted
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-muted p-4 rounded-lg">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Transaction ID:</span>
                <span className="font-medium">{transactionId}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Amount:</span>
                <span className="font-medium">{amount} {currency}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Date:</span>
                <span className="font-medium">{date}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Counterparty:</span>
                <span className="font-medium">{counterparty}</span>
              </div>
              {isMinted && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Owner:</span>
                  <span className="font-medium">{truncateAddress(account)}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-3 bg-primary/5 p-3 rounded-lg">
            <FileCheck className="h-5 w-5 text-primary" />
            <div className="text-sm">
              <p>This NFT serves as immutable proof of transaction completion on the blockchain.</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        {!isMinted ? (
          <Button
            onClick={handleMintNFT}
            className="w-full"
            disabled={isLoading || !isConnected}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Minting NFT...
              </>
            ) : (
              <>
                <Award className="mr-2 h-4 w-4" />
                Mint Transaction NFT
              </>
            )}
          </Button>
        ) : (
          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              toast({
                title: "View on Explorer",
                description: "Opening NFT in blockchain explorer",
              });
            }}
          >
            <Award className="mr-2 h-4 w-4" />
            View NFT in Explorer
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default TransactionNFT;
