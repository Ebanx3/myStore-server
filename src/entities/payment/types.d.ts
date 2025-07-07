type Payment = {
  id: string;
  amount: number;
  currency: string;
  date: Date;
  method: string; // por ejemplo "credit_card", "paypal"
  status: 'pending' | 'completed' | 'failed';
};