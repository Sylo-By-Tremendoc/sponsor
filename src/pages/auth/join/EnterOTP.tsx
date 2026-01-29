import { useEffect, useRef, useState } from "react";
import Typography from "../../../components/common/Typography";
import { Button } from "@/components/common/Button";
import { useSearchParams } from "react-router-dom";
import { replaceEmptyStringsWithNull } from "@/utils/constant";
import FullScreenLoader from "@/components/common/Loader";
import { toast } from "react-toastify";
import useVerifyOTP from "./hooks/use-verify-otp";

const EnterOTP = ({ handleNext }: { handleNext: () => void }) => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  const otpLength = 6;
  const DURATION = 8 * 60; // 8 Minutes
  const [timeLeft, setTimeLeft] = useState(DURATION);
  const [canResend, setCanResend] = useState(false);
  const [isResending] = useState(false);

  const verifyOTP = useVerifyOTP();

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const [digits, setDigits] = useState<string[]>(() =>
    Array.from({ length: otpLength }).map(() => ""),
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
    idx: number,
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
      (_, i) => pasted[i] ?? "",
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

  const handleVerifyOTP = () => {
    if (!isValid) return;

    const newData = {
      email: email ?? "",
      otp: otp ?? "",
    };

    const submittedData = replaceEmptyStringsWithNull(newData);

    verifyOTP?.mutate(submittedData, {
      onError: (error: any) => {
        const message =
          error?.response?.data?.message ||
          "Error validating OTP, please try again";
        toast.error(message);
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
    <div className="w-full max-w-md my-auto">
      <div className="text-center mb-8">
        <Typography
          variant={"xxSmallText"}
          className="inline-block px-4 py-1 border border-gray-400 rounded-full "
        >
          VERIFY ACCOUNT
        </Typography>
        <h2 className="text-2xl font-semibold pt-3 pb-1">Enter OTP</h2>
        <p className="text-sm text-gray-500">
          We have sent a reset code to your email <br />{" "}
          <strong>{email}</strong>
        </p>
      </div>

      {/* Form */}
      <div className="space-y-5">
        <div className="flex justify-center gap-2 pb-2" onPaste={handlePaste}>
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

        <Button
          type="submit"
          className="w-full text-white rounded-full py-2.5 font-medium transition-all"
          onClick={handleVerifyOTP}
          disabled={!isValid}
        >
          Continue
        </Button>

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
      </div>

      <FullScreenLoader
        loading={verifyOTP.isPending}
        isSuccess={verifyOTP.isSuccess}
        onSuccess={() => handleNext()}
      />
    </div>
  );
};

export default EnterOTP;
