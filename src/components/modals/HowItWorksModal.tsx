
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Shield, ArrowRight, Check, AlertTriangle, Vote, Scale } from 'lucide-react';

interface HowItWorksModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const HowItWorksModal: React.FC<HowItWorksModalProps> = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" /> 
            How TransacShield Works
          </DialogTitle>
          <DialogDescription>
            Our smart contract escrow system provides a secure way to conduct cross-border transactions
          </DialogDescription>
        </DialogHeader>
        
        <Separator className="my-4" />
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Smart Contract Escrow</h3>
            <div className="bg-secondary/40 p-4 rounded-lg border border-border">
              <div className="flex flex-col space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <span className="font-bold">1</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Buyer Creates Transaction</p>
                    <p className="text-sm text-muted-foreground">
                      Buyer initiates the transaction with details and funds the escrow smart contract 
                      with agreed amount in selected currency
                    </p>
                    <div className="mt-2 text-xs bg-muted p-2 rounded font-mono">
                      {`function createEscrow(address _seller, uint256 _amount) public payable {
  require(msg.value == _amount, "Incorrect amount");
  Escrow escrow = new Escrow(msg.sender, _seller, _amount);
  activeEscrows.push(address(escrow));
  emit EscrowCreated(address(escrow), msg.sender, _seller, _amount);
}`}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <ArrowRight className="text-primary h-6 w-6" />
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <span className="font-bold">2</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Seller Acceptance</p>
                    <p className="text-sm text-muted-foreground">
                      Seller reviews and accepts the terms, committing to provide goods or services
                    </p>
                    <div className="mt-2 text-xs bg-muted p-2 rounded font-mono">
                      {`function acceptTerms() public onlySeller {
  require(state == State.Created, "Invalid state");
  state = State.Accepted;
  emit TermsAccepted(seller);
}`}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <ArrowRight className="text-primary h-6 w-6" />
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <span className="font-bold">3</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Funds Locked In Smart Contract</p>
                    <p className="text-sm text-muted-foreground">
                      Funds are securely locked in the smart contract, inaccessible to either party
                    </p>
                    <div className="mt-2 text-xs bg-muted p-2 rounded font-mono">
                      {`// Smart contract holds funds securely
// Neither buyer nor seller can withdraw until conditions are met
address public escrowAddress;
uint256 public lockedAmount;
State public state = State.Created;`}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <ArrowRight className="text-primary h-6 w-6" />
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <span className="font-bold">4</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Delivery & Confirmation</p>
                    <p className="text-sm text-muted-foreground">
                      Seller delivers goods/services and buyer confirms receipt and satisfaction
                    </p>
                    <div className="mt-2 text-xs bg-muted p-2 rounded font-mono">
                      {`function confirmDelivery() public onlyBuyer {
  require(state == State.Accepted, "Invalid state");
  state = State.Completed;
  // Transfer funds to seller
  (bool success, ) = seller.call{value: amount}("");
  require(success, "Transfer failed");
  emit DeliveryConfirmed(buyer);
}`}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <ArrowRight className="text-primary h-6 w-6" />
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <span className="font-bold">5</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Automatic Fund Release</p>
                    <p className="text-sm text-muted-foreground">
                      Upon confirmation, the smart contract automatically releases funds to the seller
                    </p>
                    <div className="mt-2 text-xs bg-muted p-2 rounded font-mono">
                      {`// Funds are automatically released to seller
// No manual intervention needed
// Transaction is recorded on blockchain permanently`}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Dispute Resolution System</h3>
            <div className="bg-secondary/40 p-4 rounded-lg border border-border">
              <div className="flex items-start gap-4">
                <div className="bg-destructive/10 p-3 rounded-full">
                  <AlertTriangle className="h-6 w-6 text-destructive" />
                </div>
                <div>
                  <p className="font-medium">If a dispute arises:</p>
                  <ul className="space-y-3 mt-2">
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 mt-1 text-primary" />
                      <span className="text-sm">Either party can raise a dispute through the platform</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Vote className="h-4 w-4 mt-1 text-primary" />
                      <span className="text-sm">Community voting mechanism determines the outcome</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Scale className="h-4 w-4 mt-1 text-primary" />
                      <span className="text-sm">Arbitrators review evidence and vote on resolution</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 mt-1 text-primary" />
                      <span className="text-sm">Smart contract executes the ruling automatically</span>
                    </li>
                  </ul>
                  <div className="mt-3 text-xs bg-muted p-2 rounded font-mono">
                    {`function raiseDispute(string memory _reason) public {
  require(state == State.Accepted, "Invalid state");
  require(msg.sender == buyer || msg.sender == seller, "Unauthorized");
  state = State.Disputed;
  disputeReason = _reason;
  votingDeadline = block.timestamp + 7 days;
  emit DisputeRaised(msg.sender, _reason);
}

function resolveDispute(bool _favorBuyer) public onlyArbitrator {
  require(state == State.Disputed, "Not disputed");
  if (_favorBuyer) {
    // Return funds to buyer
    (bool success, ) = buyer.call{value: amount}("");
    require(success, "Transfer failed");
  } else {
    // Release funds to seller
    (bool success, ) = seller.call{value: amount}("");
    require(success, "Transfer failed");
  }
  state = State.Resolved;
  emit DisputeResolved(_favorBuyer);
}`}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Multi-Currency Support</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-secondary/40 p-4 rounded-lg border border-border">
                <h4 className="font-medium mb-2">Fiat Currencies</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Support for major global currencies with real-time exchange rates
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 rounded-full text-xs bg-primary/10">USD</span>
                  <span className="px-2 py-1 rounded-full text-xs bg-primary/10">EUR</span>
                  <span className="px-2 py-1 rounded-full text-xs bg-primary/10">GBP</span>
                  <span className="px-2 py-1 rounded-full text-xs bg-primary/10">JPY</span>
                  <span className="px-2 py-1 rounded-full text-xs bg-primary/10">AUD</span>
                  <span className="px-2 py-1 rounded-full text-xs bg-primary/10">CAD</span>
                  <span className="px-2 py-1 rounded-full text-xs bg-primary/10">+ More</span>
                </div>
              </div>
              
              <div className="bg-secondary/40 p-4 rounded-lg border border-border">
                <h4 className="font-medium mb-2">Cryptocurrencies</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Native support for blockchain transactions across multiple networks
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 rounded-full text-xs bg-primary/10">ETH</span>
                  <span className="px-2 py-1 rounded-full text-xs bg-primary/10">BTC</span>
                  <span className="px-2 py-1 rounded-full text-xs bg-primary/10">USDC</span>
                  <span className="px-2 py-1 rounded-full text-xs bg-primary/10">USDT</span>
                  <span className="px-2 py-1 rounded-full text-xs bg-primary/10">BNB</span>
                  <span className="px-2 py-1 rounded-full text-xs bg-primary/10">+ More</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HowItWorksModal;
