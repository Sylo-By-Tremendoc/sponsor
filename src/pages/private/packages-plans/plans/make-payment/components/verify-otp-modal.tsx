import { Button } from "@/components/common/Button";
import CustomDialog, { DialogFooter } from "@/components/common/modals/Dialog";
import { replaceEmptyStringsWithNull } from "@/utils/constant";
import { useEffect, useRef, useState } from "react";
import useVerifyPlanPaymentOTP from "../../hooks/use-verify-plan-payment-otp";
import { toast } from "react-toastify";
import Typography from "@/components/common/Typography";
import useAuth from "@/hooks/use-auth";
import { maskEmail } from "@/utils/formatters";
import { getErrorMessage } from "@/utils/get-error-message";

const VerifyOTPModal = ({
  openVerifyOTPModal,
  setOpenVerifyOTPModal,
  handleStripeSetup,
}: {
  openVerifyOTPModal: boolean;
  setOpenVerifyOTPModal: (val: boolean) => void;
  handleStripeSetup: (val: string) => void;
}) => {
  const otpLength = 6;
  const DURATION = 8 * 60; // 8 Minutes
  const [timeLeft, setTimeLeft] = useState(DURATION);
  const [canResend, setCanResend] = useState(false);
  const [isResending] = useState(false);

  const { authUser } = useAuth();
  const verifyPlanPaymentOTP = useVerifyPlanPaymentOTP();

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const [digits, setDigits] = useState<string[]>(() =>
    Array.from({ length: otpLength }).map(() => "")
  );
  const refs = useRef<Array<HTMLInputElement | null>>([]);

  // handle single character change
  const handleChange = (idx: number, value: string) => {
    const sanitized = value.replace(/\D/g, "").slice(0, 1); // only one digit
    setDigits((prev) => {
      const next = [...prev];
      next[idx] = sanitized;
      return next;
    });

    if (sanitized && idx < otpLength - 1) {
      refs.current[idx + 1]?.focus();
      refs.current[idx + 1]?.select();
    }
  };

  // backspace behavior
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    idx: number
  ) => {
    if (e.key === "Backspace") {
      if (digits[idx] === "" && idx > 0) {
        refs.current[idx - 1]?.focus();
        // optionally clear previous:
        setDigits((prev) => {
          const next = [...prev];
          next[idx - 1] = "";
          return next;
        });
      } else {
        setDigits((prev) => {
          const next = [...prev];
          next[idx] = "";
          return next;
        });
      }
    }
    if (e.key === "ArrowLeft" && idx > 0) {
      refs.current[idx - 1]?.focus();
    }
    if (e.key === "ArrowRight" && idx < otpLength - 1) {
      refs.current[idx + 1]?.focus();
    }
  };

  // support paste of full code
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, otpLength);
    if (!pasted) return;
    const arr = Array.from({ length: otpLength }).map(
      (_, i) => pasted[i] ?? ""
    );
    setDigits(arr);
    const focusIndex = Math.min(pasted.length, otpLength - 1);
    setTimeout(() => refs.current[focusIndex]?.focus(), 0);
    e.preventDefault();
  };

  const handleResend = async () => {
    // onResend?.(() => {
    //   setTimeLeft(DURATION);
    //   setCanResend(false);
    // });
  };

  const otp = digits.join("");
  const isValid = otp.length === otpLength;

  const handleVerifyOTP = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValid) return;

    const newData = {
      otp: otp ?? "",
    };

    const submittedData = replaceEmptyStringsWithNull(newData);

    verifyPlanPaymentOTP?.mutate(submittedData, {
      onSuccess: (res) => {
        toast.success("OTP verified successfully.");

        const clientSecret = res?.data?.client_secret;

        if (clientSecret) {
          handleStripeSetup(clientSecret);
        }
      },
      
      onError: (error: Error) => {
        toast.error(
          getErrorMessage(
            error?.message,
            "Error validating OTP, please try again"
          )
        );
      },
    });
  };

  // Countdown timer effect
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  useEffect(() => {
    if (!open) return;

    setTimeLeft(600); // reset when modal opens
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [open]);

  return (
    <CustomDialog
      title="Verify OTP"
      description={`An otp has been sent to ${maskEmail(
        authUser?.user?.email
      )}`}
      openModal={openVerifyOTPModal}
      onClose={() => setOpenVerifyOTPModal(false)}
      className="md:max-w-[35%]"
    >
      <form noValidate onSubmit={handleVerifyOTP} className="space-y-3">
        <div className="flex justify-center gap-2 py-4" onPaste={handlePaste}>
          {Array.from({ length: otpLength }).map((_, i) => (
            <input
              key={i}
              id={`otp-${i}`}
              ref={(el) => {
                refs.current[i] = el;
              }}
              value={digits[i] || ""}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e as any, i)}
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              className="w-12 h-12 text-center rounded-lg border border-mid-grey focus:ring-2 focus:ring-primary text-lg"
              aria-label={`OTP digit ${i + 1}`}
            />
          ))}
        </div>

        {!canResend ? (
          <Typography variant="smallText" className="text-center text-gray-500">
            Resend in{" "}
            <span className="font-semibold text-danger">
              {formatTime(timeLeft)}
            </span>
          </Typography>
        ) : (
          <button
            className="text-sm underline text-primary"
            type="button"
            onClick={handleResend}
            disabled={isResending}
          >
            {isResending ? "Resending..." : "Resend OTP"}
          </button>
        )}

        <DialogFooter className="md:col-span-2 pt-5">
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => setOpenVerifyOTPModal(false)}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            isLoading={verifyPlanPaymentOTP.isPending}
            disabled={!isValid || verifyPlanPaymentOTP.isPending}
            className="w-full"
          >
            {verifyPlanPaymentOTP.isPending ? "Verifying..." : "Verify"}
          </Button>
        </DialogFooter>
      </form>
    </CustomDialog>
  );
};

export default VerifyOTPModal;
