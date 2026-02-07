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
      <div className="p-8 text-center text-muted-foreground">
        Chưa có thông tin thanh toán
      </div>
    );
  }

  const hasPaymentInfo = payment.bank_name || payment.momo_number || payment.zalopay_number;

  if (!hasPaymentInfo) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        Chưa có thông tin thanh toán
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      {payment.bank_name && (
        <div className="bg-card rounded-xl border border-border p-4 space-y-2">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            🏦 Ngân hàng
          </h3>
          <div className="space-y-1 text-sm">
            <p><span className="text-muted-foreground">Ngân hàng:</span> {payment.bank_name}</p>
            <p><span className="text-muted-foreground">Số tài khoản:</span> {payment.account_number}</p>
            <p><span className="text-muted-foreground">Chủ TK:</span> {payment.account_holder}</p>
          </div>
        </div>
      )}

      {payment.momo_number && (
        <div className="bg-card rounded-xl border border-border p-4 space-y-2">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            💜 MoMo
          </h3>
          <p className="text-sm">{payment.momo_number}</p>
        </div>
      )}

      {payment.zalopay_number && (
        <div className="bg-card rounded-xl border border-border p-4 space-y-2">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            💙 ZaloPay
          </h3>
          <p className="text-sm">{payment.zalopay_number}</p>
        </div>
      )}

      {payment.notes && (
        <div className="bg-muted rounded-xl p-4">
          <p className="text-sm text-muted-foreground">{payment.notes}</p>
        </div>
      )}
    </div>
  );
};

export default PaymentCard;
