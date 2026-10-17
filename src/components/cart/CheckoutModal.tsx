import React, { useState } from 'react';
import { 
  X, 
  CreditCard, 
  ShieldCheck, 
  Check, 
  Lock, 
  ArrowRight,
  TreePine,
  Download,
  CheckCircle2
} from 'lucide-react';
import { LeafCourse, OrderReceipt } from '../../types/tree';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: LeafCourse[];
  totalAmount: number;
  discountAmount: number;
  finalAmount: number;
  onPaymentSuccess: (receipt: OrderReceipt) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  totalAmount,
  discountAmount,
  finalAmount,
  onPaymentSuccess
}) => {
  const [paymentGateway, setPaymentGateway] = useState<'stripe' | 'paypal' | 'razorpay'>('stripe');
  const [customerName, setCustomerName] = useState('Alex Rivera');
  const [customerEmail, setCustomerEmail] = useState('alex.rivera@example.com');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [expiry, setExpiry] = useState('12/28');
  const [cvc, setCvc] = useState('888');
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedReceipt, setCompletedReceipt] = useState<OrderReceipt | null>(null);

  if (!isOpen) return null;

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const receipt: OrderReceipt = {
        id: `ORD-NOMYSKILL-${Date.now().toString().slice(-6)}`,
        items,
        totalAmount,
        discountAmount,
        finalAmount,
        paymentMethod: paymentGateway,
        customerName,
        customerEmail,
        purchasedAt: new Date().toISOString()
      };
      setIsProcessing(false);
      setCompletedReceipt(receipt);
      onPaymentSuccess(receipt);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div 
        className="bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden border border-stone-200 text-stone-900"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="px-6 py-4 bg-white border-b border-stone-200 text-stone-900 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800">
              <Lock className="w-4 h-4 text-emerald-700" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-stone-900">Secure Upskilling Checkout</h3>
              <p className="text-[11px] text-stone-500">256-Bit Encrypted Payment Pipeline</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {completedReceipt ? (
          /* Payment Success & Receipt View */
          <div className="p-6 space-y-5 text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-xl font-black text-stone-900">Payment Successful!</h3>
              <p className="text-xs text-stone-600 mt-1">
                Your course leaves are now officially planted in your student dashboard.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-stone-500">Order Reference:</span>
                <span className="font-mono font-bold text-stone-900">{completedReceipt.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Payment Channel:</span>
                <span className="font-semibold uppercase text-stone-900">{completedReceipt.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Billed To:</span>
                <span className="font-medium text-stone-900">{completedReceipt.customerName}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-stone-200 font-bold">
                <span className="text-stone-900">Amount Paid:</span>
                <span className="text-emerald-700 text-sm">₹{completedReceipt.finalAmount}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-colors"
            >
              Go to My Learning Classroom
            </button>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handlePay} className="p-6 space-y-5">
            
            {/* Gateway Selector Tabs: Stripe vs PayPal vs Razorpay */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-2">
                Select Payment Method
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentGateway('stripe')}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-center ${
                    paymentGateway === 'stripe'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-1 ring-emerald-500'
                      : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <span>Stripe</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentGateway('paypal')}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-center ${
                    paymentGateway === 'paypal'
                      ? 'border-blue-600 bg-blue-50 text-blue-900 ring-1 ring-blue-500'
                      : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <span>PayPal</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentGateway('razorpay')}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-center ${
                    paymentGateway === 'razorpay'
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-900 ring-1 ring-indigo-500'
                      : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <span>Razorpay</span>
                </button>
              </div>
            </div>

            {/* Customer Details */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-stone-200 rounded-lg focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Email Address for Receipt & Credentials
                </label>
                <input
                  type="email"
                  required
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-stone-200 rounded-lg focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Gateway-specific details */}
              {paymentGateway === 'stripe' && (
                <div className="space-y-2 pt-2 border-t border-stone-100">
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Card Number
                    </label>
                    <div className="relative">
                      <CreditCard className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs border border-stone-200 rounded-lg font-mono focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        Expiry
                      </label>
                      <input
                        type="text"
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-stone-200 rounded-lg font-mono focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        CVC / CVV
                      </label>
                      <input
                        type="password"
                        value={cvc}
                        onChange={(e) => setCvc(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-stone-200 rounded-lg font-mono focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentGateway === 'paypal' && (
                <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900">
                  <p className="font-semibold">PayPal One-Touch Active</p>
                  <p className="text-[11px] mt-0.5 text-blue-700">You will be securely authenticated using your saved PayPal credentials.</p>
                </div>
              )}

              {paymentGateway === 'razorpay' && (
                <div className="p-3.5 rounded-xl bg-indigo-50 border border-indigo-200 text-xs text-indigo-900">
                  <p className="font-semibold">Razorpay UPI & NetBanking</p>
                  <p className="text-[11px] mt-0.5 text-indigo-700">Instant routing via UPI ID or top Indian banks with instant enrollment.</p>
                </div>
              )}
            </div>

            {/* Order Total Breakdown */}
            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1.5 text-xs">
              <div className="flex justify-between text-stone-500">
                <span>Items ({items.length}):</span>
                <span>₹{totalAmount}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Upskilling Promo Discount:</span>
                  <span>-₹{discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between text-stone-900 font-black text-sm pt-1.5 border-t border-stone-200">
                <span>Total Due Today:</span>
                <span className="text-emerald-700">₹{finalAmount}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isProcessing ? (
                <span>Authorizing Payment...</span>
              ) : (
                <>
                  <span>Confirm & Pay ₹{finalAmount} via {paymentGateway.toUpperCase()}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>30-Day Money-Back Guarantee · Instant Access</span>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
