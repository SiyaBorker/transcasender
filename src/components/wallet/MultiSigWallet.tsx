
import React, { useState } from 'react';
import { useMetaMask } from '@/hooks/use-metamask';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Plus, UserPlus, Users, Loader2, Shield, Check, ArrowRight } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const MultiSigWallet = () => {
  const { isConnected, account } = useMetaMask();
  const { toast } = useToast();
  const [cosigners, setCosigners] = useState<string[]>([]);
  const [newCosigner, setNewCosigner] = useState('');
  const [requiredSignatures, setRequiredSignatures] = useState(2);
  const [isCreating, setIsCreating] = useState(false);
  const [isWalletCreated, setIsWalletCreated] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  const handleAddCosigner = () => {
    if (!newCosigner || !newCosigner.startsWith('0x') || newCosigner.length !== 42) {
      toast({
        title: "Invalid Address",
        description: "Please enter a valid Ethereum address",
        variant: "destructive",
      });
      return;
    }

    if (cosigners.includes(newCosigner)) {
      toast({
        title: "Duplicate Address",
        description: "This address is already a cosigner",
        variant: "destructive",
      });
      return;
    }

    setCosigners([...cosigners, newCosigner]);
    setNewCosigner('');
  };

  const handleRemoveCosigner = (address: string) => {
    setCosigners(cosigners.filter(cosigner => cosigner !== address));
  };

  const handleCreateWallet = () => {
    if (!isConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to create a multi-signature wallet",
        variant: "destructive",
      });
      return;
    }

    if (cosigners.length < 1) {
      toast({
        title: "Insufficient Cosigners",
        description: "Add at least one more cosigner to create a multi-signature wallet",
        variant: "destructive",
      });
      return;
    }

    if (requiredSignatures > cosigners.length + 1 || requiredSignatures < 1) {
      toast({
        title: "Invalid Signature Requirement",
        description: `Required signatures must be between 1 and ${cosigners.length + 1}`,
        variant: "destructive",
      });
      return;
    }

    setIsCreating(true);

    // Simulate wallet creation
    setTimeout(() => {
      const generatedAddress = `0x${Array.from({length: 40}, () => Math.floor(Math.random() * 16).toString(16)).join('')}`;
      setWalletAddress(generatedAddress);
      setIsWalletCreated(true);
      setIsCreating(false);
      toast({
        title: "Multi-Signature Wallet Created",
        description: "Your secure multi-signature wallet has been deployed on the blockchain",
      });
    }, 2000);
  };

  const truncateAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center">
              <Shield className="mr-2 h-5 w-5 text-primary" />
              Multi-Signature Wallet
            </CardTitle>
            <CardDescription>Create a wallet that requires multiple approvals for enhanced security</CardDescription>
          </div>
          {isWalletCreated && (
            <Badge className="bg-green-600 hover:bg-green-700">
              <Check className="mr-1 h-3 w-3" /> Active
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {!isWalletCreated ? (
          <div className="space-y-4">
            <div>
              <Label htmlFor="cosigners">Cosigners</Label>
              <div className="mt-2 space-y-2">
                {cosigners.length > 0 ? (
                  <div className="space-y-2">
                    {cosigners.map((address, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-md">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{truncateAddress(address)}</span>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => handleRemoveCosigner(address)}>
                          <span className="sr-only">Remove</span>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center p-4 border border-dashed rounded-lg">
                    <div className="text-center">
                      <Users className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">No cosigners added yet.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex space-x-2">
              <div className="flex-1">
                <Input
                  id="newCosigner"
                  placeholder="0x..."
                  value={newCosigner}
                  onChange={(e) => setNewCosigner(e.target.value)}
                />
              </div>
              <Button type="button" onClick={handleAddCosigner}>
                <Plus className="h-4 w-4 mr-1" /> Add
              </Button>
            </div>

            <div>
              <Label htmlFor="requiredSignatures">Required Signatures</Label>
              <div className="flex items-center space-x-2 mt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setRequiredSignatures(Math.max(1, requiredSignatures - 1))}
                  disabled={requiredSignatures <= 1}
                >
                  -
                </Button>
                <div className="w-12 text-center">{requiredSignatures}</div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setRequiredSignatures(Math.min(cosigners.length + 1, requiredSignatures + 1))}
                  disabled={requiredSignatures >= cosigners.length + 1}
                >
                  +
                </Button>
              </div>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Security Information</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    This wallet will require {requiredSignatures} out of {cosigners.length + 1} signatures to authorize transactions,
                    providing enhanced security for your assets.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Wallet Address:</span>
                  <span className="font-medium">{truncateAddress(walletAddress)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Required Signatures:</span>
                  <span className="font-medium">{requiredSignatures} of {cosigners.length + 1}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Cosigners:</span>
                  <span className="font-medium">{cosigners.length + 1}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Owners</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-blue-500/10 text-blue-700 dark:text-blue-300 rounded-md">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    <span>You ({account ? truncateAddress(account) : "Not connected"})</span>
                  </div>
                  <Badge variant="outline" className="bg-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-500/30">
                    Primary
                  </Badge>
                </div>
                {cosigners.map((address, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-md">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{truncateAddress(address)}</span>
                    </div>
                    <Badge variant="outline">Cosigner</Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        {!isWalletCreated ? (
          <Button
            className="w-full"
            onClick={handleCreateWallet}
            disabled={isCreating || !isConnected || cosigners.length < 1}
          >
            {isCreating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Wallet...
              </>
            ) : (
              <>
                <Shield className="mr-2 h-4 w-4" />
                Create Multi-Signature Wallet
              </>
            )}
          </Button>
        ) : (
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full">
                <ArrowRight className="mr-2 h-4 w-4" />
                Manage Wallet
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Multi-Signature Wallet</DialogTitle>
                <DialogDescription>
                  Manage your secure multi-signature wallet and view transaction history.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <div className="space-y-4">
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm font-medium">Wallet Address</p>
                    <p className="text-xs font-mono mt-1">{walletAddress}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">No pending transactions</p>
                    <div className="p-8 text-center">
                      <p className="text-muted-foreground text-sm">There are no pending transactions requiring your approval.</p>
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => {
                  toast({
                    title: "Coming Soon",
                    description: "Advanced wallet management features will be available soon.",
                  });
                }}>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add New Cosigner
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </CardFooter>
    </Card>
  );
};

export default MultiSigWallet;
