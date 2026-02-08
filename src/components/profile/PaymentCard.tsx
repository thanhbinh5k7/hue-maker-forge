import { CreditCard } from "lucide-react";

interface PaymentInfo {
  bank_name: string;
  account_number: string;
  account_holder: string;
  momo_number: string;
  zalopay_number: string;
  notes: string;
}

interface PaymentCardProps {
  payment: PaymentInfo | null;
}

const PaymentCard = ({ payment }: PaymentCardProps) => {
  if (!payment) {
    return (
      <div className="p-12 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-muted flex items-center justify-center">
          <CreditCard className="w-8 h-8 text-muted-foreground" />
        </div>
        <p className="text-muted-foreground font-medium">Chưa có thông tin thanh toán</p>
      </div>
    );
  }

  const hasPaymentInfo = payment.bank_name || payment.momo_number || payment.zalopay_number;

  if (!hasPaymentInfo) {
    return (
      <div className="p-12 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-muted flex items-center justify-center">
          <CreditCard className="w-8 h-8 text-muted-foreground" />
        </div>
        <p className="text-muted-foreground font-medium">Chưa có thông tin thanh toán</p>
      </div>
    );
  }

  // Generate SePay QR URL
  const generateQRUrl = () => {
    if (payment.bank_name && payment.account_number) {
      const bankCode = payment.bank_name.toUpperCase().replace(/\s+/g, '');
      return `https://qr.sepay.vn/img?acc=${payment.account_number}&bank=${bankCode}&template=qronly`;
    }
    return null;
  };

  const qrUrl = generateQRUrl();

  return (
    <div className="p-4 space-y-4">
      {/* SePay QR Code */}
      {qrUrl && (
        <div className="gradient-card rounded-2xl border border-border/50 p-5 space-y-3 shadow-soft hover:shadow-medium transition-shadow">
          <h3 className="font-bold text-foreground flex items-center gap-2 text-lg text-center justify-center">
            📱 Quét mã QR để thanh toán
          </h3>
          <div className="flex justify-center">
            <img 
              src={qrUrl} 
              alt="QR Code thanh toán" 
              className="w-48 h-48 rounded-xl border border-border/50"
            />
          </div>
          <p className="text-center text-sm text-muted-foreground">
            {payment.bank_name} - {payment.account_number}
          </p>
        </div>
      )}

      {payment.bank_name && (
        <div className="gradient-card rounded-2xl border border-border/50 p-5 space-y-3 shadow-soft hover:shadow-medium transition-shadow">
          <h3 className="font-bold text-foreground flex items-center gap-2 text-lg">
            🏦 Ngân hàng
          </h3>
          <div className="space-y-2 text-sm">
            <p className="flex justify-between">
              <span className="text-muted-foreground">Ngân hàng:</span>
              <span className="font-semibold">{payment.bank_name}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-muted-foreground">Số tài khoản:</span>
              <span className="font-mono font-semibold">{payment.account_number}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-muted-foreground">Chủ TK:</span>
              <span className="font-semibold">{payment.account_holder}</span>
            </p>
          </div>
        </div>
      )}

      {payment.momo_number && (
        <div className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-2xl border border-pink-200 dark:border-pink-900/50 p-5 space-y-2 shadow-soft">
          <h3 className="font-bold text-foreground flex items-center gap-2 text-lg">
            💜 MoMo
          </h3>
          <p className="font-mono text-lg font-semibold">{payment.momo_number}</p>
        </div>
      )}

      {payment.zalopay_number && (
        <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl border border-blue-200 dark:border-blue-900/50 p-5 space-y-2 shadow-soft">
          <h3 className="font-bold text-foreground flex items-center gap-2 text-lg">
            💙 ZaloPay
          </h3>
          <p className="font-mono text-lg font-semibold">{payment.zalopay_number}</p>
        </div>
      )}

      {payment.notes && (
        <div className="bg-muted/50 rounded-2xl p-5">
          <p className="text-sm text-muted-foreground italic">{payment.notes}</p>
        </div>
      )}
    </div>
  );
};

export default PaymentCard;
