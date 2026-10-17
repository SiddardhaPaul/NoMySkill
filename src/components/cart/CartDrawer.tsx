import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  ShoppingCart, 
  ArrowRight, 
  Tag, 
  Check, 
  ShieldCheck 
} from 'lucide-react';
import { CartItem, LeafCourse } from '../../types/tree';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveItem: (courseId: string) => void;
  onProceedToCheckout: (discountAmount: number, promoCodeApplied?: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onRemoveItem,
  onProceedToCheckout
}) => {
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + item.course.price, 0);

  let discountPercent = 0;
  if (appliedPromo === 'TREE2026') discountPercent = 0.20;
  if (appliedPromo === 'UPSKILL50') discountPercent = 0.50;

  const discountAmount = Math.round(subtotal * discountPercent);
  const finalTotal = subtotal - discountAmount;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = promoCodeInput.trim().toUpperCase();
    if (clean === 'TREE2026' || clean === 'UPSKILL50') {
      setAppliedPromo(clean);
      setPromoError(null);
    } else {
      setPromoError('Invalid code. Try "TREE2026" or "UPSKILL50"');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/40 backdrop-blur-xs transition-opacity">
      <div 
        className="fixed inset-y-0 right-0 max-w-md w-full bg-white shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="px-5 py-4 bg-white border-b border-stone-200 text-stone-900 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-emerald-600" />
            <h3 className="text-sm font-bold">Shopping Cart ({cartItems.length})</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <ShoppingCart className="w-12 h-12 text-stone-300 mx-auto" />
              <p className="text-sm font-bold text-stone-800">Your Cart is Empty</p>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Explore our Upskilling Tree to select course leaves and grow your skillset.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-4 py-2 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors cursor-pointer"
              >
                Browse Tree Catalog
              </button>
            </div>
          ) : (
            <div className="divide-y divide-stone-100">
              {cartItems.map(({ course }) => (
                <div key={course.id} className="py-3 flex items-start gap-3">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-semibold text-lime-700 bg-lime-50 px-1.5 py-0.5 rounded border border-lime-200">
                      🍃 Leaf Course
                    </span>
                    <h4 className="text-xs font-bold text-stone-900 line-clamp-2 mt-1">
                      {course.title}
                    </h4>
                    <p className="text-[11px] text-stone-500 truncate">
                      {course.instructor.name}
                    </p>
                    <div className="mt-1 flex items-center justify-between">
                      <span className="text-xs font-bold text-stone-900">₹{course.price}</span>
                      <button
                        onClick={() => onRemoveItem(course.id)}
                        className="text-stone-400 hover:text-red-600 transition-colors p-1"
                        title="Remove from cart"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer: Promos & Checkout */}
        {cartItems.length > 0 && (
          <div className="p-5 bg-stone-50 border-t border-stone-200 space-y-3 text-xs">
            
            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <input
                type="text"
                placeholder="Coupon (e.g. TREE2026)"
                value={promoCodeInput}
                onChange={(e) => setPromoCodeInput(e.target.value)}
                className="flex-1 px-3 py-1.5 border border-stone-300 rounded-lg text-xs uppercase font-mono focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-white font-medium text-xs"
              >
                Apply
              </button>
            </form>

            {appliedPromo && (
              <div className="flex items-center gap-1.5 text-emerald-700 text-xs font-semibold">
                <Check className="w-3.5 h-3.5" />
                <span>Promo code "{appliedPromo}" applied ({discountPercent * 100}% off)</span>
              </div>
            )}
            {promoError && (
              <p className="text-[11px] text-red-600">{promoError}</p>
            )}

            {/* Calculations */}
            <div className="space-y-1.5 pt-2 border-t border-stone-200">
              <div className="flex justify-between text-stone-500">
                <span>Subtotal:</span>
                <span>₹{subtotal}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Upskilling Discount:</span>
                  <span>-₹{discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-bold text-stone-900 pt-1 border-t border-stone-200">
                <span>Total:</span>
                <span className="text-emerald-700">₹{finalTotal}</span>
              </div>
            </div>

            <button
              onClick={() => onProceedToCheckout(discountAmount, appliedPromo || undefined)}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Proceed to Checkout (₹{finalTotal})</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>30-Day Money-Back Guarantee · Instant Access</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
