
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { AlertTriangle, Check, X, Vote, ThumbsUp, ThumbsDown, Clock, Users } from 'lucide-react';

interface DisputeProps {
  transactionId: string;
  amount: number;
  currency: string;
  title: string;
  description: string;
  buyerAddress: string;
  sellerAddress: string;
  evidenceUrls?: string[];
  status?: 'active' | 'resolved';
  timeRemaining?: string;
  votesFor?: number;
  votesAgainst?: number;
}

const DisputeResolution: React.FC<DisputeProps> = ({
  transactionId,
  amount,
  currency,
  title,
  description,
  buyerAddress,
  sellerAddress,
  evidenceUrls = [],
  status = 'active',
  timeRemaining = '2 days 5 hours',
  votesFor = 24,
  votesAgainst = 7,
}) => {
  const { toast } = useToast();
  const [hasVoted, setHasVoted] = useState(false);
  const [localVotesFor, setLocalVotesFor] = useState(votesFor);
  const [localVotesAgainst, setLocalVotesAgainst] = useState(votesAgainst);
  
  const totalVotes = localVotesFor + localVotesAgainst;
  const votesForPercentage = totalVotes > 0 ? (localVotesFor / totalVotes) * 100 : 0;
  
  const handleVote = (inFavor: boolean) => {
    if (hasVoted) {
      toast({
        title: "Already voted",
        description: "You have already cast your vote on this dispute",
      });
      return;
    }
    
    if (inFavor) {
      setLocalVotesFor(prev => prev + 1);
    } else {
      setLocalVotesAgainst(prev => prev + 1);
    }
    
    setHasVoted(true);
    
    toast({
      title: "Vote recorded",
      description: `You voted ${inFavor ? 'in favor of' : 'against'} the buyer's claim`,
    });
  };
  
  return (
    <Card className="w-full">
      <CardHeader className="bg-destructive/10">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 mt-1 text-destructive" />
            <div>
              <CardTitle className="text-lg">{title}</CardTitle>
              <CardDescription>Transaction ID: {transactionId}</CardDescription>
            </div>
          </div>
          <div className="px-2 py-1 bg-background rounded text-xs flex items-center">
            {status === 'active' ? (
              <>
                <Clock className="h-3 w-3 mr-1" />
                <span>{timeRemaining} left</span>
              </>
            ) : (
              <>
                <Check className="h-3 w-3 mr-1 text-green-500" />
                <span>Resolved</span>
              </>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Amount in Dispute</h3>
            <p className="text-lg font-semibold">{amount} {currency}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Participants</h3>
            <div className="space-y-1 text-sm">
              <p className="truncate"><span className="font-medium">Buyer:</span> {buyerAddress}</p>
              <p className="truncate"><span className="font-medium">Seller:</span> {sellerAddress}</p>
            </div>
          </div>
        </div>
        
        <Separator />
        
        <div>
          <h3 className="text-sm font-medium mb-2">Dispute Description</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        
        {evidenceUrls.length > 0 && (
          <div>
            <h3 className="text-sm font-medium mb-2">Evidence Submitted</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {evidenceUrls.map((url, index) => (
                <div key={index} className="bg-muted rounded h-20 flex items-center justify-center">
                  <span className="text-xs text-muted-foreground">Evidence #{index + 1}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <Separator />
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium flex items-center gap-1">
              <Vote className="h-4 w-4" /> Community Vote
            </h3>
            <span className="text-xs text-muted-foreground flex items-center">
              <Users className="h-3 w-3 mr-1" /> {totalVotes} votes
            </span>
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span>In favor of buyer</span>
              <span>{votesForPercentage.toFixed(0)}%</span>
            </div>
            <Progress value={votesForPercentage} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{localVotesFor} votes</span>
              <span>{localVotesAgainst} votes</span>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col space-y-4 px-6 py-4 bg-muted/30">
        <p className="text-sm">
          {status === 'active' 
            ? "Cast your vote to help resolve this dispute. Once voting period ends, the decision will be automatically executed by the smart contract."
            : "This dispute has been resolved and funds have been distributed according to the community vote."
          }
        </p>
        
        {status === 'active' && (
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <Button 
              variant="outline" 
              className="flex-1" 
              onClick={() => handleVote(true)}
              disabled={hasVoted}
            >
              <ThumbsUp className="mr-2 h-4 w-4" />
              In Favor of Buyer
            </Button>
            <Button 
              variant="outline" 
              className="flex-1" 
              onClick={() => handleVote(false)}
              disabled={hasVoted}
            >
              <ThumbsDown className="mr-2 h-4 w-4" />
              In Favor of Seller
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default DisputeResolution;
