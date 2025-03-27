
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Wallet from '@/components/wallet/Wallet';
import MultiSigWallet from '@/components/wallet/MultiSigWallet';
import TransactionNFT from '@/components/blockchain/TransactionNFT';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CurrencySelector from '@/components/ui/CurrencySelector';
import TransactionCard from '@/components/ui/TransactionCard';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useMetaMask } from '@/hooks/use-metamask';
import { Loader2, SendHorizontal, ShieldCheck, AlertTriangle } from 'lucide-react';

const Transactions = () => {
  const { toast } = useToast();
  const { isConnected } = useMetaMask();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currency, setCurrency] = useState('USD');
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [description, setDescription] = useState("");

  const handleTransactionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected) {
      toast({
        variant: "destructive",
        title: "Wallet Not Connected",
        description: "Please connect your wallet to create a transaction",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate transaction processing
    setTimeout(() => {
      toast({
        title: "Transaction Created",
        description: "Your escrow transaction has been successfully created",
      });
      setIsSubmitting(false);
      setAmount("");
      setRecipient("");
      setDescription("");
    }, 2000);
  };

  // Sample transaction data
  const recentTransactions = [
    {
      id: '8a7b6c5d4e3f2g1h',
      type: 'buyer' as const,
      amount: 5000,
      currency: 'USD',
      description: 'Electronic Components Purchase',
      status: 'in_progress' as const,
      date: '2023-08-01',
      counterparty: 'Tech Supplies Ltd.',
      progress: 60,
    },
    {
      id: '7a6b5c4d3e2f1g0h',
      type: 'seller' as const,
      amount: 2500,
      currency: 'EUR',
      description: 'Software Development Services',
      status: 'pending' as const,
      date: '2023-07-28',
      counterparty: 'Global Solutions Inc.',
      progress: 20,
    },
  ];

  // Sample completed transaction for NFT
  const completedTransaction = {
    id: '6a5b4c3d2e1f0g9h',
    amount: 12000,
    currency: 'ETH',
    description: 'Artwork Commission',
    counterparty: 'Creative Arts Studio',
    date: '2023-07-15',
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="space-y-6">
                <Wallet />
                
                <MultiSigWallet />
                
                <Card className="overflow-hidden">
                  <CardHeader className="bg-primary/5 pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <ShieldCheck size={18} /> Escrow Benefits
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <div className="mt-1 rounded-full bg-green-500/20 p-1">
                          <svg className="h-3 w-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-sm">Funds are securely held until all conditions are met</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="mt-1 rounded-full bg-green-500/20 p-1">
                          <svg className="h-3 w-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-sm">Lower fees than traditional financial intermediaries</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="mt-1 rounded-full bg-green-500/20 p-1">
                          <svg className="h-3 w-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-sm">Smart contracts ensure transparent transactions</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div className="lg:col-span-2">
              <Tabs defaultValue="new">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="new">New Transaction</TabsTrigger>
                  <TabsTrigger value="history">Transaction History</TabsTrigger>
                  <TabsTrigger value="nft">Transaction NFTs</TabsTrigger>
                </TabsList>
                
                <TabsContent value="new" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Create Escrow Transaction</CardTitle>
                      <CardDescription>
                        Set up a secure transaction using our smart contract escrow service
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleTransactionSubmit} className="space-y-6">
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="recipient">Recipient Address</Label>
                            <Input
                              id="recipient"
                              placeholder="0x..."
                              value={recipient}
                              onChange={(e) => setRecipient(e.target.value)}
                              required
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="amount">Amount</Label>
                              <Input
                                id="amount"
                                type="number"
                                placeholder="0.00"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="currency">Currency</Label>
                              <CurrencySelector 
                                value={currency}
                                onValueChange={(value) => setCurrency(value)}
                              />
                            </div>
                          </div>
                          
                          <div>
                            <Label htmlFor="description">Transaction Description</Label>
                            <Input
                              id="description"
                              placeholder="Payment for goods/services..."
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        
                        <div className="rounded-md border p-4 bg-amber-50 dark:bg-amber-950/20">
                          <div className="flex items-start gap-3">
                            <AlertTriangle className="mt-0.5 h-5 w-5 text-amber-600 dark:text-amber-500" />
                            <div className="text-sm text-amber-700 dark:text-amber-400">
                              <p className="font-medium">Important:</p>
                              <p className="mt-1">
                                Once an escrow contract is created, funds will be locked until all 
                                conditions are met. Make sure the details are correct.
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <Button
                          type="submit"
                          className="w-full"
                          disabled={isSubmitting || !isConnected}
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Creating Transaction...
                            </>
                          ) : (
                            <>
                              <SendHorizontal className="mr-2 h-4 w-4" />
                              Create Escrow Transaction
                            </>
                          )}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="history" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Your Transactions</CardTitle>
                      <CardDescription>
                        Manage and track your escrow transactions
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {recentTransactions.length > 0 ? (
                        <div className="grid grid-cols-1 gap-4">
                          {recentTransactions.map((transaction) => (
                            <TransactionCard
                              key={transaction.id}
                              {...transaction}
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-10">
                          <p className="text-muted-foreground">No transactions found</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="nft" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Transaction NFT Certificates</CardTitle>
                      <CardDescription>
                        Mint NFTs as proof of completed transactions on the blockchain
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <TransactionNFT 
                        transactionId={completedTransaction.id}
                        amount={completedTransaction.amount}
                        currency={completedTransaction.currency}
                        counterparty={completedTransaction.counterparty}
                        date={completedTransaction.date}
                      />
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      
      <Separator />
      <Footer />
    </div>
  );
};

export default Transactions;
