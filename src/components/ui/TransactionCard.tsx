
import React from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface TransactionCardProps {
  id: string;
  type: 'buyer' | 'seller';
  amount: number;
  currency: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'disputed';
  date: string;
  counterparty: string;
  progress: number;
}

const statusColors = {
  pending: 'bg-amber-100 text-amber-800',
  in_progress: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
  disputed: 'bg-red-100 text-red-800',
};

const statusLabels = {
  pending: 'Pending',
  in_progress: 'In Progress',
  completed: 'Completed',
  disputed: 'Disputed',
};

const TransactionCard: React.FC<TransactionCardProps> = ({
  id,
  type,
  amount,
  currency,
  description,
  status,
  date,
  counterparty,
  progress,
}) => {
  return (
    <div className="bg-white border border-border rounded-xl overflow-hidden shadow-subtle hover-scale">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[status]}`}>
              {statusLabels[status]}
            </span>
            <h3 className="text-lg font-medium mt-2">{description}</h3>
          </div>
          <div className="text-right">
            <p className="text-xl font-semibold">
              {currency} {amount.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">
              {type === 'buyer' ? 'To' : 'From'}: {counterparty}
            </p>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Transaction Progress</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            ID: {id.substring(0, 8)}...
          </span>
          <span className="text-sm text-muted-foreground">{date}</span>
        </div>

        <div className="mt-6 flex gap-3">
          {status === 'pending' && type === 'seller' && (
            <>
              <Button variant="outline" size="sm" className="flex-1">Decline</Button>
              <Button size="sm" className="flex-1">Accept</Button>
            </>
          )}
          
          {status === 'in_progress' && type === 'buyer' && (
            <Button size="sm" className="w-full">Confirm Receipt</Button>
          )}
          
          {status === 'in_progress' && type === 'seller' && (
            <Button size="sm" variant="outline" className="w-full">Upload Proof</Button>
          )}
          
          {status === 'disputed' && (
            <Button size="sm" variant="outline" className="w-full">View Dispute</Button>
          )}
          
          {status === 'completed' && (
            <Button size="sm" variant="outline" className="w-full">View Details</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionCard;
